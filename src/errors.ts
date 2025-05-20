// Interfaces/Types - Error Context
export interface ErrorContext extends Record<string, unknown> {
    info?: string;
    locator: string;
}

// Interfaces/Types - Error Instance Context
export interface ErrorInstanceContext extends Record<string, unknown> {
    fetchBody?: string;
    locator?: string;
}

// Interfaces/Types - Error Data
export interface ErrorData extends Record<string, unknown> {
    context?: string;
    history: ErrorInstanceData[];
}

// Interfaces/Types - Error Instance Data
export interface ErrorInstanceData extends Record<string, unknown> {
    cause?: unknown;
    context: ErrorInstanceContext;
    message: string;
    name: string;
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
export function formatError(sourceError: unknown, context?: string): ErrorData {
    const history: ErrorInstanceData[] = [];
    let priorError = sourceError;
    while (priorError) {
        let errorInstanceData: ErrorInstanceData;
        if (priorError instanceof Error && ['DataPosError', 'APIError', 'EngineError', 'FetchError', 'OperationalError'].includes(priorError.name)) {
            const dataPosError = priorError as DataPosError;
            errorInstanceData = { message: dataPosError.message, context: dataPosError.context, name: dataPosError.name, stack: dataPosError.stack };
            priorError = dataPosError.cause;
        } else if (priorError instanceof Error) {
            const error = priorError as Error;
            errorInstanceData = { message: error.message, context: {}, name: error.name, stack: error.stack };
            priorError = error.cause;
        } else if (priorError) {
            errorInstanceData = { message: String(priorError), context: {}, name: 'Error' };
            priorError = undefined;
        } else {
            errorInstanceData = { message: 'Unknown error.', context: {}, name: 'Error' };
            priorError = undefined;
        }
        if (!errorInstanceData.message.endsWith('.')) errorInstanceData.message = `${errorInstanceData.message}.`;
        history.push(errorInstanceData);
    }
    return { context, history };
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
