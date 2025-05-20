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
        super(message);
        this.name = 'DataPosError';
        this.context = context;
        this.cause = cause;
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

// Operations - Format Error
export function formatError(error: unknown, context?: ErrorContext): ErrorData {
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

// // Operations - Serialise Error
// export function serialiseError(causeError: unknown): SerialisedErrorData {
//     if (causeError instanceof Error && ['DataPosError', 'APIError', 'EngineError', 'FetchError', 'OperationalError'].includes(causeError.name)) {
//         const dataPosError = causeError as DataPosError;
//         return {
//             name: dataPosError.name,
//             message: dataPosError.message,
//             context: JSON.stringify(dataPosError.context),
//             cause: dataPosError.cause ? serialiseError(dataPosError.cause) : undefined
//         };
//     } else if (causeError instanceof Error) {
//         return {
//             name: causeError.name,
//             message: causeError.message,
//             cause: causeError.cause ? serialiseError(causeError.cause) : undefined
//         };
//     } else {
//         return { name: 'Error', message: String(causeError || 'Unknown causeError.') };
//     }
// }

// Operations - Deserialise Error
export function deserialiseError(errorData: ErrorData): Error {
    const errorCount = errorData.history.length;
    let current = deserialiseError1(errorData.history[0]);
    for (let errorIndex = 1; errorIndex < errorCount; errorIndex++) {
        const newErrorData = errorData.history[errorIndex];
        // const wrapped = new Error(newErrorData.message, { cause: current });
        // wrapped.name = newErrorData.name || 'Error';
        const wrapped = deserialiseError1(newErrorData, current);
        if (newErrorData.stack) wrapped.stack = newErrorData.stack;
        current = wrapped;
    }
    return current;
}

// Operations - Deserialise Error
function deserialiseError1(errorData: ErrorInstanceData, cause?: unknown): Error {
    console.log(9999, errorData, cause);
    switch (errorData.name) {
        case 'APIError':
            return new APIError(errorData.message, errorData.context, cause);
        case 'DataPosError':
            return new DataPosError(errorData.message, errorData.context, cause);
        case 'EngineError':
            return new EngineError(errorData.message, errorData.context, cause);
        case 'FetchError':
            return new FetchError(errorData.message, errorData.context, cause);
        case 'OperationalError':
            return new OperationalError(errorData.message, errorData.context, cause);
        default:
            const ErrorConstructor = errorConstructors[errorData.name] || Error;
            return new ErrorConstructor(errorData.message, { cause });
    }
}
