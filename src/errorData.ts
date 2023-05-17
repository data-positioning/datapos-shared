/**
 * @file datapos-engine-support/src/errorData.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Declarations
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface ErrorData {
    body: ErrorDataBody;
    statusCode?: number;
    statusText?: string;
}

export interface ErrorDataBody {
    context?: string;
    message: string;
    stack?: string;
}
