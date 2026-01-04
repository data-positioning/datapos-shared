import { ComponentConfig } from '..';
import { ConnectorConfig } from '.';
import { ValueDataTypeId } from '../dataView';
/**
 * Connection configuration.
 */
interface ConnectionConfig extends ComponentConfig {
    authorisation: Record<string, ConnectionAuthorisationConfig>;
    connectorConfig: ConnectorConfig;
    lastVerifiedAt: number;
    notation: string | undefined;
}
/**
 * Connection authorisation configuration.
 */
interface ConnectionAuthorisationConfig {
    accessToken: string;
    accountId: string;
    expiresAt: number;
    expiresIn: number;
    refreshToken: string;
    scope: string;
    tokenType: string;
    uid: string;
}
/**
 * Connection node configuration.
 */
interface ConnectionNodeConfig {
    childCount?: number;
    columnsConfigs?: ConnectionColumnConfig[];
    extension: string | undefined;
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
interface DPAFileSystemFileHandle {
    readonly kind: 'file';
    getFile(): Promise<File>;
}
/**
 * Connection node type identifier.
 */
type ConnectionNodeTypeId = 'folder' | 'object';
/**
 * Connection description configuration.
 */
interface ConnectionDescriptionConfig {
    objects: {
        id: string;
        label: Record<string, string>;
        columns: ConnectionColumnConfig[];
    }[];
}
/**
 * Connection column configuration.
 */
interface ConnectionColumnConfig {
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
    storageTypeId?: StorageDataTypeId;
    valueDataTypeId?: ValueDataTypeId;
    validValueCount?: number;
    validValues?: Record<string, string>;
    voidValueCount?: number;
}
type StorageDataTypeId = 'binary' | 'boolean' | 'byte' | 'date' | 'dateTime' | 'dateTimeOffset' | 'decimal' | 'double' | 'int8' | 'int16' | 'int32' | 'int64' | 'object' | 'single' | 'string' | 'time' | 'unknown';
export type { ConnectionColumnConfig, ConnectionConfig, ConnectionDescriptionConfig, ConnectionNodeConfig };
