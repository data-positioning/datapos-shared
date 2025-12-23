import { InferOutput } from 'valibot';
import { componentConfigSchema, componentReferenceSchema, componentStatusColorIdSchema, componentStatusIdSchema, componentStatusSchema, componentTypeIdSchema } from './componentConfig.schema';
import { LocaleCode } from '../index';
/** Component. */
interface Component {
    readonly config: ComponentConfig;
}
/** */
type ComponentConfig = InferOutput<typeof componentConfigSchema>;
type ComponentReference = InferOutput<typeof componentReferenceSchema>;
type ComponentStatus = InferOutput<typeof componentStatusSchema>;
type ComponentStatusColorId = InferOutput<typeof componentStatusColorIdSchema>;
type ComponentStatusId = InferOutput<typeof componentStatusIdSchema>;
type ComponentTypeId = InferOutput<typeof componentTypeIdSchema>;
declare function getComponentStatus(id: string, localeId?: LocaleCode): ComponentStatus;
/** Exports */
export { getComponentStatus };
export { componentConfigSchema } from './componentConfig.schema';
export type { Component, ComponentConfig, ComponentReference, ComponentStatus, ComponentStatusId, ComponentTypeId, ComponentStatusColorId };
export type { ModuleConfig, ModuleTypeId } from './module';
