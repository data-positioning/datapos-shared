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
        super(message);
        this.name = 'AbortError';
    }
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Errors - Context
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export class ContextError extends Error {
    context?: string;

    constructor(message: string, context?: string) {
        super(message);
        this.name = 'ContextError';
        this.context = context;
    }
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Errors - Context - Backend
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export class BackendContextError extends ContextError {
    constructor(message: string, context?: string, cause?: unknown) {
        super(message, context);
        this.name = 'BackendContextError';
        this.cause = cause;
    }
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Errors - Context - Connector
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export class ConnectorContextError extends ContextError {
    constructor(message: string, context?: string, cause?: unknown) {
        super(message, context);
        this.name = 'ConnectorContextError';
        this.cause = cause;
    }
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Errors - Context - Engine
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export class EngineContextError extends ContextError {
    constructor(message: string, context?: string, cause?: unknown) {
        super(message, context);
        this.name = 'EngineContextError';
        this.cause = cause;
    }
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Errors - Context - Frontend
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export class FrontendContextError extends ContextError {
    constructor(message: string, context?: string, cause?: unknown) {
        super(message, context);
        this.name = 'FrontendContextError';
        this.cause = cause;
    }
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Errors - Core
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export class CoreError extends Error {
    originalName: string;

    constructor(message: string, originalName: string) {
        super(message);
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
        super('Failed to return fetch response.');
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
        super('Engine error wrapper.');
        this.name = 'WorkerError';
        this.cause = cause;
    }
}
