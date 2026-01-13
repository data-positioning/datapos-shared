/**
 * Engine.
 */

// Framework dependencies.
import type { ConnectionConfig } from '@/component/connector/connection';
import type { EncodingTypeConfig } from '@/encoding';
import type { ModuleConfig } from '@/component/module';
import type { ToolConfig } from '@/component/tool';
import type { ConnectorOperationOptions, ObjectColumnConfig } from '@/component/connector';
import type { ContentAuditConfig, InferenceRecord, InferenceSummary, ParsingRecord, ValueDelimiterId } from '@/component/dataView';
import type { ContextConfig, ContextOperationOptions } from '@/component/context';

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//#region Engine runtime.
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Engine runtime interface.
 */
interface EngineRuntimeInterface {
    getEncodingTypeConfigs: (localeId: string) => EncodingTypeConfig[];
    invokeWorker(errorEventCallback: (errorEvent: ErrorEvent) => void): EngineWorkerInterface;
}

//#endregion ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//#region Engine worker.
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Engine worker interface.
 */
interface EngineWorkerInterface {
    initialise: (options: EngineWorkerInitialiseOptions) => Promise<void>;
    processRequest: (
        id: string,
        config: ConnectionConfig | ContextConfig,
        options: ConnectorOperationOptions | ContextOperationOptions,
        callback?: (callbackData: EngineCallbackData) => void
    ) => Promise<unknown>;
}

/** Engine worker initialise options. */
interface EngineWorkerInitialiseOptions {
    connectorStorageURLPrefix: string;
    toolConfigs: ToolConfig[];
}

//#endregion ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//#region Engine.
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 *
 */
const ENGINE_OPERATION_NAMES = [
    'abort',
    'initialise',
    'auditContent',
    'auditObjectContent',
    'createObject',
    'dropObject',
    'findObject',
    'getObject',
    'getReader',
    'listNodes',
    'previewObject',
    'removeRecords',
    'retrieveRecords',
    'upsertRecords'
];

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
 * Engine utilities.
 */
interface EngineUtilities {
    hasReadableStreamTransferSupport(): boolean;
    inferValues: (parsingRecord: ParsingRecord, columnConfigs: ObjectColumnConfig[], leadingRecord: boolean) => InferenceRecord;
    inferDataTypes: (parsedRecords: ParsingRecord[]) => InferenceSummary;
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

/**
 *
 */
interface AuditObjectContentResult {
    contentAuditConfig: ContentAuditConfig;
}

//#endregion ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Exposures.
export { ENGINE_OPERATION_NAMES };
export type {
    AuditObjectContentOptions,
    AuditObjectContentResult,
    EngineCallbackData,
    EngineConfig,
    EngineRuntimeInterface,
    EngineUtilities,
    EngineWorkerInitialiseOptions,
    EngineWorkerInterface
};
