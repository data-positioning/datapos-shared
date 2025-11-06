/**
 * Shared composables, constants, interfaces, errors, types and utilities.
 */

// Interfaces/Types/Operations
export type LocaleCode = 'en-au' | 'en-gb' | 'en-us' | 'es-es';
export type LocalisedString = Record<LocaleCode, string>;
export type StatusColorId = 'amber' | 'green' | 'red' | 'other';

// Interfaces/Types/Operations - Module.
export type { AppModuleConfig, ConnectorModuleConfig, EngineModuleConfig, InformerModuleConfig, PresenterModuleConfig } from '@/module';

// Interfaces/Types/Operations - Component.
export type { ComponentConfig, ComponentRef, ComponentStatus, ComponentStatusId, ComponentTypeId } from '@/component';

// Interfaces/Types/Operations - Connector.
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

// Interfaces/Types/Operations - Connector connection.
export type { ConnectionAuthorizationConfig, ConnectionColumnConfig, ConnectionConfig, ConnectionNodeConfig } from '@/component/connector/connection';
export type { DPAFileSystemFileHandle, Encoding, StorageTypeId, UsageTypeId } from '@/component/connector/connection';

// Interfaces/Types/Operations - Context.
export type {
    Context,
    ContextConfig,
    ContextLocalisedConfig,
    ContextListSettings,
    ContextListResult,
    // Model.
    ContextModelGroupConfig,
    ContextModelGroupLocalisedConfig,
    ContextModelConfig,
    ContextModelLocalisedConfig,
    // Model dimension.
    ContextModelDimensionGroupConfig,
    ContextModelDimensionGroupLocalisedConfig,
    ContextModelDimensionConfig,
    ContextModelDimensionLocalisedConfig,
    ContextModelDimensionHierarchyConfig,
    ContextModelDimensionHierarchyLocalisedConfig,
    // Model entity.
    ContextModelEntityGroupConfig,
    ContextModelEntityGroupLocalisedConfig,
    ContextModelEntityConfig,
    ContextModelEntityLocalisedConfig,
    ContextModelEntityDataItemConfig, // Data items.
    ContextModelEntityDataItemLocalisedConfig,
    ContextModelEntityEventConfig, // Events.
    ContextModelEntityEventLocalisedConfig,
    ContextModelEntityPrimaryMeasureConfig, // Primary measures.
    ContextModelEntityPrimaryMeasureLocalisedConfig,
    // Model secondary measure.
    ContextModelSecondaryMeasureGroupConfig,
    ContextModelSecondaryMeasureGroupLocalisedConfig,
    ContextModelSecondaryMeasureConfig,
    ContextModelSecondaryMeasureLocalisedConfig
} from '@/component/context';

// Interfaces/Types/Operations - Data view.
export type { DataFormatId, EncodingConfig, RecordDelimiterId, ValueDelimiterId } from '@/component/dataView';
export type {
    DataViewConfig,
    DataViewContentAuditConfig,
    DataViewLocalisedConfig,
    DataViewPreviewConfig,
    DataViewRelationshipsAuditConfig,
    ParsedValue
} from '@/component/dataView';

// Interfaces/Types/Operations - Dimension.
export type { DimensionConfig, DimensionLocalisedConfig } from '@/component/dimension';

// Interfaces/Types/Operations - Engine.
export type { ConnectorInterfaceResult, ContextInterfaceResult, Engine, EngineWorker } from '@/engine';

// Interfaces/Types/Operations - Error.
export type { SerialisedError } from '@/errors';

// Interfaces/Types/Operations - Event query.
export type { EventQueryConfig, EventQueryLocalisedConfig } from '@/component/eventQuery';

// Interfaces/Types/Operations - Presenter.
export type { Presenter, PresenterConfig, PresenterLocalisedConfig, PresenterTools } from '@/component/presenter';

// Interfaces/Types/Operations - Presenter presentation.
export type { PresentationConfig, PresentationView } from '@/component/presenter';
export type {
    PresentationVisualConfig,
    PresentationVisualContentConfig,
    PresentationVisualViewConfig,
    PresentationVisualCartesianViewConfig,
    PresentationVisualChordDiagramViewConfig,
    PresentationVisualPolarViewConfig,
    PresentationVisualRangeViewConfig,
    PresentationVisualSankeyDiagramViewConfig,
    PresentationVisualStreamgraphViewConfig,
    PresentationVisualValuesViewConfig
} from '@/component/presenter';
export type {
    PresentationVisualViewType,
    PresentationVisualCartesianViewType,
    PresentationVisualChordViewType,
    PresentationVisualPolarViewType,
    PresentationVisualRangeViewType,
    PresentationVisualSankeyDiagramViewType,
    PresentationVisualStreamgraphViewType,
    PresentationVisualValuesViewType
} from '@/component/presenter';

// Interfaces/Types/Operations - Informer.

// Interfaces/Types/Operations - Informer document.
export type { Recipe, RecipeConfig, RecipeLocalisedConfig } from '@/component/informer/recipe';

// Interfaces/Types/Operations - Context Operator Settings
export interface ContextOperationSettings {
    accountId?: string;
    appCheckToken?: string;
    sessionAccessToken?: string;
}

// Interfaces/Types/Operations - Timestamp.
export type { Timestamp } from '@/timestamp'; // TODO: Review, do we need it now we have removed Firebase?

// Interfaces/Types/Operations - Tutorial.
export type { TutorialConfig } from '@/component/informer/tutorial';

// Constants
export const DEFAULT_LOCALE_CODE: LocaleCode = 'en-gb';
export { DefaultTimestamp } from '@/timestamp'; // TODO: Review, do we need it now we have removed Firebase?
export { presentationViewTypeMap } from '@/component/presenter';

// Composables
export { type CytoscapeJSView, useCytoscapeJS } from '@/composables/useCytoscapeJS';
export { useDataTable } from '@/composables/useDataTable';
export { type HighchartsView, useHighcharts } from '@/composables/useHighcharts';

// Errors
export { APIError, ApplicationError, EngineError, FetchError, OperationalError, VueError, WindowRuntimeError, WindowPromiseRejectionError } from '@/errors';

// Utilities - Application.
export { buildFetchError, concatenateSerialisedErrorMessages, normalizeToError, serialiseError } from '@/errors';
export { convertMillisecondsToTimestamp, getCurrentTimestamp } from '@/timestamp'; // TODO: Review, do we need it now we have removed Firebase?
export { convertODataTypeIdToUsageTypeId } from '@/appUtilities';
export { extractExtensionFromPath, extractNameFromPath } from '@/appUtilities';
export { formatNumberAsDecimalNumber, formatNumberAsDuration, formatNumberAsSize, formatNumberAsStorageSize, formatNumberAsWholeNumber } from '@/appUtilities';
export { getDataFormats, getRecordDelimiters, getValueDelimiters } from '@/component/dataView';
export { getComponentStatus } from '@/component';
export { lookupMimeTypeForExtension } from '@/appUtilities';

// Utilities - Development.
export { buildConnectorConfig, buildContextConfig, buildInformerConfig, buildPresenterConfig, bumpVersion, syncWithGitHub } from '@/devUtilities';
