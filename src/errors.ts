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
// Errors - Connector
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export class ConnectorError extends Error {
    cause?: unknown;
    context?: string;

    constructor(message: string, context?: string, cause?: unknown) {
        super(message);
        this.name = 'ConnectorError';
        this.context = context;
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
// Errors - Engine
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export class EngineError extends Error {
    cause?: unknown;
    context?: string;

    constructor(message: string, context?: string, cause?: unknown) {
        super(message);
        this.name = 'EngineError';
        this.context = context;
        this.cause = cause;
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
// Errors - Frontend
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export class FrontendError extends Error {
    cause?: unknown;
    context?: string;

    constructor(message: string, context?: string, cause?: unknown) {
        super(message);
        this.name = 'FrontendError';
        this.context = context;
        this.cause = cause;
    }
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Errors - Worker
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export class WorkerError extends Error {
    cause?: unknown;

    constructor(cause?: unknown) {
        super('Engine error wrapper.');
        this.name = 'WorkerError';
        this.cause = cause;
    }
}
