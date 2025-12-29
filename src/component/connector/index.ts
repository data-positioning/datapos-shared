/**
 * Connector constants, type declarations, and runtime utilities.
 */

/** Vendor dependencies. */
import type { InferOutput } from 'valibot';

/** Framework dependencies. */
import type { Component } from '@/component';
import { DEFAULT_LOCALE_CODE } from '@/locale';
import type { ToolConfig } from '@/component/tool';
import type { ConnectionDescription, ConnectionNodeConfig } from '~/src/component/connector/connection';
import type { connectorCategoryConfigSchema, connectorConfigSchema, connectorOperationNameSchema, connectorUsageIdSchema } from '~/src/component/connector/connectorConfig.schema';
import type { DataViewPreviewConfig, ValueDelimiterId } from '@/component/dataView';

/** Connector interface an constructor. */
interface ConnectorInterface extends Component {
    abortController: AbortController | undefined;
    readonly config: ConnectorConfig;
    readonly toolConfigs: ToolConfig[];
    abortOperation?(connector: ConnectorInterface): void; // Abort the active long running operation for a specified connection.
    authenticateConnection?(accountId: string, windowCenterX: number, windowCenterY: number): Window; // Authenticate a specified connection.
    createObject?(connector: ConnectorInterface, options: CreateObjectOptions): Promise<void>; // Create an object for a specified connection.
    describeConnection?(connector: ConnectorInterface, options: DescribeConnectionOptions): Promise<DescribeConnectionResult>; // Describe a specified connection.
    dropObject?(connector: ConnectorInterface, options: DropObjectOptions): Promise<void>; // Drop (delete) an object for a specified connection.
    findObject?(connector: ConnectorInterface, options: FindObjectFolderPathOptions): Promise<string | null>; // Find an object for a specified connection.
    getReadableStream?(connector: ConnectorInterface, options: GetReadableStreamOptions): Promise<ReadableStream<Uint8Array>>; // Get a reader that can retrieve all records from an object for a specified connection.
    getRecord?(connector: ConnectorInterface, options: GetRecordOptions): Promise<GetRecordResult>; // Get a record for an object for a specified connection.
    listNodes?(connector: ConnectorInterface, options: ListNodesOptions): Promise<ListNodesResult>; // List nodes in a folder for a specified connection.
    previewObject?(connector: ConnectorInterface, options: PreviewObjectOptions): Promise<DataViewPreviewConfig>; // Preview an object for a specified connection.
    removeRecords?(connector: ConnectorInterface, options: RemoveRecordsOptions): Promise<void>; // Remove one or more records from an object for a specified connection.
    retrieveChunks?(
        connector: ConnectorInterface,
        options: RetrieveChunksOptions,
        chunk: (records: (string[] | Record<string, unknown>)[]) => void,
        complete: () => void
    ): Promise<void>; // Retrieve all chunks from an object for a specified connection.
    retrieveRecords?(
        connector: ConnectorInterface,
        options: RetrieveRecordsOptions,
        chunk: (records: (string[] | Record<string, unknown>)[]) => void,
        complete: (result: RetrieveRecordsSummary) => void
    ): Promise<void>; // Retrieve all records from an object for a specified connection.
    upsertRecords?(connector: ConnectorInterface, options: UpsertRecordsOptions): Promise<void>; // Upsert one or more records into an object for a specified connection.
}
type ConnectorConstructor = new (toolConfigs: ToolConfig[]) => ConnectorInterface;

//#region ##### Connector operation type declarations. #####

/** Operation names a connector may support. */
type ConnectorOperationName = InferOutput<typeof connectorOperationNameSchema>;

/** Connector data pipeline usage identifiers. */
type ConnectorUsageId = InferOutput<typeof connectorUsageIdSchema>;

/** Connector configuration. */
type ConnectorConfig = InferOutput<typeof connectorConfigSchema>;
type ConnectorLocalisedConfig = Omit<ConnectorConfig, 'label' | 'description'> & { label: string; description: string };

/** Connector operation options. */
interface ConnectorOperationOptions {
    accountId?: string;
    appCheckToken?: string;
    sessionAccessToken?: string;
}

/** Create object options. */
interface CreateObjectOptions extends ConnectorOperationOptions {
    path: string;
    structure: string;
}

/** Describe connection options and result. */
type DescribeConnectionOptions = ConnectorOperationOptions;
interface DescribeConnectionResult {
    description: ConnectionDescription;
}

/** Drop object options. */
interface DropObjectOptions extends ConnectorOperationOptions {
    path: string;
}

/** Find object folder path options. */
interface FindObjectFolderPathOptions extends ConnectorOperationOptions {
    containerName: string | undefined;
    nodeId: string;
}

/** Get readable stream options. */
interface GetReadableStreamOptions extends ConnectorOperationOptions {
    id: string;
    path: string;
}

/** Get record options and result. */
interface GetRecordOptions extends ConnectorOperationOptions {
    id: string;
    path: string;
}
interface GetRecordResult {
    record?: string[] | Record<string, unknown>;
}

/** List nodes options and result. */
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

/** Preview object options. */
interface PreviewObjectOptions extends ConnectorOperationOptions {
    chunkSize?: number;
    extension?: string;
    path: string;
}

/** Remove records options. */
interface RemoveRecordsOptions extends ConnectorOperationOptions {
    keys: string[];
    path: string;
}

/** Retrieve chunks options. */
interface RetrieveChunksOptions extends ConnectorOperationOptions {
    chunkSize?: number;
    encodingId: string;
    path: string;
    valueDelimiterId: ValueDelimiterId;
}

/** Retrieve records options and summary. */
interface RetrieveRecordsOptions extends ConnectorOperationOptions {
    chunkSize?: number;
    encodingId: string;
    path: string;
    valueDelimiterId: ValueDelimiterId;
}
interface RetrieveRecordsSummary {
    byteCount: number; // Number of processed bytes.
    commentLineCount: number; // Count the number of lines being fully commented.
    emptyLineCount: number; // Count the number of processed empty lines; work only with the skip_empty_lines option or an error will be thrown if an empty line is found.
    lineCount: number; // Number of lines encountered in the source dataset, start at 1 for the first line.
    nonUniformRecordCount: number; // Number of non uniform records when relax_column_count is true.
    recordCount: number; // Count the number of processed records.
}

/** Upsert records options. */
interface UpsertRecordsOptions extends ConnectorOperationOptions {
    records: Record<string, unknown>[];
    path: string;
}

//#endregion

//#region ##### Connector category constants, type declarations and runtime utilities. #####

/** Connector category configuration. */
type ConnectorCategoryConfig = InferOutput<typeof connectorCategoryConfigSchema>;
type ConnectorCategoryLocalisedConfig = Omit<ConnectorCategoryConfig, 'label'> & { label: string };

/** Connector categories. */
const CONNECTOR_CATEGORY_CONFIGS: ConnectorCategoryConfig[] = [
    { id: 'application', label: { 'en-gb': 'Application' } },
    { id: 'curatedDataset', label: { 'en-gb': 'Curated Dataset' } },
    { id: 'database', label: { 'en-gb': 'Database' } },
    { id: 'fileStore', label: { 'en-gb': 'File Store' } }
];

/** Construct connector category configuration. */
const constructConnectorCategoryConfig = (id: string, localeId = DEFAULT_LOCALE_CODE): ConnectorCategoryLocalisedConfig => {
    const connectorCategory = CONNECTOR_CATEGORY_CONFIGS.find((connectorCategory) => connectorCategory.id === id);
    if (connectorCategory) {
        // eslint-disable-next-line security/detect-object-injection
        const label = connectorCategory.label[localeId] ?? connectorCategory.label[DEFAULT_LOCALE_CODE] ?? connectorCategory.id;
        return { id: connectorCategory.id, label };
    }
    return { id, label: id };
};

//#endregion

/** Exports. */
export { connectorConfigSchema } from '~/src/component/connector/connectorConfig.schema';
export { constructConnectorCategoryConfig };
export type { ConnectionColumnConfig, ConnectionConfig, ConnectionNodeConfig, UsageTypeId } from '~/src/component/connector/connection';
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
