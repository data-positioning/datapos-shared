// Common
export interface CommonItemConfig {
    id: string;
    label: string;
}

// Components
export { type ComponentConfig, ComponentTypeId, getComponentStatus } from './component';

// Components - Connector
export { ConnectorAuthMethodId, type ConnectorCallbackData, type ConnectorConfig, ConnectorUsageId } from './connector/index';
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
} from './connector/dataConnector';
export type {} from './nodeConnector';

// Components - Connection
export type { ConnectionConfig, ConnectionEntryDrilldownResult, ConnectionEntry, ConnectionEntryPreview } from './connection';
export { ConnectionEntryPreviewTypeId, ConnectionEntryTypeId, FieldStorageTypeId, FieldUsageTypeId } from './connection';

// Components - Context
export type {
    ContextConfig,
    ContextModelConfig,
    ContextDimensionConfig,
    ContextDimensionHierarchyConfig,
    ContextDimensionLevelConfig,
    ContextEntityCharacteristicConfig,
    ContextEntityComputationConfig,
    ContextEntityConfig,
    ContextEntityEventConfig,
    ContextViewConfig
} from './context';

// Components - Event Query
export type { EventQueryConfig } from './eventQuery';

//  Components - Source View
export type { SourceViewConfig, SourceViewContentAudit, SourceViewPreview, SourceViewRelationshipsAudit } from './sourceView';
export { DataFormatId, getDataFormats, getValueDelimiters, ValueDelimiterId } from './sourceView';
export { PreviewColumn } from './sourceView/PreviewColumn';
export { ContentAuditColumn, type ParsedValue } from './sourceView/ContentAuditColumn';

// Components - Usage Kit
export type { UsageKitConfig } from './usageKit';

// Errors
export {
    AbortError,
    BackendContextError,
    ConnectorContextError,
    ContextError,
    EngineContextError,
    EngineCoreError,
    EngineWorkerError,
    FetchResponseError,
    FrontendContextError,
    type SerialisedErrorData
} from './errors';

// Utilities
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
