import { InferOutput } from 'valibot';
import { Component } from '..';
import { connectorConfigSchema } from './connectorConfig.schema';
import { ToolConfig } from '../tool';
import { ValueDelimiterId } from '../dataView';
import { ConnectionConfig, ConnectionDescription, ConnectionNodeConfig } from './connection';
/** Authentication method identifiers supported by a connector implementation. */
/** Connector implementation. */
/** Category identifiers used for grouping and filtering connectors. */
/** Operation names a connector may support. */
/** Connector data pipeline usage identifiers. */
/** Connector configuration. */
type ConnectorConfig = InferOutput<typeof connectorConfigSchema>;
type ConnectorLocalisedConfig = Omit<ConnectorConfig, 'label' | 'description'> & {
    label: string;
    description: string;
};
/** Connector runtime interface. */
interface Connector extends Component {
    abortController: AbortController | undefined;
    readonly config: ConnectorConfig;
    readonly connectionConfig: ConnectionConfig;
    readonly toolConfigs: ToolConfig[];
    abortOperation?(connector: Connector): void;
    authenticateConnection?(accountId: string, windowCenterX: number, windowCenterY: number): Window;
    createObject?(connector: Connector, settings: CreateSettings): Promise<void>;
    describeConnection?(connector: Connector, settings: DescribeSettings): Promise<DescribeResult>;
    dropObject?(connector: Connector, settings: DropSettings): Promise<void>;
    findObject?(connector: Connector, findSettings: FindSettings): Promise<FindResult>;
    getReadableStream?(connector: Connector, getSettings: GetReadableStreamSettings): Promise<GetReadableStreamResult>;
    getRecord?(connector: Connector, getSettings: GetRecordSettings): Promise<GetRecordResult>;
    listNodes?(connector: Connector, settings: ListSettings): Promise<ListResult>;
    previewObject?(connector: Connector, settings: PreviewSettings): Promise<PreviewResult>;
    removeRecords?(connector: Connector, settings: RemoveSettings): Promise<void>;
    retrieveChunks?(connector: Connector, settings: RetrieveChunksSettings, chunk: (records: (string[] | Record<string, unknown>)[]) => void, complete: (result: RetrieveChunksSummary) => void): Promise<void>;
    retrieveRecords?(connector: Connector, settings: RetrieveRecordsSettings, chunk: (records: (string[] | Record<string, unknown>)[]) => void, complete: (result: RetrieveRecordsSummary) => void): Promise<void>;
    upsertRecords?(connector: Connector, settings: UpsertSettings): Promise<void>;
}
interface ConnectorCallbackData {
    typeId: string;
    properties: Record<string, unknown>;
}
interface ConnectorOperationSettings {
    accountId?: string;
    appCheckToken?: string;
    sessionAccessToken?: string;
}
/** Get readable stream result and settings. */
interface GetReadableStreamResult {
    readable?: ReadableStream<unknown>;
}
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
interface FindSettings extends ConnectorOperationSettings {
    containerName?: string;
    objectName: string;
}
interface FindResult {
    folderPath?: string;
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
interface RetrieveRecordsSettings extends ConnectorOperationSettings {
    chunkSize?: number;
    encodingId: string;
    path: string;
    valueDelimiterId: ValueDelimiterId;
}
interface RetrieveChunksResult {
    records: (string[] | Record<string, unknown>)[];
}
interface RetrieveRecordsResult {
    records: (string[] | Record<string, unknown>)[];
}
interface RetrieveChunksSummary {
    byteCount: number;
    commentLineCount: number;
    emptyLineCount: number;
    invalidFieldLengthCount: number;
    lineCount: number;
    recordCount: number;
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
export type { Connector, ConnectorCallbackData, ConnectorConfig, ConnectorLocalisedConfig, ConnectorOperationSettings };
export type { CreateSettings, DropSettings, FindResult, FindSettings, GetReadableStreamResult, GetReadableStreamSettings, GetRecordResult, GetRecordSettings, ListResult, ListSettings, PreviewResult, PreviewSettings, RemoveSettings, RetrieveChunksResult, RetrieveChunksSettings, RetrieveChunksSummary, RetrieveRecordsResult, RetrieveRecordsSettings, RetrieveRecordsSummary, UpsertSettings };
export { connectorConfigSchema } from './connectorConfig.schema';
