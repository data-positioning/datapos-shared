import { ConnectionConfig } from '../component/connector/connection';
import { ToolConfig } from '../component/tool';
import { AuditContentResult, ConnectorCallbackData, ConnectorOperationSettings, ListResult, RetrieveRecordsResult } from '../component/connector';
import { ContextCallbackData, ContextConfig, ContextOperationSettings } from '../component/context';
import { DataViewPreviewConfig } from '../component/dataView';
interface EngineInitialiseSettings {
    connectorStorageURLPrefix: string;
    toolConfigs: ToolConfig[];
}
type InitialiseEngine = (settings: EngineInitialiseSettings) => Promise<void>;
type ProcessConnectorRequest = (id: string, connectionConfig: ConnectionConfig, settings: ConnectorOperationSettings, callback?: (callbackData: ContextCallbackData) => void) => Promise<ConnectorInterfaceResult>;
type ConnectorInterfaceResult = AuditContentResult | DataViewPreviewConfig | ListResult | RetrieveRecordsResult;
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
interface EngineWorker {
    initialise: InitialiseEngine;
    processConnectorRequest: ProcessConnectorRequest;
    processContextRequest: ProcessContextRequest;
    processTestRequest: ProcessTestRequest;
}
/** Exports. */
export type { EngineWorker, EngineInitialiseSettings };
