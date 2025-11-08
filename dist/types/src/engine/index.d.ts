import { ConnectionConfig } from '../component/connector/connection';
import { Module } from '../module';
import { AuditContentResult, ConnectorCallbackData, ConnectorOperationSettings, InitialiseSettings, ListResult, RetrieveResult } from '../component/connector';
import { ContextCallbackData, ContextConfig, ContextOperationSettings } from '../component/context';
import { DataViewPreviewConfig, EncodingConfig } from '../component/dataView';
type InitialiseEngine = (settings: InitialiseSettings) => Promise<void>;
type ProcessConnectorRequest = (id: string, connectionConfig: ConnectionConfig, settings: ConnectorOperationSettings, callback?: ((callbackData: ContextCallbackData) => void) | undefined) => Promise<ContextInterfaceResult>;
export type ContextInterfaceResult = AuditContentResult | DataViewPreviewConfig | ListResult | RetrieveResult;
type ProcessContextRequest = (id: string, contextConfig: ContextConfig, settings: ContextOperationSettings, callback?: ((callbackData: ConnectorCallbackData) => void) | undefined) => Promise<ConnectorInterfaceResult>;
export type ConnectorInterfaceResult = AuditContentResult | DataViewPreviewConfig | ListResult | RetrieveResult;
export interface Engine extends Module {
    getEncodingConfigs: (localeId: string) => EncodingConfig[];
    invokeWorker(errorEventCallback: (errorEvent: ErrorEvent) => void): EngineWorker;
}
export interface EngineWorker {
    initialise: InitialiseEngine;
    processConnectorRequest: ProcessConnectorRequest;
    processContextRequest: ProcessContextRequest;
}
export {};
