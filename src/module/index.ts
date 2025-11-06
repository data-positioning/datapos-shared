/**
 * Module composables, constants, interfaces, errors, types and utilities.
 */

// Dependencies - Framework.
import type { ContextModelGroupConfig } from '@/component/context';
import type { LocalisedString } from '@/index';

// Interfaces/Types/Operations - Module configuration.
interface ModuleConfig {
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
    operations: ConnectorModuleInterface[];
    typeId: 'connector';
    usageId: ConnectorModuleUsageId;
    vendorAccountURL?: string;
    vendorDocumentationURL?: string;
    vendorHomeURL?: string;
}
type ConnectorModuleCategoryId = 'application' | 'curatedDataset' | 'database' | 'fileStore';
export type ConnectorModuleInterface =
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
type ConnectorModuleUsageId = 'bidirectional' | 'destination' | 'source'; // TODO: Can we work this out from the supported operations?

// Interfaces/Types/Operations - Context module configuration.
export interface ContextModuleConfig extends ModuleConfig {
    interfaces: ContextModuleInterface[];
    models: ContextModelGroupConfig[]; // TODO: different pattern to informer and presenter modules? They use list operation?
    typeId: 'context';
}
type ContextModuleInterface = 'list';

// Interfaces/Types/Operations - Informer module configuration.
export interface InformerModuleConfig extends ModuleConfig {
    interfaces: InformerModuleInterface[];
    typeId: 'informer';
}
type InformerModuleInterface = 'list' | 'render';

// Interfaces/Types/Operations - Presenter module configuration.
export interface PresenterModuleConfig extends ModuleConfig {
    interfaces: PresenterModuleInterface[];
    typeId: 'presenter';
}
type PresenterModuleInterface = 'list' | 'render';
