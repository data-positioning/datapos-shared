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
    accessToken: string; // Dropbox.
    accountId: string; // Dropbox.
    expiresAt: Timestamp; // Dropbox.
    expiresIn: number; // Dropbox.
    refreshToken: string; // Dropbox.
    scope: string; // Dropbox.
    tokenType: string; // Dropbox.
    uid: string; // Dropbox.
}

// Interfaces/Types - Connection Item Configuration
export interface ConnectionItemConfig {
    childCount?: number;
    children?: ConnectionItemConfig[];
    extension?: string;
    fields?: FieldConfig[];
    folderPath: string;
    handle?: { readonly kind: 'file'; getFile(): Promise<File> }; // DPA File System File Handle
    id?: string;
    label: string;
    lastModifiedAt?: Timestamp;
    mimeType?: string;
    name: string;
    size?: number;
    typeId: 'folder' | 'object';
}

// Interfaces/Types - Configuration Description
export interface ConnectionDescription {
    objects: { id: string; label: Record<string, string>; fields: FieldConfig[] }[];
    structures: { id: string; label: Record<string, string>; fields: FieldConfig[] }[];
}

// Interfaces/Types - Field Configuration
export interface FieldConfig {
    invalidValueCount?: number;
    invalidValues?: string[];
    isIgnored?: boolean;
    isRequired?: boolean;
    isUnique?: boolean;
    label: Record<string, string>;
    maxDecimals?: number;
    maxSize?: number; // TODO: was 'maxLength?: number'.
    maxValue?: string;
    minDecimals?: number;
    minSize?: number;
    minValue?: string;
    patterns?: Record<string, string>;
    storageTypeId?:
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
    usageTypeId?: 'boolean' | 'decimalNumber' | 'moment' | 'string' | 'unknown' | 'wholeNumber';
    validValueCount?: number;
    validValues?: Record<string, string>;
    voidValueCount?: number;
}
