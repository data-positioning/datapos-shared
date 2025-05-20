// Interfaces/Types - Error Data
export interface ErrorData extends Record<string, unknown> {
    context: ErrorContext;
    history: ErrorInstanceData[];
}

// Interfaces/Types - Error Context
export interface ErrorContext extends Record<string, unknown> {
    info?: string;
    locator: string;
}

// Interfaces/Types - Error Instance Data
export interface ErrorInstanceData extends Record<string, unknown> {
    cause?: unknown;
    context: ErrorInstanceContext;
    message: string;
    name: string;
    stack?: string;
}

// Interfaces/Types - Error Instance Context
export interface ErrorInstanceContext extends Record<string, unknown> {
    fetchBody?: string;
    locator?: string;
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
export function formatError(error: unknown, context: ErrorContext): ErrorData {
    const history: ErrorInstanceData[] = [];
    let causeError = error;
    while (causeError) {
        let errorInstanceData: ErrorInstanceData;
        if (causeError instanceof Error && ['DataPosError', 'APIError', 'EngineError', 'FetchError', 'OperationalError'].includes(causeError.name)) {
            const dataPosError = causeError as DataPosError;
            errorInstanceData = { message: dataPosError.message, context: dataPosError.context, name: dataPosError.name, stack: dataPosError.stack };
            causeError = dataPosError.cause;
        } else if (causeError instanceof Error) {
            const error = causeError as Error;
            errorInstanceData = { message: error.message, context, name: error.name, stack: error.stack };
            causeError = error.cause;
        } else if (causeError) {
            errorInstanceData = { message: String(causeError), context, name: 'Error' };
            causeError = undefined;
        } else {
            errorInstanceData = { message: 'Unknown error.', context, name: 'Error' };
            causeError = undefined;
        }
        if (!errorInstanceData.message.endsWith('.')) errorInstanceData.message = `${errorInstanceData.message}.`;
        history.unshift(errorInstanceData);
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
