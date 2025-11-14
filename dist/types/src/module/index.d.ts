import { ContextModelGroupConfig } from '../component/context';
import { LocalisedString } from '../index';
export interface Module {
}
export interface ModuleConfig {
    id: string;
    label: Partial<LocalisedString>;
    description: Partial<LocalisedString>;
    statusId: unknown;
    typeId: ModuleTypeId;
    version: string;
}
type ModuleTypeId = 'app' | 'engine' | 'connector' | 'context' | 'informer' | 'presenter' | 'tool';
export interface AppModuleConfig extends ModuleConfig {
    typeId: 'app';
}
export interface EngineModuleConfig extends ModuleConfig {
    typeId: 'engine';
}
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
export type ConnectorModuleOperation = 'abortOperation' | 'authenticateConnection' | 'createObject' | 'describeConnection' | 'dropObject' | 'findObject' | 'getRecord' | 'listNodes' | 'previewObject' | 'removeRecords' | 'retrieveRecords' | 'upsertRecords';
export type ConnectorModuleUsageId = 'bidirectional' | 'destination' | 'source';
export declare const CONNECTOR_DESTINATION_OPERATIONS: string[];
export declare const CONNECTOR_SOURCE_OPERATIONS: string[];
export interface ContextModuleConfig extends ModuleConfig {
    operations: ContextModuleOperation[];
    models: ContextModelGroupConfig[];
    typeId: 'context';
}
export type ContextModuleOperation = 'list';
export interface InformerModuleConfig extends ModuleConfig {
    operations: InformerModuleOperation[];
    typeId: 'informer';
}
export type InformerModuleOperation = 'list' | 'render';
export interface PresenterModuleConfig extends ModuleConfig {
    operations: PresenterModuleOperation[];
    typeId: 'presenter';
}
export type PresenterModuleOperation = 'list' | 'render';
export interface ToolModuleConfig extends ModuleConfig {
    typeId: 'tool';
}
export {};
