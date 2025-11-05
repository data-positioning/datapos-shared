/**
 * Module interface/type/operation declarations.
 */

// Dependencies - Framework.
import type { LocalisedString } from '@/index';

// Interfaces/Types - Module configuration.
interface ModuleConfig {
    id: string;
    label: Partial<LocalisedString>;
    description: Partial<LocalisedString>;
    statusId: unknown;
    typeId: ModuleTypeId;
    version: string;
}
type ModuleTypeId = 'app' | 'engine' | 'connector' | 'presenter' | 'informer';

// Interfaces/Types - Application module configuration.
export interface AppModuleConfig extends ModuleConfig {}

// Interfaces/Types - Engine module configuration.
export interface EngineModuleConfig extends ModuleConfig {}

// Interfaces/Types - Connector module configuration.
export interface ConnectorModuleConfig extends ModuleConfig {
    categoryId: ConnectorModuleCategoryId;
    implementations: Record<string, unknown>;
    icon: string;
    iconDark: string;
    usageId: 'bidirectional' | 'destination' | 'source';
    vendorAccountURL?: string;
    vendorDocumentationURL?: string;
    vendorHomeURL?: string;
    interface: ConnectorModuleInterface[];
}
type ConnectorModuleCategoryId = 'application' | 'curatedDataset' | 'database' | 'fileStore';
type ConnectorModuleInterface =
    | 'abortOperation'
    | 'createObject'
    | 'dropObject'
    | 'findObject'
    | 'getRecord'
    | 'listNodes'
    | 'previewObject'
    | 'upsertRecords'
    | 'removeRecords'
    | 'retrieveRecords';

// Interfaces/Types - Context module configuration.
export interface ContextModuleConfig extends ModuleConfig {}

// Interfaces/Types - Informer module configuration.
export interface InformerModuleConfig extends ModuleConfig {}

// Interfaces/Types - Presenter module configuration.
export interface PresenterModuleConfig extends ModuleConfig {
    interface: PresenterModuleInterface[];
}
type PresenterModuleInterface = 'list' | 'render';
