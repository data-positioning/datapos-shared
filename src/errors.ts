// Interfaces/Types - Serialised Error Data
export interface SerialisedError extends Record<string, unknown> {
    body?: string;
    cause?: unknown;
    info?: string;
    locator: string;
    message: string;
    name: string;
    stack?: string;
}

// Classes - DataPos Error - Base DataPos error class.
export class DataPosError extends Error {
    locator: string;
    constructor(message: string, locator: string, options?: ErrorOptions) {
        super(message, options);
        this.name = 'DataPosError';
        this.locator = locator;
        Error.captureStackTrace?.(this, new.target); // Removes this constructor from the stack trace, so stack traces start at the actual point of error creation.
    }
}

// Classes - API Error
export class APIError extends DataPosError {
    constructor(message: string, locator: string, options?: ErrorOptions) {
        super(message, locator, options);
        this.name = 'APIError';
    }
}

// Classes - Engine Error
export class EngineError extends DataPosError {
    constructor(message: string, locator: string, options?: ErrorOptions) {
        super(message, locator, options);
        this.name = 'EngineError';
    }
}

// Classes - Fetch Error
export class FetchError extends DataPosError {
    body: string;
    constructor(message: string, locator: string, body: string, options?: ErrorOptions) {
        super(message, locator, options);
        this.name = 'FetchError';
        this.body = body;
    }
}

// Classes - Operational Error
export class OperationalError extends DataPosError {
    constructor(message: string, locator: string, options?: ErrorOptions) {
        super(message, locator, options);
        this.name = 'OperationalError';
    }
}

// Classes - Vue Error
export class VueError extends DataPosError {
    info: string;
    constructor(message: string, locator: string, info: string, options?: ErrorOptions) {
        super(message, locator, options);
        this.name = 'VueError';
        this.info = info;
    }
}

// Operations - Build Fetch Error
export async function buildFetchError(response: { status: number; statusText: string; text: () => Promise<string> }, message: string, locator: string): Promise<FetchError> {
    const fetchMessage = `${message} Response status '${response.status}${response.statusText ? ` - ${response.statusText}` : ''}' received.`;
    const body = await response.text();
    return new FetchError(fetchMessage, locator, body);
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
            serialisedError = { info: cause.info, locator: cause.locator, message: cause.message, name: cause.name, stack: cause.stack };
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
        serialisedErrors.unshift(serialisedError);
    }
    return serialisedErrors;
}
