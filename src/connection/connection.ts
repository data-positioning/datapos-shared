/**
 * @file datapos-engine-support/src/connection.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */

// Dependencies - Engine
import type { Component, ComponentConfig } from './component';
import { DataStorageTypeId, DataUsageTypeId, FirebaseTimestamp } from '.';

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Connection
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface Connection extends Component {
    config: ConnectionConfig;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Connection - Config
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface ConnectionConfig extends ComponentConfig {
    authorisation?: Record<string, ConnectionAuthorization>;
    connectorId: string;
    connectorImplementationId: string;
    lastVerifiedAt?: FirebaseTimestamp;
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

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Connection - Description
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export type ConnectionDescription = { fileEntries: Record<string, FileEntry>; objectTypes: Record<string, ObjectType> };

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
    dataType: DataType;
    isIgnored: boolean;
    label: string;
    maxLength?: number;
}

export interface DataType {
    maximumLength?: number;
    objectName?: string;
    storageTypeId: DataStorageTypeId;
    usageTypeId: DataUsageTypeId;
}
