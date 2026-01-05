/**
 * Component.
 */

/** Vendor dependencies. */
import type { InferOutput } from 'valibot';

/** Framework dependencies. */
import { DEFAULT_LOCALE_CODE } from '@/locale';
import type { componentConfigSchema, componentReferenceSchema, componentStatusColorIdSchema, componentStatusSchema } from '@/component/componentConfig.schema';
import type { LocaleCode, LocalisedString } from '@/locale';

/** Component. */
interface Component {
    readonly config: ComponentConfig;
}

type ComponentConfig = InferOutput<typeof componentConfigSchema>;

type ComponentReference = InferOutput<typeof componentReferenceSchema>;

type ComponentStatus = InferOutput<typeof componentStatusSchema>;

type ComponentStatusColorId = InferOutput<typeof componentStatusColorIdSchema>;

const componentStatuses: { id: string; color: ComponentStatusColorId; labels: Partial<LocalisedString> }[] = [
    { id: 'alpha', color: 'red', labels: { 'en-gb': 'alpha' } },
    { id: 'beta', color: 'amber', labels: { 'en-gb': 'beta' } },
    { id: 'generalAvailability', color: 'green', labels: { 'en-gb': '' } },
    { id: 'notApplicable', color: 'green', labels: { 'en-gb': 'not-applicable' } },
    { id: 'preAlpha', color: 'red', labels: { 'en-gb': 'pre-alpha' } },
    { id: 'proposed', color: 'other', labels: { 'en-gb': 'proposed' } },
    { id: 'releaseCandidate', color: 'green', labels: { 'en-gb': 'release-candidate' } },
    { id: 'unavailable', color: 'other', labels: { 'en-gb': 'unavailable' } },
    { id: 'underReview', color: 'other', labels: { 'en-gb': 'under-review' } }
];

function getComponentStatus(id: string, localeId: LocaleCode = DEFAULT_LOCALE_CODE): ComponentStatus {
    const componentStatus = componentStatuses.find((componentStatus) => componentStatus.id === id);
    if (componentStatus) {
        // eslint-disable-next-line security/detect-object-injection
        const label = componentStatus.labels[localeId] ?? componentStatus.labels[DEFAULT_LOCALE_CODE] ?? componentStatus.id;
        return { id: componentStatus.id, color: componentStatus.color, label };
    }
    return { id, color: 'other', label: id };
}

// Exports.
export { getComponentStatus };
export { componentConfigSchema } from '@/component/componentConfig.schema';
export type { Component, ComponentConfig, ComponentReference };
export type { ModuleConfig, ModuleTypeId } from '@/component/module';
