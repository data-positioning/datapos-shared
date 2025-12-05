/**
 * Shared composables, constants, types/interfaces, errors and utilities.
 */

// Types/Interfaces/Operations
export type LocaleCode = 'en-au' | 'en-gb' | 'en-us' | 'es-es';
export type LocalisedString = Record<LocaleCode, string>;
export type StatusColorId = 'amber' | 'green' | 'red' | 'other';

// Types/Interfaces/Operations - Component.
export type { ComponentConfig, ComponentRef, ComponentStatus, ComponentStatusId, ComponentTypeId, ModuleConfig, ModuleTypeId } from '@/component';

// Types/Interfaces/Operations - Connector.
export type { ConnectorOperation, ConnectorUsageId } from '@/component/connector';
export { CONNECTOR_DESTINATION_OPERATIONS, CONNECTOR_SOURCE_OPERATIONS } from '@/component/connector';
export type { AuditContentResult, AuditContentSettings } from '@/component/connector';
export type {
    Connector,
    ConnectorCallbackData,
    ConnectorConfig,
    ConnectorImplementation,
    ConnectorOperationSettings,
    ConnectorLocalisedConfig,
    ConnectorTools
} from '@/component/connector';
export type { CreateSettings } from '@/component/connector';
export type { DropSettings } from '@/component/connector';
export type { FindResult, FindSettings } from '@/component/connector';
export type { GetResult, GetSettings } from '@/component/connector';
export type { InitialiseSettings } from '@/component/connector';
export type { ListResult, ListSettings } from '@/component/connector';
export type { PreviewResult, PreviewSettings } from '@/component/connector';
export type { RemoveSettings } from '@/component/connector';
export type { RetrieveResult, RetrieveSettings, RetrieveSummary } from '@/component/connector';
export type { UpsertSettings } from '@/component/connector';

export { connectorConfigSchema } from '@/component/connector/connectorSchema';
export { contextConfigSchema } from '@/component/context/contextSchema';
export { presenterConfigSchema } from '@/component/presenter/presenterSchema';

// Types/Interfaces/Operations - Connector connection.
export type { ConnectionAuthorizationConfig, ConnectionColumnConfig, ConnectionConfig, ConnectionNodeConfig } from '@/component/connector/connection';
export type { DPAFileSystemFileHandle, Encoding, StorageTypeId, UsageTypeId } from '@/component/connector/connection';

// Types/Interfaces/Operations - Context.
export type { Context, ContextConfig, ContextLocalisedConfig, ContextListSettings, ContextListResult, ContextOperation, ContextCallbackData } from '@/component/context';

// Types/Interfaces/Operations - Context model.
export type { ContextModelGroupConfig, ContextModelGroupLocalisedConfig, ContextModelConfig, ContextModelLocalisedConfig } from '@/component/context';

// Types/Interfaces/Operations - Context model dimension.
export type {
    ContextModelDimensionGroupConfig,
    ContextModelDimensionGroupLocalisedConfig,
    ContextModelDimensionConfig,
    ContextModelDimensionLocalisedConfig,
    ContextModelDimensionHierarchyConfig,
    ContextModelDimensionHierarchyLocalisedConfig
} from '@/component/context';

// Types/Interfaces/Operations - Context model entity.
export type {
    ContextModelEntityGroupConfig,
    ContextModelEntityGroupLocalisedConfig,
    ContextModelEntityConfig,
    ContextModelEntityLocalisedConfig,
    ContextModelEntityDataItemConfig, // Data items.
    ContextModelEntityDataItemLocalisedConfig,
    ContextModelEntityEventConfig, // Events.
    ContextModelEntityEventLocalisedConfig,
    ContextModelEntityPrimaryMeasureConfig, // Primary measures.
    ContextModelEntityPrimaryMeasureLocalisedConfig
} from '@/component/context';

// Types/Interfaces/Operations - Context model secondary measure.
export type {
    ContextModelSecondaryMeasureGroupConfig,
    ContextModelSecondaryMeasureGroupLocalisedConfig,
    ContextModelSecondaryMeasureConfig,
    ContextModelSecondaryMeasureLocalisedConfig
} from '@/component/context';

// Types/Interfaces/Operations - Data view.
export type { DataFormatId, EncodingConfig, RecordDelimiterId, ValueDelimiterId } from '@/component/dataView';
export type {
    DataViewConfig,
    DataViewContentAuditConfig,
    DataViewLocalisedConfig,
    DataViewPreviewConfig,
    DataViewRelationshipsAuditConfig,
    ParsedValue
} from '@/component/dataView';

// Types/Interfaces/Operations - Dimension.
export type { DimensionConfig, DimensionLocalisedConfig } from '@/component/dimension';

// Types/Interfaces/Operations - Engine.
export type { ConnectorInterfaceResult, ContextInterfaceResult, Engine, EngineConfig, EngineWorker } from '@/engine';

// Types/Interfaces/Operations - Error.
export type { SerialisedError } from '@/errors';

// Types/Interfaces/Operations - Event query.
export type { EventQueryConfig, EventQueryLocalisedConfig } from '@/component/eventQuery';

// Types/Interfaces/Operations - Informer document.

// Types/Interfaces/Operations - Presenter.
export type { Presenter, PresenterConfig, PresenterLocalisedConfig, PresenterOperation } from '@/component/presenter';

// Types/Interfaces/Operations - Presenter presentation.
export type { PresentationConfig, PresentationView } from '@/component/presenter/presentation';
export type {
    PresentationCategoryId,
    PresentationCartesianTypeId,
    PresentationPolarTypeId,
    PresentationRangeTypeId,
    PresentationVisualConfig,
    PresentationVisualContentConfig,
    PresentationVisualViewConfig,
    PresentationVisualCartesianChartViewConfig,
    PresentationVisualChordDiagramViewConfig,
    PresentationVisualPeriodFlowBoundariesChartViewConfig,
    PresentationVisualPolarChartViewConfig,
    PresentationVisualRangeChartViewConfig,
    PresentationVisualSankeyDiagramViewConfig,
    PresentationVisualStreamGraphViewConfig,
    PresentationVisualValueTableViewConfig
} from '@/component/presenter/presentation';

export type { ToolConfig } from '@/component/tool';

// Types/Interfaces/Operations - Context Operator Settings
export interface ContextOperationSettings {
    accountId?: string;
    appCheckToken?: string;
    sessionAccessToken?: string;
}

// Types/Interfaces/Operations - Timestamp.
export type { Timestamp } from '@/timestamp'; // TODO: Review, do we need it now we have removed Firebase?

// Composables
export { type CytoscapeJSView, useCytoscapeJS } from '@/composables/useCytoscapeJS';
export { useDataTable } from '@/composables/useDataTable';

// Constants
export const DEFAULT_LOCALE_CODE: LocaleCode = 'en-gb';
export { DefaultTimestamp } from '@/timestamp'; // TODO: Review, do we need it now we have removed Firebase?

// Errors
export { APIError, ApplicationError, EngineError, FetchError, OperationalError, VueError, WindowRuntimeError, WindowPromiseRejectionError } from '@/errors';

// Utilities.
export { buildFetchError, concatenateSerialisedErrorMessages, normalizeToError, serialiseError } from '@/errors';
export { convertMillisecondsToTimestamp, getCurrentTimestamp } from '@/timestamp'; // TODO: Review, do we need it now we have removed Firebase?
export { convertODataTypeIdToUsageTypeId } from '@/utilities';
export { extractExtensionFromPath, extractNameFromPath } from '@/utilities';
export { formatNumberAsDecimalNumber, formatNumberAsDuration, formatNumberAsSize, formatNumberAsStorageSize, formatNumberAsWholeNumber } from '@/utilities';
export { getDataFormats, getRecordDelimiters, getValueDelimiters } from '@/component/dataView';
export { getComponentStatus } from '@/component';
export { lookupMimeTypeForExtension } from '@/utilities';
