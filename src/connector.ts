// Dependencies - Vendor.
import type { parse } from 'date-fns';
import type { Callback, Options, Parser } from 'csv-parse/browser/esm';

// Dependencies - Framework.
import type { ComponentConfig } from './component';
import type { ConnectionConfig, ConnectionDescription, ConnectionNodeConfig } from './connection';
import type { DataViewContentAuditConfig, ValueDelimiterId } from './dataView';

// Interfaces/Types - Connector
export interface Connector {
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
        complete: (result: RetrieveSummary) => void,
        tools?: RetrieveTools
    ): Promise<void>; // Retrieve all records from an object for a specified connection.
    upsertRecords?(connector: Connector, settings: UpsertSettings): Promise<void>; // Upsert one or more records into an object for a specified connection.
}
export interface ConnectorTools {
    csvParse: (options: Options, callback?: Callback) => Parser | undefined;
    dateFNS: { parse: typeof parse };
    nanoid: <Type extends string>(size?: number) => Type;
}

// Interfaces/Types - Connector Callback Data
export interface ConnectorCallbackData {
    typeId: string;
    properties: Record<string, unknown>;
}

// Interfaces/Types - Connector Configuration
export interface ConnectorConfig extends ComponentConfig {
    category?: ConnectorCategory;
    categoryId: string;
    implementations: Record<string, ConnectorImplementation>;
    usageId: 'bidirectional' | 'destination' | 'source';
    vendorAccountURL?: string;
    vendorDocumentationURL?: string;
    vendorHomeURL?: string;
    version: string;
}
export interface ConnectorImplementation {
    activeConnectionCount?: number;
    canDescribe?: boolean;
    id?: string;
    authMethodId: 'apiKey' | 'disabled' | 'oAuth2' | 'none';
    label?: Record<string, string>;
    maxConnectionCount?: number;
    params?: Record<string, string>[];
}
export type ConnectorLocalisedConfig = Omit<ConnectorConfig, 'label' | 'description'> & { label: string; description: string };

// Interfaces/Types - Connector Operator Settings
export interface ConnectorOperationSettings {
    accountId?: string;
    appCheckToken?: string;
    sessionAccessToken?: string;
}

// Interfaces/Types - Audit Content (Object)
export interface AuditContentResult {
    contentAuditConfig: DataViewContentAuditConfig;
}
export interface AuditContentSettings extends ConnectorOperationSettings {
    chunkSize?: number;
    encodingId: string;
    path: string;
    valueDelimiterId: ValueDelimiterId;
}

// Interfaces/Types - Create (Object)
export interface CreateSettings extends ConnectorOperationSettings {
    accountId?: string;
    path: string;
    structure: string;
}

// Interfaces/Types - Describe (Connection)
interface DescribeSettings extends ConnectorOperationSettings {}
interface DescribeResult {
    description: ConnectionDescription;
}

// Interfaces/Types - Drop (Object)
export interface DropSettings extends ConnectorOperationSettings {
    path: string;
}

// Interfaces/Types - Find (Object)
export interface FindResult {
    folderPath?: string;
}
export interface FindSettings extends ConnectorOperationSettings {
    containerName?: string;
    objectName: string;
}

// Interfaces/Types - Get (Object)
export interface GetResult {
    record?: string[] | Record<string, unknown>;
}
export interface GetSettings extends ConnectorOperationSettings {
    id: string;
    path: string;
}

// Interfaces/Types - Initialise (Connector)
export interface InitialiseSettings {
    connectorStorageURLPrefix: string;
}

// Interfaces/Types - List (Nodes)
export interface ListResult {
    cursor: string | number | undefined;
    connectionNodeConfigs: ConnectionNodeConfig[];
    isMore: boolean;
    totalCount: number;
}
export interface ListSettings extends ConnectorOperationSettings {
    folderPath: string;
    limit?: number;
    offset?: number;
    totalCount?: number;
}

// Interfaces/Types - Preview (Object)
export interface PreviewResult {
    data: Record<string, unknown>[] | Uint8Array;
    typeId: 'jsonArray' | 'uint8Array';
}
export interface PreviewSettings extends ConnectorOperationSettings {
    chunkSize?: number;
    extension?: string;
    path: string;
}

// Interfaces/Types - Remove (Records)
export interface RemoveSettings extends ConnectorOperationSettings {
    keys: string[];
    path: string;
}

// Interfaces/Types - Retrieve (Records)
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
export interface RetrieveTools {
    csvParse: (options: Options, callback?: Callback) => Parser | undefined;
}

// Interfaces/Types - Upsert (Records)
export interface UpsertSettings extends ConnectorOperationSettings {
    records: Record<string, unknown>[];
    path: string;
}

// Connector Category
type ConnectorCategory = { id: string; label: string };
type ConnectorCategoryConfig = { id: string; label: Record<string, string> };
const connectorCategories: ConnectorCategoryConfig[] = [
    { id: 'application', label: { en: 'Application' } },
    { id: 'curatedDataset', label: { en: 'Curated Dataset' } },
    { id: 'database', label: { en: 'Database' } },
    { id: 'fileStore', label: { en: 'File Store' } }
];
const getConnectorCategory = (id: string, localeId = 'en'): ConnectorCategory => {
    const connectorCategory = connectorCategories.find((connectorCategory) => connectorCategory.id === id);
    if (connectorCategory) return { ...connectorCategory, label: connectorCategory.label[localeId] || connectorCategory.label['en'] || id };
    return { id, label: id };
};
