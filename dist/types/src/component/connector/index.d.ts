import { InferOutput } from 'valibot';
import { Component } from '..';
import { EngineUtilities } from '../../engine';
import { ToolConfig } from '../tool';
import { ConnectionDescriptionConfig, ConnectionNodeConfig } from './connection';
import { connectorCategoryConfigSchema, connectorConfigSchema, connectorOperationNameSchema, connectorUsageIdSchema } from './connectorConfig.schema';
import { DataViewPreviewConfig, ObjectRecord, ValueDelimiterId } from '../dataView';
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
    previewObject?(options: PreviewObjectOptions): Promise<DataViewPreviewConfig>;
    /**
     * Remove one or more records from an object for a specified connection.
     */
    removeRecords?(options: RemoveRecordsOptions): Promise<void>;
    /**
     * Retrieve all chunks from an object for a specified connection.
     */
    retrieveChunks?(options: RetrieveChunksOptions, chunk: (records: ObjectRecord[]) => void, complete: () => void): Promise<void>;
    /**
     * Retrieve all records from an object for a specified connection.
     */
    retrieveRecords?(options: RetrieveRecordsOptions, chunk: (records: ObjectRecord[]) => void, complete: (result: RetrieveRecordsSummary) => void): Promise<void>;
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
 * Connector operation options.
 */
interface ConnectorOperationOptions {
    accountId?: string;
    appCheckToken?: string;
    sessionAccessToken?: string;
}
/**
 * Create object options.
 */
interface CreateObjectOptions extends ConnectorOperationOptions {
    path: string;
    structure: string;
}
/**
 * Describe connection options and result.
 */
type DescribeConnectionOptions = ConnectorOperationOptions;
interface DescribeConnectionResult {
    descriptionConfig: ConnectionDescriptionConfig;
}
/**
 * Drop object options.
 */
interface DropObjectOptions extends ConnectorOperationOptions {
    path: string;
}
/**
 * Find object folder path options.
 */
interface FindObjectFolderPathOptions extends ConnectorOperationOptions {
    containerName: string | undefined;
    nodeId: string;
}
/**
 * Get readable stream options.
 */
interface GetReadableStreamOptions extends ConnectorOperationOptions {
    id: string;
    path: string;
}
/**
 * Get record options and result.
 */
interface GetRecordOptions extends ConnectorOperationOptions {
    id: string;
    path: string;
}
interface GetRecordResult {
    record?: string[] | Record<string, unknown>;
}
/**
 * List nodes options and result.
 */
interface ListNodesOptions extends ConnectorOperationOptions {
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
interface PreviewObjectOptions extends ConnectorOperationOptions {
    chunkSize?: number;
    extension?: string;
    path: string;
}
/**
 * Remove records options.
 */
interface RemoveRecordsOptions extends ConnectorOperationOptions {
    keys: string[];
    path: string;
}
/**
 * Retrieve chunks options.
 */
interface RetrieveChunksOptions extends ConnectorOperationOptions {
    chunkSize?: number;
    encodingId: string;
    path: string;
    valueDelimiterId: ValueDelimiterId;
}
/**
 * Retrieve records options and summary.
 */
interface RetrieveRecordsOptions extends ConnectorOperationOptions {
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
interface UpsertRecordsOptions extends ConnectorOperationOptions {
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
export type { ConnectionColumnConfig, ConnectionConfig, ConnectionNodeConfig } from './connection';
export type { ConnectorConfig, ConnectorConstructor, ConnectorInterface, ConnectorLocalisedConfig, ConnectorOperationName, ConnectorOperationOptions, ConnectorUsageId, CreateObjectOptions, DropObjectOptions, FindObjectFolderPathOptions, GetReadableStreamOptions, GetRecordResult, GetRecordOptions, ListNodesResult, ListNodesOptions, PreviewObjectOptions, RemoveRecordsOptions, RetrieveChunksOptions, RetrieveRecordsOptions, RetrieveRecordsSummary, UpsertRecordsOptions };
