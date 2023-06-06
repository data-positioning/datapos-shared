/**
 * @file datapos-engine-support/src/connectionEntry.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */
import type { DPAFileSystemFileHandle, ParsedValue } from '..';
export interface ConnectionEntry {
    childCount?: number;
    folderPath: string;
    encodingId?: string;
    extension?: string;
    handle?: DPAFileSystemFileHandle;
    id?: string;
    label: string;
    lastModifiedAt?: number;
    mimeType?: string;
    name: string;
    params?: Record<string, unknown>;
    paramsString?: string;
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
export interface ConnectionEntryPreview {
    data: ParsedValue[][] | Uint8Array;
    typeId: ConnectionEntryPreviewTypeId;
}
export declare enum ConnectionEntryPreviewTypeId {
    Table = "table",
    Uint8Array = "uint8Array"
}
export declare enum ConnectionEntryTypeId {
    File = "file",
    Folder = "folder"
}
