import { InferOutput } from 'valibot';
import { componentConfigSchema, componentReferenceSchema, componentStatusSchema } from './componentConfig.schema';
import { LocaleCode } from '../locale';
/** Component. */
interface Component {
    readonly config: ComponentConfig;
}
type ComponentConfig = InferOutput<typeof componentConfigSchema>;
type ComponentReference = InferOutput<typeof componentReferenceSchema>;
type ComponentStatus = InferOutput<typeof componentStatusSchema>;
declare function getComponentStatus(id: string, localeId?: LocaleCode): ComponentStatus;
export { getComponentStatus };
export { componentConfigSchema } from './componentConfig.schema';
export type { Component, ComponentConfig, ComponentReference };
export type { ModuleConfig, ModuleTypeId } from './module';
