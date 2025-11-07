/**
 * Module composables, constants, interfaces, errors, types and utilities.
 */

// Dependencies - Framework.
import type { ContextModelGroupConfig } from '@/component/context';
import type { LocalisedString } from '@/index';

// Interfaces/Types/Operations - Module configuration.
export interface ModuleConfig {
    id: string;
    label: Partial<LocalisedString>;
    description: Partial<LocalisedString>;
    statusId: unknown;
    typeId: ModuleTypeId;
    version: string;
}
type ModuleTypeId = 'app' | 'engine' | 'connector' | 'context' | 'presenter' | 'informer';

// Interfaces/Types/Operations - Application module configuration.
export interface AppModuleConfig extends ModuleConfig {
    typeId: 'app';
}

// Interfaces/Types/Operations - Engine module configuration.
export interface EngineModuleConfig extends ModuleConfig {
    typeId: 'engine';
}

// Interfaces/Types/Operations - Connector module configuration.
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

// Interfaces/Types/Operations - Context module configuration.
export interface ContextModuleConfig extends ModuleConfig {
    operations: ContextModuleOperation[];
    models: ContextModelGroupConfig[]; // TODO: different pattern to informer and presenter modules? They use list operation?
    typeId: 'context';
}
export type ContextModuleOperation = 'list';

// Interfaces/Types/Operations - Informer module configuration.
export interface InformerModuleConfig extends ModuleConfig {
    operations: InformerModuleOperation[];
    typeId: 'informer';
}
export type InformerModuleOperation = 'list' | 'render';

// Interfaces/Types/Operations - Presenter module configuration.
export interface PresenterModuleConfig extends ModuleConfig {
    operations: PresenterModuleOperation[];
    typeId: 'presenter';
}
export type PresenterModuleOperation = 'list' | 'render';
