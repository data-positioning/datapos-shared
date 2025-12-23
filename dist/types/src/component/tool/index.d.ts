import { ModuleConfig } from '../module';
/** Tool configuration. */
interface ToolConfig extends ModuleConfig {
    typeId: 'tool';
}
/** Load tool. */
declare function loadTool<T>(toolConfigs: ToolConfig[], toolId: string): Promise<T>;
/** Exports. */
export { loadTool };
export type { ToolConfig };
