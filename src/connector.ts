// Dependencies - Vendor
import type { Callback, Options, Parser } from 'csv-parse';

// Dependencies - Framework
import type { ConnectionConfig, ConnectionDescription, ConnectionItemConfig } from './connection';
import type { ComponentConfig } from './component';
import type { DataViewPreviewConfig, ValueDelimiterId } from './dataView';

// Interfaces/Types - Connector
export interface Connector {
    abortController?: AbortController | undefined;
    readonly config: ConnectorConfig;
    readonly connectionConfig: ConnectionConfig;

    abort?(): void; // Abort the active long running operation for a specified connection.
    authenticate?(accountId: string, windowCenterX: number, windowCenterY: number): Window; // Authenticate a specified connection

    create(settings: CreateSettings): Promise<CreateResult>; // Create an object for a specified connection.
    describe?(callback: (data: ConnectorCallbackData) => void, settings: DescribeSettings): Promise<DescribeResult>; // Describe a specified connection.
    drop(containerName: string, objectName: string): Promise<DropSettings>; // Drop (delete) an object for a specified connection.
    find?(findSettings: FindSettings): Promise<FindResult>; // Find an object for a specified connection.
    getPutInterface?(): PutInterface; // Get the put interface. Enables updating/inserting single or multiple records into an object for a specified connection.
    getRetrieveInterface?(): RetrieveInterface; // Get the retrieve interface. Enables retrieving multiple records from an object for a specified connection.
    getRemoveInterface?(): RemoveInterface; // Get the remove interface. Enables removing all records from an object for a specified connection.
    list?(settings: ListSettings): Promise<ListResult>; // List items in a folder for a specified connection.
    preview(connectionItemConfig: ConnectionItemConfig, settings: PreviewSettings): Promise<PreviewResult>; // Preview an object for a specified connection.
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
    version?: string;
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
    sessionAccessToken?: string;
}

// Interfaces/Types - Create
export interface CreateSettings extends ConnectorOperationSettings {
    accountId?: string;
    // containerName: string;
    // objectName: string;
    path: string;
    structure: Record<string, string>;
}
export interface CreateResult {
    placeholder: string;
}

// Interfaces/Types - Describe
interface DescribeSettings extends ConnectorOperationSettings {}
interface DescribeResult {
    description: ConnectionDescription;
}

// Interfaces/Types - Drop
export interface DropSettings extends ConnectorOperationSettings {
    path: string;
}
export interface DropResult {
    placeholder: string;
}

// Interfaces/Types - Find
export interface FindSettings extends ConnectorOperationSettings {
    containerName?: string;
    objectName: string;
}
export interface FindResult {
    folderPath?: string;
}

// Interfaces/Types - List
export interface ListSettings extends ConnectorOperationSettings {
    folderPath: string;
    limit?: number;
    offset?: number;
    totalCount?: number;
}
export interface ListResult {
    cursor: string | number | undefined;
    connectionItemConfigs: ConnectionItemConfig[];
    isMore: boolean;
    totalCount: number;
}

// Interfaces/Types - Preview
export interface PreviewSettings extends ConnectorOperationSettings {
    chunkSize?: number;
    // containerName?: string;
    path: string;
}
export interface PreviewResult {
    data: Record<string, unknown>[] | Uint8Array;
    typeId: 'jsonArray' | 'uint8Array';
}

// Interfaces/Types - Put
export interface PutInterface {
    put(
        // containerName: string,
        // objectName: string,
        settings: PutSettings
    ): Promise<void>;
}
export interface PutSettings extends ConnectorOperationSettings {
    callback: (data: ConnectorCallbackData) => void;
    chunk(count: number): void;
    complete(result: PutResult): void;
    data: Record<string, unknown> | Record<string, unknown>[];
    path: string;
}
export interface PutResult {
    count: number;
}

// Interfaces/Types - Retrieve
export interface RetrieveInterface {
    retrieve(connectionItemConfig: ConnectionItemConfig, previewConfig: DataViewPreviewConfig, settings: RetrieveSettings): Promise<void>;
}
export interface RetrieveSettings extends ConnectorOperationSettings {
    callback: (data: ConnectorCallbackData) => void;
    chunk(records: RetrieveRecord[]): void;
    chunkSize?: number;
    complete(result: RetrieveSummary): void;
    // containerName?: string;
    path: string;
}
export interface CSVRetrieveSettings extends RetrieveSettings {
    csvParse: (options?: Options, callback?: Callback) => Parser | undefined;
    encodingId: string;
    valueDelimiterId: ValueDelimiterId;
}
export interface RetrieveRecord {
    fieldQuotings: boolean[];
    fieldValues: string[];
}
export interface RetrieveSummary {
    byteCount: number;
    commentLineCount: number;
    emptyLineCount: number;
    invalidFieldLengthCount: number;
    lineCount: number;
    recordCount: number;
}

// Interfaces/Types - Remove Interface
export interface RemoveInterface {
    remove(settings: RemoveSettings): Promise<void>;
}
export interface RemoveSettings extends ConnectorOperationSettings {
    callback: (data: ConnectorCallbackData) => void;
    chunk(count: number): void;
    complete(result: RemoveResult): void;
    // containerName: string;
    // objectName: string;
    keys: Record<string, unknown>[];
    path: string;
}
export interface RemoveResult {
    count: number;
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
