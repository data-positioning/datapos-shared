// Dependencies - Vendor
import { Timestamp } from 'firebase/firestore';

// Constants
export const DefaultTimestamp: Timestamp = new Timestamp(0, 0);

// Interfaces/Types - Component
export type { ComponentConfig, ComponentStatus } from './component';

// Interfaces/Types - Connection
export { type ConnectionConfig, FieldStorageTypeId, FieldUsageTypeId } from './connection';

// Interfaces/Types - Connection Item
export type { ConnectionItemConfig } from './connectionItem';

// Interfaces/Types - Connector
export type { ConnectorCallbackData, ConnectorConfig } from './connector';
export type { Connector, ConnectorFieldInfo, ObjectInfo, ConnectorRecord } from './connector';
export type { ListResponse, ListResult, ListSettings } from './connector';
export type { PreviewInterface, PreviewSettings, PreviewResult } from './connector';
export type { ReadInterface, ReadSettings } from './connector';
export type { WriteInterface } from './connector';

// Interfaces/Types - Context
export type { ContextConfig, ContextModelConfig, ContextDimensionConfig, ContextEntityCharacteristicConfig, ContextEntityComputationConfig } from './context';
export type { ContextEntityConfig, ContextEntityEventConfig, ContextHierarchyConfig, ContextViewConfig, Event } from './context';

// Interfaces/Types - Data View
export type { DataViewConfig, DataViewContentAuditConfig, DataViewPreviewConfig, DataViewRelationshipsAuditConfig, Encoding, EncodingConfig, ObjectSchema } from './dataView';
export { DataFormatId, getDataFormats, getValueDelimiters, ValueDelimiterId } from './dataView';
export { PreviewColumn } from './dataView/PreviewColumn';
export { ContentAuditColumn, type ParsedValue } from './dataView/ContentAuditColumn';

// Interfaces/Types - Error
export { AbortError, BackendError, ConnectorError, DataPosError, EngineError, EngineWorkerError, FetchError, FrontendError } from './errors';

// Interfaces/Types - Event Query
export type { EventQueryConfig } from './eventQuery';

// Interfaces/Types - Presentation
export type { Presentation, PresentationConfig } from './presentation';

// Interfaces/Types - Tutorial
export type { Tutorial, TutorialConfig } from './tutorial';

// Utilities
export { convertODataTypeToDataType } from './utilities';
export { establishVendorAccessToken } from './utilities';
export { extractExtensionFromPath, extractNameFromPath } from './utilities';
export { formatNumberAsDecimalNumber, formatNumberAsDuration, formatNumberAsStorageSize, formatNumberAsWholeNumber } from './utilities';
export { getComponentStatus } from './component';
export { lookupMimeTypeForExtension } from './utilities';
