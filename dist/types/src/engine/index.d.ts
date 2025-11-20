import { ConnectionConfig } from '../component/connector/connection';
import { AuditContentResult, ConnectorCallbackData, ConnectorOperationSettings, InitialiseSettings, ListResult, RetrieveResult } from '../component/connector';
import { Component, ModuleConfig } from '../component';
import { ContextCallbackData, ContextConfig, ContextOperationSettings } from '../component/context';
import { DataViewPreviewConfig, EncodingConfig } from '../component/dataView';
export interface EngineConfig extends ModuleConfig {
    typeId: 'engine';
}
type InitialiseEngine = (settings: InitialiseSettings) => Promise<void>;
type ProcessConnectorRequest = (id: string, connectionConfig: ConnectionConfig, settings: ConnectorOperationSettings, callback?: ((callbackData: ContextCallbackData) => void) | undefined) => Promise<ContextInterfaceResult>;
export type ContextInterfaceResult = AuditContentResult | DataViewPreviewConfig | ListResult | RetrieveResult;
type ProcessContextRequest = (id: string, contextConfig: ContextConfig, settings: ContextOperationSettings, callback?: ((callbackData: ConnectorCallbackData) => void) | undefined) => Promise<ConnectorInterfaceResult>;
export type ConnectorInterfaceResult = AuditContentResult | DataViewPreviewConfig | ListResult | RetrieveResult;
export interface Engine extends Component {
    getEncodingConfigs: (localeId: string) => EncodingConfig[];
    invokeWorker(errorEventCallback: (errorEvent: ErrorEvent) => void): EngineWorker;
}
export interface EngineWorker {
    initialise: InitialiseEngine;
    processConnectorRequest: ProcessConnectorRequest;
    processContextRequest: ProcessContextRequest;
}
export {};
