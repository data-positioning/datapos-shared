// Interfaces/Types - Serialised Error Data
export interface SerialisedErrorData {
    cause?: SerialisedErrorData;
    context?: string;
    data?: string;
    message: string;
    name?: string;
    notes?: string;
    originalStack?: string;
}

// Classes - Data Positioning Error
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

// Classes - Abort Error
export class AbortError extends DataPosError {
    constructor(message: string, context?: string, originalStack?: string, data?: Record<string, unknown>, cause?: unknown) {
        super(message, context, originalStack, data, cause);
        this.name = 'AbortError';
    }
}

// Classes - Backend Error
export class BackendError extends DataPosError {
    constructor(message: string, context?: string, originalStack?: string, data?: Record<string, unknown>, cause?: unknown) {
        super(message, context, originalStack, data, cause);
        this.name = 'BackendError';
    }
}

// Classes - Connector Error
export class ConnectorError extends DataPosError {
    constructor(message: string, context?: string, originalStack?: string, data?: Record<string, unknown>, cause?: unknown) {
        super(message, context, originalStack, data, cause);
        this.name = 'ConnectorError';
    }
}

// Classes - Engine Error
export class EngineError extends DataPosError {
    constructor(message: string, context?: string, originalStack?: string, data?: Record<string, unknown>, cause?: unknown) {
        super(message, context, originalStack, data, cause);
        this.name = 'EngineError';
    }
}

// Classes - Fetch Error
export class FetchError extends DataPosError {
    constructor(message: string, context?: string, originalStack?: string, data?: Record<string, unknown>, cause?: unknown) {
        super(message, context, originalStack, data, cause);
        this.name = 'FetchError';
    }
}

// Classes - Frontend Error
export class FrontendError extends DataPosError {
    constructor(message: string, context?: string, originalStack?: string, data?: Record<string, unknown>, cause?: unknown) {
        super(message, context, originalStack, data, cause);
        this.name = 'FrontendError';
    }
}

// Facilitators - Build Fetch Error
export const buildFetchError = async (response: Response, message: string, context: string) => {
    const fetchMessage = `${message} Response status '${response.status}${response.statusText ? ` - ${response.statusText}` : ''}' received.`; // TODO: Quote response status in other implementations.
    return new FetchError(fetchMessage, context, undefined, { body: await response.text() });
};

// Facilitators - Deserialise Error
export const deserialiseError = (errorData: SerialisedErrorData): Error => {
    switch (errorData.name) {
        case 'ConnectorError':
            return new ConnectorError(
                errorData.message,
                errorData.context,
                errorData.originalStack,
                errorData.data ? JSON.parse(errorData.data) : undefined,
                errorData.cause ? deserialiseError(errorData.cause) : undefined
            );
        case 'DataPosError':
            return new DataPosError(
                errorData.message,
                errorData.context,
                errorData.originalStack,
                errorData.data ? JSON.parse(errorData.data) : undefined,
                errorData.cause ? deserialiseError(errorData.cause) : undefined
            );
        case 'EngineError':
            return new EngineError(
                errorData.message,
                errorData.context,
                errorData.originalStack,
                errorData.data ? JSON.parse(errorData.data) : undefined,
                errorData.cause ? deserialiseError(errorData.cause) : undefined
            );
        case 'FetchError':
            return new FetchError(
                errorData.message,
                errorData.context,
                errorData.originalStack,
                errorData.data ? JSON.parse(errorData.data) : undefined,
                errorData.cause ? deserialiseError(errorData.cause) : undefined
            );
        default:
            return new Error(errorData.message);
    }
};

// Facilitators - Serialise Error
export const serialiseError = (error: unknown): SerialisedErrorData => {
    if (
        error instanceof DataPosError ||
        (error instanceof Error && (error.name === 'AbortError' || error.name === 'BackendError' || error.name === 'ConnectorError' || error.name === 'FetchError'))
    ) {
        const dataPosError = error as DataPosError;
        return {
            name: dataPosError.name,
            message: dataPosError.message,
            context: dataPosError.context,
            originalStack: dataPosError.stack,
            data: dataPosError.data ? JSON.stringify(dataPosError.data) : undefined,
            cause: dataPosError.cause ? serialiseError(dataPosError.cause) : undefined
        };
    } else if (error instanceof Error) {
        return {
            name: error.name,
            message: error.message,
            originalStack: error.stack,
            cause: error.cause ? serialiseError(error.cause) : undefined
        };
    } else {
        return { message: String(error || 'Unknown error.') };
    }
};
