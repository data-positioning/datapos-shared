// Dependencies - Vendor
import type { Timestamp } from 'firebase/firestore';

// Dependencies - Framework
import type { Component, ComponentConfig } from '../component';

// Interfaces/Types - Connection
export interface Connection extends Component {
    config: ConnectionConfig;
}

// Interfaces/Types - Connection Configuration
export interface ConnectionConfig extends ComponentConfig {
    authorisation: Record<string, ConnectionAuthorization>;
    connectorId: string;
    connectorImplementationId: string;
    lastVerifiedAt: Timestamp;
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

// Interfaces/Types - Connection Description
export type ConnectionDescription = { connectionItemConfigs: ConnectionItemConfig; structures: StructureConfig[] };

// Interfaces/Types - Connection Item Configuration
export interface ConnectionItemConfig {
    childCount?: number;
    children?: ConnectionItemConfig[];
    extension?: string;
    fields: FieldConfig[];
    folderPath: string;
    handle?: {
        readonly kind: 'file'; // DPA File System File Handle
        getFile(): Promise<File>;
    };
    id?: string;
    label: string;
    lastModifiedAt?: number;
    mimeType?: string;
    name: string;
    size?: number;
    typeId: 'folder' | 'object';
}

// Interfaces/Types - Structure Configuration
interface StructureConfig {
    id: string;
    fields: FieldDataType[];
}

// Interfaces/Types - Field Configuration
interface FieldConfig {
    dataType: FieldDataType;
    isIgnored: boolean;
    label: string;
    maxLength?: number;
}

// Interfaces/Types - Field Data Type
export interface FieldDataType {
    maximumLength?: number;
    storageTypeId:
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
    usageTypeId: 'boolean' | 'decimalNumber' | 'moment' | 'string' | 'wholeNumber' | 'unknown';
}
