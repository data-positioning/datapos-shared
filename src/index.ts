/**
 * @file datapos-engine-support/src/index.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */

// Engine Dependencies
import type { DataConnector } from './dataConnector';

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Declarations
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface CallbackProperties {
    error?: Error;
    index: number;
    value?: number;
}

export interface DPAFileSystemFileHandle {
    readonly kind: 'file';
    getFile(): Promise<File>;
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
// Declarations
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export enum DataStorageType {
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

export enum DataUsageType {
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

export * from './errorData';
export * from './utilities';

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Engine
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface Engine {
    dataConnectors: Record<string, DataConnector>;
    storageURLPrefix: string;
}

const engine: Engine = {
    dataConnectors: {},
    storageURLPrefix: ''
};

// export const initialise = (storageURLPrefix: string) => {
//     engine.storageURLPrefix = storageURLPrefix;

//     try {
//         // const contentAudit = ContentAudit.new();
//         // console.log('contentAudit', contentAudit);
//         // const ptr = contentAudit.get_utf8_in_buffer_pointer();
//         // const columnCount = contentAudit.get_column_count();
//         // console.log(1234, ptr, columnCount);
//     } catch (error) {
//         console.log(9999, error);
//     }
// };

export const useEngine = () => engine;
