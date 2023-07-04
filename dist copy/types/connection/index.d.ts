import type { Component, ComponentConfig, FirebaseTimestamp } from '../component';
export interface Connection extends Component {
    config: ConnectionConfig;
}
export interface ConnectionConfig extends ComponentConfig {
    authorisation?: Record<string, ConnectionAuthorization>;
    connectorId: string;
    connectorImplementationId: string;
    lastVerifiedAt?: FirebaseTimestamp;
    notation: string;
}
interface ConnectionAuthorization {
    access_token: string;
    account_id: string;
    expires_at: number;
    expires_in: number;
    refresh_token: string;
    scope: string;
    token_type: string;
    uid: string;
}
export type ConnectionDescription = {
    fileEntries: Record<string, FileEntry>;
    objectTypes: Record<string, ObjectType>;
};
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
export declare enum FieldStorageTypeId {
    Binary = "binary",
    Boolean = "boolean",
    Byte = "byte",
    Date = "date",
    DateTime = "dateTime",
    DateTimeOffset = "dateTimeOffset",
    Decimal = "decimal",
    Double = "double",
    Int8 = "int8",
    Int16 = "int16",
    Int32 = "int32",
    Int64 = "int64",
    Object = "object",
    Single = "single",
    String = "string",
    Time = "time",
    Unknown = "unknown"
}
export declare enum FieldUsageTypeId {
    Boolean = 1,
    DecimalNumber = 4,
    Moment = 2,
    String = 5,
    WholeNumber = 3,
    Unknown = 0
}
export interface ConnectionEntry {
    childCount?: number;
    folderPath: string;
    encodingId?: string;
    extension?: string;
    handle?: DPAFileSystemFileHandle;
    id?: string;
    label: string;
    lastModifiedAt?: number;
    mimeType?: string;
    name: string;
    params?: Record<string, unknown>;
    paramsString?: string;
    referenceId?: string;
    size?: number;
    typeId: ConnectionEntryTypeId;
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
export declare enum ConnectionEntryPreviewTypeId {
    Table = "table",
    Uint8Array = "uint8Array"
}
export declare enum ConnectionEntryTypeId {
    File = "file",
    Folder = "folder"
}
export interface DPAFileSystemFileHandle {
    readonly kind: 'file';
    getFile(): Promise<File>;
}
export {};
