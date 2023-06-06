/**
 * @file datapos-engine-support/src/errors.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */
export declare class ContextualError extends Error {
    context: string;
    constructor(message: string, context: string);
}
export declare class FetchResponseError extends Error {
    bodyText: string;
    context: string;
    status: number;
    statusText: string;
    constructor(context: string, status: number, statusText: string, bodyText: string);
}
