// Declarations - Serialised Error Data
export interface SerialisedErrorData {
    cause?: SerialisedErrorData;
    context?: string;
    message: string;
    name: string;
    stack?: string;
}

// Declarations - Abort Error
export class AbortError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AbortError';
    }
}

// Declarations - Context Error
export class ContextError extends Error {
    context?: string;

    constructor(message: string, context?: string) {
        super(message);
        this.name = 'ContextError';
        this.context = context;
    }
}

// Declarations - Context Error - Backend
export class BackendContextError extends ContextError {
    constructor(message: string, context?: string, cause?: unknown) {
        super(message, context);
        this.name = 'BackendContextError';
        this.cause = cause;
    }
}

// Declarations -Context Error - Connector
export class ConnectorContextError extends ContextError {
    constructor(message: string, context?: string, cause?: unknown) {
        super(message, context);
        this.name = 'ConnectorContextError';
        this.cause = cause;
    }
}

// Declarations - Context Error - Engine
export class EngineContextError extends ContextError {
    constructor(message: string, context?: string, cause?: unknown) {
        super(message, context);
        this.name = 'EngineContextError';
        this.cause = cause;
    }
}

// Declarations - Context Error - Frontend
export class FrontendContextError extends ContextError {
    constructor(message: string, context?: string, cause?: unknown) {
        super(message, context);
        this.name = 'FrontendContextError';
        this.cause = cause;
    }
}

// Declarations - Core Error
export class CoreError extends Error {
    originalName: string;

    constructor(message: string, originalName: string) {
        super(message);
        this.name = 'CoreError';
        this.originalName = originalName;
    }
}

// Declarations - Fetch Response Error
export class FetchResponseError extends Error {
    bodyText: string;
    status: number;
    statusText: string;

    constructor(status: number, statusText: string, bodyText: string) {
        super('Failed to return fetch response.');
        this.name = 'FetchResponseError';
        this.status = status;
        this.statusText = statusText;
        this.bodyText = bodyText;
    }
}

// Declarations - Worker Error
export class WorkerError extends Error {
    constructor(cause?: unknown) {
        super('Engine error wrapper.');
        this.name = 'WorkerError';
        this.cause = cause;
    }
}
