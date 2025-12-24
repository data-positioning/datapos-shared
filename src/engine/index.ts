/**
 * Engine.
 */

import type { ConnectionConfig } from '@/component/connector/connection';
import type { ConnectorOperationSettings } from '@/component/connector';
import type { ModuleConfig } from '@/component/module';
import type { ToolConfig } from '@/component/tool';
import type { ContextCallbackData, ContextConfig, ContextOperationSettings } from '@/component/context';
import type { DataViewContentAuditConfig, EncodingConfig, ValueDelimiterId } from '@/component/dataView';

/** Engine configuration. */
interface EngineConfig extends ModuleConfig {
    typeId: 'engine';
}

/** Engine initialise settings. */
interface EngineInitialiseSettings {
    connectorStorageURLPrefix: string;
    toolConfigs: ToolConfig[];
}

type InitialiseEngine = (settings: EngineInitialiseSettings) => Promise<void>;

type ProcessConnectorRequest = (
    id: string,
    connectionConfig: ConnectionConfig,
    settings: ConnectorOperationSettings,
    callback?: (callbackData: ContextCallbackData) => void
) => Promise<unknown>;

// Types/Interfaces/Operations - Audit Content (object).
interface AuditContentSettings extends ConnectorOperationSettings {
    chunkSize?: number;
    encodingId: string;
    path: string;
    valueDelimiterId: ValueDelimiterId;
}
interface AuditContentResult {
    contentAuditConfig: DataViewContentAuditConfig;
}

/** Connector callback data. */
interface ConnectorCallbackData {
    typeId: string;
    properties: Record<string, unknown>;
}

type ProcessContextRequest = (
    id: string,
    contextConfig: ContextConfig,
    settings: ContextOperationSettings,
    callback?: (callbackData: ConnectorCallbackData) => void
) => Promise<unknown>;

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
export type { AuditContentSettings, AuditContentResult, ConnectorCallbackData, EngineConfig, EngineInterface, EngineWorker, EngineInitialiseSettings, TestSettings };
