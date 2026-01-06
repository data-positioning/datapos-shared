import { ComponentConfig } from '..';
import { ConnectorConfig } from '.';
import { DataTypeId } from '../dataView';
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
    columnsConfigs?: ObjectColumnConfig[];
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
    typeId: NodeTypeId;
}
interface DPAFileSystemFileHandle {
    readonly kind: 'file';
    getFile(): Promise<File>;
}
/**
 * Connection node type identifier.
 */
type NodeTypeId = 'folder' | 'object';
/**
 * Connection description configuration.
 */
interface ConnectionDescriptionConfig {
    objects: {
        id: string;
        label: Record<string, string>;
        columns: ObjectColumnConfig[];
    }[];
}
/**
 * Object column configuration.
 */
interface ObjectColumnConfig {
    inferenceCountsByType: Record<string, number>;
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
    dataTypeId?: DataTypeId;
    validValueCount?: number;
    validValues?: Record<string, string>;
    voidValueCount?: number;
}
type StorageTypeId = 'binary' | 'boolean' | 'byte' | 'date' | 'dateTime' | 'dateTimeOffset' | 'decimal' | 'double' | 'int8' | 'int16' | 'int32' | 'int64' | 'object' | 'single' | 'string' | 'time' | 'unknown';
export type { ConnectionConfig, ConnectionDescriptionConfig, ConnectionNodeConfig, ObjectColumnConfig };
