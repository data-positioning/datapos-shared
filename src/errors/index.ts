/**
 * Error classes and utilities.
 */

/** Constants */
const FETCH_ERROR_BODY_LIMIT = 2048;

/** Serializable representation of an error and its cause chain.
 * Used for logging, reporting, and transport across process or network boundaries.
 */
interface SerialisedError {
    /** HTTP response body (Fetch errors only). */ body: string | undefined;
    /** Vue component name (Vue errors only). */ componentName: string | undefined;
    /** Vue error info string. */ info: string | undefined;
    /** Logical source of the error. */ locator: string;
    /** Human-readable error message. */ message: string;
    /** Error class or type name. */ name: string;
    /** Stack trace, if available. */ stack: string | undefined;
}

/** Base class for all Data Positioning errors.
 * All errors include a `locator` identifying the logical source of the error (module, feature, or operation).
 */
class DataPosError extends Error {
    readonly locator: string; /** Logical source of the error. */

    constructor(message: string, locator: string, options?: ErrorOptions) {
        super(message, options);
        this.name = new.target.name;
        this.locator = locator;
    }
}

/** Represents application-level failures.
 * Used for errors originating from application logic, not external systems.
 */
class ApplicationError extends DataPosError {}

/** Represents API-related failures.
 * Typically thrown when backend requests fail or return invalid responses.
 */
class APIError extends ApplicationError {}

/** Represents engine or core processing failures. */
class EngineError extends ApplicationError {}

/** Represents failures during HTTP requests.
 * Includes a sanitized snapshot of the response body for diagnostic purposes.
 */
class FetchError extends ApplicationError {
    readonly body: string | undefined; /** Sanitized HTTP response body. */

    constructor(message: string, locator: string, body?: string | null, options?: ErrorOptions) {
        super(message, locator, options);
        this.name = new.target.name;
        this.body = sanitizeFetchErrorBody(body ?? undefined);
    }
}

/** Represents operational failures not caused by application logic. */
class OperationalError extends DataPosError {}

/** Represents Vue errors that have been explicitly handled.
 * Used when capturing Vue error handler output with additional component context.
 */
class VueHandledError extends ApplicationError {
    readonly componentName: string | undefined; /** Vue component name, if available. */
    readonly info: string; /** Vue error info string. */

    constructor(message: string, locator: string, info: string, componentName?: string, options?: ErrorOptions) {
        super(message, locator, options);
        this.name = new.target.name;
        this.info = info;
        this.componentName = componentName;
    }
}

/** Represents handled window runtime errors. */
class WindowHandledRuntimeError extends ApplicationError {}

/** Represents handled window promise rejection errors. */
class WindowHandledPromiseRejectionError extends ApplicationError {}

/** Builds a {@link FetchError} from an HTTP response.
 * The response body is eagerly read so it can be included in error logs even after the response stream is closed.
 */
async function buildFetchError(response: { status: number; statusText: string; text: () => Promise<string> }, message: string, locator: string): Promise<FetchError> {
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
function concatenateSerialisedErrorMessages(serialisedErrors: SerialisedError[]): string {
    return serialisedErrors.map((serialisedError) => serialisedError.message).join(' ');
}

/** Normalizes an unknown thrown value into an {@link Error}.
 * This function should be used at error boundaries to guarantee consistent error handling.
 */
function normalizeToError(value: unknown): Error {
    if (value instanceof Error) return value;
    if (typeof value === 'string') return new Error(value);
    if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') return new Error(String(value));
    if (typeof value === 'symbol') return new Error(value.description ?? 'Unknown error');
    if (value != null && typeof value === 'object') {
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
function serialiseError(error?: unknown): SerialisedError[] {
    const seenCauses = new Set();
    const serialisedErrors: SerialisedError[] = [];
    let cause = error;

    while (cause != null && !seenCauses.has(cause)) {
        seenCauses.add(cause);

        let serialisedError: SerialisedError;
        if (cause instanceof FetchError) {
            serialisedError = { componentName: undefined, body: cause.body, info: undefined, locator: cause.locator, message: cause.message, name: cause.name, stack: cause.stack };
            cause = cause.cause;
        } else if (cause instanceof VueHandledError) {
            serialisedError = {
                componentName: cause.componentName,
                body: undefined,
                info: cause.info,
                locator: cause.locator,
                message: cause.message,
                name: cause.name,
                stack: cause.stack
            };
            cause = cause.cause;
        } else if (cause instanceof DataPosError) {
            serialisedError = { componentName: undefined, body: undefined, info: undefined, locator: cause.locator, message: cause.message, name: cause.name, stack: cause.stack };
            cause = cause.cause;
        } else if (cause instanceof Error) {
            const error = cause;
            serialisedError = { componentName: undefined, body: undefined, info: undefined, locator: '', message: error.message, name: error.name, stack: error.stack };
            cause = error.cause;
        } else {
            serialisedError = { componentName: undefined, body: undefined, info: undefined, locator: '', message: buildFallbackMessage(cause), name: 'Error', stack: undefined };
            cause = undefined;
        }
        if (!/(?:\.{3}|[.!?])$/.test(serialisedError.message)) serialisedError.message += '.';
        serialisedErrors.push(serialisedError);
    }
    return serialisedErrors;
}

/** Builds a fallback message for non-Error throwables. */
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

/** Sanitizes a fetch error response body. Limits body size to avoid excessive log payloads. */
function sanitizeFetchErrorBody(body?: string): string | undefined {
    if (body == null || body === '') return undefined;
    return body.length > FETCH_ERROR_BODY_LIMIT ? `${body.slice(0, FETCH_ERROR_BODY_LIMIT)}... [truncated]` : body;
}

/** Exports */
export type { SerialisedError };
export { ApplicationError, APIError, EngineError, FetchError, OperationalError, VueHandledError, WindowHandledRuntimeError, WindowHandledPromiseRejectionError };
export { buildFetchError, concatenateSerialisedErrorMessages, normalizeToError, serialiseError };
