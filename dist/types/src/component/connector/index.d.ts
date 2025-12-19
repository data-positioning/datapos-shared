import { parse as csvParse } from 'csv-parse/browser/esm';
import { parse as dateFnsParse } from 'date-fns';
import { InferOutput } from 'valibot';
import { nanoid } from 'nanoid';
import { connectorConfigSchema } from './connectorConfig.schema';
import { LocalisedString } from '../../index';
import { buildFetchError, OperationalError } from '../../errors';
import { Component, ModuleConfig } from '..';
import { ConnectionConfig, ConnectionDescription, ConnectionNodeConfig } from './connection';
import { DataViewContentAuditConfig, ValueDelimiterId } from '../dataView';
import { extractExtensionFromPath, extractNameFromPath, lookupMimeTypeForExtension } from '../../utilities';
type ConnectorModuleCategoryId = 'application' | 'curatedDataset' | 'database' | 'fileStore';
export type ConnectorOperation = 'abortOperation' | 'authenticateConnection' | 'createObject' | 'describeConnection' | 'dropObject' | 'findObject' | 'getRecord' | 'listNodes' | 'previewObject' | 'removeRecords' | 'retrieveRecords' | 'upsertRecords';
export type ConnectorUsageId = 'bidirectional' | 'destination' | 'source' | 'unknown';
export declare const CONNECTOR_DESTINATION_OPERATIONS: string[];
export declare const CONNECTOR_SOURCE_OPERATIONS: string[];
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
    getRecord?(connector: Connector, getSettings: GetSettings): Promise<GetResult>;
    listNodes?(connector: Connector, settings: ListSettings): Promise<ListResult>;
    previewObject?(connector: Connector, settings: PreviewSettings): Promise<PreviewResult>;
    removeRecords?(connector: Connector, settings: RemoveSettings): Promise<void>;
    retrieveRecords?(connector: Connector, settings: RetrieveSettings, chunk: (records: (string[] | Record<string, unknown>)[]) => void, complete: (result: RetrieveSummary) => void): Promise<void>;
    upsertRecords?(connector: Connector, settings: UpsertSettings): Promise<void>;
}
export type ConnectorConfig = InferOutput<typeof connectorConfigSchema>;
export interface ConnectorConfig1 extends ModuleConfig {
    category: ConnectorCategory | null;
    categoryId: ConnectorModuleCategoryId;
    implementations: Record<string, ConnectorImplementation>;
    operations: ConnectorOperation[];
    typeId: 'connector';
    usageId: ConnectorUsageId;
    vendorAccountURL: string | null;
    vendorDocumentationURL: string | null;
    vendorHomeURL: string | null;
}
export type ConnectorLocalisedConfig = Omit<ConnectorConfig, 'label' | 'description'> & {
    label: string;
    description: string;
};
export interface ConnectorImplementation {
    activeConnectionCount?: number;
    canDescribe?: boolean;
    id?: string;
    authMethodId: 'apiKey' | 'disabled' | 'oAuth2' | 'none';
    label?: LocalisedString;
    maxConnectionCount?: number;
    params?: Record<string, string>[];
}
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
export interface GetSettings extends ConnectorOperationSettings {
    id: string;
    path: string;
}
export interface GetResult {
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
interface ConnectorCategory {
    id: string;
    label: string;
}
export { connectorConfigSchema } from './connectorConfig.schema';
