import type { ConnectionConfig } from './connection';
import type { EncodingConfig } from './dataView';
import type { AuditContentResult, ConnectorCallbackData, ConnectorOperationSettings, InitialiseSettings, ListResult, PreviewResult, RetrieveResult } from './connector';

type ConnectorInterface = (
    id: string,
    connectionConfig: ConnectionConfig,
    settings: ConnectorOperationSettings,
    callback?: ((callbackData: ConnectorCallbackData) => void) | undefined
) => Promise<ConnectorInterfaceResult>;

export type ConnectorInterfaceResult = AuditContentResult | ListResult | PreviewResult | RetrieveResult;

export interface Engine {
    getEncodingConfigs: (localeId: string) => EncodingConfig[];
    invokeWorker(errorEventCallback: (errorEvent: ErrorEvent) => void): EngineWorkerInterface;
}

export interface EngineWorkerInterface {
    initialise: InitialiseEngine;
    connectorInterface: ConnectorInterface;
}

type InitialiseEngine = (settings: InitialiseSettings) => Promise<void>;
