export interface SerialisedErrorData {
    cause?: SerialisedErrorData;
    context?: string;
    message: string;
    name?: string;
    stack?: string;
}

// Errors - Abort
export class AbortError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AbortError';
    }
}

// Errors - Backend
export class BackendError extends Error {
    context?: string;
    notes?: string;
    constructor(message: string, context?: string, cause?: unknown, notes?: string) {
        super(message);
        this.name = 'BackendError';
        this.context = context;
        this.cause = cause;
        this.notes = notes;
    }
}

// // Errors - Connector
// export class ConnectorError extends Error {
//     notes?: string;
//     constructor(message: string, cause?: unknown, notes?: string) {
//         super(message);
//         this.name = 'ConnectorError';
//         this.cause = cause;
//         this.notes = notes;
//     }
// }

// Errors - Engine
export class EngineError extends Error {
    notes?: string;
    constructor(message: string, cause?: unknown, notes?: string) {
        super(message);
        this.name = 'EngineError';
        this.cause = cause;
        this.notes = notes;
    }
}

// // Errors - Engine Core
// export class EngineCoreError extends Error {
//     notes?: string;
//     originalName: string;
//     constructor(message: string, originalName: string, notes?: string) {
//         super(message);
//         this.name = 'EngineCoreError';
//         this.originalName = originalName;
//         this.notes = notes;
//     }
// }

// Errors - Engine Worker
export class EngineWorkerError extends Error {
    notes?: string;
    constructor(cause?: unknown, notes?: string) {
        super('Engine worker error wrapper.');
        this.name = 'EngineWorkerError';
        this.cause = cause;
        this.notes = notes;
    }
}

// Errors - Fetch
export class FetchError extends Error {
    notes?: string;
    constructor(message: string, cause?: unknown, notes?: string) {
        super(message);
        this.name = 'FetchError';
        this.cause = cause;
        this.notes = notes;
    }
}

// // Errors - Frontend
// export class FrontendError extends Error {
//     context?: string;
//     constructor(message: string, context?: string, cause?: unknown) {
//         super(message);
//         this.name = 'FrontendError';
//         this.context = context;
//         this.cause = cause;
//     }
// }

export class DataPosError extends Error {
    context?: string;
    data?: Record<string, unknown>;
    notes?: string;
    constructor(message: string, context: string, notes?: string, data?: Record<string, unknown>, cause?: unknown) {
        super(message);
        this.name = 'DataPosError';
        this.context = context;
        this.notes = notes;
        this.data = data;
        this.cause = cause;
    }
}

export class ConnectorError extends DataPosError {
    constructor(message: string, context: string, notes?: string, data?: Record<string, unknown>, cause?: unknown) {
        super(message, context, notes, data, cause);
        this.name = 'ConnectorError';
    }
}

export class FrontendError extends DataPosError {
    constructor(message: string, context: string, notes?: string, data?: Record<string, unknown>, cause?: unknown) {
        super(message, context, notes, data, cause);
        this.name = 'FrontendError';
    }
}
