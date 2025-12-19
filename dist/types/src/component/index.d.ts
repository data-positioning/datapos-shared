import { InferOutput } from 'valibot';
import { componentConfigSchema } from './componentConfig.schema';
import { LocaleCode, LocalisedString } from '../index';
export interface Component {
    readonly config: ComponentConfig;
}
export type ComponentConfig = InferOutput<typeof componentConfigSchema>;
export interface ComponentConfig1 {
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
export interface ComponentReference {
    id: string;
    label: Partial<LocalisedString>;
    description: Partial<LocalisedString>;
    icon: string | null;
    iconDark: string | null;
    order: number;
    path: string;
}
export interface ComponentStatus {
    id: string;
    color: ComponentStatusColorId;
    label: string;
}
export type ComponentStatusId = 'alpha' | 'beta' | 'generalAvailability' | 'notApplicable' | 'preAlpha' | 'proposed' | 'releaseCandidate' | 'unavailable' | 'underReview';
export declare const getComponentStatus: (id: string, localeId?: LocaleCode) => ComponentStatus;
export type ComponentStatusColorId = 'amber' | 'green' | 'red' | 'other';
export type ComponentTypeId = 'app' | 'connector' | 'connectorConnection' | 'context' | 'contextModelGroup' | 'contextModel' | 'contextModelDimensionGroup' | 'contextModelDimension' | 'contextModelDimensionHierarchy' | 'contextModelEntityGroup' | 'contextModelEntity' | 'contextModelEntityDataItem' | 'contextModelEntityEvent' | 'contextModelEntityPrimaryMeasure' | 'contextModelSecondaryMeasureGroup' | 'contextModelSecondaryMeasure' | 'dataView' | 'dimension' | 'engine' | 'eventQuery' | 'presenter' | 'presenterPresentation' | 'tool';
export interface ModuleConfig extends ComponentConfig {
    typeId: ModuleTypeId;
    version: string;
}
export type ModuleTypeId = 'app' | 'engine' | 'connector' | 'context' | 'presenter' | 'tool';
export { componentConfigSchema } from './componentConfig.schema';
