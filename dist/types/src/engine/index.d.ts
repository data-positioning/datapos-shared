import { ConnectionConfig } from '../component/connector/connection';
import { EncodingTypeConfig } from '../encoding';
import { ModuleConfig } from '../component/module';
import { ToolConfig } from '../component/tool';
import { ConnectionColumnConfig, ConnectorOperationOptions, UsageTypeId } from '../component/connector';
import { ContextCallbackData, ContextConfig, ContextOperationOptions } from '../component/context';
import { DataViewContentAuditConfig, ParsedValue, ValueDelimiterId } from '../component/dataView';
/**
 * Engine runtime interface.
 */
interface EngineRuntimeInterface {
    getEncodingTypeConfigs: (localeId: string) => EncodingTypeConfig[];
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
export interface ParseResult {
    isValid: boolean;
    originalValue: string | null | undefined;
    parsedValue: ParsedValue;
    usageTypeId: UsageTypeId;
}
/**
 * Engine shared.
 */
interface EngineShared {
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
 * Connector callback data.
 */
interface ConnectorCallbackData {
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
export type { AuditObjectContentOptions, AuditObjectContentResult, ConnectorCallbackData, EngineConfig, EngineRuntimeInterface, EngineShared, EngineWorkerInitialiseOptions, EngineWorkerInterface, TestSettings };
