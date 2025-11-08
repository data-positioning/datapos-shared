import { Timestamp } from '../timestamp';
import { LocaleCode, LocalisedString, StatusColorId } from '../index';
export interface Component {
    readonly config: ComponentConfig;
}
export interface ComponentConfig {
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
export type ComponentTypeId = 'connector' | 'connectorConnection' | 'context' | 'contextModelGroup' | 'contextModel' | 'contextModelDimensionGroup' | 'contextModelDimension' | 'contextModelDimensionHierarchy' | 'contextModelEntityGroup' | 'contextModelEntity' | 'contextModelEntityDataItem' | 'contextModelEntityEvent' | 'contextModelEntityPrimaryMeasure' | 'contextModelSecondaryMeasureGroup' | 'contextModelSecondaryMeasure' | 'dataView' | 'dimension' | 'eventQuery' | 'presenter' | 'presenterPresentation' | 'informer' | 'informerDocument';
export type ComponentRef = {
    id: string;
    label: Partial<LocalisedString>;
    description: Partial<LocalisedString>;
    order: number;
    path: string;
};
export type ComponentStatus = {
    id: string;
    color: StatusColorId;
    label: string;
};
export type ComponentStatusId = 'alpha' | 'beta' | 'generalAvailability' | 'notApplicable' | 'preAlpha' | 'proposed' | 'releaseCandidate' | 'unavailable' | 'underReview';
export declare const getComponentStatus: (id: string, localeId?: LocaleCode) => ComponentStatus;
