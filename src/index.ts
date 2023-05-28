/**
 * @file datapos-engine-support/src/index.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Declarations
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface CallbackProperties {
    error?: Error;
    index: number;
    value?: number;
}

export enum DataStorageTypeId {
    /* eslint-disable no-unused-vars */
    Binary = 'binary',
    Boolean = 'boolean',
    Byte = 'byte',
    Date = 'date',
    DateTime = 'dateTime',
    DateTimeOffset = 'dateTimeOffset',
    Decimal = 'decimal',
    Double = 'double',
    Int8 = 'int8',
    Int16 = 'int16',
    Int32 = 'int32',
    Int64 = 'int64',
    Object = 'object',
    Single = 'single',
    String = 'string',
    Time = 'time',
    Unknown = 'unknown'
    /* eslint-enable no-unused-vars */
}

export enum DataUsageTypeId {
    /* eslint-disable no-unused-vars */
    Binary = 'binary',
    Boolean = 'boolean',
    Date = 'date',
    DateTime = 'dateTime',
    DateTimeOffset = 'dateTimeOffset',
    DecimalNumber = 'decimalNumber',
    Object = 'object',
    String = 'string',
    Time = 'time',
    Unknown = 'unknown',
    WholeNumber = 'wholeNumber'
    /* eslint-enable no-unused-vars */
}

export interface DPAFileSystemFileHandle {
    readonly kind: 'file';
    getFile(): Promise<File>;
}

// export interface ErrorData {
//     body: ErrorDataBody;
//     statusCode?: number;
//     statusText?: string;
// }

// export interface ErrorDataBody {
//     context?: string;
//     message: string;
//     stack?: string;
// }

export class FetchResponseError extends Error {
    bodyText: string;
    status: number;
    statusText: string;

    constructor(message: string, status: number, statusText: string, bodyText: string) {
        super(message);
        this.name = 'FetchResponseError';
        this.status = status;
        this.statusText = statusText;
        this.bodyText = bodyText;
    }
}

export interface FirebaseTimestamp {
    nanoseconds: number;
    seconds: number;
}

export interface Progress {
    id: string;
    value: unknown;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export * from './component';

export * from './connector';
export * from './dataConnector';
export * from './nodeConnector';

export * from './connection';
export * from './connectionEntry';

export * from './eventQuery';

export * from './sourceView';

export * from './viewTemplate';

export * from './usageKit';

export * from './utilities';
