import { InferOutput } from 'valibot';
import { Component } from '..';
import { ToolConfig } from '../tool';
import { ValueDelimiterId } from '../dataView';
import { ConnectionConfig, ConnectionDescription, ConnectionNodeConfig } from './connection';
import { connectorCategorySchema, connectorConfigSchema, connectorOperationNameSchema, connectorUsageIdSchema } from './connectorConfig.schema';
/** Authentication method identifiers supported by a connector implementation. */
/** Connector implementation. */
/** Category identifiers used for grouping and filtering connectors. */
/** Operation names a connector may support. */
type ConnectorOperationName = InferOutput<typeof connectorOperationNameSchema>;
/** Connector data pipeline usage identifiers. */
type ConnectorUsageId = InferOutput<typeof connectorUsageIdSchema>;
/** Connector configuration. */
type ConnectorConfig = InferOutput<typeof connectorConfigSchema>;
type ConnectorLocalisedConfig = Omit<ConnectorConfig, 'label' | 'description'> & {
    label: string;
    description: string;
};
/** Connector runtime interface. */
interface ConnectorInterface extends Component {
    abortController: AbortController | undefined;
    readonly config: ConnectorConfig;
    readonly connectionConfig: ConnectionConfig;
    readonly toolConfigs: ToolConfig[];
    abortOperation?(connector: ConnectorInterface): void;
    authenticateConnection?(accountId: string, windowCenterX: number, windowCenterY: number): Window;
    createObject?(connector: ConnectorInterface, options: CreateOptions): Promise<void>;
    describeConnection?(connector: ConnectorInterface, options: DescribeOptions): Promise<DescribeResult>;
    dropObject?(connector: ConnectorInterface, options: DropOptions): Promise<void>;
    findObject?(connector: ConnectorInterface, options: FindObjectFolderPathOptions): Promise<string | null>;
    getReadableStream?(connector: ConnectorInterface, options: GetReadableStreamOptions): Promise<ReadableStream<Uint8Array>>;
    getRecord?(connector: ConnectorInterface, options: GetRecordOptions): Promise<GetRecordResult>;
    listNodes?(connector: ConnectorInterface, options: ListNodesOptions): Promise<ListNodesResult>;
    previewObject?(connector: ConnectorInterface, options: PreviewObjectOptions): Promise<PreviewObjectResult>;
    removeRecords?(connector: ConnectorInterface, options: RemoveOptions, chunk: (records: (string[] | Record<string, unknown>)[]) => void, complete: (result: RetrieveChunksSummary) => void): Promise<void>;
    retrieveChunks?(connector: ConnectorInterface, options: RetrieveChunksOptions, chunk: (records: (string[] | Record<string, unknown>)[]) => void, complete: (result: RetrieveChunksSummary) => void): Promise<void>;
    retrieveRecords?(connector: ConnectorInterface, options: RetrieveRecordsOptions): Promise<void>;
    upsertRecords?(connector: ConnectorInterface, options: UpsertOptions): Promise<void>;
}
/** Connector operation options. */
interface ConnectorOperationOptions {
    accountId?: string;
    appCheckToken?: string;
    sessionAccessToken?: string;
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
/** Retrieve records options and summary. */
interface RetrieveRecordsOptions extends ConnectorOperationOptions {
    chunkSize?: number;
    encodingId: string;
    path: string;
    valueDelimiterId: ValueDelimiterId;
    chunk: (records: (string[] | Record<string, unknown>)[]) => void;
    complete: (result: RetrieveRecordsSummary) => void;
}
interface RetrieveRecordsSummary {
    byteCount: number;
    commentLineCount: number;
    emptyLineCount: number;
    invalidFieldLengthCount: number;
    lineCount: number;
    recordCount: number;
}
interface CreateOptions extends ConnectorOperationOptions {
    accountId?: string;
    path: string;
    structure: string;
}
type DescribeOptions = ConnectorOperationOptions;
interface DescribeResult {
    description: ConnectionDescription;
}
interface DropOptions extends ConnectorOperationOptions {
    path: string;
}
interface GetRecordOptions extends ConnectorOperationOptions {
    id: string;
    path: string;
}
interface GetRecordResult {
    record?: string[] | Record<string, unknown>;
}
interface RemoveOptions extends ConnectorOperationOptions {
    keys: string[];
    path: string;
}
interface RetrieveChunksOptions extends ConnectorOperationOptions {
    chunkSize?: number;
    encodingId: string;
    path: string;
    valueDelimiterId: ValueDelimiterId;
    chunk: (records: (string[] | Record<string, unknown>)[]) => void;
    complete: (result: RetrieveChunksSummary) => void;
}
interface RetrieveChunksSummary {
    byteCount: number;
    commentLineCount: number;
    emptyLineCount: number;
    invalidFieldLengthCount: number;
    lineCount: number;
    recordCount: number;
}
interface UpsertOptions extends ConnectorOperationOptions {
    records: Record<string, unknown>[];
    path: string;
}
/** Types/Interfaces/Operations - Connector category. */
type ConnectorCategory = InferOutput<typeof connectorCategorySchema>;
declare const getConnectorCategory: (id: string, localeId?: import('../../index').LocaleCode) => ConnectorCategory;
/** Exports. */
export { getConnectorCategory };
export type { ConnectionColumnConfig, ConnectionConfig, ConnectionNodeConfig, Encoding, UsageTypeId } from './connection';
export type { ConnectorConfig, ConnectorInterface, ConnectorLocalisedConfig, ConnectorOperationName, ConnectorOperationOptions, ConnectorUsageId, CreateOptions, DropOptions, FindObjectFolderPathOptions, GetReadableStreamOptions, GetRecordResult, GetRecordOptions, ListNodesResult, ListNodesOptions, PreviewObjectResult, PreviewObjectOptions, RemoveOptions, RetrieveChunksOptions, RetrieveChunksSummary, RetrieveRecordsOptions, RetrieveRecordsSummary, UpsertOptions };
export { connectorConfigSchema } from './connectorConfig.schema';
