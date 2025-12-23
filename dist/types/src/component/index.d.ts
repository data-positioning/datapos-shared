import { InferOutput } from 'valibot';
import { componentConfigSchema, componentStatusColorIdSchema, componentStatusIdSchema, componentStatusSchema, componentTypeIdSchema } from './componentConfig.schema';
import { LocaleCode, LocalisedString } from '../index';
/** Component. */
interface Component {
    readonly config: ComponentConfig;
}
type ComponentConfig = InferOutput<typeof componentConfigSchema>;
type ComponentStatus = InferOutput<typeof componentStatusSchema>;
type ComponentStatusColorId = InferOutput<typeof componentStatusColorIdSchema>;
type ComponentStatusId = InferOutput<typeof componentStatusIdSchema>;
type ComponentTypeId = InferOutput<typeof componentTypeIdSchema>;
interface ComponentReference {
    id: string;
    label: Partial<LocalisedString>;
    description: Partial<LocalisedString>;
    icon: string | null;
    iconDark: string | null;
    order: number;
    path: string;
}
declare const getComponentStatus: (id: string, localeId?: LocaleCode) => ComponentStatus;
/** Exports */
export { getComponentStatus };
export { componentConfigSchema } from './componentConfig.schema';
export type { Component, ComponentConfig, ComponentReference, ComponentStatus, ComponentStatusId, ComponentTypeId, ComponentStatusColorId };
export type { ModuleConfig, ModuleTypeId } from './module';
