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
export type ConnectionDescription = { itemEntries: Record<string, ItemEntry>; objectTypes: Record<string, ObjectType> };
interface ItemEntry {
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
