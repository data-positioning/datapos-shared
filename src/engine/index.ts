/**
 * Engine.
 */

// Framework dependencies.
import type { ConnectionConfig } from '@/component/connector/connection';
import type { EncodingTypeConfig } from '@/encoding';
import type { ModuleConfig } from '@/component/module';
import type { ToolConfig } from '@/component/tool';
import type { ConnectionColumnConfig, ConnectorOperationOptions } from '@/component/connector';
import type { ContextCallbackData, ContextConfig, ContextOperationOptions } from '@/component/context';
import type { DataViewContentAuditConfig, ParseResult, ValueDelimiterId } from '@/component/dataView';

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//#region Engine runtime.

/**
 * Engine runtime interface.
 */
interface EngineRuntimeInterface {
    getEncodingTypeConfigs: (localeId: string) => EncodingTypeConfig[];
    invokeWorker(errorEventCallback: (errorEvent: ErrorEvent) => void): EngineWorkerInterface;
}

//#endregion ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//#region Engine worker.

/**
 * Engine worker interface.
 */
interface EngineWorkerInterface {
    initialise: (options: EngineWorkerInitialiseOptions) => Promise<void>;
    processConnectorRequest: (
        id: string,
        connectionConfig: ConnectionConfig,
        options: ConnectorOperationOptions,
        callback?: (callbackData: ConnectorCallbackData) => void
    ) => Promise<unknown>;
    processContextRequest: (id: string, contextConfig: ContextConfig, options: ContextOperationOptions, callback?: (callbackData: ContextCallbackData) => void) => Promise<unknown>;
    processTestRequest: (settings: TestSettings) => Promise<Record<string, unknown>>;
}

/** Engine worker initialise options. */
interface EngineWorkerInitialiseOptions {
    connectorStorageURLPrefix: string;
    toolConfigs: ToolConfig[];
}

//#endregion ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//#region Engine.

/**
 * Engine shared.
 */
interface EngineUtilities {
    parseRecord: (columnConfigs: ConnectionColumnConfig[], record: { value: string | null | undefined; isQuoted: boolean }[], isPreview: boolean) => ParseResult[];
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

//#endregion ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface TestSettings {
    action?: string;
    delimiter?: string;
    forceFallback?: boolean;
    hasHeaders?: boolean;
    readable: ReadableStream<Uint8Array>;
}

// Exports.
export type {
    AuditObjectContentOptions,
    AuditObjectContentResult,
    ConnectorCallbackData,
    EngineConfig,
    EngineRuntimeInterface,
    EngineUtilities,
    EngineWorkerInitialiseOptions,
    EngineWorkerInterface,
    TestSettings
};
