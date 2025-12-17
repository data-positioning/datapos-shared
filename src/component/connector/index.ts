/**
 * Connector composables, constants, errors, types/interfaces and utilities.
 */

// Dependencies - Vendor.
import type { parse as csvParse } from 'csv-parse/browser/esm';
import type { parse as dateFnsParse } from 'date-fns';
import type { nanoid } from 'nanoid'; // TODO: Check package.json if removed, currently both peer and dev dependency.

// Dependencies - Framework.
import type { buildFetchError, OperationalError } from '@/errors';
import type { Component, ModuleConfig } from '@/component';
import type { ConnectionConfig, ConnectionDescription, ConnectionNodeConfig } from '@/component/connector/connection';
import { type convertMillisecondsToTimestamp, DEFAULT_LOCALE_CODE, type LocalisedString } from '@/index';
import type { DataViewContentAuditConfig, ValueDelimiterId } from '@/component/dataView';
import type { extractExtensionFromPath, extractNameFromPath, lookupMimeTypeForExtension } from '@/utilities';

type ConnectorModuleCategoryId = 'application' | 'curatedDataset' | 'database' | 'fileStore';
export type ConnectorOperation =
    | 'abortOperation'
    | 'authenticateConnection'
    | 'createObject'
    | 'describeConnection'
    | 'dropObject'
    | 'findObject'
    | 'getRecord'
    | 'listNodes'
    | 'previewObject'
    | 'removeRecords'
    | 'retrieveRecords'
    | 'upsertRecords';
export type ConnectorUsageId = 'bidirectional' | 'destination' | 'source' | 'unknown';
export const CONNECTOR_DESTINATION_OPERATIONS = ['createObject', 'dropObject', 'removeRecords', 'upsertRecords'];
export const CONNECTOR_SOURCE_OPERATIONS = ['findObject', 'getRecord', 'listNodes', 'previewObject', 'retrieveRecords'];

// Interfaces - Connector.
export interface Connector extends Component {
    abortController?: AbortController | undefined;
    readonly config: ConnectorConfig;
    readonly connectionConfig: ConnectionConfig;
    readonly tools: ConnectorTools;
    abortOperation?(connector: Connector): void; // Abort the active long running operation for a specified connection.
    authenticateConnection?(accountId: string, windowCenterX: number, windowCenterY: number): Window; // Authenticate a specified connection.
    createObject?(connector: Connector, settings: CreateSettings): Promise<void>; // Create an object for a specified connection.
    describeConnection?(connector: Connector, settings: DescribeSettings): Promise<DescribeResult>; // Describe a specified connection.
    dropObject?(connector: Connector, settings: DropSettings): Promise<void>; // Drop (delete) an object for a specified connection.
    findObject?(connector: Connector, findSettings: FindSettings): Promise<FindResult>; // Find an object for a specified connection.
    getRecord?(connector: Connector, getSettings: GetSettings): Promise<GetResult>; // Get a record for an object for a specified connection.
    listNodes?(connector: Connector, settings: ListSettings): Promise<ListResult>; // List nodes in a folder for a specified connection.
    previewObject?(connector: Connector, settings: PreviewSettings): Promise<PreviewResult>; // Preview an object for a specified connection.
    removeRecords?(connector: Connector, settings: RemoveSettings): Promise<void>; // Remove one or more records from an object for a specified connection.
    retrieveRecords?(
        connector: Connector,
        settings: RetrieveSettings,
        chunk: (records: (string[] | Record<string, unknown>)[]) => void,
        complete: (result: RetrieveSummary) => void
    ): Promise<void>; // Retrieve all records from an object for a specified connection.
    upsertRecords?(connector: Connector, settings: UpsertSettings): Promise<void>; // Upsert one oˆr more records into an object for a specified connection.
}
export interface ConnectorConfig extends ModuleConfig {
    category?: ConnectorCategory;
    categoryId: ConnectorModuleCategoryId;
    implementations: Record<string, ConnectorImplementation>;
    operations: ConnectorOperation[];
    typeId: 'connector';
    usageId: ConnectorUsageId;
    vendorAccountURL: string | null;
    vendorDocumentationURL: string | null;
    vendorHomeURL: string | null;
}
export type ConnectorLocalisedConfig = Omit<ConnectorConfig, 'label' | 'description'> & { label: string; description: string };
export type ConnectorImplementation = {
    activeConnectionCount?: number;
    canDescribe?: boolean;
    id?: string;
    authMethodId: 'apiKey' | 'disabled' | 'oAuth2' | 'none';
    label?: LocalisedString;
    maxConnectionCount?: number;
    params?: Record<string, string>[];
};
export type ConnectorTools = {
    csvParse: typeof csvParse;
    dataPos: {
        buildFetchError: typeof buildFetchError;
        convertMillisecondsToTimestamp: typeof convertMillisecondsToTimestamp;
        extractExtensionFromPath: typeof extractExtensionFromPath;
        extractNameFromPath: typeof extractNameFromPath;
        lookupMimeTypeForExtension: typeof lookupMimeTypeForExtension;
        OperationalError: typeof OperationalError;
    };
    dateFns: { parse: typeof dateFnsParse };
    nanoid: typeof nanoid;
};

// Types/Interfaces/Operations - Initialise settings.
export interface InitialiseSettings {
    connectorStorageURLPrefix: string;
}

// Types/Interfaces/Operations - Connector operation settings.
export interface ConnectorOperationSettings {
    accountId?: string;
    appCheckToken?: string;
    sessionAccessToken?: string;
}

// Types/Interfaces/Operations - Audit Content (object).
export interface AuditContentSettings extends ConnectorOperationSettings {
    chunkSize?: number;
    encodingId: string;
    path: string;
    valueDelimiterId: ValueDelimiterId;
}
export interface AuditContentResult {
    contentAuditConfig: DataViewContentAuditConfig;
}

// Types/Interfaces/Operations - Create (object).
export interface CreateSettings extends ConnectorOperationSettings {
    accountId?: string;
    path: string;
    structure: string;
}

// Types/Interfaces/Operations - Describe (Connection).
interface DescribeSettings extends ConnectorOperationSettings {}
interface DescribeResult {
    description: ConnectionDescription;
}

// Types/Interfaces/Operations - Drop (object).
export interface DropSettings extends ConnectorOperationSettings {
    path: string;
}

// Types/Interfaces/Operations - Find (object).
export interface FindSettings extends ConnectorOperationSettings {
    containerName?: string;
    objectName: string;
}
export interface FindResult {
    folderPath?: string;
}

// Types/Interfaces/Operations - Get (object).
export interface GetSettings extends ConnectorOperationSettings {
    id: string;
    path: string;
}
export interface GetResult {
    record?: string[] | Record<string, unknown>;
}

// Types/Interfaces/Operations - List (nodes).
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

// Types/Interfaces/Operations - Preview (object).
export interface PreviewSettings extends ConnectorOperationSettings {
    chunkSize?: number;
    extension?: string;
    path: string;
}
export interface PreviewResult {
    data: Record<string, unknown>[] | Uint8Array;
    typeId: 'jsonArray' | 'uint8Array';
}

// Types/Interfaces/Operations - Remove (records).
export interface RemoveSettings extends ConnectorOperationSettings {
    keys: string[];
    path: string;
}

// Types/Interfaces/Operations - Retrieve (records).
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

// Types/Interfaces/Operations - Upsert (records).
export interface UpsertSettings extends ConnectorOperationSettings {
    records: Record<string, unknown>[];
    path: string;
}

// Types/Interfaces/Operations - Connector callback data.
export interface ConnectorCallbackData {
    typeId: string;
    properties: Record<string, unknown>;
}

// Types/Interfaces/Operations - Connector category.
type ConnectorCategory = { id: string; label: string };
type ConnectorCategoryConfig = { id: string; label: Partial<LocalisedString> };
const connectorCategories: ConnectorCategoryConfig[] = [
    { id: 'application', label: { 'en-gb': 'Application' } },
    { id: 'curatedDataset', label: { 'en-gb': 'Curated Dataset' } },
    { id: 'database', label: { 'en-gb': 'Database' } },
    { id: 'fileStore', label: { 'en-gb': 'File Store' } }
];
const getConnectorCategory = (id: string, localeId = DEFAULT_LOCALE_CODE): ConnectorCategory => {
    const connectorCategory = connectorCategories.find((connectorCategory) => connectorCategory.id === id);
    if (connectorCategory) return { ...connectorCategory, label: connectorCategory.label[localeId] || connectorCategory.label[DEFAULT_LOCALE_CODE] || id };
    return { id, label: id };
};
