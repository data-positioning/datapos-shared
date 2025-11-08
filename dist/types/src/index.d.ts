/**
 * Shared composables, constants, interfaces, errors, types and utilities.
 */
export type LocaleCode = 'en-au' | 'en-gb' | 'en-us' | 'es-es';
export type LocalisedString = Record<LocaleCode, string>;
export type StatusColorId = 'amber' | 'green' | 'red' | 'other';
export type { ModuleConfig } from './module';
export type { AppModuleConfig } from './module';
export type { ConnectorModuleConfig, ConnectorModuleOperation, ConnectorModuleUsageId } from './module';
export type { ContextModuleConfig, ContextModuleOperation } from './module';
export type { EngineModuleConfig } from './module';
export type { InformerModuleConfig, InformerModuleOperation } from './module';
export type { PresenterModuleConfig, PresenterModuleOperation } from './module';
export { CONNECTOR_DESTINATION_OPERATIONS, CONNECTOR_SOURCE_OPERATIONS } from './module';
export type { ComponentConfig, ComponentRef, ComponentStatus, ComponentStatusId, ComponentTypeId } from './component';
export type { AuditContentResult, AuditContentSettings } from './component/connector';
export type { Connector, ConnectorCallbackData, ConnectorConfig, ConnectorImplementation, ConnectorOperationSettings, ConnectorLocalisedConfig, ConnectorTools } from './component/connector';
export type { CreateSettings } from './component/connector';
export type { DropSettings } from './component/connector';
export type { FindResult, FindSettings } from './component/connector';
export type { GetResult, GetSettings } from './component/connector';
export type { InitialiseSettings } from './component/connector';
export type { ListResult, ListSettings } from './component/connector';
export type { PreviewResult, PreviewSettings } from './component/connector';
export type { RemoveSettings } from './component/connector';
export type { RetrieveResult, RetrieveSettings, RetrieveSummary } from './component/connector';
export type { UpsertSettings } from './component/connector';
export type { ConnectionAuthorizationConfig, ConnectionColumnConfig, ConnectionConfig, ConnectionNodeConfig } from './component/connector/connection';
export type { DPAFileSystemFileHandle, Encoding, StorageTypeId, UsageTypeId } from './component/connector/connection';
export type { Context, ContextConfig, ContextLocalisedConfig, ContextListSettings, ContextListResult, ContextModelGroupConfig, ContextModelGroupLocalisedConfig, ContextModelConfig, ContextModelLocalisedConfig, ContextModelDimensionGroupConfig, ContextModelDimensionGroupLocalisedConfig, ContextModelDimensionConfig, ContextModelDimensionLocalisedConfig, ContextModelDimensionHierarchyConfig, ContextModelDimensionHierarchyLocalisedConfig, ContextModelEntityGroupConfig, ContextModelEntityGroupLocalisedConfig, ContextModelEntityConfig, ContextModelEntityLocalisedConfig, ContextModelEntityDataItemConfig, // Data items.
ContextModelEntityDataItemLocalisedConfig, ContextModelEntityEventConfig, // Events.
ContextModelEntityEventLocalisedConfig, ContextModelEntityPrimaryMeasureConfig, // Primary measures.
ContextModelEntityPrimaryMeasureLocalisedConfig, ContextModelSecondaryMeasureGroupConfig, ContextModelSecondaryMeasureGroupLocalisedConfig, ContextModelSecondaryMeasureConfig, ContextModelSecondaryMeasureLocalisedConfig } from './component/context';
export type { DataFormatId, EncodingConfig, RecordDelimiterId, ValueDelimiterId } from './component/dataView';
export type { DataViewConfig, DataViewContentAuditConfig, DataViewLocalisedConfig, DataViewPreviewConfig, DataViewRelationshipsAuditConfig, ParsedValue } from './component/dataView';
export type { DimensionConfig, DimensionLocalisedConfig } from './component/dimension';
export type { ConnectorInterfaceResult, ContextInterfaceResult, Engine, EngineWorker } from './engine';
export type { SerialisedError } from './errors';
export type { EventQueryConfig, EventQueryLocalisedConfig } from './component/eventQuery';
export type { Presenter, PresenterConfig, PresenterLocalisedConfig, PresenterTools } from './component/presenter';
export type { PresentationConfig, PresentationView } from './component/presenter';
export type { PresentationVisualConfig, PresentationVisualContentConfig, PresentationVisualViewConfig, PresentationVisualCartesianViewConfig, PresentationVisualChordDiagramViewConfig, PresentationVisualPolarViewConfig, PresentationVisualRangeViewConfig, PresentationVisualSankeyDiagramViewConfig, PresentationVisualStreamgraphViewConfig, PresentationVisualValuesViewConfig } from './component/presenter';
export type { PresentationVisualViewType, PresentationVisualCartesianViewType, PresentationVisualChordViewType, PresentationVisualPolarViewType, PresentationVisualRangeViewType, PresentationVisualSankeyDiagramViewType, PresentationVisualStreamgraphViewType, PresentationVisualValuesViewType } from './component/presenter';
export type { Recipe, RecipeConfig, RecipeLocalisedConfig } from './component/informer/recipe';
export interface ContextOperationSettings {
    accountId?: string;
    appCheckToken?: string;
    sessionAccessToken?: string;
}
export type { Timestamp } from './timestamp';
export type { TutorialConfig } from './component/informer/tutorial';
export declare const DEFAULT_LOCALE_CODE: LocaleCode;
export { DefaultTimestamp } from './timestamp';
export { presentationViewTypeMap } from './component/presenter';
export { type CytoscapeJSView, useCytoscapeJS } from './composables/useCytoscapeJS';
export { useDataTable } from './composables/useDataTable';
export { type HighchartsView, useHighcharts } from './composables/useHighcharts';
export { APIError, ApplicationError, EngineError, FetchError, OperationalError, VueError, WindowRuntimeError, WindowPromiseRejectionError } from './errors';
export { buildFetchError, concatenateSerialisedErrorMessages, normalizeToError, serialiseError } from './errors';
export { convertMillisecondsToTimestamp, getCurrentTimestamp } from './timestamp';
export { convertODataTypeIdToUsageTypeId } from './appUtilities';
export { extractExtensionFromPath, extractNameFromPath } from './appUtilities';
export { formatNumberAsDecimalNumber, formatNumberAsDuration, formatNumberAsSize, formatNumberAsStorageSize, formatNumberAsWholeNumber } from './appUtilities';
export { getDataFormats, getRecordDelimiters, getValueDelimiters } from './component/dataView';
export { getComponentStatus } from './component';
export { lookupMimeTypeForExtension } from './appUtilities';
