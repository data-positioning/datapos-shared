// Dependencies - Framework.
import type { Timestamp } from '@/timestamp';
import { DEFAULT_LOCALE_CODE, type LocaleCode, type LocalisedString, type StatusColorId } from '@/index';

// Interfaces/Types - Component configuration.
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

// Interfaces/Types - Component references.
export interface ComponentRef {
    id: string;
    label: Partial<LocalisedString>;
    description: Partial<LocalisedString>;
    order: number;
    path: string;
}

// Interfaces/Types/Operations - Component status.
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

// Interfaces/Types/Operations - Component type.
export type ComponentTypeId =
    | 'app'
    | 'engine'
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
    | 'contextModelEntityDataItems'
    | 'contextModelEntityEvent'
    | 'contextModelEntityPrimaryMeasure'
    | 'contextModelSecondaryMeasureGroup'
    | 'contextModelSecondaryMeasure'
    | 'contextModelPresentationGroup'
    | 'contextModelPresentation'
    | 'dataView'
    | 'dimension'
    | 'eventQuery'
    | 'presenter'
    | 'presenterPresentation'
    | 'informer'
    | 'informerDocument';
