import type { Component, ComponentConfig, FirebaseTimestamp } from '../component';

export interface Connection extends Component {
    config: ConnectionConfig;
}

// Config
export interface ConnectionConfig extends ComponentConfig {
    authorisation?: Record<string, ConnectionAuthorization>;
    connectorId: string;
    connectorImplementationId: string;
    lastVerifiedAt?: FirebaseTimestamp;
    notation: string;
}
interface ConnectionAuthorization {
    access_token: string; // Dropbox.
    account_id: string; // Dropbox.
    expires_at: number; // Dropbox.
    expires_in: number; // Dropbox.
    refresh_token: string; // Dropbox.
    scope: string; // Dropbox.
    token_type: string; // Dropbox.
    uid: string; // Dropbox.
}

// Connection Description
export type ConnectionDescription = { fileEntries: Record<string, FileEntry>; objectTypes: Record<string, ObjectType> };
export interface FileEntry {
    description?: string;
    fields: Record<string, Field>;
    folderIds: string[];
    label?: string;
    summary?: string;
}
export interface ObjectType {
    description?: string;
    fields: Record<string, Field>;
    folderIds: string[];
    label?: string;
    summary?: string;
}
interface Field {
    dataType: FieldDataType;
    isIgnored: boolean;
    label: string;
    maxLength?: number;
}
export interface FieldDataType {
    maximumLength?: number;
    objectName?: string;
    storageTypeId: FieldStorageTypeId;
    usageTypeId: FieldUsageTypeId;
}
export enum FieldStorageTypeId {
    Binary = 'binary',
    Boolean = 'boolean',
    Byte = 'byte',
    Date = 'date',
    DateTime = 'dateTime',
    DateTimeOffset = 'dateTimeOffset',
    Decimal = 'decimal',
    Double = 'double',
    Int8 = 'int8',
    Int16 = 'int16',
    Int32 = 'int32',
    Int64 = 'int64',
    Object = 'object',
    Single = 'single',
    String = 'string',
    Time = 'time',
    Unknown = 'unknown'
}
export enum FieldUsageTypeId {
    Boolean = 1,
    DecimalNumber = 4,
    Moment = 2,
    String = 5,
    WholeNumber = 3,
    Unknown = 0
}

// Connection Entry
export interface ConnectionEntry {
    childCount?: number;
    folderPath: string;
    encodingId?: string;
    extension?: string;
    handle?: DPAFileSystemFileHandle; // TODO: Remove reference to 'FileSystemFileHandle' otherwise 'datapos-connector-node-browser' does not compile.
    label: string;
    lastModifiedAt?: number;
    mimeType?: string;
    name: string;
    params?: Record<string, unknown>; // TODO: What is this used for?
    paramsString?: string; // TODO: What is this used for?
    size?: number;
    typeId: ConnectionEntryTypeId;
}

export interface RetrieveEntriesResponse {
    error?: unknown;
    result?: ConnectionEntryDrilldownResult;
}
export interface ConnectionEntryDrilldownResult {
    cursor: string | number | undefined;
    entries: ConnectionEntry[];
    isMore: boolean;
    totalCount: number;
}

export type ConnectionEntryParsedValue = bigint | boolean | number | string | null;
export interface ConnectionEntryPreview {
    data: ConnectionEntryParsedValue[][] | Uint8Array;
    typeId: ConnectionEntryPreviewTypeId;
}
export enum ConnectionEntryPreviewTypeId {
    Table = 'table',
    Uint8Array = 'uint8Array'
}
export enum ConnectionEntryTypeId {
    File = 'file',
    Folder = 'folder'
}

// DPA File System File Handle
export interface DPAFileSystemFileHandle {
    readonly kind: 'file';
    getFile(): Promise<File>;
}
