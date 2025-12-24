import { InferOutput } from 'valibot';
import { Component } from '..';
import { ToolConfig } from '../tool';
import { ValueDelimiterId } from '../dataView';
import { ConnectionConfig, ConnectionDescription, ConnectionNodeConfig } from './connection';
import { connectorConfigSchema, connectorOperationNameSchema, connectorUsageIdSchema } from './connectorConfig.schema';
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
    createObject?(connector: ConnectorInterface, settings: CreateSettings): Promise<void>;
    describeConnection?(connector: ConnectorInterface, settings: DescribeSettings): Promise<DescribeResult>;
    dropObject?(connector: ConnectorInterface, settings: DropSettings): Promise<void>;
    findObject?(connector: ConnectorInterface, settings: FindObjectFolderPathSettings): Promise<string | null>;
    getReadableStream?(connector: ConnectorInterface, settings: GetReadableStreamSettings): Promise<ReadableStream<Uint8Array<ArrayBuffer>>>;
    getRecord?(connector: ConnectorInterface, settings: GetRecordSettings): Promise<GetRecordResult>;
    listNodes?(connector: ConnectorInterface, settings: ListSettings): Promise<ListResult>;
    previewObject?(connector: ConnectorInterface, settings: PreviewSettings): Promise<PreviewResult>;
    removeRecords?(connector: ConnectorInterface, settings: RemoveSettings): Promise<void>;
    retrieveChunks?(connector: ConnectorInterface, settings: RetrieveChunksSettings, chunk: (records: (string[] | Record<string, unknown>)[]) => void, complete: (result: RetrieveChunksSummary) => void): Promise<void>;
    retrieveRecords?(connector: ConnectorInterface, settings: RetrieveRecordsSettings, chunk: (records: (string[] | Record<string, unknown>)[]) => void, complete: (result: RetrieveRecordsSummary) => void): Promise<void>;
    upsertRecords?(connector: ConnectorInterface, settings: UpsertSettings): Promise<void>;
}
/** Connector operation settings. */
interface ConnectorOperationSettings {
    accountId?: string;
    appCheckToken?: string;
    sessionAccessToken?: string;
}
/** Get find object folder path settings. */
interface FindObjectFolderPathSettings extends ConnectorOperationSettings {
    containerName: string | undefined;
    nodeId: string;
}
/** Get readable stream settings. */
interface GetReadableStreamSettings extends ConnectorOperationSettings {
    id: string;
    path: string;
}
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
interface ListSettings extends ConnectorOperationSettings {
    folderPath: string;
    limit?: number;
    offset?: number;
    totalCount?: number;
}
interface ListResult {
    cursor: string | number | undefined;
    connectionNodeConfigs: ConnectionNodeConfig[];
    isMore: boolean;
    totalCount: number;
}
interface PreviewSettings extends ConnectorOperationSettings {
    chunkSize?: number;
    extension?: string;
    path: string;
}
interface PreviewResult {
    data: Record<string, unknown>[] | Uint8Array;
    typeId: 'jsonArray' | 'uint8Array';
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
interface RetrieveRecordsSettings extends ConnectorOperationSettings {
    chunkSize?: number;
    encodingId: string;
    path: string;
    valueDelimiterId: ValueDelimiterId;
}
interface RetrieveRecordsSummary {
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
/** Types/Interfaces/Operations - Connector category. */
interface ConnectorCategory {
    id: string;
    label: string;
}
declare const getConnectorCategory: (id: string, localeId?: import('../../index').LocaleCode) => ConnectorCategory;
/** Exports. */
export { getConnectorCategory };
export type { ConnectionColumnConfig, ConnectionConfig, ConnectionNodeConfig, Encoding, UsageTypeId } from './connection';
export type { ConnectorConfig, ConnectorInterface, ConnectorLocalisedConfig, ConnectorOperationName, ConnectorOperationSettings, ConnectorUsageId, CreateSettings, DropSettings, FindObjectFolderPathSettings, GetReadableStreamSettings, GetRecordResult, GetRecordSettings, ListResult, ListSettings, PreviewResult, PreviewSettings, RemoveSettings, RetrieveChunksSettings, RetrieveChunksSummary, RetrieveRecordsSettings, RetrieveRecordsSummary, UpsertSettings };
export { connectorConfigSchema } from './connectorConfig.schema';
