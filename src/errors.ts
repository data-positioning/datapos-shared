// Interfaces/Types - Error Context
export interface ErrorContext extends Record<string, unknown> {
    fetchBody?: string;
    info?: string;
    locator?: string;
}

// Interfaces/Types - Error Data
export interface ErrorData extends Record<string, unknown> {
    cause?: unknown;
    context: ErrorContext;
    error: Error;
    message: string;
    stack?: string;
}

// Interfaces/Types - Serialised Error Data
export interface SerialisedErrorData {
    cause?: SerialisedErrorData;
    context?: string;
    message: string;
    name: string;
    notes?: string;
}

// Constants
const errorConstructors: Record<string, ErrorConstructor> = { Error, TypeError, ReferenceError, SyntaxError, RangeError, EvalError, URIError };

// Classes - DataPos Error
export class DataPosError extends Error {
    context: ErrorContext;
    constructor(message: string, context: ErrorContext, cause?: unknown) {
        super(message);
        this.name = 'DataPosError';
        this.context = context;
        this.cause = cause;
    }
}

// Classes - API Error
export class APIError extends DataPosError {
    constructor(message: string, context: ErrorContext, cause?: unknown) {
        super(message, context, cause);
        this.name = 'APIError';
    }
}

// Classes - Engine Error
export class EngineError extends DataPosError {
    constructor(message: string, context: ErrorContext, cause?: unknown) {
        super(message, context, cause);
        this.name = 'EngineError';
    }
}

// Classes - Fetch Error
export class FetchError extends DataPosError {
    constructor(message: string, context: ErrorContext, cause?: unknown) {
        super(message, context, cause);
        this.name = 'FetchError';
    }
}

// Classes - Operational Error
export class OperationalError extends DataPosError {
    constructor(message: string, context: ErrorContext, cause?: unknown) {
        super(message, context, cause);
        this.name = 'OperationalError';
    }
}

// Operations - Build Fetch Error
export async function buildFetchError(response: { status: number; statusText: string; text: () => Promise<string> }, message: string, locator: string) {
    const fetchMessage = `${message} Response status '${response.status}${response.statusText ? ` - ${response.statusText}` : ''}' received.`;
    return new FetchError(fetchMessage, { fetchBody: await response.text(), locator });
}

// Operations - Format Error
export function formatError(sourceError: unknown, context: ErrorContext): ErrorData {
    let errorData: ErrorData;
    if (sourceError instanceof Error) {
        errorData = { error: sourceError, message: sourceError.message, context, stack: sourceError.stack, cause: sourceError.cause };
    } else if (sourceError) {
        const error = new Error(String(sourceError));
        errorData = { error, message: error.message, context };
    } else {
        const error = new Error('Unknown error');
        errorData = { error, message: error.message, context };
    }
    if (!errorData.message.endsWith('.')) errorData.message = `${errorData.message}.`;
    return errorData;
}

// Operations - Serialise Error
export function serialiseError(error: unknown): SerialisedErrorData {
    if (error instanceof Error && ['DataPosError', 'APIError', 'EngineError', 'FetchError', 'OperationalError'].includes(error.name)) {
        const dataPosError = error as DataPosError;
        return {
            name: dataPosError.name,
            message: dataPosError.message,
            context: JSON.stringify(dataPosError.context),
            cause: dataPosError.cause ? serialiseError(dataPosError.cause) : undefined
        };
    } else if (error instanceof Error) {
        return {
            name: error.name,
            message: error.message,
            cause: error.cause ? serialiseError(error.cause) : undefined
        };
    } else {
        return { name: 'Error', message: String(error || 'Unknown error.') };
    }
}

// Operations - Deserialise Error
export function deserialiseError(errorData: SerialisedErrorData): Error {
    switch (errorData.name) {
        case 'APIError':
            return new APIError(errorData.message, errorData.context ? JSON.parse(errorData.context) : undefined, errorData.cause ? deserialiseError(errorData.cause) : undefined);
        case 'DataPosError':
            return new DataPosError(
                errorData.message,
                errorData.context ? JSON.parse(errorData.context) : undefined,
                errorData.cause ? deserialiseError(errorData.cause) : undefined
            );
        case 'EngineError':
            return new EngineError(
                errorData.message,
                errorData.context ? JSON.parse(errorData.context) : undefined,
                errorData.cause ? deserialiseError(errorData.cause) : undefined
            );
        case 'FetchError':
            return new FetchError(
                errorData.message,
                errorData.context ? JSON.parse(errorData.context) : undefined,
                errorData.cause ? deserialiseError(errorData.cause) : undefined
            );
        case 'OperationalError':
            return new OperationalError(
                errorData.message,
                errorData.context ? JSON.parse(errorData.context) : undefined,
                errorData.cause ? deserialiseError(errorData.cause) : undefined
            );
        default:
            const ErrorConstructor = errorConstructors[errorData.name] || Error;
            return new ErrorConstructor(errorData.message, { cause: errorData.cause ? deserialiseError(errorData.cause) : undefined });
    }
}
