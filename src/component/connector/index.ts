/**
 * Connector composables, constants, errors, types/interfaces and utilities.
 */

/** Vendor dependencies. */
import type { InferOutput } from 'valibot';

/** Framework dependencies. */
import type { Component } from '@/component';
import type { ToolConfig } from '@/component/tool';
import type { ValueDelimiterId } from '@/component/dataView';
import type { ConnectionConfig, ConnectionDescription, ConnectionNodeConfig } from '~/src/component/connector/connection';
import type { connectorCategorySchema, connectorConfigSchema, connectorOperationNameSchema, connectorUsageIdSchema } from '~/src/component/connector/connectorConfig.schema';
import { DEFAULT_LOCALE_CODE, type LocalisedString } from '@/index';

/** Authentication method identifiers supported by a connector implementation. */
// type AuthMethodId = InferOutput<typeof connectorAuthMethodIdSchema>;

/** Connector implementation. */
// type ConnectorImplementation = InferOutput<typeof connectorImplementationSchema>;

/** Category identifiers used for grouping and filtering connectors. */
// type ConnectorCategoryId = InferOutput<typeof connectorCategoryIdSchema>;

/** Operation names a connector may support. */
type ConnectorOperationName = InferOutput<typeof connectorOperationNameSchema>;

/** Connector data pipeline usage identifiers. */
type ConnectorUsageId = InferOutput<typeof connectorUsageIdSchema>;

/** Connector configuration. */
type ConnectorConfig = InferOutput<typeof connectorConfigSchema>;
type ConnectorLocalisedConfig = Omit<ConnectorConfig, 'label' | 'description'> & { label: string; description: string };

/** Connector runtime interface. */
interface ConnectorInterface extends Component {
    abortController: AbortController | undefined;
    readonly config: ConnectorConfig;
    readonly connectionConfig: ConnectionConfig;
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
    previewObject?(connector: ConnectorInterface, options: PreviewObjectOptions): Promise<PreviewObjectResult>; // Preview an object for a specified connection.
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

/** Preview object options and result. */
interface PreviewObjectOptions extends ConnectorOperationOptions {
    chunkSize?: number;
    extension?: string;
    path: string;
}
interface PreviewObjectResult {
    data: Record<string, unknown>[] | Uint8Array;
    typeId: 'jsonArray' | 'uint8Array';
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

//#region Utilities

/** Types/Interfaces/Operations - Connector category. */
type ConnectorCategory = InferOutput<typeof connectorCategorySchema>;

const connectorCategories: { id: string; labels: Partial<LocalisedString> }[] = [
    { id: 'application', labels: { 'en-gb': 'Application' } },
    { id: 'curatedDataset', labels: { 'en-gb': 'Curated Dataset' } },
    { id: 'database', labels: { 'en-gb': 'Database' } },
    { id: 'fileStore', labels: { 'en-gb': 'File Store' } }
];

const getConnectorCategory = (id: string, localeId = DEFAULT_LOCALE_CODE): ConnectorCategory => {
    const connectorCategory = connectorCategories.find((connectorCategory) => connectorCategory.id === id);
    if (connectorCategory) {
        // eslint-disable-next-line security/detect-object-injection
        const label = connectorCategory.labels[localeId] ?? connectorCategory.labels[DEFAULT_LOCALE_CODE] ?? connectorCategory.id;
        return { id: connectorCategory.id, label };
    }
    return { id, label: id };
};

//#endregion

/** Exports. */
export { connectorConfigSchema } from '~/src/component/connector/connectorConfig.schema';
export { getConnectorCategory };
export type { ConnectionColumnConfig, ConnectionConfig, ConnectionNodeConfig, Encoding, UsageTypeId } from '~/src/component/connector/connection';
export type {
    ConnectorConfig,
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
    PreviewObjectResult,
    PreviewObjectOptions,
    RemoveRecordsOptions,
    RetrieveChunksOptions,
    RetrieveRecordsOptions,
    RetrieveRecordsSummary,
    UpsertRecordsOptions
};
