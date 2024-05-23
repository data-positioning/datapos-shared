// Dependencies - Framework
import type { ComponentConfig } from '../component';
import type { DataViewConfig } from '../dataView';
import type { Callback, Options, Parser } from 'csv-parse';
import type { ConnectionConfig, ConnectionDescription } from '../connection';

// Interfaces/Types - Connector
export interface Connector {
    abortController?: AbortController | undefined;
    readonly config: ConnectorConfig;
    readonly connectionConfig: ConnectionConfig;

    abort?(): void;
    authenticate?(accountId: string, windowCenterX: number, windowCenterY: number): Window;
    describe?(
        accountId: string | undefined,
        sessionAccessToken: string | undefined,
        itemId: string | undefined,
        callback: (data: ConnectorCallbackData) => void
    ): Promise<ConnectionDescription>;
    getCreateInterface?(): CreateInterface;
    getDeleteInterface?(): DeleteInterface;
    getDropInterface?(): DropInterface;
    getInsertInterface?(): InsertInterface;
    getPreviewInterface?(): PreviewInterface;
    getReadInterface?(): ReadInterface;
    getSelectInterface?(): SelectInterface;
    getUpdateInterface?(): UpdateInterface;
    getWriteInterface?(): WriteInterface;
    listItems?(settings: ListItemsSettings): Promise<ListItemsResult>;
}

// Interfaces/Types - Create Interface
interface CreateInterface {
    connector: Connector;
    create(connector: Connector, databaseName: string, tableName: string, typeId?: string, structure?: Record<string, unknown>): Promise<{ error?: unknown }>;
}

// Interfaces/Types - Delete Interface
interface DeleteInterface {
    connector: Connector;
    drop(connector: Connector, databaseName: string, tableName: string, keys: Record<string, unknown>[]): Promise<{ error?: unknown }>;
}

// Interfaces/Types - Drop Interface
interface DropInterface {
    connector: Connector;
    drop(connector: Connector, databaseName: string, tableName: string): Promise<{ error?: unknown }>;
}

// Interfaces/Types - Insert Interface
interface InsertInterface {
    connector: Connector;
    insert(connector: Connector, databaseName: string, tableName: string, data: Record<string, unknown>[]): Promise<{ error?: unknown }>;
}

// Interfaces/Types - Preview Interface
export interface PreviewInterface {
    connector: Connector;
    preview(connector: Connector, DataViewConfig: DataViewConfig, chunkSize?: number): Promise<{ error?: unknown; result?: Preview }>;
}
export interface Preview {
    data: ListEntryParsedValue[][] | Uint8Array;
    typeId: PreviewTypeId;
}
export type ListEntryParsedValue = bigint | boolean | number | string | null;
export enum PreviewTypeId {
    Table = 'table',
    Uint8Array = 'uint8Array'
}

// Interfaces/Types - Read Interface
export interface ReadInterface {
    connector: Connector;
    read(
        connector: Connector,
        DataViewConfig: DataViewConfig,
        settings: ReadInterfaceSettings,
        callback: (data: ConnectorCallbackData) => void,
        csvParse: (options?: Options, callback?: Callback) => Parser | undefined
    ): Promise<void>;
}
export interface ReadInterfaceSettings {
    accountId?: string;
    chunk(records: ConnectorRecord[]): void;
    chunkSize?: number;
    complete(info: ObjectInfo): void;
    sessionAccessToken?: string;
}
export interface ObjectInfo {
    byteCount: number;
    commentLineCount: number;
    emptyLineCount: number;
    invalidFieldLengthCount: number;
    lineCount: number;
    recordCount: number;
}
export interface ConnectorRecord {
    fieldInfos: ConnectorFieldInfo[];
    fieldValues: string[];
}
export interface ConnectorFieldInfo {
    isQuoted: boolean;
}

// Interfaces/Types - Select Interface
export interface SelectInterface {
    connector: Connector;
    select(
        connector: Connector,
        databaseName: string,
        tableName: string,
        columnNames?: string[],
        limit?: number,
        offset?: number
    ): Promise<{ error?: unknown; result?: Record<string, unknown>[] }>;
}

// Interfaces/Types - Update Interface
interface UpdateInterface {
    connector: Connector;
    update(connector: Connector, databaseName: string, tableName: string, data: Record<string, unknown>[]): Promise<{ error?: unknown }>;
}

// Interfaces/Types - List Items
export interface ListItemsSettings {
    folderPath: string;
    limit?: number;
    offset?: number;
    totalCount?: number;
}
export interface ListItemsResponse {
    error?: unknown;
    result?: ListItemsResult;
}
export interface ListItemsResult {
    cursor: string | number | undefined;
    itemConfigs: ItemConfig[];
    isMore: boolean;
    totalCount: number;
}
export interface DPAFileSystemFileHandle {
    readonly kind: 'file';
    getFile(): Promise<File>;
}

// Interfaces/Types - Write Interface
export interface WriteInterface {
    connector: Connector;
    open(): void;
    write(): void;
    close(): void;
}

// Callback
export interface ConnectorCallbackData {
    typeId: string;
    properties: Record<string, unknown>;
}

// Config
export interface ConnectorConfig extends ComponentConfig {
    category?: ConnectorCategory;
    categoryId: string;
    implementations: Record<string, ConnectorImplementation>;
    usageId: ConnectorUsageId;
    vendorAccountURL: string;
    vendorDocumentationURL: string;
    vendorHomeURL: string;
    version?: string;
}
export interface ConnectorImplementation {
    activeConnectionCount?: number;
    canDescribe?: boolean;
    id?: string;
    authMethodId: ConnectorAuthMethodId;
    label?: Record<string, string>;
    maxConnectionCount: number;
    params?: Record<string, string>[];
}
export enum ConnectorAuthMethodId {
    APIKey = 'apiKey',
    Disabled = 'disabled',
    OAuth2 = 'oAuth2',
    None = 'none'
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
export const getConnectorCategory = (id: string, localeId = 'en'): ConnectorCategory => {
    const connectorCategory = connectorCategories.find((connectorCategory) => connectorCategory.id === id);
    if (connectorCategory) return { ...connectorCategory, label: connectorCategory.label[localeId] || connectorCategory.label['en'] || id };
    return { id, label: id };
};

// Connector Usage
export enum ConnectorUsageId {
    Bidirectional = 'bidirectional',
    Destination = 'destination',
    Node = 'node',
    Source = 'source',
    None = 'none'
}

// Interfaces/Types - Item
export interface ItemConfig {
    childCount?: number;
    encodingId?: string;
    extension?: string;
    folderPath: string;
    handle?: DPAFileSystemFileHandle; // TODO: Remove reference to 'FileSystemFileHandle' otherwise 'datapos-connector-node-browser' does not compile.
    id?: string;
    label: string;
    lastModifiedAt?: number;
    mimeType?: string;
    name: string;
    size?: number;
    // params?: Record<string, unknown>; // TODO: What is this used for?
    // paramsString?: string; // TODO: What is this used for?
    typeId: ItemTypeId;
}
export enum ItemTypeId {
    Folder = 'folder',
    Object = 'object'
}
