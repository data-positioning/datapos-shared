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

export type { ComponentConfig } from '@/component';
export { ComponentTypeId, lookupComponentStatus } from '@/component';

export type { ConnectorConfig } from '@/connector';
export { ConnectorAuthMethodId, ConnectorUsageId } from '@/connector';
export type {
    DataConnector,
    DataConnectorFieldInfo,
    DataConnectorFileInfo,
    DataConnectorPreviewInterface,
    DataConnectorPreviewInterfaceSettings,
    DataConnectorRetrieveEntriesSettings,
    DataConnectorReadInterface,
    DataConnectorReadInterfaceSettings,
    DataConnectorRecord
} from '@/connector/dataConnector';
export type {} from '@/nodeConnector';

export type { ConnectionConfig } from '@/connection';
export type { ConnectionEntryDrilldownResult, ConnectionEntry, ConnectionEntryPreview } from '@/connection/connectionEntry';
export { ConnectionEntryPreviewTypeId, ConnectionEntryTypeId } from '@/connection/connectionEntry';

export type {} from '@/dimension';

export type {} from '@/entity';

export type {} from '@/eventQuery';

export type { SourceViewConfig, SourceViewContentAudit, SourceViewPreview, SourceViewRelationshipsAudit } from '@/sourceView';
export { DataFormatId, ValueDelimiterId } from '@/sourceView';

export { PreviewColumn } from '@/sourceView/PreviewColumn';
export { ContentAuditColumn } from '@/sourceView/ContentAuditColumn';

export type { UsageKitConfig } from '@/usageKit';

export type { ViewTemplateConfig } from '@/viewTemplate';

export { ContextualError, FetchResponseError } from '@/errors';

export {
    convertODataTypeToDataType,
    extractFileNameFromFilePath,
    extractFileExtensionFromFilePath,
    extractLastSegmentFromPath,
    formatNumberAsDecimalNumber,
    formatNumberAsDuration,
    formatNumberAsStorageSize,
    formatNumberAsWholeNumber,
    lookupMimeTypeForFileExtension
} from '@/utilities';
