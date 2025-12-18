import { InferInput } from 'valibot';
import { componentConfigSchema } from './componentConfig.schema';
import { LocaleCode, LocalisedString, StatusColorId } from '../index';
export { componentConfigSchema };
export type ComponentConfig2 = InferInput<typeof componentConfigSchema>;
export interface Component {
    readonly config: ComponentConfig;
}
export interface ComponentConfig {
    id: string;
    label: Partial<LocalisedString>;
    description: Partial<LocalisedString>;
    firstCreatedAt?: number;
    icon: string | null;
    iconDark: string | null;
    lastUpdatedAt: number | null;
    status: ComponentStatus | null;
    statusId: ComponentStatusId;
    typeId: ComponentTypeId;
}
export type ComponentRef = {
    id: string;
    label: Partial<LocalisedString>;
    description: Partial<LocalisedString>;
    icon?: string;
    iconDark?: string;
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
export type ComponentTypeId = 'app' | 'connector' | 'connectorConnection' | 'context' | 'contextModelGroup' | 'contextModel' | 'contextModelDimensionGroup' | 'contextModelDimension' | 'contextModelDimensionHierarchy' | 'contextModelEntityGroup' | 'contextModelEntity' | 'contextModelEntityDataItem' | 'contextModelEntityEvent' | 'contextModelEntityPrimaryMeasure' | 'contextModelSecondaryMeasureGroup' | 'contextModelSecondaryMeasure' | 'dataView' | 'dimension' | 'engine' | 'eventQuery' | 'presenter' | 'presenterPresentation' | 'tool';
export interface ModuleConfig extends ComponentConfig {
    typeId: ModuleTypeId;
    version: string;
}
export type ModuleTypeId = 'app' | 'engine' | 'connector' | 'context' | 'presenter' | 'tool';
