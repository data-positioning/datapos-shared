import { InferOutput } from 'valibot';
import { componentConfigSchema, componentStatusSchema } from './componentConfig.schema';
import { LocaleCode } from '../index';
/** Component. */
interface Component {
    readonly config: ComponentConfig;
}
type ComponentConfig = InferOutput<typeof componentConfigSchema>;
type ComponentStatus = InferOutput<typeof componentStatusSchema>;
declare function getComponentStatus(id: string, localeId?: LocaleCode): ComponentStatus;
/** Exports */
export { getComponentStatus };
export { componentConfigSchema } from './componentConfig.schema';
export type { Component, ComponentConfig };
export type { ModuleConfig, ModuleTypeId } from './module';
