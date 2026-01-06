/**
 * Connector connection.
 */

// Framework dependencies.
import type { ComponentConfig } from '@/component';
import type { ConnectorConfig } from '@/component/connector';
import type { DataTypeId } from '@/component/dataView';

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
    accessToken: string; // Dropbox.
    accountId: string; // Dropbox.
    expiresAt: number; // Dropbox.
    expiresIn: number; // Dropbox.
    refreshToken: string; // Dropbox.
    scope: string; // Dropbox.
    tokenType: string; // Dropbox.
    uid: string; // Dropbox.
}

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//#region Connection node...
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

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

//#endregion ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//#region Connection description...
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

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

//#endregion ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//#region Connection column...
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

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
    DataTypeId?: DataTypeId;
    validValueCount?: number;
    validValues?: Record<string, string>;
    voidValueCount?: number;
}

type StorageDataTypeId =
    | 'binary'
    | 'boolean'
    | 'byte'
    | 'date'
    | 'dateTime'
    | 'dateTimeOffset'
    | 'decimal'
    | 'double'
    | 'int8'
    | 'int16'
    | 'int32'
    | 'int64'
    | 'object'
    | 'single'
    | 'string'
    | 'time'
    | 'unknown';

//#endregion ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Exports.
export type { ConnectionColumnConfig, ConnectionConfig, ConnectionDescriptionConfig, ConnectionNodeConfig };
