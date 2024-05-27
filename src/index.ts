// Dependencies - Vendor
import { Timestamp } from 'firebase/firestore';

// Constants
export const DefaultTimestamp: Timestamp = new Timestamp(0, 0);

// Interfaces/Types - Component
export { type ComponentConfig, type ComponentStatus, getComponentStatus } from './component';

// Interfaces/Types - Connector - Connection
export type { ConnectorCallbackData, ConnectorConfig } from './connector';
export type {
    Connector,
    ConnectorFieldInfo,
    ObjectInfo,
    ConnectorRecord,
    ListResponse,
    ListResult,
    ListSettings,
    PreviewInterface,
    PreviewSettings,
    PreviewResult,
    ReadInterface,
    ReadSettings,
    WriteInterface
} from './connector';
export { type ConnectionConfig, FieldStorageTypeId, FieldUsageTypeId } from './connector/connection';

// Interfaces/Types - Connector - Data Entry
export type { DataEntryConfig } from './connector/dataEntry';

// Interfaces/Types - Context
export type {
    ContextConfig,
    ContextModelConfig,
    ContextDimensionConfig,
    ContextEntityCharacteristicConfig,
    ContextEntityComputationConfig,
    ContextEntityConfig,
    ContextEntityEventConfig,
    ContextHierarchyConfig,
    ContextViewConfig,
    Event
} from './context';

// Interfaces/Types - Data View
export type { DataViewConfig, DataViewContentAuditConfig, DataViewPreviewConfig, DataViewRelationshipsAuditConfig, Encoding, EncodingConfig, ObjectSchema } from './dataView';
export { DataFormatId, getDataFormats, getValueDelimiters, ValueDelimiterId } from './dataView';
export { PreviewColumn } from './dataView/PreviewColumn';
export { ContentAuditColumn, type ParsedValue } from './dataView/ContentAuditColumn';

// Interfaces/Types - Error
export { AbortError, BackendError, ConnectorError, DataPosError, EngineError, EngineWorkerError, FetchError, FrontendError } from './errors';

// Interfaces/Types - Event Query
export type { EventQueryConfig } from './eventQuery';

// Interfaces/Types - Tutorial
export type { TutorialConfig } from './tutorial';

// Utilities
export {
    convertODataTypeToDataType,
    establishVendorAccessToken,
    extractExtensionFromPath,
    extractNameFromPath,
    formatNumberAsDecimalNumber,
    formatNumberAsDuration,
    formatNumberAsStorageSize,
    formatNumberAsWholeNumber,
    lookupMimeTypeForExtension
} from './utilities';
