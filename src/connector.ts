// Dependencies - Vendor
import type { Callback, Options, Parser } from 'csv-parse/browser/esm';

// Dependencies - Framework
import type { ConnectionConfig, ConnectionDescription, ConnectionItemConfig } from './connection';
import type { DataViewContentAuditConfig, DataViewPreviewConfig, ValueDelimiterId } from './dataView';
import type { ComponentConfig } from './component';

// Interfaces/Types - Connector
export interface Connector {
    abortController?: AbortController | undefined;
    readonly config: ConnectorConfig;
    readonly connectionConfig: ConnectionConfig;

    abort?(connector: Connector): void; // Abort the active long running operation for a specified connection.
    authenticate?(accountId: string, windowCenterX: number, windowCenterY: number): Window; // Authenticate a specified connection
    create?(connector: Connector, settings: CreateSettings): Promise<CreateResult>; // Create an object for a specified connection.
    describe?(connector: Connector, settings: DescribeSettings): Promise<DescribeResult>; // Describe a specified connection.
    drop?(connector: Connector, settings: DropSettings): Promise<DropResult>; // Drop (delete) an object for a specified connection.
    find?(connector: Connector, findSettings: FindSettings): Promise<FindResult>; // Find an object for a specified connection.
    list?(connector: Connector, settings: ListSettings): Promise<ListResult>; // List items in a folder for a specified connection.
    preview?(connector: Connector, settings: PreviewSettings): Promise<PreviewData>; // Preview an object for a specified connection.
    put?(
        connector: Connector,
        data: Record<string, unknown> | Record<string, unknown>[],
        settings: PutSettings,
        chunk: (count: number) => void,
        complete: (result: PutResult) => void
    ): Promise<void>; // Upsert multiple records into an object for a specified connection.
    remove?(connector: Connector, settings: RemoveSettings, chunk: (count: number) => void, complete: (result: RemoveResult) => void): Promise<void>; // Remove multiple records from an object for a specified connection.
    retrieve?(
        connector: Connector,
        settings: RetrieveSettings,
        chunk: (records: RetrieveRecord[]) => void,
        complete: (result: RetrieveSummary) => void,
        tools: { csvParse: (options?: Options, callback?: Callback) => Parser | undefined }
    ): Promise<void>; // Retrieve all records from an object for a specified connection.
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

// Interfaces/Types - Connector Operator Settings
export interface ConnectorOperationSettings {
    accountId?: string;
    appCheckToken?: string;
    sessionAccessToken?: string;
}

// Interfaces/Types - Audit Content
export interface AuditContentResult {
    contentAuditConfig: DataViewContentAuditConfig;
}
export interface AuditContentSettings extends ConnectorOperationSettings {
    chunkSize?: number;
    path: string;
}

// Interfaces/Types - Create
export interface CreateResult {
    placeholder?: string;
}
export interface CreateSettings extends ConnectorOperationSettings {
    accountId?: string;
    path: string;
    structure: Record<string, string>;
}

// Interfaces/Types - Describe
interface DescribeSettings extends ConnectorOperationSettings {}
interface DescribeResult {
    description: ConnectionDescription;
}

// Interfaces/Types - Drop
export interface DropResult {
    placeholder?: string;
}
export interface DropSettings extends ConnectorOperationSettings {
    path: string;
}

// Interfaces/Types - Find
export interface FindResult {
    folderPath?: string;
}
export interface FindSettings extends ConnectorOperationSettings {
    containerName?: string;
    objectName: string;
}

// Interfaces/Types - Initialise
export interface InitialiseResult {
    placeholder?: string;
}
export interface InitialiseSettings {
    connectorStorageURLPrefix: string;
}

// Interfaces/Types - List
export interface ListResult {
    cursor: string | number | undefined;
    connectionItemConfigs: ConnectionItemConfig[];
    isMore: boolean;
    totalCount: number;
}
export interface ListSettings extends ConnectorOperationSettings {
    folderPath: string;
    limit?: number;
    offset?: number;
    totalCount?: number;
}

// Interfaces/Types - Preview
export interface PreviewData {
    data: Record<string, unknown>[] | Uint8Array;
    typeId: 'jsonArray' | 'uint8Array';
}
export interface PreviewResult {
    previewConfig: DataViewPreviewConfig;
}
export interface PreviewSettings extends ConnectorOperationSettings {
    chunkSize?: number;
    path: string;
}

// Interfaces/Types - Put
export interface PutResult {
    placeholder?: string;
}
export interface PutSettings extends ConnectorOperationSettings {
    chunkSize?: number;
    path: string;
}

// Interfaces/Types - Remove
export interface RemoveResult {
    placeholder?: string;
}
export interface RemoveSettings extends ConnectorOperationSettings {
    chunkSize?: number;
    path: string;
}

// Interfaces/Types - Retrieve
export interface RetrieveRecord {
    fieldQuotings: boolean[];
    fieldValues: string[];
}
export interface RetrieveSettings extends ConnectorOperationSettings {
    chunkSize?: number;
    path: string;
}
export interface RetrieveSettingsForCSV extends RetrieveSettings {
    encodingId: string;
    valueDelimiterId: ValueDelimiterId;
}
export interface RetrieveSummary {
    byteCount: number;
    commentLineCount: number;
    emptyLineCount: number;
    invalidFieldLengthCount: number;
    lineCount: number;
    recordCount: number;
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
