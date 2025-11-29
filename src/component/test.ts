type ComponentStatus = { id: string; color: StatusColorId; label: string };
type ComponentStatusId = 'alpha' | 'beta' | 'generalAvailability' | 'notApplicable' | 'preAlpha' | 'proposed' | 'releaseCandidate' | 'unavailable' | 'underReview';
type ComponentTypeId =
    | 'app'
    | 'connector'
    | 'connectorConnection'
    | 'context'
    | 'contextModelGroup'
    | 'contextModel'
    | 'contextModelDimensionGroup'
    | 'contextModelDimension'
    | 'contextModelDimensionHierarchy'
    | 'contextModelEntityGroup'
    | 'contextModelEntity'
    | 'contextModelEntityDataItem'
    | 'contextModelEntityEvent'
    | 'contextModelEntityPrimaryMeasure'
    | 'contextModelSecondaryMeasureGroup'
    | 'contextModelSecondaryMeasure'
    | 'dataView'
    | 'dimension'
    | 'engine'
    | 'eventQuery'
    | 'presenter'
    | 'presenterPresentation'
    | 'tool';
type LocaleCode = 'en-au' | 'en-gb' | 'en-us' | 'es-es';
type LocalisedString = Record<LocaleCode, string>;
type StatusColorId = 'amber' | 'green' | 'red' | 'other';
type Timestamp = number;

interface ComponentConfig {
    id: string;
    label: Partial<LocalisedString>;
    description: Partial<LocalisedString>;
    firstCreatedAt?: Timestamp;
    icon?: string;
    iconDark?: string;
    lastUpdatedAt?: Timestamp;
    status?: ComponentStatus;
    statusId: ComponentStatusId;
    typeId: ComponentTypeId;
}
interface ModuleConfig extends ComponentConfig {
    typeId: ModuleTypeId;
    version: string;
}
type ModuleTypeId = 'app' | 'engine' | 'connector' | 'context' | 'presenter' | 'tool';

type ConnectorCategory = { id: string; label: string };
export type ConnectorImplementation = {
    activeConnectionCount?: number;
    canDescribe?: boolean;
    id?: string;
    authMethodId: 'apiKey' | 'disabled' | 'oAuth2' | 'none';
    label?: LocalisedString;
    maxConnectionCount?: number;
    params?: Record<string, string>[];
};

type ConnectorModuleCategoryId = 'application' | 'curatedDataset' | 'database' | 'fileStore';
type ConnectorOperation =
    | 'abortOperation'
    | 'authenticateConnection'
    | 'createObject'
    | 'describeConnection'
    | 'dropObject'
    | 'findObject'
    | 'getRecord'
    | 'listNodes'
    | 'previewObject'
    | 'removeRecords'
    | 'retrieveRecords'
    | 'upsertRecords';
type ConnectorUsageId = 'bidirectional' | 'destination' | 'source' | 'unknown';

export interface ConnectorConfig extends ModuleConfig {
    category?: ConnectorCategory;
    categoryId: ConnectorModuleCategoryId;
    implementations: Record<string, ConnectorImplementation>;
    operations: ConnectorOperation[];
    typeId: 'connector';
    usageId: ConnectorUsageId;
    vendorAccountURL?: string;
    vendorDocumentationURL?: string;
    vendorHomeURL?: string;
}
