/**
 * Shared composables, constants, errors, interfaces, schemas, types and utilities.
 */

/** Interfaces/Types */
export type LocaleCode = 'en-au' | 'en-gb' | 'en-us' | 'es-es';
export type LocalisedString = Record<LocaleCode, string>;

/** Interfaces/Types - Context. */
export { contextConfigSchema } from '@/component/context';
export type { Context, ContextConfig, ContextLocalisedConfig, ContextListSettings, ContextListResult, ContextOperation, ContextCallbackData } from '@/component/context';

/** Interfaces/Types - Context model. */
export type { ContextModelGroupConfig, ContextModelGroupLocalisedConfig, ContextModelConfig, ContextModelLocalisedConfig } from '@/component/context';

/** Interfaces/Types - Context model dimension. */
export type {
    ContextModelDimensionGroupConfig,
    ContextModelDimensionGroupLocalisedConfig,
    ContextModelDimensionConfig,
    ContextModelDimensionLocalisedConfig,
    ContextModelDimensionHierarchyConfig,
    ContextModelDimensionHierarchyLocalisedConfig
} from '@/component/context';

/** Interfaces/Types - Context model entity. */
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

/** Interfaces/Types - Context model secondary measure. */
export type {
    ContextModelSecondaryMeasureGroupConfig,
    ContextModelSecondaryMeasureGroupLocalisedConfig,
    ContextModelSecondaryMeasureConfig,
    ContextModelSecondaryMeasureLocalisedConfig
} from '@/component/context';

/** Interfaces/Types - Context Operator Settings */
export interface ContextOperationSettings {
    accountId?: string;
    appCheckToken?: string;
    sessionAccessToken?: string;
}

/** Interfaces/Types - Data view. */
export type { DataFormatId, EncodingConfig, RecordDelimiterId, ValueDelimiterId } from '@/component/dataView';
export type {
    DataViewConfig,
    DataViewContentAuditConfig,
    DataViewLocalisedConfig,
    DataViewPreviewConfig,
    DataViewRelationshipsAuditConfig,
    ParsedValue
} from '@/component/dataView';

/** Interfaces/Types - Dimension. */
export type { DimensionConfig, DimensionLocalisedConfig } from '@/component/dimension';

//#region Error

/** Interfaces/Types */
export type { SerialisedError } from '@/errors';

/** Errors */
// export { APIError, ApplicationError, EngineError, FetchError, OperationalError, VueHandledError, WindowHandledRuntimeError, WindowHandledPromiseRejectionError } from '@/errors';

/** Utilities */
// export { buildFetchError, concatenateSerialisedErrorMessages, normalizeToError, serialiseError } from '@/errors';

//#endregion

/** Interfaces/Types - Event query. */
export type { EventQueryConfig, EventQueryLocalisedConfig } from '@/component/eventQuery';

//#region Presenter Component

/** Interfaces/Types */
export { presenterConfigSchema } from '@/component/presenter';
export type { Presenter, PresenterConfig, PresenterLocalisedConfig, PresenterOperation } from '@/component/presenter';

/** Interfaces/Types - Presenter presentation. */
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

//#endregion

//#region Tool

// export type { ToolConfig } from '@/component/tool';

//#endregion

/** Composables */
export { type CytoscapeJSView, useCytoscapeJS } from '@/composables/useCytoscapeJS';
export { useDataTable } from '@/composables/useDataTable';

/** Constants */
export const DEFAULT_LOCALE_CODE: LocaleCode = 'en-gb';

/** Utilities */
// export { convertODataTypeIdToUsageTypeId } from '@/utilities';
// export { extractExtensionFromPath, extractNameFromPath } from '@/utilities';
// export { formatNumberAsDecimalNumber, formatNumberAsDuration, formatNumberAsSize, formatNumberAsStorageSize, formatNumberAsWholeNumber } from '@/utilities';
export { getDataFormats, getRecordDelimiters, getValueDelimiters } from '@/component/dataView';
// export { getComponentStatus } from '@/component';
// export { lookupMimeTypeForExtension } from '@/utilities';
