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
    createObject?(connector: ConnectorInterface, options: CreateObjectOptions): Promise<void>;
    describeConnection?(connector: ConnectorInterface, options: DescribeConnectionOptions): Promise<DescribeConnectionResult>;
    dropObject?(connector: ConnectorInterface, options: DropObjectOptions): Promise<void>;
    findObject?(connector: ConnectorInterface, options: FindObjectFolderPathOptions): Promise<string | null>;
    getReadableStream?(connector: ConnectorInterface, options: GetReadableStreamOptions): Promise<ReadableStream<Uint8Array>>;
    getRecord?(connector: ConnectorInterface, options: GetRecordOptions): Promise<GetRecordResult>;
    listNodes?(connector: ConnectorInterface, options: ListNodesOptions): Promise<ListNodesResult>;
    previewObject?(connector: ConnectorInterface, options: PreviewObjectOptions): Promise<PreviewObjectResult>;
    removeRecords?(connector: ConnectorInterface, options: RemoveRecordsOptions): Promise<void>;
    retrieveChunks?(connector: ConnectorInterface, options: RetrieveChunksOptions, chunk: (records: (string[] | Record<string, unknown>)[]) => void, complete: () => void): Promise<void>;
    retrieveRecords?(connector: ConnectorInterface, options: RetrieveRecordsOptions, chunk: (records: (string[] | Record<string, unknown>)[]) => void, complete: (result: RetrieveRecordsSummary) => void): Promise<void>;
    upsertRecords?(connector: ConnectorInterface, options: UpsertRecordsOptions): Promise<void>;
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
    byteCount: number;
    commentLineCount: number;
    emptyLineCount: number;
    lineCount: number;
    nonUniformRecordCount: number;
    recordCount: number;
}
/** Upsert records options. */
interface UpsertRecordsOptions extends ConnectorOperationOptions {
    records: Record<string, unknown>[];
    path: string;
}
/** Types/Interfaces/Operations - Connector category. */
type ConnectorCategory = InferOutput<typeof connectorCategorySchema>;
declare const getConnectorCategory: (id: string, localeId?: import('../../index').LocaleCode) => ConnectorCategory;
/** Exports. */
export { connectorConfigSchema } from './connectorConfig.schema';
export { getConnectorCategory };
export type { ConnectionColumnConfig, ConnectionConfig, ConnectionNodeConfig, Encoding, UsageTypeId } from './connection';
export type { ConnectorConfig, ConnectorInterface, ConnectorLocalisedConfig, ConnectorOperationName, ConnectorOperationOptions, ConnectorUsageId, CreateObjectOptions, DropObjectOptions, FindObjectFolderPathOptions, GetReadableStreamOptions, GetRecordResult, GetRecordOptions, ListNodesResult, ListNodesOptions, PreviewObjectResult, PreviewObjectOptions, RemoveRecordsOptions, RetrieveChunksOptions, RetrieveRecordsOptions, RetrieveRecordsSummary, UpsertRecordsOptions };
