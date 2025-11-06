import type { ConnectionConfig } from '@/component/connector/connection';
import type { AuditContentResult, ConnectorCallbackData, ConnectorOperationSettings, InitialiseSettings, ListResult, RetrieveResult } from '@/component/connector';
import type { ContextCallbackData, ContextConfig, ContextOperationSettings } from '@/component/context';
import type { DataViewPreviewConfig, EncodingConfig } from '@/component/dataView';

type InitialiseEngine = (settings: InitialiseSettings) => Promise<void>;

type ProcessConnectorRequest = (
    id: string,
    connectionConfig: ConnectionConfig,
    settings: ConnectorOperationSettings,
    callback?: ((callbackData: ContextCallbackData) => void) | undefined
) => Promise<ContextInterfaceResult>;

export type ContextInterfaceResult = AuditContentResult | DataViewPreviewConfig | ListResult | RetrieveResult;

type ProcessContextRequest = (
    id: string,
    contextConfig: ContextConfig,
    settings: ContextOperationSettings,
    callback?: ((callbackData: ConnectorCallbackData) => void) | undefined
) => Promise<ConnectorInterfaceResult>;

export type ConnectorInterfaceResult = AuditContentResult | DataViewPreviewConfig | ListResult | RetrieveResult;

export interface Engine {
    getEncodingConfigs: (localeId: string) => EncodingConfig[];
    invokeWorker(errorEventCallback: (errorEvent: ErrorEvent) => void): EngineWorker;
}

export interface EngineWorker {
    initialise: InitialiseEngine;
    processConnectorRequest: ProcessConnectorRequest;
    processContextRequest: ProcessContextRequest;
}
