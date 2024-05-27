// import type { DataViewConfig } from '../dataView';
// import type { Callback, Options, Parser } from 'csv-parse';
// import type { ConnectionConfig, ConnectionDescription } from '../connection';
// import type { ConnectorCallbackData, ConnectorConfig } from '.';

// export interface Connector {
//     abortController?: AbortController | undefined;
//     readonly config: ConnectorConfig;
//     readonly connectionConfig: ConnectionConfig;

//     abort?(): void;
//     authenticate?(accountId: string, windowCenterX: number, windowCenterY: number): Window;
//     describe?(
//         accountId: string | undefined,
//         sessionAccessToken: string | undefined,
//         connectionEntryId: string | undefined,
//         callback: (data: ConnectorCallbackData) => void
//     ): Promise<ConnectionDescription>;
//     getCreateInterface?(): CreateInterface;
//     getDeleteInterface?(): DeleteInterface;
//     getDropInterface?(): DropInterface;
//     getInsertInterface?(): InsertInterface;
//     getPreviewInterface?(): PreviewInterface;
//     getReadInterface?(): ReadInterface;
//     getSelectInterface?(): SelectInterface;
//     getUpdateInterface?(): UpdateInterface;
//     getWriteInterface?(): WriteInterface;
//     list?(settings: ListSettings): Promise<ListResult>;
// }

// // Types - Create Interface
// interface CreateInterface {
//     connector: Connector;
//     create(connector: Connector, databaseName: string, tableName: string, typeId?: string, structure?: Record<string, unknown>): Promise<{ error?: unknown }>;
// }

// // Types - Delete Interface
// interface DeleteInterface {
//     connector: Connector;
//     drop(connector: Connector, databaseName: string, tableName: string, keys: Record<string, unknown>[]): Promise<{ error?: unknown }>;
// }

// // Types - Drop Interface
// interface DropInterface {
//     connector: Connector;
//     drop(connector: Connector, databaseName: string, tableName: string): Promise<{ error?: unknown }>;
// }

// // Types - Insert Interface
// interface InsertInterface {
//     connector: Connector;
//     insert(connector: Connector, databaseName: string, tableName: string, data: Record<string, unknown>[]): Promise<{ error?: unknown }>;
// }

// // Types - Preview Interface
// export interface PreviewInterface {
//     connector: Connector;
//     preview(connector: Connector, DataViewConfig: DataViewConfig, chunkSize?: number): Promise<{ error?: unknown; result?: Preview }>;
// }
// export interface Preview {
//     data: ListEntryParsedValue[][] | Uint8Array;
//     typeId: PreviewTypeId;
// }
// export type ListEntryParsedValue = bigint | boolean | number | string | null;
// export enum PreviewTypeId {
//     Table = 'table',
//     Uint8Array = 'uint8Array'
// }

// // Types - Read Interface
// export interface ReadInterface {
//     connector: Connector;
//     read(
//         connector: Connector,
//         DataViewConfig: DataViewConfig,
//         settings: ReadSettings,
//         csvParse: (options?: Options, callback?: Callback) => Parser,
//         callback: (data: ConnectorCallbackData) => void
//     ): Promise<void>;
// }
// export interface ReadSettings {
//     accountId?: string;
//     chunk(records: ConnectorRecord[]): void;
//     chunkSize?: number;
//     complete(fileInfo: ConnectorFileInfo): void;
//     sessionAccessToken?: string;
// }
// export interface ConnectorFileInfo {
//     byteCount: number;
//     commentLineCount: number;
//     emptyLineCount: number;
//     invalidFieldLengthCount: number;
//     lineCount: number;
//     recordCount: number;
// }
// export interface ConnectorRecord {
//     fieldInfos: ConnectorFieldInfo[];
//     fieldValues: string[];
// }
// export interface ConnectorFieldInfo {
//     isQuoted: boolean;
// }

// // Types - Select Interface
// export interface SelectInterface {
//     connector: Connector;
//     select(
//         connector: Connector,
//         databaseName: string,
//         tableName: string,
//         columnNames?: string[],
//         limit?: number,
//         offset?: number
//     ): Promise<{ error?: unknown; result?: Record<string, unknown>[] }>;
// }

// // Types - Update Interface
// interface UpdateInterface {
//     connector: Connector;
//     update(connector: Connector, databaseName: string, tableName: string, data: Record<string, unknown>[]): Promise<{ error?: unknown }>;
// }

// // Types - List Entries Settings
// export interface ListSettings {
//     folderPath: string;
//     limit?: number;
//     offset?: number;
//     totalCount?: number;
// }
// export interface ConnectionItemConfig {
//     childCount?: number;
//     folderPath: string;
//     encodingId?: string;
//     extension?: string;
//     handle?: DPAFileSystemFileHandle; // TODO: Remove reference to 'FileSystemFileHandle' otherwise 'datapos-connector-node-browser' does not compile.
//     id: string;
//     label: string;
//     lastModifiedAt?: number;
//     mimeType?: string;
//     name: string;
//     // params?: Record<string, unknown>; // TODO: What is this used for?
//     // paramsString?: string; // TODO: What is this used for?
//     size?: number;
//     typeId: ItemTypeId;
// }
// export interface ListResponse {
//     error?: unknown;
//     result?: ListResult;
// }
// export interface ListResult {
//     cursor: string | number | undefined;
//     itemConfigs: ConnectionItemConfig[];
//     isMore: boolean;
//     totalCount: number;
// }
// export enum ItemTypeId {
//     Folder = 'folder',
//     Object = 'object'
// }
// export interface DPAFileSystemFileHandle {
//     readonly kind: 'file';
//     getFile(): Promise<File>;
// }

// // Types - Write Interface
// export interface WriteInterface {
//     connector: Connector;
//     open(): void;
//     write(): void;
//     close(): void;
// }
