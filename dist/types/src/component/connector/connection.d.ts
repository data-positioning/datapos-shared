import { ComponentConfig } from '..';
import { ConnectorConfig } from '.';
/** Connection authorisation configuration. */
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
type ConnectionNodeTypeId = 'folder' | 'object';
/** Connection description. */
interface ConnectionDescription {
    objects: {
        id: string;
        label: Record<string, string>;
        columns: ConnectionColumnConfig[];
    }[];
}
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
interface DPAFileSystemFileHandle {
    readonly kind: 'file';
    getFile(): Promise<File>;
}
type StorageTypeId = 'binary' | 'boolean' | 'byte' | 'date' | 'dateTime' | 'dateTimeOffset' | 'decimal' | 'double' | 'int8' | 'int16' | 'int32' | 'int64' | 'object' | 'single' | 'string' | 'time' | 'unknown';
type UsageTypeId = 'boolean' | 'decimalNumber' | 'moment' | 'momentDate' | 'momentTime' | 'string' | 'unknown' | 'wholeNumber';
interface Encoding {
    id: string;
    confidenceLevel: number | undefined;
}
/** Exports. */
export type { ConnectionConfig, ConnectionDescription, ConnectionNodeConfig, Encoding, UsageTypeId };
