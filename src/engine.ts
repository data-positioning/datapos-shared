import type { ConnectionConfig } from './connection';
import type { AuditContentResult, ConnectorCallbackData, ConnectorOperationSettings, InitialiseSettings, ListResult, RetrieveResult } from './connector';
import type { DataViewPreviewConfig, EncodingConfig } from './dataView';

type InitialiseEngine = (settings: InitialiseSettings) => Promise<void>;

type ProcessConnectorRequest = (
    id: string,
    connectionConfig: ConnectionConfig,
    settings: ConnectorOperationSettings,
    callback?: ((callbackData: ConnectorCallbackData) => void) | undefined
) => Promise<ConnectorInterfaceResult>;

export type ConnectorInterfaceResult = AuditContentResult | DataViewPreviewConfig | ListResult | RetrieveResult;

export interface Engine {
    getEncodingConfigs: (localeId: string) => EncodingConfig[];
    invokeWorker(errorEventCallback: (errorEvent: ErrorEvent) => void): EngineWorkerInterface;
}

export interface EngineWorkerInterface {
    initialise: InitialiseEngine;
    processConnectorRequest: ProcessConnectorRequest;
}
