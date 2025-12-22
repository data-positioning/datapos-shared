/**
 * Error classes and utilities.
 *
 * @category Errors
 */

/** Constants */
const FETCH_ERROR_BODY_LIMIT = 2048;

/**
 * Serializable representation of an error and its cause chain.
 *
 * @category Types
 * @remarks
 * Used for logging, reporting, and transport across process
 * or network boundaries.
 */
interface SerialisedError {
    /** Logical source of the error. */
    locator: string;

    /** Human-readable error message. */
    message: string;

    /** Error class or type name. */
    name: string;

    /** Stack trace, if available. */
    stack?: string;

    /** HTTP response body (fetch errors only). */
    body?: string;

    /** Vue component name (Vue handled errors only). */
    componentName?: string;

    /** Vue error info string (Vue handled errors only). */
    info?: string;
}

/**
 * Base class for all Data Positioning errors.
 *
 * @category Errors
 * @remarks
 * All errors include a `locator` identifying the logical
 * source of the error (module, feature, or operation).
 */
class DataPosError extends Error {
    /** Logical source of the error. */
    readonly locator: string;

    constructor(message: string, locator: string, options?: ErrorOptions) {
        super(message, options);
        this.name = new.target.name;
        this.locator = locator;
    }
}

/**
 * Represents application-level failures.
 *
 * @category Errors
 * @remarks
 * Used for errors originating from application logic,
 * not external systems.
 */
class ApplicationError extends DataPosError {}

/**
 * Represents API-related failures.
 *
 * @category Errors
 * @remarks
 * Typically thrown when backend requests fail or return
 * invalid responses.
 */
class APIError extends ApplicationError {}

/**
 * Represents engine or core processing failures.
 *
 * @category Errors
 */
class EngineError extends ApplicationError {}

/**
 * Represents failures during HTTP requests.
 *
 * @category Errors
 * @remarks
 * Includes a sanitized snapshot of the response body
 * for diagnostic purposes.
 */
class FetchError extends ApplicationError {
    /** Sanitized HTTP response body. */
    readonly body?: string;

    constructor(message: string, locator: string, body?: string | null, options?: ErrorOptions) {
        super(message, locator, options);
        this.name = new.target.name;
        this.body = sanitizeFetchErrorBody(body ?? undefined);
    }
}

/**
 * Represents operational failures not caused by application logic.
 *
 * @category Errors
 */
class OperationalError extends DataPosError {}

/**
 * Represents Vue errors that have been explicitly handled.
 *
 * @category Errors
 * @remarks
 * Used when capturing Vue error handler output with
 * additional component context.
 */
class VueHandledError extends ApplicationError {
    /** Vue component name, if available. */
    readonly componentName?: string;

    /** Vue error info string. */
    readonly info: string;

    constructor(message: string, locator: string, info: string, componentName?: string, options?: ErrorOptions) {
        super(message, locator, options);
        this.name = new.target.name;
        this.info = info;
        this.componentName = componentName;
    }
}

/**
 * Represents handled window runtime errors.
 *
 * @category Errors
 */
class WindowHandledRuntimeError extends ApplicationError {}

/**
 * Represents handled window promise rejection errors.
 *
 * @category Errors
 */
class WindowHandledPromiseRejectionError extends ApplicationError {}

/**
 * Builds a {@link FetchError} from an HTTP response.
 *
 * @category Utilities
 * @param response - HTTP response returned by a fetch call.
 * @param message - High-level description of the failure.
 * @param locator - Logical source of the error.
 * @returns A populated {@link FetchError} instance.
 *
 * @remarks
 * The response body is eagerly read so it can be included
 * in error logs even after the response stream is closed.
 */
async function buildFetchError(
    response: {
        status: number;
        statusText: string;
        text: () => Promise<string>;
    },
    message: string,
    locator: string
): Promise<FetchError> {
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

/**
 * Concatenates serialized error messages into a single string.
 *
 * @category Utilities
 * @param serialisedErrors - Errors to concatenate.
 * @returns Space-separated error message string.
 */
function concatenateSerialisedErrorMessages(serialisedErrors: SerialisedError[]): string {
    return serialisedErrors.map((serialisedError) => serialisedError.message).join(' ');
}

/**
 * Normalizes an unknown thrown value into an {@link Error}.
 *
 * @category Utilities
 * @param value - Any value caught in a `catch` block.
 * @returns A guaranteed {@link Error} instance.
 *
 * @remarks
 * This function should be used at error boundaries to
 * guarantee consistent error handling.
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

/**
 * Serializes an error and its cause chain into a flat structure.
 *
 * @category Utilities
 * @param error - Error or arbitrary thrown value.
 * @returns Ordered list of serialized errors.
 *
 * @remarks
 * - Errors are ordered from outermost to root cause.
 * - Cycles in the cause chain are safely ignored.
 * - Messages are normalized to end with punctuation.
 */
function serialiseError(error?: unknown): SerialisedError[] {
    const seenCauses = new Set<unknown>();
    const serialisedErrors: SerialisedError[] = [];
    let cause = error;

    while (cause != null && !seenCauses.has(cause)) {
        seenCauses.add(cause);

        let serialisedError: SerialisedError;

        if (cause instanceof FetchError) {
            serialisedError = { body: cause.body, locator: cause.locator, message: cause.message, name: cause.name, stack: cause.stack };
            cause = cause.cause;
        } else if (cause instanceof VueHandledError) {
            serialisedError = { componentName: cause.componentName, info: cause.info, locator: cause.locator, message: cause.message, name: cause.name, stack: cause.stack };
            cause = cause.cause;
        } else if (cause instanceof DataPosError) {
            serialisedError = { locator: cause.locator, message: cause.message, name: cause.name, stack: cause.stack };
            cause = cause.cause;
        } else if (cause instanceof Error) {
            serialisedError = { locator: '', message: cause.message, name: cause.name, stack: cause.stack };
            cause = cause.cause;
        } else {
            serialisedError = { locator: '', message: buildFallbackMessage(cause), name: 'Error' };
            cause = undefined;
        }

        if (!/(?:\.{3}|[.!?])$/.test(serialisedError.message)) {
            serialisedError.message += '.';
        }

        serialisedErrors.push(serialisedError);
    }

    return serialisedErrors;
}

/**
 * Builds a fallback message for non-Error throwables.
 *
 * @category Utilities
 */
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

/**
 * Sanitizes a fetch error response body.
 *
 * @category Utilities
 * @remarks
 * Limits body size to avoid excessive log payloads.
 */
function sanitizeFetchErrorBody(body?: string): string | undefined {
    if (body == null || body === '') return undefined;
    return body.length > FETCH_ERROR_BODY_LIMIT ? `${body.slice(0, FETCH_ERROR_BODY_LIMIT)}... [truncated]` : body;
}

/** Exposures */
export type { SerialisedError };
export { ApplicationError, APIError, EngineError, FetchError, OperationalError, VueHandledError, WindowHandledRuntimeError, WindowHandledPromiseRejectionError };
export { buildFetchError, concatenateSerialisedErrorMessages, normalizeToError, serialiseError };
