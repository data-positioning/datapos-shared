// Interfaces/Types - Serialised Error Data
export interface SerialisedErrorData extends Record<string, unknown> {
    body?: string;
    cause?: unknown;
    info?: string;
    locator: string;
    message: string;
    name: string;
    stack?: string;
}

// Constants
const errorConstructors: Record<string, ErrorConstructor> = { Error, TypeError, ReferenceError, SyntaxError, RangeError, EvalError, URIError };

// Classes - DataPos Error - Base DataPos error class.
class DataPosError extends Error {
    locator: string;
    constructor(message: string, locator: string, cause?: unknown) {
        super(message, { cause });
        this.name = 'DataPosError';
        this.locator = locator;
        Error.captureStackTrace?.(this, DataPosError); // Removes this constructor from the stack trace, so stack traces start at the actual point of error creation.
    }
}

// Classes - API Error
export class APIError extends DataPosError {
    constructor(message: string, locator: string, cause?: unknown) {
        super(message, locator, cause);
        this.name = 'APIError';
    }
}

// Classes - Engine Error
export class EngineError extends DataPosError {
    constructor(message: string, locator: string, cause?: unknown) {
        super(message, locator, cause);
        this.name = 'EngineError';
    }
}

// Classes - Fetch Error
export class FetchError extends DataPosError {
    body: string;
    constructor(message: string, locator: string, body: string, cause?: unknown) {
        super(message, locator, cause);
        this.name = 'FetchError';
        this.body = body;
    }
}

// Classes - Operational Error
export class OperationalError extends DataPosError {
    constructor(message: string, locator: string, cause?: unknown) {
        super(message, locator, cause);
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
    const history: SerialisedErrorData[] = [];
    let cause = error;
    while (cause) {
        let errorInstanceData: SerialisedErrorData;
        if (cause instanceof DataPosError) {
            errorInstanceData = { context: cause.context, message: cause.message, name: cause.name, stack: cause.stack };
            cause = cause.cause;
        } else if (cause instanceof Error) {
            const error = cause as Error;
            errorInstanceData = { context: {}, message: error.message, name: error.name, stack: error.stack };
            cause = error.cause;
        } else if (cause) {
            errorInstanceData = { context: {}, message: String(cause), name: 'Error' };
            cause = undefined;
        } else {
            errorInstanceData = { context: {}, message: 'Unknown error.', name: 'Error' };
            cause = undefined;
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
function deserialiseErrorInstance(errorData: SerialisedErrorData, cause?: unknown): Error {
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
