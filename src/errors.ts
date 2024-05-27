// Errors - Data Positioning Error
export class DataPosError extends Error {
    context?: string;
    data?: Record<string, unknown>;
    originalStack?: string;
    constructor(message: string, context?: string, originalStack?: string, data?: Record<string, unknown>, cause?: unknown) {
        super(message);
        this.name = 'DataPosError';
        this.context = context;
        this.originalStack = originalStack;
        this.data = data;
        this.cause = cause;
    }
}

// Errors - Abort Error
export class AbortError extends DataPosError {
    constructor(message: string, context?: string, originalStack?: string, data?: Record<string, unknown>, cause?: unknown) {
        super(message, context, originalStack, data, cause);
        this.name = 'AbortError';
    }
}

// Errors - Backend Error
export class BackendError extends DataPosError {
    constructor(message: string, context?: string, originalStack?: string, data?: Record<string, unknown>, cause?: unknown) {
        super(message, context, originalStack, data, cause);
        this.name = 'BackendError';
    }
}

// Errors - Connector Error
export class ConnectorError extends DataPosError {
    constructor(message: string, context?: string, originalStack?: string, data?: Record<string, unknown>, cause?: unknown) {
        super(message, context, originalStack, data, cause);
        this.name = 'ConnectorError';
    }
}

// Errors - Engine Error
export class EngineError extends DataPosError {
    constructor(message: string, context?: string, originalStack?: string, data?: Record<string, unknown>, cause?: unknown) {
        super(message, context, originalStack, data, cause);
        this.name = 'EngineError';
    }
}

// Errors - Fetch Error
export class FetchError extends DataPosError {
    constructor(message: string, context?: string, originalStack?: string, data?: Record<string, unknown>, cause?: unknown) {
        super(message, context, originalStack, data, cause);
        this.name = 'FetchError';
    }
}

// Errors - Frontend Error
export class FrontendError extends DataPosError {
    constructor(message: string, context?: string, originalStack?: string, data?: Record<string, unknown>, cause?: unknown) {
        super(message, context, originalStack, data, cause);
        this.name = 'FrontendError';
    }
}
