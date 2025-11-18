/**
 * Module composables, constants, errors, types/interfaces and utilities.
 */

// Dependencies - Framework.
import type { ModuleConfig } from '@/component';

// Types/Interfaces/Operations - Tool module configuration.
export interface ToolModuleConfig extends ModuleConfig {
    typeId: 'tool';
}
