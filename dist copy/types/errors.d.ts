export interface SerialisedErrorData {
    cause?: SerialisedErrorData;
    context?: string;
    message: string;
    name: string;
    stack?: string;
}
export declare class AbortError extends Error {
    constructor(message: string);
}
export declare class ContextError extends Error {
    context?: string;
    constructor(message: string, context?: string);
}
export declare class BackendContextError extends ContextError {
    constructor(message: string, context?: string, cause?: unknown);
}
export declare class ConnectorContextError extends ContextError {
    constructor(message: string, context?: string, cause?: unknown);
}
export declare class EngineContextError extends ContextError {
    constructor(message: string, context?: string, cause?: unknown);
}
export declare class FrontendContextError extends ContextError {
    constructor(message: string, context?: string, cause?: unknown);
}
export declare class CoreError extends Error {
    originalName: string;
    constructor(message: string, originalName: string);
}
export declare class FetchResponseError extends Error {
    bodyText: string;
    status: number;
    statusText: string;
    constructor(status: number, statusText: string, bodyText: string);
}
export declare class WorkerError extends Error {
    constructor(cause?: unknown);
}
