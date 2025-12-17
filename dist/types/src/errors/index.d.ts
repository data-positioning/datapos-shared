/** Interfaces/Types - Serialised error data. */
export interface SerialisedError {
    body?: string;
    componentName?: string;
    info?: string;
    locator: string;
    message: string;
    name: string;
    stack?: string;
}
/** Classes - Base Data Positioning error. */
declare class DataPosError extends Error {
    locator: string;
    constructor(message: string, locator: string, options?: ErrorOptions);
}
/** Classes - Base application error. */
export declare class ApplicationError extends DataPosError {
    constructor(message: string, locator: string, options?: ErrorOptions);
}
/** Classes - Application Error - API error. */
export declare class APIError extends ApplicationError {
    constructor(message: string, locator: string, options?: ErrorOptions);
}
/** Classes - Application Error - Engine Error */
export declare class EngineError extends ApplicationError {
    constructor(message: string, locator: string, options?: ErrorOptions);
}
/** Classes - Application Error - Fetch error. */
export declare class FetchError extends ApplicationError {
    body: string;
    constructor(message: string, locator: string, body: string, options?: ErrorOptions);
}
/** Classes - Application Error - Vue error. */
export declare class VueError extends ApplicationError {
    componentName?: string;
    info: string;
    constructor(message: string, locator: string, info: string, componentName?: string, options?: ErrorOptions);
}
/** Classes - Application Error - Window runtime error. */
export declare class WindowRuntimeError extends ApplicationError {
    constructor(message: string, locator: string, options?: ErrorOptions);
}
/** Classes - Application Error - Window promise rejection error. */
export declare class WindowPromiseRejectionError extends ApplicationError {
    constructor(message: string, locator: string, options?: ErrorOptions);
}
/** Classes - Operational error. */
export declare class OperationalError extends DataPosError {
    constructor(message: string, locator: string, options?: ErrorOptions);
}
/** Utilities - Build fetch error. */
export declare function buildFetchError(response: {
    status: number;
    statusText: string;
    text: () => Promise<string>;
}, message: string, locator: string): Promise<FetchError>;
/** Utilities - Concatenate serialised error messages. */
export declare function concatenateSerialisedErrorMessages(serialisedErrors: SerialisedError[]): string;
/** Utilities - Normalise to error. */
export declare function normalizeToError(value: unknown): Error;
/** Utilities - Serialise error. */
export declare function serialiseError(error?: unknown): SerialisedError[];
export {};
