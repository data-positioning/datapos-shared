import type { DataViewConfig } from '../dataView';
import type { Callback, Options, Parser } from 'csv-parse';
import type { ConnectionConfig, ConnectionDescription } from '../connection';
import type { Connector, ConnectorCallbackData, ConnectorConfig } from '.';

export interface DataConnector extends Connector {
    abortController?: AbortController | undefined;
    readonly config: ConnectorConfig;
    readonly connectionConfig: ConnectionConfig;

    abort?(): void;
    authenticate?(accountId: string, windowCenterX: number, windowCenterY: number): Window;
    describe?(
        accountId: string | undefined,
        sessionAccessToken: string | undefined,
        connectionEntryId: string | undefined,
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
    listEntries?(settings: ListEntriesSettings): Promise<ListEntriesResult>;
}

// Types - Create Interface
interface CreateInterface {
    connector: DataConnector;
    create(connector: DataConnector, databaseName: string, tableName: string, typeId?: string, structure?: Record<string, unknown>): Promise<{ error?: unknown }>;
}

// Types - Delete Interface
interface DeleteInterface {
    connector: DataConnector;
    drop(connector: DataConnector, databaseName: string, tableName: string, keys: Record<string, unknown>[]): Promise<{ error?: unknown }>;
}

// Types - Drop Interface
interface DropInterface {
    connector: DataConnector;
    drop(connector: DataConnector, databaseName: string, tableName: string): Promise<{ error?: unknown }>;
}

// Types - Insert Interface
interface InsertInterface {
    connector: DataConnector;
    insert(connector: DataConnector, databaseName: string, tableName: string, data: Record<string, unknown>[]): Promise<{ error?: unknown }>;
}

// Types - Preview Interface
export interface PreviewInterface {
    connector: DataConnector;
    preview(connector: DataConnector, DataViewConfig: DataViewConfig, chunkSize?: number): Promise<{ error?: unknown; result?: Preview }>;
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

// Types - Read Interface
export interface ReadInterface {
    connector: DataConnector;
    read(
        connector: DataConnector,
        DataViewConfig: DataViewConfig,
        settings: ReadInterfaceSettings,
        csvParse: (options?: Options, callback?: Callback) => Parser,
        callback: (data: ConnectorCallbackData) => void
    ): Promise<void>;
}
export interface ReadInterfaceSettings {
    accountId?: string;
    chunk(records: DataConnectorRecord[]): void;
    chunkSize?: number;
    complete(fileInfo: DataConnectorFileInfo): void;
    sessionAccessToken?: string;
}
export interface DataConnectorFileInfo {
    byteCount: number;
    commentLineCount: number;
    emptyLineCount: number;
    invalidFieldLengthCount: number;
    lineCount: number;
    recordCount: number;
}
export interface DataConnectorRecord {
    fieldInfos: DataConnectorFieldInfo[];
    fieldValues: string[];
}
export interface DataConnectorFieldInfo {
    isQuoted: boolean;
}

// Types - Select Interface
export interface SelectInterface {
    connector: DataConnector;
    select(
        connector: DataConnector,
        databaseName: string,
        tableName: string,
        columnNames?: string[],
        limit?: number,
        offset?: number
    ): Promise<{ error?: unknown; result?: Record<string, unknown>[] }>;
}

// Types - Update Interface
interface UpdateInterface {
    connector: DataConnector;
    update(connector: DataConnector, databaseName: string, tableName: string, data: Record<string, unknown>[]): Promise<{ error?: unknown }>;
}

// Types - List Entries Settings
export interface ListEntriesSettings {
    folderPath: string;
    limit?: number;
    offset?: number;
    totalCount?: number;
}
export interface ListEntryConfig {
    childCount?: number;
    folderPath: string;
    encodingId?: string;
    extension?: string;
    handle?: DPAFileSystemFileHandle; // TODO: Remove reference to 'FileSystemFileHandle' otherwise 'datapos-connector-node-browser' does not compile.
    id: string;
    label: string;
    lastModifiedAt?: number;
    mimeType?: string;
    name: string;
    // params?: Record<string, unknown>; // TODO: What is this used for?
    // paramsString?: string; // TODO: What is this used for?
    size?: number;
    typeId: ListEntryTypeId;
}
export interface ListEntriesResponse {
    error?: unknown;
    result?: ListEntriesResult;
}
export interface ListEntriesResult {
    cursor: string | number | undefined;
    listEntryConfigs: ListEntryConfig[];
    isMore: boolean;
    totalCount: number;
}
export enum ListEntryTypeId {
    File = 'file',
    Folder = 'folder'
}
export interface DPAFileSystemFileHandle {
    readonly kind: 'file';
    getFile(): Promise<File>;
}

// Types - Write Interface

export interface WriteInterface {
    connector: DataConnector;
    open(): void;
    write(): void;
    close(): void;
}
