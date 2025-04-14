// Dependencies - Vendor
import type { Callback, Options, Parser } from 'csv-parse';

// Dependencies - Framework
import type { ComponentConfig } from './component';
import type { ConnectionConfig, ConnectionDescription, ConnectionItemConfig } from './connection';
import type { DataViewPreviewConfig, ParsedValue } from './dataView';

// Interfaces/Types - Connector
export interface Connector {
    abortController?: AbortController | undefined;
    readonly config: ConnectorConfig;
    readonly connectionConfig: ConnectionConfig;

    abort?(): void;
    authenticate?(accountId: string, windowCenterX: number, windowCenterY: number): Window;
    describe?(callback: (data: ConnectorCallbackData) => void, settings: DescribeSettings): Promise<DescribeResult>;
    establishContainer?: (settings: EstablishContainerSettings) => Promise<EstablishContainerResult>;
    find?(findSettings: FindSettings): Promise<FindResult>;
    getCreateInterface?(): CreateInterface;
    getDeleteInterface?(): DeleteInterface;
    getDropInterface?(): DropInterface;
    getInsertInterface?(): InsertInterface;
    getPreviewInterface?(): PreviewInterface;
    getReadInterface?(): ReadInterface;
    getSelectInterface?(): SelectInterface;
    getUpdateInterface?(): UpdateInterface;
    getWriteInterface?(): WriteInterface;
    list?(settings: ListSettings): Promise<ListResult>;
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
interface ConnectorImplementation {
    activeConnectionCount?: number;
    canDescribe?: boolean;
    id?: string;
    authMethodId: 'apiKey' | 'disabled' | 'oAuth2' | 'none';
    label?: Record<string, string>;
    maxConnectionCount: number;
    params?: Record<string, string>[];
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

// Interfaces/Types - Describe
interface DescribeSettings {
    accountId: string | undefined;
    sessionAccessToken: string | undefined;
}
interface DescribeResult {
    description: ConnectionDescription;
}

// Interfaces/Types - Drop Interface
interface DropInterface {
    connector: Connector;
    drop(connector: Connector, databaseName: string, tableName: string): Promise<{ error?: unknown }>;
}

// Interfaces/Types - Establish Container
export interface EstablishContainerResult {
    container: unknown;
}
export interface EstablishContainerSettings {
    id: string;
}

// Interfaces/Types - Find
export interface FindSettings {
    container?: unknown;
    objectId: string;
}
export interface FindResult {
    folderPath?: string;
}

// Interfaces/Types - Insert Interface
interface InsertInterface {
    connector: Connector;
    insert(connector: Connector, databaseName: string, tableName: string, data: Record<string, unknown>[]): Promise<{ error?: unknown }>;
}

// Interfaces/Types - List
export interface ListSettings {
    container?: unknown;
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

// Interfaces/Types - Preview Interface
export interface PreviewInterface {
    connector: Connector;
    preview(
        connector: Connector,
        callback: (data: ConnectorCallbackData) => void,
        connectionItemConfig: ConnectionItemConfig,
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
        connectionItemConfig: ConnectionItemConfig,
        previewConfig: DataViewPreviewConfig,
        settings: ReadSettings
    ): Promise<void>;
}
export interface ReadSettings {
    accountId?: string;
    chunk(records: ReadRecord[]): void;
    chunkSize?: number;
    complete(info: ReadSummary): void;
    csvParse?: (options?: Options, callback?: Callback) => Parser | undefined;
    sessionAccessToken?: string;
}
export interface ReadRecord {
    fieldQuotings: boolean[];
    fieldValues: string[];
}
export interface ReadSummary {
    byteCount: number;
    commentLineCount: number;
    emptyLineCount: number;
    invalidFieldLengthCount: number;
    lineCount: number;
    recordCount: number;
}

// Interfaces/Types - Select Interface
interface SelectInterface {
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

// Interfaces/Types - Write Interface
interface WriteInterface {
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
const getConnectorCategory = (id: string, localeId = 'en'): ConnectorCategory => {
    const connectorCategory = connectorCategories.find((connectorCategory) => connectorCategory.id === id);
    if (connectorCategory) return { ...connectorCategory, label: connectorCategory.label[localeId] || connectorCategory.label['en'] || id };
    return { id, label: id };
};
