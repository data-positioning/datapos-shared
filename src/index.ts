// Interfaces/Types
export type LocaleCode = 'en-au' | 'en-gb' | 'en-us' | 'es-es';
export type LocalisedString = Record<LocaleCode, string>;
export type StatusColorId = 'amber' | 'green' | 'red' | 'other';

// Constants
export const DEFAULT_LOCALE_CODE: LocaleCode = 'en-gb';
export { DefaultTimestamp } from '@/timestamp'; // TODO: Review, do we need it now we have removed Firebase?

// Interfaces/Types - Component.
export type { ComponentConfig, ComponentRef, ComponentStatus, ComponentStatusId, ComponentTypeId } from '@/component';

// Interfaces/Types - Connector.
export type { AuditContentResult, AuditContentSettings } from '@/connector';
export type { Connector, ConnectorCallbackData, ConnectorConfig, ConnectorImplementation, ConnectorOperationSettings, ConnectorLocalisedConfig, ConnectorTools } from '@/connector';
export type { CreateSettings } from '@/connector';
export type { DropSettings } from '@/connector';
export type { FindResult, FindSettings } from '@/connector';
export type { GetResult, GetSettings } from '@/connector';
export type { InitialiseSettings } from '@/connector';
export type { ListResult, ListSettings } from '@/connector';
export type { PreviewResult, PreviewSettings } from '@/connector';
export type { RemoveSettings } from '@/connector';
export type { RetrieveResult, RetrieveSettings, RetrieveSummary } from '@/connector';
export type { UpsertSettings } from '@/connector';

// Interfaces/Types - Connector connection.
export type { ConnectionAuthorizationConfig, ConnectionColumnConfig, ConnectionConfig, ConnectionNodeConfig } from '@/connection';
export type { DPAFileSystemFileHandle, Encoding, StorageTypeId, UsageTypeId } from '@/connection';

// Interfaces/Types - Context.
export type {
    Context,
    ContextConfig,
    ContextFocusConfig,
    ContextFocusConfigListResult,
    ContextFocusConfigListSettings,
    ContextModelConfig,
    ContextDimensionConfig,
    ContextDimensionGroupConfig,
    ContextEntityCharacteristicConfig,
    ContextEntityGroupConfig,
    ContextEntityComputationConfig,
    ContextSecondaryMeasureGroupConfig,
    ContextViewGroupConfig,
    ContextFocusLocalisedConfig
} from '@/context';
export type { ContextEntityConfig, ContextEntityEventConfig, ContextHierarchyConfig, ContextViewConfig, Event } from '@/context';

// Interfaces/Types - Data view.
export type { DataFormatId, EncodingConfig, RecordDelimiterId, ValueDelimiterId } from '@/dataView';
export type { DataViewConfig, DataViewContentAuditConfig, DataViewLocalisedConfig, DataViewPreviewConfig, DataViewRelationshipsAuditConfig, ParsedValue } from '@/dataView';

// Interfaces/Types - Dimension.
export type { DimensionConfig, DimensionLocalisedConfig } from '@/dimension';

// Interfaces/Types - Engine.
export type { ConnectorInterfaceResult, ContextInterfaceResult, Engine, EngineWorker } from '@/engine';

// Interfaces/Types - Error.
export type { SerialisedError } from '@/errors';

// Interfaces/Types - Event query.
export type { EventQueryConfig, EventQueryLocalisedConfig } from '@/eventQuery';

// Interfaces/Types - Presenter.
export type { Presenter, PresenterConfig, PresenterLocalisedConfig, PresenterTools } from '@/presenter';
export type { PresentationConfig, PresentationView } from '@/presenter';

// Interfaces/Types - Presenter presentation.

// Interfaces/Types - Informer.

// Interfaces/Types - Informer document.
export type { Recipe, RecipeConfig, RecipeLocalisedConfig } from '@/recipe';

// Interfaces/Types - Service.
export type { ServiceData } from '@/service';

// Interfaces/Types - State.
export type { StateConfig } from '@/state';

// Interfaces/Types - Timestamp.
export type { Timestamp } from '@/timestamp'; // TODO: Review, do we need it now we have removed Firebase?

// Interfaces/Types - Tutorial.
export type { TutorialConfig } from '@/tutorial';

// Errors
export { APIError, ApplicationError, EngineError, FetchError, OperationalError, VueError, WindowRuntimeError, WindowPromiseRejectionError } from '@/errors';

// Operations
export { buildFetchError, concatenateSerialisedErrorMessages, normalizeToError, serialiseError } from '@/errors';
export { convertMillisecondsToTimestamp, getCurrentTimestamp } from '@/timestamp'; // TODO: Review, do we need it now we have removed Firebase?
export { convertODataTypeIdToUsageTypeId } from '@/utilities';
export { extractExtensionFromPath, extractNameFromPath } from '@/utilities';
export { formatNumberAsDecimalNumber, formatNumberAsDuration, formatNumberAsSize, formatNumberAsStorageSize, formatNumberAsWholeNumber } from '@/utilities';
export { getDataFormats, getRecordDelimiters, getValueDelimiters } from '@/dataView';
export { getComponentStatus } from '@/component';
export { lookupMimeTypeForExtension } from '@/utilities';
