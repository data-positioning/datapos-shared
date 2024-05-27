// Dependencies - Framework
import type { ComponentConfig } from '../component';
import type { ConnectionItemConfig } from '../connectionItem';
import type { DataViewPreviewConfig } from '../dataView';
import type { ParsedValue } from '../dataView/ContentAuditColumn';
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
    list?(callback: (data: ConnectorCallbackData) => void, settings: ListSettings): Promise<ListResult>;
}

// Interfaces/Types - Connector Configuration
export interface ConnectorConfig extends ComponentConfig {
    category?: ConnectorCategory;
    categoryId: string;
    implementations: Record<string, ConnectorImplementation>;
    usageId: 'bidirectional' | 'destination' | 'source';
    vendorAccountURL: string;
    vendorDocumentationURL: string;
    vendorHomeURL: string;
    version?: string;
}
interface ConnectorImplementation {
    activeConnectionCount?: number;
    canDescribe?: boolean;
    id?: string;
    authMethodId: 'apiKey' | 'disabled' | 'oAuth2' | 'none';
    label?: Record<string, string>;
    maxConnectionCount: number;
    params?: Record<string, string>[];
}

// Interfaces/Types - Connector Callback Data
export interface ConnectorCallbackData {
    typeId: string;
    properties: Record<string, unknown>;
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
    preview(
        connector: Connector,
        callback: (data: ConnectorCallbackData) => void,
        dataEntryConfig: ConnectionItemConfig,
        settings: PreviewSettings
    ): Promise<{ error?: unknown; result?: PreviewResult }>;
}
export interface PreviewSettings {
    accountId?: string;
    chunkSize?: number;
    sessionAccessToken?: string;
}
export interface PreviewResult {
    data: ParsedValue[][] | Uint8Array;
    typeId: 'table' | 'uint8Array';
}

// Interfaces/Types - Read Interface
export interface ReadInterface {
    connector: Connector;
    read(
        connector: Connector,
        callback: (data: ConnectorCallbackData) => void,
        dataEntryConfig: ConnectionItemConfig,
        previewConfig: DataViewPreviewConfig,
        settings: ReadSettings
    ): Promise<void>;
}
export interface ReadSettings {
    accountId?: string;
    chunk(records: ConnectorRecord[]): void;
    chunkSize?: number;
    complete(info: ObjectInfo): void;
    csvParse?: (options?: Options, callback?: Callback) => Parser | undefined;
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

// Interfaces/Types - List
export interface ListSettings {
    folderPath: string;
    limit?: number;
    offset?: number;
    totalCount?: number;
}
export interface ListResponse {
    error?: unknown;
    result?: ListResult;
}
export interface ListResult {
    cursor: string | number | undefined;
    dataStoreConfigs: ConnectionItemConfig[];
    isMore: boolean;
    totalCount: number;
}

// Interfaces/Types - Write Interface
export interface WriteInterface {
    connector: Connector;
    open(): void;
    write(): void;
    close(): void;
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
