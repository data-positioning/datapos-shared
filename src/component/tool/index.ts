/**
 * Tool.
 */

// Framework dependencies.
import type { ModuleConfig } from '@/component/module';

/**
 * Tool configuration.
 */
interface ToolConfig extends ModuleConfig {
    typeId: 'tool';
}

/**
 * Load tool.
 */
async function loadTool<T>(toolConfigs: ToolConfig[], toolName: string): Promise<T> {
    const toolModuleConfig = toolConfigs.find((config) => config.id === toolName);
    if (!toolModuleConfig) throw new Error(`Connector could not load unknown tool '${toolName}'.`);

    const url = `https://engine-eu.datapos.app/tools/${toolName}_v${toolModuleConfig.version}/${toolName}.es.js`;
    const toolModule = (await import(/* @vite-ignore */ url)) as { Tool: new () => T };
    return new toolModule.Tool();
}

// Exposures.
export { loadTool };
export type { ToolConfig };
