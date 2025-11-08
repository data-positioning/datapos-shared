export interface SerialisedError {
    body?: string;
    componentName?: string;
    info?: string;
    locator: string;
    message: string;
    name: string;
    stack?: string;
}
declare class DataPosError extends Error {
    locator: string;
    constructor(message: string, locator: string, options?: ErrorOptions);
}
export declare class ApplicationError extends DataPosError {
    constructor(message: string, locator: string, options?: ErrorOptions);
}
export declare class APIError extends ApplicationError {
    constructor(message: string, locator: string, options?: ErrorOptions);
}
export declare class EngineError extends ApplicationError {
    constructor(message: string, locator: string, options?: ErrorOptions);
}
export declare class FetchError extends ApplicationError {
    body: string;
    constructor(message: string, locator: string, body: string, options?: ErrorOptions);
}
export declare class VueError extends ApplicationError {
    componentName?: string;
    info: string;
    constructor(message: string, locator: string, info: string, componentName?: string, options?: ErrorOptions);
}
export declare class WindowRuntimeError extends ApplicationError {
    constructor(message: string, locator: string, options?: ErrorOptions);
}
export declare class WindowPromiseRejectionError extends ApplicationError {
    constructor(message: string, locator: string, options?: ErrorOptions);
}
export declare class OperationalError extends DataPosError {
    constructor(message: string, locator: string, options?: ErrorOptions);
}
export declare function buildFetchError(response: {
    status: number;
    statusText: string;
    text: () => Promise<string>;
}, message: string, locator: string): Promise<FetchError>;
export declare function concatenateSerialisedErrorMessages(serialisedErrors: SerialisedError[]): string;
export declare function normalizeToError(value: unknown, fallbackMessage?: string): Error;
export declare function serialiseError(error?: unknown): SerialisedError[];
export {};
