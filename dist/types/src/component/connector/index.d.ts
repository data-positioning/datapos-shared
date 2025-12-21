import { parse as csvParse } from 'csv-parse/browser/esm';
import { parse as dateFnsParse } from 'date-fns';
import { InferOutput } from 'valibot';
import { nanoid } from 'nanoid';
import { Component } from '..';
import { buildFetchError, OperationalError } from '../../errors';
import { ConnectionConfig, ConnectionDescription, ConnectionNodeConfig } from './connection';
import { connectorConfigSchema, connectorImplementationSchema, connectorModuleCategoryIdSchema, connectorOperationSchema, connectorUsageIdSchema } from './connectorConfig.schema';
import { DataViewContentAuditConfig, ValueDelimiterId } from '../dataView';
import { extractExtensionFromPath, extractNameFromPath, lookupMimeTypeForExtension } from '../../utilities';
export type ConnectorModuleCategoryId = InferOutput<typeof connectorModuleCategoryIdSchema>;
export type ConnectorOperation = InferOutput<typeof connectorOperationSchema>;
export type ConnectorUsageId = InferOutput<typeof connectorUsageIdSchema>;
/** Constants  */
export declare const CONNECTOR_DESTINATION_OPERATIONS: string[];
export declare const CONNECTOR_SOURCE_OPERATIONS: string[];
/** Interfaces/Types - Connector. */
export interface Connector extends Component {
    abortController?: AbortController;
    readonly config: ConnectorConfig;
    readonly connectionConfig: ConnectionConfig;
    readonly tools: ConnectorTools;
    abortOperation?(connector: Connector): void;
    authenticateConnection?(accountId: string, windowCenterX: number, windowCenterY: number): Window;
    createObject?(connector: Connector, settings: CreateSettings): Promise<void>;
    describeConnection?(connector: Connector, settings: DescribeSettings): Promise<DescribeResult>;
    dropObject?(connector: Connector, settings: DropSettings): Promise<void>;
    findObject?(connector: Connector, findSettings: FindSettings): Promise<FindResult>;
    getReadableStream?(connector: Connector, getSettings: GetReaderSettings): Promise<GetReaderResult>;
    getRecord?(connector: Connector, getSettings: GetRecordSettings): Promise<GetRecordResult>;
    listNodes?(connector: Connector, settings: ListSettings): Promise<ListResult>;
    previewObject?(connector: Connector, settings: PreviewSettings): Promise<PreviewResult>;
    removeRecords?(connector: Connector, settings: RemoveSettings): Promise<void>;
    retrieveRecords?(connector: Connector, settings: RetrieveSettings, chunk: (records: (string[] | Record<string, unknown>)[]) => void, complete: (result: RetrieveSummary) => void): Promise<void>;
    upsertRecords?(connector: Connector, settings: UpsertSettings): Promise<void>;
}
export type ConnectorConfig = InferOutput<typeof connectorConfigSchema>;
export type ConnectorLocalisedConfig = Omit<ConnectorConfig, 'label' | 'description'> & {
    label: string;
    description: string;
};
export type ConnectorImplementation = InferOutput<typeof connectorImplementationSchema>;
export interface ConnectorTools {
    csvParse: typeof csvParse;
    dataPos: {
        buildFetchError: typeof buildFetchError;
        extractExtensionFromPath: typeof extractExtensionFromPath;
        extractNameFromPath: typeof extractNameFromPath;
        lookupMimeTypeForExtension: typeof lookupMimeTypeForExtension;
        OperationalError: typeof OperationalError;
    };
    dateFns: {
        parse: typeof dateFnsParse;
    };
    nanoid: typeof nanoid;
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
type DescribeSettings = ConnectorOperationSettings;
interface DescribeResult {
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
export interface GetReaderSettings extends ConnectorOperationSettings {
    id: string;
    path: string;
}
export interface GetReaderResult {
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
export interface RetrieveSettings extends ConnectorOperationSettings {
    chunkSize?: number;
    encodingId: string;
    path: string;
    valueDelimiterId: ValueDelimiterId;
}
export interface RetrieveResult {
    records: (string[] | Record<string, unknown>)[];
}
export interface RetrieveSummary {
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
/** Exposures */
export { connectorConfigSchema } from './connectorConfig.schema';
