/**
 * Connector constants, type declarations, and runtime utilities.
 */

// Vendor dependencies.
import type { InferOutput } from 'valibot';

// Framework dependencies.
import type { Component } from '@/component';
import { DEFAULT_LOCALE_CODE } from '@/locale';
import type { EngineUtilities } from '@/engine';
import type { ToolConfig } from '@/component/tool';
import type { ConnectionDescriptionConfig, ConnectionNodeConfig } from '@/component/connector/connection';
import type { connectorCategoryConfigSchema, connectorConfigSchema, connectorOperationNameSchema, connectorUsageIdSchema } from '@/component/connector/connectorConfig.schema';
import type { DataViewPreviewConfig, ParsingRecord, StringValueRecord, ValueDelimiterId } from '@/component/dataView';

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

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//#region Connector operation type declarations.
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

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
type ConnectorLocalisedConfig = Omit<ConnectorConfig, 'label' | 'description'> & { label: string; description: string };

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

//#endregion ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//#region Connector category constants, type declarations and runtime utilities.
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Connector category configuration.
 */
type ConnectorCategoryConfig = InferOutput<typeof connectorCategoryConfigSchema>;
type ConnectorCategoryLocalisedConfig = Omit<ConnectorCategoryConfig, 'label'> & { label: string };

/**
 * Connector categories configuration.
 */
const CONNECTOR_CATEGORY_CONFIGS: ConnectorCategoryConfig[] = [
    { id: 'application', label: { 'en-gb': 'Application' } },
    { id: 'curatedDataset', label: { 'en-gb': 'Curated Dataset' } },
    { id: 'database', label: { 'en-gb': 'Database' } },
    { id: 'fileStore', label: { 'en-gb': 'File Store' } }
];

/**
 * Construct connector category configuration.
 */
const constructConnectorCategoryConfig = (id: string, localeId = DEFAULT_LOCALE_CODE): ConnectorCategoryLocalisedConfig => {
    const connectorCategory = CONNECTOR_CATEGORY_CONFIGS.find((connectorCategory) => connectorCategory.id === id);
    if (connectorCategory) {
        // eslint-disable-next-line security/detect-object-injection
        const label = connectorCategory.label[localeId] ?? connectorCategory.label[DEFAULT_LOCALE_CODE] ?? connectorCategory.id;
        return { id: connectorCategory.id, label };
    }
    return { id, label: id };
};

//#endregion ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Exports.
export { connectorConfigSchema } from '@/component/connector/connectorConfig.schema';
export { constructConnectorCategoryConfig };
export type { ConnectionColumnConfig, ConnectionConfig, ConnectionNodeConfig } from '@/component/connector/connection';
export type {
    ConnectorConfig,
    ConnectorConstructor,
    ConnectorInterface,
    ConnectorLocalisedConfig,
    ConnectorOperationName,
    ConnectorOperationOptions,
    ConnectorUsageId,
    CreateObjectOptions,
    DropObjectOptions,
    FindObjectFolderPathOptions,
    GetReadableStreamOptions,
    GetRecordResult,
    GetRecordOptions,
    ListNodesResult,
    ListNodesOptions,
    PreviewObjectOptions,
    RemoveRecordsOptions,
    RetrieveChunksOptions,
    RetrieveRecordsOptions,
    RetrieveRecordsSummary,
    UpsertRecordsOptions
};
