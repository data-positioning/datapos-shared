/**
 * @file datapos-engine-support/src/errors.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Declarations
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface SerialisedErrorData {
    cause?: SerialisedErrorData;
    context?: string;
    message: string;
    name: string;
    stack?: string;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Errors - Abort
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export class AbortError extends Error {
    constructor(message: string) {
        const trueProto = new.target.prototype;
        super(message);
        Object.setPrototypeOf(this, trueProto);
        this.name = 'AbortError';
    }
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Errors - Context
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export class ContextError extends Error {
    context?: string;

    constructor(message: string, context?: string) {
        const trueProto = new.target.prototype;
        super(message);
        Object.setPrototypeOf(this, trueProto);
        this.name = 'ContextError';
        this.context = context;
    }
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Errors - Context - Backend
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export class BackendError extends ContextError {
    constructor(message: string, context?: string, cause?: unknown) {
        const trueProto = new.target.prototype;
        super(message, context);
        Object.setPrototypeOf(this, trueProto);
        this.name = 'BackendError';
        this.cause = cause;
    }
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Errors - Context - Connector
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export class ConnectorError extends ContextError {
    constructor(message: string, context?: string, cause?: unknown) {
        const trueProto = new.target.prototype;
        super(message, context);
        Object.setPrototypeOf(this, trueProto);
        this.name = 'ConnectorError';
        this.cause = cause;
    }
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Errors - Context - Engine
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export class EngineError extends ContextError {
    constructor(message: string, context?: string, cause?: unknown) {
        const trueProto = new.target.prototype;
        super(message, context);
        Object.setPrototypeOf(this, trueProto);
        this.name = 'EngineError';
        this.cause = cause;
    }
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Errors - Context - Frontend
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export class FrontendError extends ContextError {
    constructor(message: string, context?: string, cause?: unknown) {
        const trueProto = new.target.prototype;
        super(message, context);
        Object.setPrototypeOf(this, trueProto);
        this.name = 'FrontendError';
        this.cause = cause;
    }
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Errors - Core
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export class CoreError extends Error {
    originalName: string;

    constructor(message: string, originalName: string) {
        const trueProto = new.target.prototype;
        super(message);
        Object.setPrototypeOf(this, trueProto);
        this.name = 'CoreError';
        this.originalName = originalName;
    }
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Errors - Fetch Response
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export class FetchResponseError extends Error {
    bodyText: string;
    status: number;
    statusText: string;

    constructor(status: number, statusText: string, bodyText: string) {
        const trueProto = new.target.prototype;
        super('Failed to return fetch response.');
        Object.setPrototypeOf(this, trueProto);
        this.name = 'FetchResponseError';
        this.status = status;
        this.statusText = statusText;
        this.bodyText = bodyText;
    }
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Errors - Worker
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export class WorkerError extends Error {
    constructor(cause?: unknown) {
        const trueProto = new.target.prototype;
        super('Engine error wrapper.');
        Object.setPrototypeOf(this, trueProto);
        this.name = 'WorkerError';
        this.cause = cause;
    }
}
