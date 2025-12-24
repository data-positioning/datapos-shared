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
    createObject?(connector: ConnectorInterface, settings: CreateSettings): Promise<void>; // Create an object for a specified connection.
    describeConnection?(connector: ConnectorInterface, settings: DescribeSettings): Promise<DescribeResult>; // Describe a specified connection.
    dropObject?(connector: ConnectorInterface, settings: DropSettings): Promise<void>; // Drop (delete) an object for a specified connection.
    findObject?(connector: ConnectorInterface, settings: FindObjectFolderPathSettings): Promise<string | null>; // Find an object for a specified connection.
    getReadableStream?(connector: ConnectorInterface, settings: GetReadableStreamSettings): Promise<ReadableStream<Uint8Array<ArrayBuffer>>>; // Get a reader that can retrieve all records from an object for a specified connection.
    getRecord?(connector: ConnectorInterface, settings: GetRecordSettings): Promise<GetRecordResult>; // Get a record for an object for a specified connection.
    listNodes?(connector: ConnectorInterface, settings: ListNodesSettings): Promise<ListNodesResult>; // List nodes in a folder for a specified connection.
    previewObject?(connector: ConnectorInterface, settings: PreviewObjectSettings): Promise<PreviewObjectResult>; // Preview an object for a specified connection.
    removeRecords?(connector: ConnectorInterface, settings: RemoveSettings): Promise<void>; // Remove one or more records from an object for a specified connection.
    retrieveChunks?(
        connector: ConnectorInterface,
        settings: RetrieveChunksSettings,
        chunk: (records: (string[] | Record<string, unknown>)[]) => void,
        complete: (result: RetrieveChunksSummary) => void
    ): Promise<void>; // Retrieve all chunks from an object for a specified connection.
    retrieveRecords?(
        connector: ConnectorInterface,
        settings: RetrieveRecordsSettings,
        chunk: (records: (string[] | Record<string, unknown>)[]) => void,
        complete: (result: RetrieveRecordsSummary) => void
    ): Promise<void>; // Retrieve all records from an object for a specified connection.
    upsertRecords?(connector: ConnectorInterface, settings: UpsertSettings): Promise<void>; // Upsert one or more records into an object for a specified connection.
}

/** Connector operation settings. */
interface ConnectorOperationSettings {
    accountId?: string;
    appCheckToken?: string;
    sessionAccessToken?: string;
}

/** Find object folder path settings. */
interface FindObjectFolderPathSettings extends ConnectorOperationSettings {
    containerName: string | undefined;
    nodeId: string;
}

/** Get readable stream settings. */
interface GetReadableStreamSettings extends ConnectorOperationSettings {
    id: string;
    path: string;
}

/** List nodes result. */
interface ListNodesResult {
    cursor: string | number | undefined;
    connectionNodeConfigs: ConnectionNodeConfig[];
    isMore: boolean;
    totalCount: number;
}

/** List nodes settings. */
interface ListNodesSettings extends ConnectorOperationSettings {
    folderPath: string;
    limit?: number;
    offset?: number;
    totalCount?: number;
}

/** Preview object result. */
interface PreviewObjectResult {
    data: Record<string, unknown>[] | Uint8Array;
    typeId: 'jsonArray' | 'uint8Array';
}

/** Preview object settings. */
interface PreviewObjectSettings extends ConnectorOperationSettings {
    chunkSize?: number;
    extension?: string;
    path: string;
}

/** Retrieve records summary. */
interface RetrieveRecordsSummary {
    byteCount: number;
    commentLineCount: number;
    emptyLineCount: number;
    invalidFieldLengthCount: number;
    lineCount: number;
    recordCount: number;
}

/** Retrieve records settings. */
interface RetrieveRecordsSettings extends ConnectorOperationSettings {
    chunkSize?: number;
    encodingId: string;
    path: string;
    valueDelimiterId: ValueDelimiterId;
}

//#region PENDING

interface CreateSettings extends ConnectorOperationSettings {
    accountId?: string;
    path: string;
    structure: string;
}

type DescribeSettings = ConnectorOperationSettings;
interface DescribeResult {
    description: ConnectionDescription;
}

interface DropSettings extends ConnectorOperationSettings {
    path: string;
}

interface GetRecordSettings extends ConnectorOperationSettings {
    id: string;
    path: string;
}
interface GetRecordResult {
    record?: string[] | Record<string, unknown>;
}

interface RemoveSettings extends ConnectorOperationSettings {
    keys: string[];
    path: string;
}

interface RetrieveChunksSettings extends ConnectorOperationSettings {
    chunkSize?: number;
    encodingId: string;
    path: string;
    valueDelimiterId: ValueDelimiterId;
}

interface RetrieveChunksSummary {
    byteCount: number;
    commentLineCount: number;
    emptyLineCount: number;
    invalidFieldLengthCount: number;
    lineCount: number;
    recordCount: number;
}

interface UpsertSettings extends ConnectorOperationSettings {
    records: Record<string, unknown>[];
    path: string;
}

//#endregion

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
export { getConnectorCategory };
export type { ConnectionColumnConfig, ConnectionConfig, ConnectionNodeConfig, Encoding, UsageTypeId } from '~/src/component/connector/connection';
export type {
    ConnectorConfig,
    ConnectorInterface,
    ConnectorLocalisedConfig,
    ConnectorOperationName,
    ConnectorOperationSettings,
    ConnectorUsageId,
    CreateSettings,
    DropSettings,
    FindObjectFolderPathSettings,
    GetReadableStreamSettings,
    GetRecordResult,
    GetRecordSettings,
    ListNodesResult,
    ListNodesSettings,
    PreviewObjectResult,
    PreviewObjectSettings,
    RemoveSettings,
    RetrieveChunksSettings,
    RetrieveChunksSummary,
    RetrieveRecordsSettings,
    RetrieveRecordsSummary,
    UpsertSettings
};

export { connectorConfigSchema } from '~/src/component/connector/connectorConfig.schema';
