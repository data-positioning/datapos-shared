/**
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 * @file datapos-engine/src/errorData.ts
 * @license ISC
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
