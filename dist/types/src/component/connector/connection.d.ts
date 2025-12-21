import { ComponentConfig } from '..';
import { ConnectorConfig } from './types';
export interface ConnectionAuthorizationConfig {
    accessToken: string;
    accountId: string;
    expiresAt: number;
    expiresIn: number;
    refreshToken: string;
    scope: string;
    tokenType: string;
    uid: string;
}
export interface ConnectionConfig extends ComponentConfig {
    authorisation: Record<string, ConnectionAuthorizationConfig>;
    connectorConfig: ConnectorConfig;
    lastVerifiedAt: number;
    notation?: string;
}
export interface ConnectionNodeConfig {
    childCount?: number;
    columnsConfigs?: ConnectionColumnConfig[];
    extension?: string;
    folderPath: string;
    handle?: DPAFileSystemFileHandle;
    id: string;
    nodeDisplayHeight?: number;
    nodes?: ConnectionNodeConfig[];
    label: string;
    lastModifiedAt?: number;
    mimeType?: string;
    name: string;
    size?: number;
    typeId: ConnectionNodeTypeId;
}
export type ConnectionNodeTypeId = 'folder' | 'object';
export interface ConnectionDescription {
    objects: {
        id: string;
        label: Record<string, string>;
        columns: ConnectionColumnConfig[];
    }[];
}
export interface ConnectionColumnConfig {
    invalidValueCount?: number;
    invalidValues?: string[];
    isIgnored?: boolean;
    isRequired?: boolean;
    isUnique?: boolean;
    label: Record<string, string>;
    maxDecimals?: number;
    maxSize?: number;
    maxValue?: string;
    minDecimals?: number;
    minSize?: number;
    minValue?: string;
    patterns?: Record<string, string>;
    storageTypeId?: StorageTypeId;
    usageTypeId?: UsageTypeId;
    validValueCount?: number;
    validValues?: Record<string, string>;
    voidValueCount?: number;
}
export interface DPAFileSystemFileHandle {
    readonly kind: 'file';
    getFile(): Promise<File>;
}
export type StorageTypeId = 'binary' | 'boolean' | 'byte' | 'date' | 'dateTime' | 'dateTimeOffset' | 'decimal' | 'double' | 'int8' | 'int16' | 'int32' | 'int64' | 'object' | 'single' | 'string' | 'time' | 'unknown';
export type UsageTypeId = 'boolean' | 'decimalNumber' | 'moment' | 'momentDate' | 'momentTime' | 'string' | 'unknown' | 'wholeNumber';
export interface Encoding {
    id: string;
    confidenceLevel?: number;
}
