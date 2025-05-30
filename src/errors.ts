// Interfaces/Types - Serialised Error Data
export interface SerialisedError {
    body?: string;
    componentName?: string;
    info?: string;
    locator: string;
    message: string;
    name: string;
    stack?: string;
}

// Classes - DataPos Error - Base DataPos error class.
class DataPosError extends Error {
    locator: string;
    constructor(message: string, locator: string, options?: ErrorOptions) {
        super(message, options);
        this.name = 'DataPosError';
        this.locator = locator;
        Error.captureStackTrace?.(this, new.target); // Removes this constructor from the stack trace, so stack traces start at the actual point of error creation.
    }
}

// Classes - Application Error
export class ApplicationError extends DataPosError {
    constructor(message: string, locator: string, options?: ErrorOptions) {
        super(message, locator, options);
        this.name = 'ApplicationError';
    }
}

// Classes - Application Error - API Error
export class APIError extends ApplicationError {
    constructor(message: string, locator: string, options?: ErrorOptions) {
        super(message, locator, options);
        this.name = 'APIError';
    }
}

// Classes - Application Error - Engine Error
export class EngineError extends ApplicationError {
    constructor(message: string, locator: string, options?: ErrorOptions) {
        super(message, locator, options);
        this.name = 'EngineError';
    }
}

// Classes - Application Error - Fetch Error
export class FetchError extends ApplicationError {
    body: string;
    constructor(message: string, locator: string, body: string, options?: ErrorOptions) {
        super(message, locator, options);
        this.name = 'FetchError';
        this.body = body;
    }
}

// Classes - Application Error - Vue Error
export class VueError extends ApplicationError {
    componentName?: string;
    info: string;
    constructor(message: string, locator: string, info: string, componentName?: string, options?: ErrorOptions) {
        super(message, locator, options);
        this.name = 'VueHandledError';
        this.info = info;
        this.componentName = componentName;
    }
}

// Classes - Application Error - Window Runtime Error
export class WindowRuntimeError extends ApplicationError {
    constructor(message: string, locator: string, options?: ErrorOptions) {
        super(message, locator, options);
        this.name = 'WindowHandledRuntimeError';
    }
}

// Classes - Application Error - Window Promise Rejection Error
export class WindowPromiseRejectionError extends ApplicationError {
    constructor(message: string, locator: string, options?: ErrorOptions) {
        super(message, locator, options);
        this.name = 'WindowHandledPromiseRejectionError';
    }
}

// Classes - Operational Error
export class OperationalError extends DataPosError {
    constructor(message: string, locator: string, options?: ErrorOptions) {
        super(message, locator, options);
        this.name = 'OperationalError';
    }
}

// Operations - Build Fetch Error
export async function buildFetchError(response: { status: number; statusText: string; text: () => Promise<string> }, message: string, locator: string): Promise<FetchError> {
    const fetchMessage = `${message} Response status '${response.status}${response.statusText ? ` - ${response.statusText}` : ''}' received.`;
    const body = await response.text();
    return new FetchError(fetchMessage, locator, body);
}

// Operations - Concatenate Serialised Error Messages
export function concatenateSerialisedErrorMessages(serialisedErrors: SerialisedError[]): string {
    return serialisedErrors.map((serialisedError) => serialisedError.message).join(' ');
}
// Operations - Normalise To Error
export function normalizeToError(value: unknown, fallbackMessage = 'Unknown error.'): Error {
    if (value instanceof Error) return value;
    if (typeof value === 'string') return new Error(value);
    try {
        return new Error(JSON.stringify(value ?? fallbackMessage));
    } catch {
        return new Error(fallbackMessage);
    }
}

// Operations - Serialise Error
export function serialiseError(error?: unknown): SerialisedError[] {
    const seenCauses = new Set();
    const serialisedErrors: SerialisedError[] = [];
    let cause = error;
    // Process causes as long as there is one that has not previously been seen. Checking for previously seen is to protect against infinite loops.
    while (cause && !seenCauses.has(cause)) {
        seenCauses.add(cause);
        let serialisedError: SerialisedError;
        if (cause instanceof FetchError) {
            serialisedError = { body: cause.body, locator: cause.locator, message: cause.message, name: cause.name, stack: cause.stack };
            cause = cause.cause;
        } else if (cause instanceof VueError) {
            serialisedError = { componentName: cause.componentName, info: cause.info, locator: cause.locator, message: cause.message, name: cause.name, stack: cause.stack };
            cause = cause.cause;
        } else if (cause instanceof DataPosError) {
            serialisedError = { locator: cause.locator, message: cause.message, name: cause.name, stack: cause.stack };
            cause = cause.cause;
        } else if (cause instanceof Error) {
            const error = cause as Error;
            serialisedError = { locator: '', message: error.message, name: error.name, stack: error.stack };
            cause = error.cause;
        } else if (cause) {
            serialisedError = { locator: '', message: String(cause), name: 'Error' };
            cause = undefined;
        } else {
            serialisedError = { locator: '', message: 'Unknown error.', name: 'Error' };
            cause = undefined;
        }
        if (!/(?:\.{3}|[.!?])$/.test(serialisedError.message)) serialisedError.message += '.'; // Terminate with "." if message does not already end in "...", ".", "!" or "?"."
        serialisedErrors.push(serialisedError);
    }
    return serialisedErrors;
}
