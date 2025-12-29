/**
 * Connection composables, constants, errors, types/interfaces and utilities.
 */

/** Framework dependencies. */
import type { ComponentConfig } from '@/component';
import type { ConnectorConfig } from '~/src/component/connector';

/** Connection authorisation configuration. */
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

/** Connection configuration. */
interface ConnectionConfig extends ComponentConfig {
    authorisation: Record<string, ConnectionAuthorisationConfig>;
    connectorConfig: ConnectorConfig;
    lastVerifiedAt: number;
    notation?: string;
}

/** Connection node configuration. */
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

// Types/Interfaces - Connection Node Type Identifier
type ConnectionNodeTypeId = 'folder' | 'object';

/** Connection description. */
interface ConnectionDescription {
    objects: {
        id: string;
        label: Record<string, string>;
        columns: ConnectionColumnConfig[];
    }[];
}

// Types/Interfaces - Column Configuration
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
    storageTypeId?: StorageTypeId;
    usageTypeId?: UsageTypeId;
    validValueCount?: number;
    validValues?: Record<string, string>;
    voidValueCount?: number;
}

// Types/Interfaces - Basic
interface DPAFileSystemFileHandle {
    readonly kind: 'file';
    getFile(): Promise<File>;
}
type StorageTypeId =
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
type UsageTypeId = 'boolean' | 'decimalNumber' | 'moment' | 'momentDate' | 'momentTime' | 'string' | 'unknown' | 'wholeNumber';

/** Exports. */
export type { ConnectionColumnConfig, ConnectionConfig, ConnectionDescription, ConnectionNodeConfig, UsageTypeId };
