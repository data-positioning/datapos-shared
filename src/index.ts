/**
 * @file datapos-engine-support/src/index.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Declarations
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export type ParsedValue = bigint | boolean | number | string | null;

export interface CallbackProperties {
    error?: Error;
    index: number;
    value?: number;
}

export enum DataStorageTypeId {
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
}

export enum DataUsageTypeId {
    Boolean = 1,
    DecimalNumber = 4,
    Moment = 2,
    String = 5,
    WholeNumber = 3,
    Unknown = 0
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

export default class ContextualError extends Error {
    context: string;

    constructor(message: string, context: string) {
        super(message);
        this.name = 'ContextualError';
        this.context = context;
    }
}

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

export type { ComponentConfig } from './component';
export { ComponentTypeId, lookupComponentStatus } from './component';

export type { ConnectorConfig } from './connector';
export { ConnectorAuthMethodId, ConnectorUsageId } from './connector';
export type {
    DataConnector,
    DataConnectorPreviewInterface,
    DataConnectorPreviewInterfaceSettings,
    DataConnectorRetrieveEntriesSettings,
    DataConnectorReadInterface,
    DataConnectorReadInterfaceSettings,
    FieldData,
    FieldInfo
} from './dataConnector';
export type {} from './nodeConnector';

export type { ConnectionConfig } from './connection';
export type { ConnectionEntryDrilldownResult, ConnectionEntry, ConnectionEntryPreview } from './connectionEntry';
export { ConnectionEntryPreviewTypeId, ConnectionEntryTypeId } from './connectionEntry';

export type {} from './dimension';

export type {} from './entity';

export type {} from './eventQuery';

export type { SourceViewPreviewField, SourceViewConfig, SourceViewPreview } from './sourceView';
export { DataFormatId, ValueDelimiterId } from './sourceView';
export { ContentAuditField } from './ContentAuditField';

export type { UsageKitConfig } from './usageKit';

export type { ViewTemplateConfig } from './viewTemplate';

export {
    convertODataTypeToDataType,
    extractFileNameFromFilePath,
    extractFileExtensionFromFilePath,
    extractLastSegmentFromPath,
    formatNumberAsDecimalNumber,
    formatNumberAsStorageSize,
    formatNumberAsWholeNumber,
    lookupMimeTypeForFileExtension
} from './utilities';
