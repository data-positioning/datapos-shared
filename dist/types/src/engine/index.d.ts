import { ConnectionConfig } from '../component/connector/connection';
import { EncodingTypeConfig } from '../encoding';
import { ModuleConfig } from '../component/module';
import { ToolConfig } from '../component/tool';
import { ConnectorOperationOptions, ObjectColumnConfig } from '../component/connector';
import { ContentAuditConfig, InferenceRecord, InferenceSummary, ParsingRecord, ValueDelimiterId } from '../component/dataView';
import { ContextConfig, ContextOperationOptions } from '../component/context';
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
}
/** Engine worker initialise options. */
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
interface AuditObjectContentResult {
    contentAuditConfig: ContentAuditConfig;
}
export type { AuditObjectContentOptions, AuditObjectContentResult, EngineCallbackData, EngineConfig, EngineRuntimeInterface, EngineUtilities, EngineWorkerInitialiseOptions, EngineWorkerInterface };
