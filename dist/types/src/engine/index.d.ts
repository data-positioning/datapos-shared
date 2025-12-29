import { ConnectionConfig } from '../component/connector/connection';
import { EncodingConfig } from '../encoding';
import { ModuleConfig } from '../component/module';
import { ToolConfig } from '../component/tool';
import { ConnectorOperationOptions } from '../component/connector';
import { ContextCallbackData, ContextConfig, ContextOperationOptions } from '../component/context';
import { DataViewContentAuditConfig, DataViewPreviewConfig, ValueDelimiterId } from '../component/dataView';
/** Engine runtime interface. */
interface EngineRuntimeInterface {
    getEncodingConfigs: (localeId: string) => EncodingConfig[];
    invokeWorker(errorEventCallback: (errorEvent: ErrorEvent) => void): EngineWorkerInterface;
}
/** Engine worker interface. */
interface EngineWorkerInterface {
    initialise: (options: EngineWorkerInitialiseOptions) => Promise<void>;
    processConnectorRequest: (id: string, connectionConfig: ConnectionConfig, options: ConnectorOperationOptions, callback?: (callbackData: ConnectorCallbackData) => void) => Promise<unknown>;
    processContextRequest: (id: string, contextConfig: ContextConfig, options: ContextOperationOptions, callback?: (callbackData: ContextCallbackData) => void) => Promise<unknown>;
    processTestRequest: (settings: TestSettings) => Promise<Record<string, unknown>>;
}
/** Engine worker initialise options. */
interface EngineWorkerInitialiseOptions {
    connectorStorageURLPrefix: string;
    toolConfigs: ToolConfig[];
}
/** Engine Shared. */
interface EngineShared {
    previewRemoteFile: (url: string, signal: AbortSignal, chunkSize?: number) => Promise<DataViewPreviewConfig>;
}
/** Engine configuration. */
interface EngineConfig extends ModuleConfig {
    typeId: 'engine';
}
/** Connector callback data. */
interface ConnectorCallbackData {
    typeId: string;
    properties: Record<string, unknown>;
}
/** Audit object content options and result. */
interface AuditObjectContentOptions extends ConnectorOperationOptions {
    chunkSize?: number;
    encodingId: string;
    path: string;
    valueDelimiterId: ValueDelimiterId;
}
interface AuditObjectContentResult {
    contentAuditConfig: DataViewContentAuditConfig;
}
interface TestSettings {
    action?: string;
    delimiter?: string;
    forceFallback?: boolean;
    hasHeaders?: boolean;
    readable: ReadableStream<Uint8Array>;
}
/** Exports. */
export type { AuditObjectContentOptions, AuditObjectContentResult, ConnectorCallbackData, EngineConfig, EngineRuntimeInterface, EngineShared, EngineWorkerInitialiseOptions, EngineWorkerInterface, TestSettings };
