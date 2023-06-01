/**
 * @file datapos-engine-support/src/connectionEntry.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */

// Dependencies - Engine
import type { DPAFileSystemFileHandle } from '.';

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Connection Entry
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface ConnectionEntry {
    childCount?: number;
    folderPath: string;
    encodingId?: string;
    extension?: string;
    handle?: DPAFileSystemFileHandle; // TODO: Remove reference to 'FileSystemFileHandle' otherwise 'datapos-connector-node-browser' does not compile.
    id?: string;
    label: string;
    lastModifiedAt?: number;
    mimeType?: string;
    name?: string;
    params?: Record<string, unknown>; // TODO: What is this used for?
    paramsString?: string; // TODO: What is this used for?
    referenceId?: string;
    size?: number;
    typeId: ConnectionEntryTypeId;
}

export interface ConnectionEntryDrilldownResult {
    cursor: string | number | undefined;
    entries: ConnectionEntry[];
    isMore: boolean;
    totalCount: number;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Connection Entry - Enumerations
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export enum ConnectionEntryTypeId {
    File = 'file',
    Folder = 'folder'
}
