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
export declare class AppError extends DPUError {
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
export declare function buildFetchError(response: {
    status: number;
    statusText: string;
    text: () => Promise<string>;
}, message: string, locator: string): Promise<FetchError>;
export declare function concatenateSerialisedErrorMessages(serialisedErrors: SerialisedError[]): string;
export declare function ignoreErrors(action: () => void): void;
export declare function normalizeToError(value: unknown): Error;
export declare function serialiseError(error?: unknown): SerialisedError[];
export declare function unserialiseError(serialisedErrors: SerialisedError[]): Error | undefined;
