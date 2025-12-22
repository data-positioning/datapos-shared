/**
 * Error classes and utilities.
 */
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
declare class DataPosError extends Error {
    readonly locator: string; /** Logical source of the error. */
    constructor(message: string, locator: string, options?: ErrorOptions);
}
/** Represents application-level failures.
 * Used for errors originating from application logic, not external systems.
 */
declare class ApplicationError extends DataPosError {
}
/** Represents API-related failures.
 * Typically thrown when backend requests fail or return invalid responses.
 */
declare class APIError extends ApplicationError {
}
/** Represents engine or core processing failures. */
declare class EngineError extends ApplicationError {
}
/** Represents failures during HTTP requests.
 * Includes a sanitized snapshot of the response body for diagnostic purposes.
 */
declare class FetchError extends ApplicationError {
    readonly body: string | undefined; /** Sanitized HTTP response body. */
    constructor(message: string, locator: string, body?: string | null, options?: ErrorOptions);
}
/** Represents operational failures not caused by application logic. */
declare class OperationalError extends DataPosError {
}
/** Represents Vue errors that have been explicitly handled.
 * Used when capturing Vue error handler output with additional component context.
 */
declare class VueHandledError extends ApplicationError {
    readonly componentName: string | undefined; /** Vue component name, if available. */
    readonly info: string; /** Vue error info string. */
    constructor(message: string, locator: string, info: string, componentName?: string, options?: ErrorOptions);
}
/** Represents handled window runtime errors. */
declare class WindowHandledRuntimeError extends ApplicationError {
}
/** Represents handled window promise rejection errors. */
declare class WindowHandledPromiseRejectionError extends ApplicationError {
}
/** Builds a {@link FetchError} from an HTTP response.
 * The response body is eagerly read so it can be included in error logs even after the response stream is closed.
 */
declare function buildFetchError(response: {
    status: number;
    statusText: string;
    text: () => Promise<string>;
}, message: string, locator: string): Promise<FetchError>;
/** Concatenates serialized error messages into a single string. */
declare function concatenateSerialisedErrorMessages(serialisedErrors: SerialisedError[]): string;
/** Normalizes an unknown thrown value into an {@link Error}.
 * This function should be used at error boundaries to guarantee consistent error handling.
 */
declare function normalizeToError(value: unknown): Error;
/** Serializes an error and its cause chain into a flat structure.
 * - Errors are ordered from outermost to root cause.
 * - Cycles in the cause chain are safely ignored.
 * - Messages are normalized to end with punctuation.
 */
declare function serialiseError(error?: unknown): SerialisedError[];
/** Exports */
export type { SerialisedError };
export { ApplicationError, APIError, EngineError, FetchError, OperationalError, VueHandledError, WindowHandledRuntimeError, WindowHandledPromiseRejectionError };
export { buildFetchError, concatenateSerialisedErrorMessages, normalizeToError, serialiseError };
