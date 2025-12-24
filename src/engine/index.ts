/**
 * Engine composables, constants, errors, types/interfaces and utilities.
 */

import type { ConnectionConfig } from '@/component/connector/connection';
import type { ModuleConfig } from '@/component/module';
import type { ToolConfig } from '@/component/tool';
import type { ConnectorOperationSettings, ListResult, RetrieveRecordsResult } from '@/component/connector';
import type { ContextCallbackData, ContextConfig, ContextOperationSettings } from '@/component/context';
import type { DataViewContentAuditConfig, DataViewPreviewConfig, EncodingConfig, ValueDelimiterId } from '@/component/dataView';

// Types/Interfaces/Operations - Engine module configuration.
interface EngineConfig extends ModuleConfig {
    typeId: 'engine';
}

// Types/Interfaces/Operations - Initialise settings.
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
) => Promise<ConnectorInterfaceResult>;

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

type ConnectorInterfaceResult = AuditContentResult | DataViewPreviewConfig | ListResult | RetrieveRecordsResult;

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
) => Promise<ContextInterfaceResult>;

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
export type {
    AuditContentSettings,
    AuditContentResult,
    ConnectorCallbackData,
    ConnectorInterfaceResult,
    ContextInterfaceResult,
    EngineInterface,
    EngineWorker,
    EngineInitialiseSettings,
    TestSettings
};
