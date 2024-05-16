export class DataPosError extends Error {
    context?: string;
    data?: Record<string, unknown>;
    notes?: string;
    originalStack?: string;
    constructor(message: string, context?: string, originalStack?: string, data?: Record<string, unknown>, notes?: string, cause?: unknown) {
        super(message);
        this.name = 'DataPosError';
        this.context = context;
        this.originalStack = originalStack;
        this.data = data;
        this.notes = notes;
        this.cause = cause;
    }
}

export class AbortError extends DataPosError {
    constructor(message: string, context?: string, originalStack?: string, data?: Record<string, unknown>, notes?: string, cause?: unknown) {
        super(message, context, originalStack, data, notes, cause);
        this.name = 'AbortError';
    }
}

export class BackendError extends DataPosError {
    constructor(message: string, context?: string, originalStack?: string, data?: Record<string, unknown>, notes?: string, cause?: unknown) {
        super(message, context, originalStack, data, notes, cause);
        this.name = 'BackendError';
    }
}

export class ConnectorError extends DataPosError {
    constructor(message: string, context?: string, originalStack?: string, data?: Record<string, unknown>, notes?: string, cause?: unknown) {
        super(message, context, originalStack, data, notes, cause);
        this.name = 'ConnectorError';
    }
}

export class EngineError extends DataPosError {
    constructor(message: string, context?: string, originalStack?: string, data?: Record<string, unknown>, notes?: string, cause?: unknown) {
        super(message, context, originalStack, data, notes, cause);
        this.name = 'EngineError';
    }
}

export class EngineWorkerError extends DataPosError {
    constructor(message: string, context?: string, originalStack?: string, data?: Record<string, unknown>, notes?: string, cause?: unknown) {
        super(message, context, originalStack, data, notes, cause);
        this.name = 'EngineWorkerError';
    }
}

export class FetchError extends DataPosError {
    constructor(message: string, context?: string, originalStack?: string, data?: Record<string, unknown>, notes?: string, cause?: unknown) {
        super(message, context, originalStack, data, notes, cause);
        this.name = 'FetchError';
    }
}

export class FrontendError extends DataPosError {
    constructor(message: string, context?: string, originalStack?: string, data?: Record<string, unknown>, notes?: string, cause?: unknown) {
        super(message, context, originalStack, data, notes, cause);
        this.name = 'FrontendError';
    }
}
