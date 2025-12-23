import { InferOutput } from 'valibot';
import { Component } from '..';
import { connectorConfigSchema } from './connectorConfig.schema';
import { ConnectionConfig, ConnectionDescription, ConnectionNodeConfig } from './connection';
import { DataViewContentAuditConfig, ValueDelimiterId } from '../dataView';
import { ToolConfig } from '../../index';
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
    abortController?: AbortController;
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
export interface InitialiseSettings {
    connectorStorageURLPrefix: string;
}
export interface ConnectorOperationSettings {
    accountId?: string;
    appCheckToken?: string;
    sessionAccessToken?: string;
}
export interface AuditContentSettings extends ConnectorOperationSettings {
    chunkSize?: number;
    encodingId: string;
    path: string;
    valueDelimiterId: ValueDelimiterId;
}
export interface AuditContentResult {
    contentAuditConfig: DataViewContentAuditConfig;
}
export interface CreateSettings extends ConnectorOperationSettings {
    accountId?: string;
    path: string;
    structure: string;
}
export type DescribeSettings = ConnectorOperationSettings;
export interface DescribeResult {
    description: ConnectionDescription;
}
export interface DropSettings extends ConnectorOperationSettings {
    path: string;
}
export interface FindSettings extends ConnectorOperationSettings {
    containerName?: string;
    objectName: string;
}
export interface FindResult {
    folderPath?: string;
}
export interface GetReadableStreamSettings extends ConnectorOperationSettings {
    id: string;
    path: string;
}
export interface GetReadableStreamResult {
    readable?: ReadableStream<unknown>;
}
export interface GetRecordSettings extends ConnectorOperationSettings {
    id: string;
    path: string;
}
export interface GetRecordResult {
    record?: string[] | Record<string, unknown>;
}
export interface ListSettings extends ConnectorOperationSettings {
    folderPath: string;
    limit?: number;
    offset?: number;
    totalCount?: number;
}
export interface ListResult {
    cursor: string | number | undefined;
    connectionNodeConfigs: ConnectionNodeConfig[];
    isMore: boolean;
    totalCount: number;
}
export interface PreviewSettings extends ConnectorOperationSettings {
    chunkSize?: number;
    extension?: string;
    path: string;
}
export interface PreviewResult {
    data: Record<string, unknown>[] | Uint8Array;
    typeId: 'jsonArray' | 'uint8Array';
}
export interface RemoveSettings extends ConnectorOperationSettings {
    keys: string[];
    path: string;
}
export interface RetrieveChunksSettings extends ConnectorOperationSettings {
    chunkSize?: number;
    encodingId: string;
    path: string;
    valueDelimiterId: ValueDelimiterId;
}
export interface RetrieveRecordsSettings extends ConnectorOperationSettings {
    chunkSize?: number;
    encodingId: string;
    path: string;
    valueDelimiterId: ValueDelimiterId;
}
export interface RetrieveRecordsResult {
    records: (string[] | Record<string, unknown>)[];
}
export interface RetrieveChunksSummary {
    byteCount: number;
    commentLineCount: number;
    emptyLineCount: number;
    invalidFieldLengthCount: number;
    lineCount: number;
    recordCount: number;
}
export interface RetrieveRecordsSummary {
    byteCount: number;
    commentLineCount: number;
    emptyLineCount: number;
    invalidFieldLengthCount: number;
    lineCount: number;
    recordCount: number;
}
export interface UpsertSettings extends ConnectorOperationSettings {
    records: Record<string, unknown>[];
    path: string;
}
export interface ConnectorCallbackData {
    typeId: string;
    properties: Record<string, unknown>;
}
/** Exports */
export type { Connector, ConnectorConfig, ConnectorLocalisedConfig };
export { connectorConfigSchema } from './connectorConfig.schema';
