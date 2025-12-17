/**
 * Component composables, constants, errors, types/interfaces and utilities.
 */

// Dependencies - Framework.
import { DEFAULT_LOCALE_CODE, type LocaleCode, type LocalisedString, type StatusColorId } from '@/index';

// Types/Interfaces/Operations - Component.
export interface Component {
    readonly config: ComponentConfig;
}

// Types/Interfaces/Operations - Component configuration.
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

// Types/Interfaces/Operations - Component reference.
export type ComponentRef = {
    id: string;
    label: Partial<LocalisedString>;
    description: Partial<LocalisedString>;
    icon?: string;
    iconDark?: string;
    order: number;
    path: string;
};

// Types/Interfaces/Operations - Component status.
export type ComponentStatus = { id: string; color: StatusColorId; label: string };
export type ComponentStatusId = 'alpha' | 'beta' | 'generalAvailability' | 'notApplicable' | 'preAlpha' | 'proposed' | 'releaseCandidate' | 'unavailable' | 'underReview';
type ComponentStatusConfig = { id: string; color: StatusColorId; label: Partial<LocalisedString> };
const componentStatuses: ComponentStatusConfig[] = [
    { id: 'alpha', color: 'red', label: { 'en-gb': 'alpha' } },
    { id: 'beta', color: 'amber', label: { 'en-gb': 'beta' } },
    { id: 'generalAvailability', color: 'green', label: { 'en-gb': '' } },
    { id: 'notApplicable', color: 'green', label: { 'en-gb': 'not-applicable' } },
    { id: 'preAlpha', color: 'red', label: { 'en-gb': 'pre-alpha' } },
    { id: 'proposed', color: 'other', label: { 'en-gb': 'proposed' } },
    { id: 'releaseCandidate', color: 'green', label: { 'en-gb': 'release-candidate' } },
    { id: 'unavailable', color: 'other', label: { 'en-gb': 'unavailable' } },
    { id: 'underReview', color: 'other', label: { 'en-gb': 'under-review' } }
];
export const getComponentStatus = (id: string, localeId: LocaleCode = DEFAULT_LOCALE_CODE): ComponentStatus => {
    const componentStatus = componentStatuses.find((componentStatus) => componentStatus.id === id);
    if (componentStatus) return { ...componentStatus, label: componentStatus.label[localeId] || componentStatus.label[DEFAULT_LOCALE_CODE] || id };
    return { id, color: 'other', label: id };
};

// Types/Interfaces/Operations - Component type identifier.
export type ComponentTypeId =
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

// Types/Interfaces/Operations - Module configuration.
export interface ModuleConfig extends ComponentConfig {
    typeId: ModuleTypeId;
    version: string;
}

// Types/Interfaces/Operations - Module type identifier.
export type ModuleTypeId = 'app' | 'engine' | 'connector' | 'context' | 'presenter' | 'tool';
