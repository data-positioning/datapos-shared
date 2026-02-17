// Constants
const FETCH_ERROR_BODY_LIMIT = 2048;

// Serializable representation of an error, used for transporting errors across worker or network boundaries
export interface SerialisedError {
    body: string | undefined; // HTTP response body (fetch errors only)
    locator: string; // Logical source of the error
    message: string; // Human-readable error message
    name: string; // Error class or type name
    stack: string | undefined; // Stack trace, if available
}

// Errors ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Base class for all DPU errors
export class DPUError extends Error {
    readonly locator: string; // Logical source of the error
    constructor(message: string, locator: string, options?: ErrorOptions) {
        super(message, options);
        this.name = 'DPUError';
        this.locator = locator;
    }
}

// Thrown when an API (backend) request fails
export class APIError extends DPUError {
    readonly body: string | undefined; // Sanitized snapshot of the response body
    constructor(message: string, locator: string, body: string | undefined, options?: ErrorOptions) {
        super(message, locator, options);
        this.name = 'APIError';
        this.body = sanitizeFetchErrorBody(body ?? undefined);
    }
}

// Thrown when an engine operation fails
export class EngineError extends DPUError {
    constructor(message: string, locator: string, options?: ErrorOptions) {
        super(message, locator, options);
        this.name = 'EngineError';
    }
}

// Thrown when an connector operation fails
export class ConnectorError extends DPUError {
    constructor(message: string, locator: string, options?: ErrorOptions) {
        super(message, locator, options);
        this.name = 'ConnectorError';
    }
}

// Thrown when an HTTP request fails, may include a sanitized snapshot of the response body for diagnostic purposes
export class FetchError extends DPUError {
    readonly body: string | undefined; // Sanitized snapshot of the response body
    constructor(message: string, locator: string, body: string | undefined, options?: ErrorOptions) {
        super(message, locator, options);
        this.name = 'FetchError';
        this.body = sanitizeFetchErrorBody(body ?? undefined);
    }
}

// Methods ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** Builds a {@link FetchError} from an HTTP response.
 * The response body is eagerly read so it can be included in error logs even after the response stream is closed.
 */
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

/** Concatenates serialized error messages into a single string. */
export function concatenateSerialisedErrorMessages(serialisedErrors: SerialisedError[]): string {
    return serialisedErrors.map((serialisedError) => serialisedError.message).join(' ');
}

/** Ignore best-effort cleanup errors to keep teardown noise-free. */
export function ignoreErrors(action: () => void): void {
    try {
        action();
    } catch {
        /* Intentionally ignore errors. */
    }
}

/** Normalizes an unknown thrown value into an {@link Error}.
 * This function should be used at error boundaries to guarantee consistent error handling.
 */
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

/** Serializes an error and its cause chain into a flat structure.
 * - Errors are ordered from outermost to root cause.
 * - Cycles in the cause chain are safely ignored.
 * - Messages are normalized to end with punctuation.
 */
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
            case 'DPUError': {
                const typedCause = cause as DPUError;
                serialisedError = { body: undefined, locator: typedCause.locator, message: cause.message, name: 'DPUError', stack: cause.stack };
                cause = cause.cause == null ? null : normalizeToError(cause.cause);
                break;
            }
            case 'Error':
                serialisedError = { body: undefined, locator: '', message: cause.message, name: cause.name, stack: cause.stack };
                cause = cause.cause == null ? null : normalizeToError(cause.cause);
                break;
            default:
                serialisedError = { body: undefined, locator: '', message: buildFallbackMessage(cause), name: 'Error', stack: undefined };
                cause = null;
        }
        if (!/(?:\.{3}|[.!?])$/.test(serialisedError.message)) serialisedError.message += '.';
        serialisedErrors.push(serialisedError);
    }
    console.log(4444, serialisedErrors);
    return serialisedErrors;
}

/** Unserialises an array of {@link SerialisedError} objects back into an error with a cause chain.
 * - Reconstructs the appropriate error class based on serialized properties.
 * - Chains errors from outermost to root cause using the `cause` option.
 * - Returns `undefined` if the input array is empty.
 */
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
            case 'DPUError':
                error = new DPUError(serialised.message, serialised.locator, { cause: rebuiltError });
                break;
            default:
                console.log(5555, serialised);
                error = new Error(serialised.message, { cause: rebuiltError });
                error.name = serialised.name;
                break;
        }
        // Restore stack trace if available
        if (serialised.stack !== undefined) error.stack = serialised.stack;
        rebuiltError = error;
    }
    return rebuiltError;
}

// Helpers ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Builds a fallback message for non-Error throwables
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

// Sanitizes a fetch error response body, limits body size to avoid excessive log payloads
function sanitizeFetchErrorBody(body?: string): string | undefined {
    if (body == null || body === '') return undefined;
    return body.length > FETCH_ERROR_BODY_LIMIT ? `${body.slice(0, FETCH_ERROR_BODY_LIMIT)}... [truncated]` : body;
}
