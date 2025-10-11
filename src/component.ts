// Dependencies - Framework
import type { Timestamp } from './timestamp';

// Interfaces/Types - Component Configuration - TODO: Do we need to extend Record?
export interface ComponentConfig {
    description: Record<string, string>;
    firstCreatedAt?: Timestamp;
    id: string;
    label: Record<string, string>;
    lastUpdatedAt?: Timestamp;
    logo?: string;
    logoDark?: string;
    status?: ComponentStatus;
    statusId: ComponentStatusId;
    typeId: ComponentTypeId;
}

// Interfaces/Types - Component References
export interface ComponentRef {
    id: string;
    label: Record<string, string>;
}

export type ComponentTypeId = 'app' | 'connection' | 'connector' | 'engine' | 'focus' | 'model' | 'dataView' | 'eventQuery' | 'presentation' | 'presenter' | 'tutorial'; // TODO: Review these.

export type StatusColorId = 'amber' | 'red' | 'other';

// Interfaces/Types - Component Status
export type ComponentStatusId = 'alpha' | 'beta' | 'generalAvailability' | 'notApplicable' | 'preAlpha' | 'proposed' | 'releaseCandidate' | 'unavailable' | 'underReview';
export type ComponentStatus = { id: string; color?: StatusColorId; label: string };
type ComponentStatusConfig = { id: string; color?: StatusColorId; label: Record<string, string> };
const componentStatuses: ComponentStatusConfig[] = [
    { id: 'alpha', color: 'red', label: { en: 'alpha' } },
    { id: 'beta', color: 'amber', label: { en: 'beta' } },
    { id: 'generalAvailability', label: { en: '' } },
    { id: 'notApplicable', label: { en: 'not-applicable' } },
    { id: 'preAlpha', color: 'red', label: { en: 'pre-alpha' } },
    { id: 'proposed', color: 'other', label: { en: 'proposed' } },
    { id: 'releaseCandidate', label: { en: 'release-candidate' } },
    { id: 'unavailable', color: 'other', label: { en: 'unavailable' } },
    { id: 'underReview', color: 'other', label: { en: 'under-review' } }
];
export const getComponentStatus = (id: string, localeId = 'en'): ComponentStatus => {
    const componentStatus = componentStatuses.find((componentStatus) => componentStatus.id === id);
    if (componentStatus) return { ...componentStatus, label: componentStatus.label[localeId] || componentStatus.label['en'] || id };
    return { id, color: 'other', label: id };
};
