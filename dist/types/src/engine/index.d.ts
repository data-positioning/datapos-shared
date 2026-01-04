import { ConnectionConfig } from '../component/connector/connection';
import { EncodingTypeConfig } from '../encoding';
import { ModuleConfig } from '../component/module';
import { ToolConfig } from '../component/tool';
import { ConnectionColumnConfig, ConnectorOperationOptions } from '../component/connector';
import { ContextConfig, ContextOperationOptions } from '../component/context';
import { DataViewContentAuditConfig, ParseResult, ValueDelimiterId } from '../component/dataView';
/**
 * Engine runtime interface.
 */
interface EngineRuntimeInterface {
    getEncodingTypeConfigs: (localeId: string) => EncodingTypeConfig[];
    invokeWorker(errorEventCallback: (errorEvent: ErrorEvent) => void): EngineWorkerInterface;
}
/**
 * Engine worker interface.
 */
interface EngineWorkerInterface {
    initialise: (options: EngineWorkerInitialiseOptions) => Promise<void>;
    processConnectorRequest: (id: string, connectionConfig: ConnectionConfig, options: ConnectorOperationOptions, callback?: (callbackData: EngineCallbackData) => void) => Promise<unknown>;
    processContextRequest: (id: string, contextConfig: ContextConfig, options: ContextOperationOptions, callback?: (callbackData: EngineCallbackData) => void) => Promise<unknown>;
    processTestRequest: (settings: TestSettings) => Promise<Record<string, unknown>>;
}
/** Engine worker initialise options. */
interface EngineWorkerInitialiseOptions {
    connectorStorageURLPrefix: string;
    toolConfigs: ToolConfig[];
}
/**
 * Engine shared.
 */
interface EngineUtilities {
    parseRecord: (columnConfigs: ConnectionColumnConfig[], record: {
        value: string | null | undefined;
        isQuoted: boolean;
    }[], isPreview: boolean) => ParseResult[];
}
/**
 * Engine configuration.
 */
interface EngineConfig extends ModuleConfig {
    typeId: 'engine';
}
/**
 * Engine callback data.
 */
interface EngineCallbackData {
    typeId: string;
    properties: Record<string, unknown>;
}
/**
 * Audit object content options and result.
 */
interface AuditObjectContentOptions extends ConnectorOperationOptions {
    chunkSize: number | undefined;
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
export type { AuditObjectContentOptions, AuditObjectContentResult, EngineCallbackData, EngineConfig, EngineRuntimeInterface, EngineUtilities, EngineWorkerInitialiseOptions, EngineWorkerInterface, TestSettings };
