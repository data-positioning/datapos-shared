/**
 * Error constants, type declarations, classes, runtime utilities and local helpers.
 */
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
    constructor(message: string, locator: string, options?: ErrorOptions);
}
/** Represents failures during HTTP requests.
 * Includes a sanitized snapshot of the response body for diagnostic purposes.
 */
declare class FetchError extends ApplicationError {
    readonly body: string | undefined; /** Sanitized HTTP response body. */
    constructor(message: string, locator: string, body?: string | null, options?: ErrorOptions);
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
/** Ignore best-effort cleanup errors to keep teardown noise-free. */
declare function ignoreErrors(action: () => void): void;
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
/** Unserialises an array of {@link SerialisedError} objects back into an error with a cause chain.
 * - Reconstructs the appropriate error class based on serialized properties.
 * - Chains errors from outermost to root cause using the `cause` option.
 * - Returns `undefined` if the input array is empty.
 */
declare function unserialiseError(serialisedErrors: SerialisedError[]): Error | undefined;
export type { SerialisedError };
export { APIError, EngineError, FetchError };
export { buildFetchError, concatenateSerialisedErrorMessages, ignoreErrors, normalizeToError, serialiseError, unserialiseError };
