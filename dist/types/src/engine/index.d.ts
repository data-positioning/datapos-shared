import { ConnectionConfig } from '../component/connector/connection';
import { EncodingTypeConfig } from '../encoding';
import { ModuleConfig } from '../component/module';
import { ObjectColumnConfig } from '../component/connector';
import { ToolConfig } from '../component/tool';
import { ContextConfig, ContextOperationOptions } from '../component/context';
import { InferenceRecord, InferenceSummary, ParsingRecord } from '../component/dataView';
/**
 * Engine runtime interface.
 */
interface EngineRuntimeInterface {
    getEncodingTypeConfigs: (localeId: string) => EncodingTypeConfig[];
    invokeWorker(errorEventCallback: (errorEvent: ErrorEvent) => void): EngineWorkerInterface;
}
/**
 * Engine operation options.
 */
interface EngineOperationOptions {
    accountId?: string;
    appCheckToken?: string;
    sessionAccessToken?: string;
}
/**
 * Engine worker interface.
 */
interface EngineWorkerInterface {
    initialise: (options: EngineWorkerInitialiseOptions) => Promise<void>;
    processRequest: (id: string, config: ConnectionConfig | ContextConfig, options: EngineOperationOptions | ContextOperationOptions, callback?: (callbackData: EngineCallbackData) => void) => Promise<unknown>;
}
/**
 * Engine worker initialise options.
 */
interface EngineWorkerInitialiseOptions {
    connectorStorageURLPrefix: string;
    toolConfigs: ToolConfig[];
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
 * Engine utilities.
 */
interface EngineUtilities {
    hasReadableStreamTransferSupport(): boolean;
    inferValues: (parsedRecord: ParsingRecord, columnConfigs: ObjectColumnConfig[], leadingRecord: boolean) => InferenceRecord;
    inferDataTypes: (parsedRecords: ParsingRecord[]) => InferenceSummary;
}
export type { EngineCallbackData, EngineConfig, EngineOperationOptions, EngineRuntimeInterface, EngineUtilities, EngineWorkerInitialiseOptions, EngineWorkerInterface };
