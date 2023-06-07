/**
 * @file datapos-engine-support/src/errors.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Errors - Contextual
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export class ContextualError extends Error {
    cause: unknown;
    context: string;

    constructor(message: string, context: string, cause: unknown) {
        super(message);
        this.context = context;
        this.cause = cause;
    }
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Errors - Fetch Response
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export class FetchResponseError extends Error {
    bodyText: string;
    context: string;
    status: number;
    statusText: string;

    constructor(context: string, status: number, statusText: string, bodyText: string) {
        super('Fetch response error.');
        this.name = 'FetchResponseError';
        this.context = context;
        this.status = status;
        this.statusText = statusText;
        this.bodyText = bodyText;
    }
}
