// Constants
const RESPONSE_ERROR_BODY_LIMIT = 2048;

// Serializable representation of an error; used for transporting errors across api and worker boundaries
export interface SerialisedError {
    body: string | undefined; // HTTP response body (fetch errors only)
    locator: string; // Error locator 'package.module.method'
    message: string; // Human-readable error message
    name: string; // Error class or type name
    stack: string | undefined; // Stack trace if available
}

// Errors ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Base class for all DPU errors; includes a locator for the error; never thrown directly
export class DPUError extends Error {
    readonly locator: string; // Error locator 'package.module.method'
    constructor(message: string, locator: string, options?: ErrorOptions) {
        super(message, options);
        this.name = 'DPUError';
        this.locator = locator;
    }
}

// Thrown when an app (workbench/knowledge) error occurs
export class AppError extends DPUError {
    readonly trace: SerialisedError[] | undefined;
    constructor(message: string, locator: string, trace: SerialisedError[] | undefined, options?: ErrorOptions) {
        super(message, locator, options);
        this.name = 'AppError';
        this.trace = trace;
    }
}

// Thrown when an API request fails
export class APIError extends DPUError {
    readonly body: string | undefined; // Sanitized snapshot of the response body
    constructor(message: string, locator: string, body: string | undefined, options?: ErrorOptions) {
        super(message, locator, options);
        this.name = 'APIError';
        this.body = sanitizeResponseErrorBody(body ?? undefined);
    }
}

// Thrown when an engine request fails
export class EngineError extends DPUError {
    constructor(message: string, locator: string, options?: ErrorOptions) {
        super(message, locator, options);
        this.name = 'EngineError';
    }
}

// Thrown when an connector operation fails; will always be wrapped in an engine error
export class ConnectorError extends DPUError {
    constructor(message: string, locator: string, options?: ErrorOptions) {
        super(message, locator, options);
        this.name = 'ConnectorError';
    }
}

// Thrown when an HTTP request fails; may include a sanitized portion of the response body for diagnostic purposes
export class FetchError extends DPUError {
    readonly body: string | undefined; // Sanitized portion of the response body
    constructor(message: string, locator: string, body: string | undefined, options?: ErrorOptions) {
        super(message, locator, options);
        this.name = 'FetchError';
        this.body = sanitizeResponseErrorBody(body ?? undefined);
    }
}

// Functions ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Builds a fetch error from an HTTP response; includes a text copy of the response body
export async function buildFetchError(response: { status: number; statusText: string; text: () => Promise<string> }, message: string, locator: string): Promise<FetchError> {
    const responseStatusStuff = ` - ${response.statusText}`;
    const fetchMessage = `${message} Response status '${response.status}${response.statusText ? responseStatusStuff : ''}' received.`;
    let bodyText: string;
    try {
        bodyText = await response.text();
    } catch (error) {
        const normalised = normalizeToError(error);
        bodyText = `<body unavailable: ${normalised.message}>`;
    }
    return new FetchError(fetchMessage, locator, bodyText);
}

// Concatenates serialized error messages into a single string
export function concatenateSerialisedErrorMessages(serialisedErrors: SerialisedError[]): string {
    return serialisedErrors.map((serialisedError) => serialisedError.message).join(' ');
}

// Ignore best-effort cleanup errors to keep teardown noise-free
export function ignoreErrors(action: () => void): void {
    try {
        action();
    } catch {
        // Intentionally ignore errors
    }
}

// Normalizes an unknown thrown value into an error
export function normalizeToError(value: unknown): Error {
    if (value instanceof Error) return value;
    if (typeof value === 'string') return new Error(value);
    if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') return new Error(String(value));
    if (typeof value === 'symbol') return new Error(value.description ?? 'Unknown error');
    if (typeof value === 'object') {
        try {
            return new Error(JSON.stringify(value));
        } catch {
            return new Error('Unknown error');
        }
    }
    return new Error('Unknown error');
}

// Serializes an error and its cause chain into a array of serialised error objects;
// errors are ordered from outermost to root cause;
// cycles in the cause chain are safely ignored;
// messages are normalized to end with punctuation
// eslint-disable-next-line sonarjs/cognitive-complexity
export function serialiseError(error?: unknown): SerialisedError[] {
    const seenCauses = new Set();
    const serialisedErrors: SerialisedError[] = [];
    let cause: Error | null = normalizeToError(error);
    while (cause != null && !seenCauses.has(cause)) {
        seenCauses.add(cause);
        let serialisedError: SerialisedError;
        switch (cause.name) {
            case 'APIError': {
                const typedCause = cause as APIError;
                serialisedError = { body: typedCause.body, locator: typedCause.locator, message: cause.message, name: 'APIError', stack: cause.stack };
                cause = cause.cause == null ? null : normalizeToError(cause.cause);
                break;
            }
            case 'ConnectorError': {
                const typedCause = cause as ConnectorError;
                serialisedError = { body: undefined, locator: typedCause.locator, message: cause.message, name: 'ConnectorError', stack: cause.stack };
                cause = cause.cause == null ? null : normalizeToError(cause.cause);
                break;
            }
            case 'EngineError': {
                const typedCause = cause as EngineError;
                serialisedError = { body: undefined, locator: typedCause.locator, message: cause.message, name: 'EngineError', stack: cause.stack };
                cause = cause.cause == null ? null : normalizeToError(cause.cause);
                break;
            }
            case 'FetchError': {
                const typedCause = cause as FetchError;
                serialisedError = { body: typedCause.body, locator: typedCause.locator, message: cause.message, name: 'FetchError', stack: cause.stack };
                cause = cause.cause == null ? null : normalizeToError(cause.cause);
                break;
            }
            default:
                if (cause.name) {
                    serialisedError = { body: undefined, locator: '', message: cause.message, name: cause.name, stack: cause.stack };
                    cause = cause.cause == null ? null : normalizeToError(cause.cause);
                } else {
                    serialisedError = { body: undefined, locator: '', message: buildFallbackMessage(cause), name: 'Error', stack: undefined };
                    cause = null;
                }
        }
        if (!/(?:\.{3}|[.!?])$/.test(serialisedError.message)) serialisedError.message += '.';
        serialisedErrors.push(serialisedError);
    }
    return serialisedErrors;
}

// Unserialises an array of serialised error objects back into an error with a cause chain;
// reconstructs the appropriate error class based on serialized properties;
// chains errors from outermost to root cause using the `cause` option;
// returns `undefined` if the input array is empty
export function unserialiseError(serialisedErrors: SerialisedError[]): Error | undefined {
    if (serialisedErrors.length === 0) return undefined;

    // Build the error chain from root cause (end) to outermost (start)
    let rebuiltError: Error | undefined = undefined;
    for (const serialised of serialisedErrors.toReversed()) {
        let error: Error;
        // Reconstruct the appropriate error class based on available properties
        switch (serialised.name) {
            case 'APIError':
                error = new APIError(serialised.message, serialised.locator, serialised.body, { cause: rebuiltError });
                break;
            case 'ConnectorError':
                error = new ConnectorError(serialised.message, serialised.locator, { cause: rebuiltError });
                break;
            case 'EngineError':
                error = new EngineError(serialised.message, serialised.locator, { cause: rebuiltError });
                break;
            case 'FetchError':
                error = new FetchError(serialised.message, serialised.locator, serialised.body, { cause: rebuiltError });
                break;
            default:
                error = new Error(serialised.message, { cause: rebuiltError });
                error.name = serialised.name;
                break;
        }
        if (serialised.stack !== undefined) error.stack = serialised.stack; // Restore stack trace if available
        rebuiltError = error;
    }
    return rebuiltError;
}

// Helpers ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Builds a fallback message for non-error throwables
function buildFallbackMessage(cause: unknown): string {
    let fallbackMessage: string;
    try {
        fallbackMessage = JSON.stringify(cause);
    } catch {
        if (typeof cause === 'symbol') fallbackMessage = cause.description ?? 'Unknown error';
        else if (typeof cause === 'bigint') fallbackMessage = cause.toString();
        else fallbackMessage = 'Unknown error';
    }
    if (fallbackMessage === '') fallbackMessage = 'Unknown error';
    return fallbackMessage;
}

// Sanitizes a response body; limits body size to avoid excessive payloads when logging
function sanitizeResponseErrorBody(body?: string): string | undefined {
    if (body == null || body === '') return undefined;
    return body.length > RESPONSE_ERROR_BODY_LIMIT ? `${body.slice(0, RESPONSE_ERROR_BODY_LIMIT)}... [truncated]` : body;
}
