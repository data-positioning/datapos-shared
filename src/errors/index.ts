/**
 * Error constants, type declarations, classes, runtime utilities and local helpers.
 */

/** Constants */
const FETCH_ERROR_BODY_LIMIT = 2048;

/** Serializable representation of an error and its cause chain.
 * Used for logging, reporting, and transport across process or network boundaries.
 */
interface SerialisedError {
    /** HTTP response body (Fetch errors only). */ body: string | undefined;
    /** Logical source of the error. */ locator: string;
    /** Human-readable error message. */ message: string;
    /** Error class or type name. */ name: string;
    /** Stack trace, if available. */ stack: string | undefined;
}

//#region ----- Error classes. ------------

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

// /** Represents operational failures not caused by application logic. */
// class OperationalError extends DataPosError {}

// /** Represents Vue errors that have been explicitly handled.
//  * Used when capturing Vue error handler output with additional component context.
//  */
// class VueHandledError extends ApplicationError {
//     readonly componentName: string | undefined; /** Vue component name, if available. */
//     readonly info: string; /** Vue error info string. */

//     constructor(message: string, locator: string, info: string, componentName?: string, options?: ErrorOptions) {
//         super(message, locator, options);
//         this.name = new.target.name;
//         this.info = info;
//         this.componentName = componentName;
//     }
// }

// /** Represents handled window runtime errors. */
// class WindowHandledRuntimeError extends ApplicationError {}

// /** Represents handled window promise rejection errors. */
// class WindowHandledPromiseRejectionError extends ApplicationError {}

//#endregion

//#region ----- Error runtime utilities. -----

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

/** Ignore best-effort cleanup errors to keep teardown noise-free. */
function ignoreErrors(action: () => void): void {
    try {
        action();
    } catch {
        /* Intentionally ignore errors. */
    }
}

/** Normalizes an unknown thrown value into an {@link Error}.
 * This function should be used at error boundaries to guarantee consistent error handling.
 */
function normalizeToError(value: unknown): Error {
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
function serialiseError(error?: unknown): SerialisedError[] {
    const seenCauses = new Set();
    const serialisedErrors: SerialisedError[] = [];
    let cause: Error | null = normalizeToError(error);
    while (cause != null && !seenCauses.has(cause)) {
        seenCauses.add(cause);
        let serialisedError: SerialisedError;
        if (cause instanceof FetchError) {
            serialisedError = { body: cause.body, locator: cause.locator, message: cause.message, name: cause.name, stack: cause.stack };
            cause = cause.cause == null ? null : normalizeToError(cause.cause);
        } else if (cause instanceof DataPosError) {
            serialisedError = { body: undefined, locator: cause.locator, message: cause.message, name: cause.name, stack: cause.stack };
            cause = cause.cause == null ? null : normalizeToError(cause.cause);
        } else if (cause instanceof Error) {
            serialisedError = { body: undefined, locator: '', message: cause.message, name: cause.name, stack: cause.stack };
            cause = cause.cause == null ? null : normalizeToError(cause.cause);
        } else {
            serialisedError = { body: undefined, locator: '', message: buildFallbackMessage(cause), name: 'Error', stack: undefined };
            cause = null;
        }
        if (!/(?:\.{3}|[.!?])$/.test(serialisedError.message)) serialisedError.message += '.';
        serialisedErrors.push(serialisedError);
    }
    return serialisedErrors;
}

/** Unserialises an array of {@link SerialisedError} objects back into an error with a cause chain.
 * - Reconstructs the appropriate error class based on serialized properties.
 * - Chains errors from outermost to root cause using the `cause` option.
 * - Returns `undefined` if the input array is empty.
 */
function unserialiseError(serialisedErrors: SerialisedError[]): Error | undefined {
    if (serialisedErrors.length === 0) return undefined;

    // Build the error chain from root cause (end) to outermost (start)
    let pendingError: Error | undefined = undefined;

    console.log(1111, serialisedErrors);
    for (const serialised of serialisedErrors.toReversed()) {
        console.log(2222, serialised);
        let error: Error;

        // Reconstruct the appropriate error class based on available properties
        if (serialised.body !== undefined) {
            // FetchError
            error = new FetchError(serialised.message, serialised.locator, serialised.body, { cause: pendingError });
        } else if (serialised.locator === '') {
            // Generic Error
            error = new Error(serialised.message, { cause: pendingError });
            error.name = serialised.name;
        } else {
            // Determine DataPosError subclass by name
            switch (serialised.name) {
                case 'APIError':
                    error = new APIError(serialised.message, serialised.locator, { cause: pendingError });
                    break;
                case 'EngineError':
                    error = new EngineError(serialised.message, serialised.locator, { cause: pendingError });
                    break;
                // case 'ApplicationError':
                //     error = new ApplicationError(serialised.message, serialised.locator, { pendingError });
                //     break;
                // case 'OperationalError':
                //     error = new OperationalError(serialised.message, serialised.locator, { pendingError });
                //     break;
                // case 'WindowHandledRuntimeError':
                //     error = new WindowHandledRuntimeError(serialised.message, serialised.locator, { pendingError });
                //     break;
                // case 'WindowHandledPromiseRejectionError':
                //     error = new WindowHandledPromiseRejectionError(serialised.message, serialised.locator, { pendingError });
                //     break;
                default:
                    // Fallback to base DataPosError for unknown types with locator
                    error = new DataPosError(serialised.message, serialised.locator, { cause: pendingError });
                    break;
            }
        }

        // Restore stack trace if available
        if (serialised.stack !== undefined) error.stack = serialised.stack;

        pendingError = error;
    }
    console.log(3333, pendingError);

    return pendingError;
}

//#endregion

//#region ----- Error local helpers. -----

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

//#endregion

// Exposures.
export type { SerialisedError };
export { APIError, EngineError, FetchError };
export { buildFetchError, concatenateSerialisedErrorMessages, ignoreErrors, normalizeToError, serialiseError, unserialiseError };
