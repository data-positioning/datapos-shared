export interface SerialisedError {
    body: string | undefined;
    locator: string;
    message: string;
    name: string;
    stack: string | undefined;
}
export declare class DPUError extends Error {
    readonly locator: string;
    constructor(message: string, locator: string, options?: ErrorOptions);
}
export declare class APIError extends DPUError {
    readonly body: string | undefined;
    constructor(message: string, locator: string, body: string | undefined, options?: ErrorOptions);
}
export declare class EngineError extends DPUError {
    constructor(message: string, locator: string, options?: ErrorOptions);
}
export declare class ConnectorError extends DPUError {
    constructor(message: string, locator: string, options?: ErrorOptions);
}
export declare class FetchError extends DPUError {
    readonly body: string | undefined;
    constructor(message: string, locator: string, body: string | undefined, options?: ErrorOptions);
}
/** Builds a {@link FetchError} from an HTTP response.
 * The response body is eagerly read so it can be included in error logs even after the response stream is closed.
 */
export declare function buildFetchError(response: {
    status: number;
    statusText: string;
    text: () => Promise<string>;
}, message: string, locator: string): Promise<FetchError>;
/** Concatenates serialized error messages into a single string. */
export declare function concatenateSerialisedErrorMessages(serialisedErrors: SerialisedError[]): string;
/** Ignore best-effort cleanup errors to keep teardown noise-free. */
export declare function ignoreErrors(action: () => void): void;
/** Normalizes an unknown thrown value into an {@link Error}.
 * This function should be used at error boundaries to guarantee consistent error handling.
 */
export declare function normalizeToError(value: unknown): Error;
/** Serializes an error and its cause chain into a flat structure.
 * - Errors are ordered from outermost to root cause.
 * - Cycles in the cause chain are safely ignored.
 * - Messages are normalized to end with punctuation.
 */
export declare function serialiseError(error?: unknown): SerialisedError[];
/** Unserialises an array of {@link SerialisedError} objects back into an error with a cause chain.
 * - Reconstructs the appropriate error class based on serialized properties.
 * - Chains errors from outermost to root cause using the `cause` option.
 * - Returns `undefined` if the input array is empty.
 */
export declare function unserialiseError(serialisedErrors: SerialisedError[]): Error | undefined;
