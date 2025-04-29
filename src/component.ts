// Dependencies - Framework
import type { Timestamp } from './timestamp';

// Interfaces/Types - Component Configuration
export interface ComponentConfig extends Record<string, unknown> {
    description?: Record<string, string>;
    firstCreatedAt?: Timestamp;
    id: string;
    label: Record<string, string>;
    lastUpdatedAt?: Timestamp;
    logo?: string;
    status?: ComponentStatus;
    statusId: 'alpha' | 'beta' | 'generalAvailability' | 'notApplicable' | 'preAlpha' | 'proposed' | 'releaseCandidate' | 'unavailable' | 'underReview';
    typeId: 'connection' | 'connector' | 'focus' | 'model' | 'dataView' | 'eventQuery' | 'presentation' | 'presenter' | 'tutorial'; // TODO: Review these.
}

// Interfaces/Types - Component Status
export type ComponentStatus = { id: string; color?: string; label: string };
type ComponentStatusConfig = { id: string; color?: string; label: Record<string, string> };
const componentStatuses: ComponentStatusConfig[] = [
    { id: 'alpha', color: '#d62728', label: { en: 'alpha' } },
    { id: 'beta', color: '#8c564b', label: { en: 'beta' } },
    { id: 'generalAvailability', label: { en: '' } },
    { id: 'notApplicable', label: { en: 'not-applicable' } },
    { id: 'preAlpha', color: '#d62728', label: { en: 'pre-alpha' } },
    { id: 'proposed', color: '#666666', label: { en: 'proposed' } },
    { id: 'releaseCandidate', color: '#ff7f0e', label: { en: 'release-candidate' } },
    { id: 'unavailable', color: '#d62728', label: { en: 'unavailable' } },
    { id: 'underReview', color: '#666666', label: { en: 'under-review' } }
];
export const getComponentStatus = (id: string, localeId = 'en'): ComponentStatus => {
    const componentStatus = componentStatuses.find((componentStatus) => componentStatus.id === id);
    if (componentStatus) return { ...componentStatus, label: componentStatus.label[localeId] || componentStatus.label['en'] || id };
    return { id, color: '#d62728', label: id };
};
