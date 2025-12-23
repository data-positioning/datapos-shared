/**
 * Module composables, constants, errors, types/interfaces and utilities.
 */

/** Framework dependencies. */
import type { ModuleConfig } from '@/component';

/** Tool configuration. */
interface ToolConfig extends ModuleConfig {
    typeId: 'tool';
}
/** Load tool. */
async function loadTool<T>(toolConfigs: ToolConfig[], toolId: string): Promise<T> {
    console.log('loadToolForConnector', toolConfigs, toolId);
    const toolName = `datapos-tool-${toolId}`;
    const toolModuleConfig = toolConfigs.find((config) => config.id === toolName);
    if (!toolModuleConfig) throw new Error(`Connector could not load unknown tool '${toolId}'.`);

    const url = `https://engine-eu.datapos.app/tools/${toolId}_v${toolModuleConfig.version}/${toolName}.es.js`;
    const toolModule = (await import(/* @vite-ignore */ url)) as { Tool: new () => T };
    const toolInstance = new toolModule.Tool();
    return toolInstance;
}

export { loadTool, type ToolConfig };
