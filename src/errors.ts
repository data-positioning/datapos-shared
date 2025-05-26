// Interfaces/Types - Error Data
export interface ErrorData extends Record<string, unknown> {
    context?: ErrorContext;
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
    context?: ErrorInstanceContext;
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

// Classes - DataPos Error - Base error class for all DataPos errors.
class DataPosError extends Error {
    context?: ErrorInstanceContext;
    constructor(message: string, context?: ErrorInstanceContext, cause?: unknown) {
        super(message, { cause });
        this.name = 'DataPosError';
        this.context = context;
        Error.captureStackTrace?.(this, DataPosError); // Removes this constructor from the stack trace, so stack traces start at the actual point of error creation.
    }
}

// Classes - API Error
export class APIError extends DataPosError {
    constructor(message: string, context?: ErrorInstanceContext, cause?: unknown) {
        super(message, context, cause);
        this.name = 'APIError';
    }
}

// Classes - Engine Error
export class EngineError extends DataPosError {
    constructor(message: string, context?: ErrorInstanceContext, cause?: unknown) {
        super(message, context, cause);
        this.name = 'EngineError';
    }
}

// Classes - Fetch Error
export class FetchError extends DataPosError {
    constructor(message: string, context?: ErrorInstanceContext, cause?: unknown) {
        super(message, context, cause);
        this.name = 'FetchError';
    }
}

// Classes - Operational Error
export class OperationalError extends DataPosError {
    constructor(message: string, context?: ErrorInstanceContext, cause?: unknown) {
        super(message, context, cause);
        this.name = 'OperationalError';
    }
}

// Operations - Build Fetch Error
export async function buildFetchError(response: { status: number; statusText: string; text: () => Promise<string> }, message: string, locator: string) {
    const fetchMessage = `${message} Response status '${response.status}${response.statusText ? ` - ${response.statusText}` : ''}' received.`;
    return new FetchError(fetchMessage, { fetchBody: await response.text(), locator });
}

// Operations - Serialise Error
export function serialiseError(error: unknown, context?: ErrorContext): ErrorData {
    const history: ErrorInstanceData[] = [];
    let causeError = error;
    while (causeError) {
        let errorInstanceData: ErrorInstanceData;
        // if (causeError instanceof Error && ['DataPosError', 'APIError', 'EngineError', 'FetchError', 'OperationalError'].includes(causeError.name)) {
        if (causeError instanceof DataPosError) {
            errorInstanceData = { message: causeError.message, context: causeError.context, name: causeError.name, stack: causeError.stack };
            causeError = causeError.cause;
        } else if (causeError instanceof Error) {
            const error = causeError as Error;
            errorInstanceData = { message: error.message, name: error.name, stack: error.stack };
            causeError = error.cause;
        } else if (causeError) {
            errorInstanceData = { message: String(causeError), name: 'Error' };
            causeError = undefined;
        } else {
            errorInstanceData = { message: 'Unknown error.', name: 'Error' };
            causeError = undefined;
        }
        if (!errorInstanceData.message.endsWith('.')) errorInstanceData.message = `${errorInstanceData.message}.`;
        history.unshift(errorInstanceData);
    }
    return { context, history };
}

// Operations - Deserialise Error
export function deserialiseError(errorData: ErrorData): Error {
    const errorCount = errorData.history.length;
    let current = deserialiseErrorInstance(errorData.history[0]);
    for (let errorIndex = 1; errorIndex < errorCount; errorIndex++) {
        const newErrorData = errorData.history[errorIndex];
        const wrapped = deserialiseErrorInstance(newErrorData, current);
        current = wrapped;
    }
    return current;
}

// Operations - Deserialise Error Instance
function deserialiseErrorInstance(errorData: ErrorInstanceData, cause?: unknown): Error {
    let error: Error;
    switch (errorData.name) {
        case 'APIError':
            error = new APIError(errorData.message, errorData.context, cause);
            break;
        case 'DataPosError':
            error = new DataPosError(errorData.message, errorData.context, cause);
            break;
        case 'EngineError':
            error = new EngineError(errorData.message, errorData.context, cause);
            break;
        case 'FetchError':
            error = new FetchError(errorData.message, errorData.context, cause);
            break;
        case 'OperationalError':
            error = new OperationalError(errorData.message, errorData.context, cause);
            break;
        default:
            const ErrorConstructor = errorConstructors[errorData.name] || Error;
            error = new ErrorConstructor(errorData.message, { cause });
            break;
    }
    if (errorData.stack) error.stack = errorData.stack;
    return error;
}
