/**
 * @file datapos-engine-support/src/index.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Declarations
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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

export type ParsedValue = bigint | boolean | number | string | null;

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Declarations - Component
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export type { ComponentConfig } from './component';
export { ComponentTypeId, lookupComponentStatus } from './component';

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Declarations - Component - Connector
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export type { ConnectorConfig } from './connector/index';
export { ConnectorAuthMethodId, ConnectorUsageId } from './connector/index';
export type {
    CallbackData,
    DataConnector,
    DataConnectorFieldInfo,
    DataConnectorFileInfo,
    DataConnectorPreviewInterface,
    DataConnectorPreviewInterfaceSettings,
    DataConnectorRetrieveEntriesSettings,
    DataConnectorReadInterface,
    DataConnectorReadInterfaceSettings,
    DataConnectorRecord
} from './connector/dataConnector';
export type {} from './nodeConnector';

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Declarations - Component - Connection
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export type { ConnectionConfig, ConnectionEntryDrilldownResult, ConnectionEntry, ConnectionEntryPreview } from './connection';
export { ConnectionEntryPreviewTypeId, ConnectionEntryTypeId } from './connection';

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Declarations - Component - Dimension
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export type {} from './dimension';

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Declarations - Component - Entity
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export type {} from './entity';

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Declarations - Component - Event Query
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export type {} from './eventQuery';

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Declarations - Component - Source View
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export type { SourceViewConfig, SourceViewContentAudit, SourceViewPreview, SourceViewRelationshipsAudit } from './sourceView';
export { DataFormatId, getDataFormats, getValueDelimiters, ValueDelimiterId } from './sourceView';

export { PreviewColumn } from './sourceView/PreviewColumn';
export { ContentAuditColumn } from './sourceView/ContentAuditColumn';

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Declarations - Component - Usage Kit
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export type { UsageKitConfig } from './usageKit';

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Declarations - Component - View Template
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export type { ViewTemplateConfig } from './viewTemplate';

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Declarations - Error
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export {
    AbortError,
    BackendContextError,
    ConnectorContextError,
    ContextError,
    CoreError,
    EngineContextError,
    FetchResponseError,
    FrontendContextError,
    type SerialisedErrorData,
    WorkerError
} from './errors';

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
} from './utilities';
