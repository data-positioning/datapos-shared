/**
 * Engine composables, constants, errors, types/interfaces and utilities.
 */

import type { ConnectionConfig } from '@/component/connector/connection';
import type { ToolConfig } from '@/component/tool';
import type { AuditContentResult, ConnectorCallbackData, ConnectorOperationSettings, ListResult, RetrieveRecordsResult } from '@/component/connector';
import type { Component, ModuleConfig } from '@/component';
import type { ContextCallbackData, ContextConfig, ContextOperationSettings } from '@/component/context';
import type { DataViewPreviewConfig, EncodingConfig } from '@/component/dataView';

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

type ConnectorInterfaceResult = AuditContentResult | DataViewPreviewConfig | ListResult | RetrieveRecordsResult;

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

interface EngineInterface extends Component {
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
export type { EngineInterface, EngineWorker, EngineInitialiseSettings };
