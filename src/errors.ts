/**
 * @file datapos-engine-support/src/errors.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */

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
// Errors - Contextual
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export class ContextualError extends Error {
    cause?: unknown;
    context: string;

    constructor(message: string, context: string, cause?: unknown) {
        super(message);
        this.name = 'ContextualError';
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
