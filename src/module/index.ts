/**
 * Module composables, constants, errors, types/interfaces and utilities.
 */

// Dependencies - Framework.
import type { ContextModelGroupConfig } from '@/component/context';
import type { LocalisedString } from '@/index';

// Dependencies - Module.
export interface Module {}

// Types/Interfaces/Operations - Module configuration.
export interface ModuleConfig {
    id: string;
    label: Partial<LocalisedString>;
    description: Partial<LocalisedString>;
    statusId: unknown;
    typeId: ModuleTypeId;
    version: string;
}
type ModuleTypeId = 'app' | 'engine' | 'connector' | 'context' | 'informer' | 'presenter' | 'tool';

// Types/Interfaces/Operations - Application module configuration.
export interface AppModuleConfig extends ModuleConfig {
    typeId: 'app';
}

// Types/Interfaces/Operations - Engine module configuration.
export interface EngineModuleConfig extends ModuleConfig {
    typeId: 'engine';
}

// Types/Interfaces/Operations - Connector module configuration.
export interface ConnectorModuleConfig extends ModuleConfig {
    categoryId: ConnectorModuleCategoryId;
    implementations: Record<string, unknown>;
    icon: string;
    iconDark: string;
    operations: ConnectorModuleOperation[];
    typeId: 'connector';
    usageId: ConnectorModuleUsageId | null;
    vendorAccountURL?: string;
    vendorDocumentationURL?: string;
    vendorHomeURL?: string;
}
type ConnectorModuleCategoryId = 'application' | 'curatedDataset' | 'database' | 'fileStore';
export type ConnectorModuleOperation =
    | 'abortOperation'
    | 'authenticateConnection'
    | 'createObject'
    | 'describeConnection'
    | 'dropObject'
    | 'findObject'
    | 'getRecord'
    | 'listNodes'
    | 'previewObject'
    | 'removeRecords'
    | 'retrieveRecords'
    | 'upsertRecords';
export type ConnectorModuleUsageId = 'bidirectional' | 'destination' | 'source';
export const CONNECTOR_DESTINATION_OPERATIONS = ['createObject', 'dropObject', 'removeRecords', 'upsertRecords'];
export const CONNECTOR_SOURCE_OPERATIONS = ['findObject', 'getRecord', 'listNodes', 'previewObject', 'retrieveRecords'];

// Types/Interfaces/Operations - Context module configuration.
export interface ContextModuleConfig extends ModuleConfig {
    operations: ContextModuleOperation[];
    models: ContextModelGroupConfig[]; // TODO: different pattern to informer and presenter modules? They use list operation?
    typeId: 'context';
}
export type ContextModuleOperation = 'list';

// Types/Interfaces/Operations - Informer module configuration.
export interface InformerModuleConfig extends ModuleConfig {
    operations: InformerModuleOperation[];
    typeId: 'informer';
}
export type InformerModuleOperation = 'list' | 'render';

// Types/Interfaces/Operations - Presenter module configuration.
export interface PresenterModuleConfig extends ModuleConfig {
    operations: PresenterModuleOperation[];
    typeId: 'presenter';
}
export type PresenterModuleOperation = 'list' | 'render';

// Types/Interfaces/Operations - Tool module configuration.
export interface ToolModuleConfig extends ModuleConfig {
    typeId: 'tool';
}
