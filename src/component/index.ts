/**
 * Component.
 */

/** Vendor dependencies. */
import type { InferOutput } from 'valibot';

/** Framework dependencies. */
import { DEFAULT_LOCALE_CODE } from '@/index';
import type {
    componentConfigSchema,
    componentStatusColorIdSchema,
    componentStatusIdSchema,
    componentStatusSchema,
    componentTypeIdSchema
} from '@/component/componentConfig.schema';
import type { LocaleCode, LocalisedString } from '@/index';

/** Component. */
interface Component {
    readonly config: ComponentConfig;
}

// Types/Interfaces/Operations - Component configuration.
type ComponentConfig = InferOutput<typeof componentConfigSchema>;
type ComponentStatus = InferOutput<typeof componentStatusSchema>;
type ComponentStatusColorId = InferOutput<typeof componentStatusColorIdSchema>;
type ComponentStatusId = InferOutput<typeof componentStatusIdSchema>;
type ComponentTypeId = InferOutput<typeof componentTypeIdSchema>;

// Types/Interfaces/Operations - Component reference.
interface ComponentReference {
    id: string;
    label: Partial<LocalisedString>;
    description: Partial<LocalisedString>;
    icon: string | null;
    iconDark: string | null;
    order: number;
    path: string;
}

// Types/Interfaces/Operations - Component status.
// interface ComponentStatus {
//     id: string;
//     color: ComponentStatusColorId;
//     label: string;
// }
// type ComponentStatusId = 'alpha' | 'beta' | 'generalAvailability' | 'notApplicable' | 'preAlpha' | 'proposed' | 'releaseCandidate' | 'unavailable' | 'underReview';
type LocaleLabelMap = ReadonlyMap<string, string>;
const createLocaleLabelMap = (labels: Partial<LocalisedString>): LocaleLabelMap => {
    const filteredEntries = Object.entries(labels).filter((entry): entry is [string, string] => typeof entry[1] === 'string');
    return new Map(filteredEntries);
};
const resolveLocaleLabel = (labels: LocaleLabelMap, localeId: LocaleCode, fallbackLocaleId = DEFAULT_LOCALE_CODE): string | undefined => {
    const localizedLabel = labels.get(localeId);
    if (localizedLabel !== undefined) return localizedLabel;
    if (fallbackLocaleId === localeId) return undefined;
    return labels.get(fallbackLocaleId);
};
interface ComponentStatusConfig {
    id: string;
    color: ComponentStatusColorId;
    labels: LocaleLabelMap;
}
const componentStatuses: ComponentStatusConfig[] = [
    { id: 'alpha', color: 'red', labels: createLocaleLabelMap({ 'en-gb': 'alpha' }) },
    { id: 'beta', color: 'amber', labels: createLocaleLabelMap({ 'en-gb': 'beta' }) },
    { id: 'generalAvailability', color: 'green', labels: createLocaleLabelMap({ 'en-gb': '' }) },
    { id: 'notApplicable', color: 'green', labels: createLocaleLabelMap({ 'en-gb': 'not-applicable' }) },
    { id: 'preAlpha', color: 'red', labels: createLocaleLabelMap({ 'en-gb': 'pre-alpha' }) },
    { id: 'proposed', color: 'other', labels: createLocaleLabelMap({ 'en-gb': 'proposed' }) },
    { id: 'releaseCandidate', color: 'green', labels: createLocaleLabelMap({ 'en-gb': 'release-candidate' }) },
    { id: 'unavailable', color: 'other', labels: createLocaleLabelMap({ 'en-gb': 'unavailable' }) },
    { id: 'underReview', color: 'other', labels: createLocaleLabelMap({ 'en-gb': 'under-review' }) }
];
const getComponentStatus = (id: string, localeId: LocaleCode = DEFAULT_LOCALE_CODE): ComponentStatus => {
    const componentStatus = componentStatuses.find((componentStatus) => componentStatus.id === id);
    if (componentStatus) {
        const resolvedLabel = resolveLocaleLabel(componentStatus.labels, localeId);
        return { id: componentStatus.id, color: componentStatus.color, label: resolvedLabel ?? componentStatus.id };
    }
    return { id, color: 'other', label: id };
};

//
//  type ComponentStatusColorId = 'amber' | 'green' | 'red' | 'other';

// Types/Interfaces/Operations - Component type identifier.
// type ComponentTypeId =
//     | 'app'
//     | 'connector'
//     | 'connectorConnection'
//     | 'context'
//     | 'contextModelGroup'
//     | 'contextModel'
//     | 'contextModelDimensionGroup'
//     | 'contextModelDimension'
//     | 'contextModelDimensionHierarchy'
//     | 'contextModelEntityGroup'
//     | 'contextModelEntity'
//     | 'contextModelEntityDataItem'
//     | 'contextModelEntityEvent'
//     | 'contextModelEntityPrimaryMeasure'
//     | 'contextModelSecondaryMeasureGroup'
//     | 'contextModelSecondaryMeasure'
//     | 'dataView'
//     | 'dimension'
//     | 'engine'
//     | 'eventQuery'
//     | 'presenter'
//     | 'presenterPresentation'
//     | 'tool';

/** Exports */
export { getComponentStatus };
export { componentConfigSchema } from '@/component/componentConfig.schema';
export type { Component, ComponentConfig, ComponentReference, ComponentStatus, ComponentStatusId, ComponentTypeId, ComponentStatusColorId };
export type { ModuleConfig, ModuleTypeId } from '@/component/module';
