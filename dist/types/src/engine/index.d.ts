import { ConnectionConfig } from '../component/connector/connection';
import { ToolConfig } from '../component/tool';
import { ConnectorOperationSettings, ListResult, RetrieveRecordsResult } from '../component/connector';
import { ContextCallbackData, ContextConfig, ContextOperationSettings } from '../component/context';
import { DataViewContentAuditConfig, DataViewPreviewConfig, EncodingConfig, ValueDelimiterId } from '../component/dataView';
interface EngineInitialiseSettings {
    connectorStorageURLPrefix: string;
    toolConfigs: ToolConfig[];
}
type InitialiseEngine = (settings: EngineInitialiseSettings) => Promise<void>;
type ProcessConnectorRequest = (id: string, connectionConfig: ConnectionConfig, settings: ConnectorOperationSettings, callback?: (callbackData: ContextCallbackData) => void) => Promise<ConnectorInterfaceResult>;
interface AuditContentSettings extends ConnectorOperationSettings {
    chunkSize?: number;
    encodingId: string;
    path: string;
    valueDelimiterId: ValueDelimiterId;
}
interface AuditContentResult {
    contentAuditConfig: DataViewContentAuditConfig;
}
type ConnectorInterfaceResult = AuditContentResult | DataViewPreviewConfig | ListResult | RetrieveRecordsResult;
/** Connector callback data. */
interface ConnectorCallbackData {
    typeId: string;
    properties: Record<string, unknown>;
}
type ProcessContextRequest = (id: string, contextConfig: ContextConfig, settings: ContextOperationSettings, callback?: (callbackData: ConnectorCallbackData) => void) => Promise<ContextInterfaceResult>;
type ContextInterfaceResult = AuditContentResult | DataViewPreviewConfig | ListResult | RetrieveRecordsResult;
type ProcessTestRequest = (settings: TestSettings) => Promise<Record<string, unknown>>;
interface TestSettings {
    action?: string;
    delimiter?: string;
    forceFallback?: boolean;
    hasHeaders?: boolean;
    readable: ReadableStream<Uint8Array>;
}
interface EngineInterface {
    getEncodingConfigs: (localeId: string) => EncodingConfig[];
    invokeWorker(errorEventCallback: (errorEvent: ErrorEvent) => void): EngineWorker;
}
interface EngineWorker {
    initialise: InitialiseEngine;
    processConnectorRequest: ProcessConnectorRequest;
    processContextRequest: ProcessContextRequest;
    processTestRequest: ProcessTestRequest;
}
/** Exports. */
export type { AuditContentSettings, AuditContentResult, ConnectorCallbackData, ConnectorInterfaceResult, ContextInterfaceResult, EngineInterface, EngineWorker, EngineInitialiseSettings, TestSettings };
