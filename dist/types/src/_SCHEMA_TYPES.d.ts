type ComponentStatus = {
    id: string;
    color: StatusColorId;
    label: string;
};
type ComponentStatusId = 'alpha' | 'beta' | 'generalAvailability' | 'notApplicable' | 'preAlpha' | 'proposed' | 'releaseCandidate' | 'unavailable' | 'underReview';
type ComponentTypeId = 'app' | 'connector' | 'connectorConnection' | 'context' | 'contextModelGroup' | 'contextModel' | 'contextModelDimensionGroup' | 'contextModelDimension' | 'contextModelDimensionHierarchy' | 'contextModelEntityGroup' | 'contextModelEntity' | 'contextModelEntityDataItem' | 'contextModelEntityEvent' | 'contextModelEntityPrimaryMeasure' | 'contextModelSecondaryMeasureGroup' | 'contextModelSecondaryMeasure' | 'dataView' | 'dimension' | 'engine' | 'eventQuery' | 'presenter' | 'presenterPresentation' | 'tool';
type StatusColorId = 'amber' | 'green' | 'red' | 'other';
type Timestamp = number;
interface ComponentConfig {
    id: string;
    label: Record<string, string>;
    description: Record<string, string>;
    firstCreatedAt?: Timestamp;
    icon?: string;
    iconDark?: string;
    lastUpdatedAt?: Timestamp;
    status?: ComponentStatus;
    statusId: ComponentStatusId;
    typeId: ComponentTypeId;
}
type ComponentRef = {
    id: string;
    label: Record<string, string>;
    description: Record<string, string>;
    icon?: string;
    iconDark?: string;
    order: number;
    path: string;
};
interface ModuleConfig extends ComponentConfig {
    typeId: ModuleTypeId;
    version: string;
}
type ModuleTypeId = 'app' | 'engine' | 'connector' | 'context' | 'presenter' | 'tool';
export interface PresenterConfig extends ModuleConfig {
    presentations: ComponentRef[];
    operations: PresenterOperation[];
    typeId: 'presenter';
}
type PresenterOperation = 'list' | 'render' | 'setColorMode';
export {};
