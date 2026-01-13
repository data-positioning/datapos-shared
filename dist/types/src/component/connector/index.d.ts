import { InferOutput } from 'valibot';
import { Component } from '..';
import { ToolConfig } from '../tool';
import { ConnectionDescriptionConfig, ConnectionNodeConfig } from './connection';
import { connectorCategoryConfigSchema, connectorConfigSchema, connectorOperationNameSchema, connectorUsageIdSchema } from './connectorConfig.schema';
import { ContentAuditConfig, ParsingRecord, PreviewConfig, ValueDelimiterId } from '../dataView';
import { EngineOperationOptions, EngineUtilities } from '../../engine';
/**
 * Connector interface and constructor.
 */
interface ConnectorInterface extends Component {
    abortController: AbortController | undefined;
    readonly config: ConnectorConfig;
    readonly toolConfigs: ToolConfig[];
    /**
     * Abort the active long running operation.
     */
    abortOperation?(): void;
    /**
     *
     */
    auditContent?(path: string, supportsTransferableStreams: boolean, onProgress?: (rowCount: number) => void): Promise<{
        processedRowCount: number;
        durationMs?: number;
    }>;
    auditObjectContent?(options: AuditObjectContentOptions2, chunk: (rowCount: number) => void): Promise<AuditObjectContentResult2>;
    /**
     * Authenticate a specified connection.
     */
    authenticateConnection?(accountId: string, windowCenterX: number, windowCenterY: number): Window;
    /**
     * Create an object for a specified connection.
     */
    createObject?(options: CreateObjectOptions): Promise<void>;
    /**
     * Describe a specified connection.
     */
    describeConnection?(options: DescribeConnectionOptions): Promise<DescribeConnectionResult>;
    /**
     * Drop (delete) an object for a specified connection.
     */
    dropObject?(options: DropObjectOptions): Promise<void>;
    /**
     * Find an object for a specified connection.
     */
    findObject?(options: FindObjectFolderPathOptions): Promise<string | null>;
    /**
     * Get a reader that can retrieve all records from an object for a specified connection.
     */
    getReadableStream?(options: GetReadableStreamOptions): Promise<ReadableStream<Uint8Array>>;
    /**
     * Get a record for an object for a specified connection.
     */
    getRecord?(options: GetRecordOptions): Promise<GetRecordResult>;
    /**
     * List nodes in a folder for a specified connection.
     */
    listNodes?(options: ListNodesOptions): Promise<ListNodesResult>;
    /**
     * Preview an object for a specified connection.
     */
    previewObject?(options: PreviewObjectOptions): Promise<PreviewConfig>;
    /**
     * Remove one or more records from an object for a specified connection.
     */
    removeRecords?(options: RemoveRecordsOptions): Promise<void>;
    /**
     * Retrieve all chunks from an object for a specified connection.
     */
    retrieveChunks?(options: RetrieveChunksOptions, chunk: (data: Uint8Array) => void, complete: () => void): Promise<void>;
    /**
     * Retrieve all records from an object for a specified connection.
     */
    retrieveRecords?(options: RetrieveRecordsOptions, chunk: (records: ParsingRecord[]) => void, complete: (result: RetrieveRecordsSummary) => void): Promise<void>;
    /**
     * Upsert one or more records into an object for a specified connection.
     */
    upsertRecords?(options: UpsertRecordsOptions): Promise<void>;
}
/**
 *
 */
type ConnectorConstructor = new (engineUtilities: EngineUtilities, toolConfigs: ToolConfig[]) => ConnectorInterface;
/**
 * Operation names a connector may support.
 */
type ConnectorOperationName = InferOutput<typeof connectorOperationNameSchema>;
/**
 * Connector data pipeline usage identifiers.
 */
type ConnectorUsageId = InferOutput<typeof connectorUsageIdSchema>;
/**
 * Connector configuration.
 */
type ConnectorConfig = InferOutput<typeof connectorConfigSchema>;
type ConnectorLocalisedConfig = Omit<ConnectorConfig, 'label' | 'description'> & {
    label: string;
    description: string;
};
/**
 * Audit object content options and result.
 */
interface AuditObjectContentOptions extends EngineOperationOptions {
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
/**
 * Audit object content options.
 */
interface AuditObjectContentOptions2 extends EngineOperationOptions {
    chunkSize: number | undefined;
    encodingId: string;
    path: string;
    valueDelimiterId: ValueDelimiterId;
}
/**
 * Audit object content result.
 */
interface AuditObjectContentResult2 {
    contentAuditConfig: ContentAuditConfig;
}
/**
 * Create object options.
 */
interface CreateObjectOptions extends EngineOperationOptions {
    path: string;
    structure: string;
}
/**
 * Describe connection options and result.
 */
type DescribeConnectionOptions = EngineOperationOptions;
interface DescribeConnectionResult {
    descriptionConfig: ConnectionDescriptionConfig;
}
/**
 * Drop object options.
 */
interface DropObjectOptions extends EngineOperationOptions {
    path: string;
}
/**
 * Find object folder path options.
 */
interface FindObjectFolderPathOptions extends EngineOperationOptions {
    containerName: string | undefined;
    nodeId: string;
}
/**
 * Get readable stream options.
 */
interface GetReadableStreamOptions extends EngineOperationOptions {
    id: string;
    path: string;
}
/**
 * Get record options and result.
 */
interface GetRecordOptions extends EngineOperationOptions {
    id: string;
    path: string;
}
interface GetRecordResult {
    record?: string[] | Record<string, unknown>;
}
/**
 * List nodes options and result.
 */
interface ListNodesOptions extends EngineOperationOptions {
    folderPath: string;
    limit?: number;
    offset?: number;
    totalCount?: number;
}
interface ListNodesResult {
    cursor: string | number | undefined;
    connectionNodeConfigs: ConnectionNodeConfig[];
    isMore: boolean;
    totalCount: number;
}
/**
 * Preview object options.
 */
interface PreviewObjectOptions extends EngineOperationOptions {
    chunkSize?: number;
    extension?: string;
    path: string;
}
/**
 * Remove records options.
 */
interface RemoveRecordsOptions extends EngineOperationOptions {
    keys: string[];
    path: string;
}
/**
 * Retrieve chunks options.
 */
interface RetrieveChunksOptions extends EngineOperationOptions {
    chunkSize?: number;
    encodingId: string;
    path: string;
    valueDelimiterId: ValueDelimiterId;
}
/**
 * Retrieve records options and summary.
 */
interface RetrieveRecordsOptions extends EngineOperationOptions {
    chunkSize?: number;
    encodingId: string;
    path: string;
    valueDelimiterId: ValueDelimiterId;
}
interface RetrieveRecordsSummary {
    /**
     * Number of processed bytes.
     */
    byteCount: number;
    /**
     * Count the number of lines being fully commented.
     */
    commentLineCount: number;
    /**
     * Count the number of processed empty lines; work only with the skip_empty_lines option or an error will be thrown
     * if an empty line is found.
     */
    emptyLineCount: number;
    /**
     * Number of lines encountered in the source dataset, start at 1 for the first line.
     */
    lineCount: number;
    /**
     * Number of non uniform records when relax_column_count is true.
     */
    nonUniformRecordCount: number;
    /**
     * Count the number of processed records.
     */
    recordCount: number;
}
/**
 * Upsert records options.
 */
interface UpsertRecordsOptions extends EngineOperationOptions {
    records: Record<string, unknown>[];
    path: string;
}
/**
 * Connector category configuration.
 */
type ConnectorCategoryConfig = InferOutput<typeof connectorCategoryConfigSchema>;
type ConnectorCategoryLocalisedConfig = Omit<ConnectorCategoryConfig, 'label'> & {
    label: string;
};
/**
 * Construct connector category configuration.
 */
declare const constructConnectorCategoryConfig: (id: string, localeId?: import('../../locale').LocaleCode) => ConnectorCategoryLocalisedConfig;
export { connectorConfigSchema } from './connectorConfig.schema';
export { constructConnectorCategoryConfig };
export type { ConnectionConfig, ConnectionNodeConfig, ObjectColumnConfig } from './connection';
export type { AuditObjectContentOptions, AuditObjectContentResult, AuditObjectContentOptions2, AuditObjectContentResult2, ConnectorConfig, ConnectorConstructor, ConnectorInterface, ConnectorLocalisedConfig, ConnectorOperationName, ConnectorUsageId, CreateObjectOptions, DropObjectOptions, FindObjectFolderPathOptions, GetReadableStreamOptions, GetRecordResult, GetRecordOptions, ListNodesResult, ListNodesOptions, PreviewObjectOptions, RemoveRecordsOptions, RetrieveChunksOptions, RetrieveRecordsOptions, RetrieveRecordsSummary, UpsertRecordsOptions };
