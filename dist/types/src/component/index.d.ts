import { InferOutput } from 'valibot';
import { componentConfigSchema, componentStatusColorIdSchema, componentStatusIdSchema, componentStatusSchema, componentTypeIdSchema } from './componentConfig.schema';
import { LocaleCode, LocalisedString } from '../index';
export interface Component {
    readonly config: ComponentConfig;
}
export type ComponentConfig = InferOutput<typeof componentConfigSchema>;
export type ComponentStatus = InferOutput<typeof componentStatusSchema>;
export type ComponentStatusColorId = InferOutput<typeof componentStatusColorIdSchema>;
export type ComponentStatusId = InferOutput<typeof componentStatusIdSchema>;
export type ComponentTypeId = InferOutput<typeof componentTypeIdSchema>;
export interface ComponentReference {
    id: string;
    label: Partial<LocalisedString>;
    description: Partial<LocalisedString>;
    icon: string | null;
    iconDark: string | null;
    order: number;
    path: string;
}
export declare const getComponentStatus: (id: string, localeId?: LocaleCode) => ComponentStatus;
export interface ModuleConfig extends ComponentConfig {
    typeId: ModuleTypeId;
    version: string;
}
export type ModuleTypeId = 'app' | 'engine' | 'connector' | 'context' | 'presenter' | 'tool';
/** Exposures */
export { componentConfigSchema } from './componentConfig.schema';
