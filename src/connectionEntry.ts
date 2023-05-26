/**
 * @file datapos-engine-support/src/connectionEntry.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */

// Dependencies - Engine
import type { DataUsageTypeId, DPAFileSystemFileHandle } from '.';

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Connection Entry
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface SourceItem {
    childCount?: number;
    folderPath?: string;
    encodingId?: string;
    extension?: string;
    handle?: DPAFileSystemFileHandle; // TODO: Remove reference to 'FileSystemFileHandle' otherwise 'datapos-connector-node-browser' does not compile.
    id?: string;
    label?: string;
    lastModifiedAt?: number;
    mimeType?: string;
    name?: string;
    params?: Record<string, unknown>; // TODO: What is this used for?
    paramsString?: string; // TODO: What is this used for?
    // referenceId?: string;
    size?: number;
    typeId?: SourceItemTypeId;
}

export interface ConnectionEntryPreview {
    data: ParsedValue[][] | Uint8Array;
    fields: PreviewField[];
    typeId: ConnectionEntryPreviewTypeId;
}

export type ParsedValue = boolean | number | string | null;

export interface PreviewField {
    dataUsageTypeId?: DataUsageTypeId;
    id?: string;
    label?: string;
    previewValues?: PreviewValue[];
}

interface PreviewValue {
    id: string;
    label: string;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Connection - Retrieve Entries
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface ConnectionEntriesPage {
    cursor: string | number | undefined;
    entries: SourceItem[];
    isMore: boolean;
    totalCount: number;
}

export interface ConnectionEntriesRetrievalProperties {
    limit: number;
    offset: number;
    totalCount?: number;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Connection Entry - Enumerations
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export enum ConnectionEntryPreviewTypeId {
    JSON = 'json',
    Table = 'table',
    Uint8Array = 'uint8Array'
}

export enum SourceItemTypeId {
    File = 'file',
    Folder = 'folder'
}

export enum DataFormatId {
    DelimitedText = 'dtv',
    EntityEvent = 'e/e',
    JSON = 'json',
    SPSS = 'spss',
    Table = 'table',
    XLS = 'xls',
    XLSX = 'xlsx',
    XML = 'xml'
}

export enum ValueDelimiterId {
    Colon = ':',
    Comma = ',',
    ExclamationMark = '!',
    Other = '',
    RecordSeparator = '0x1E',
    Semicolon = ';',
    Space = ' ',
    Tab = '\t',
    Underscore = '_',
    UnitSeparator = '0x1F',
    VerticalBar = '|'
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Connection Entry - Preview
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Connection Entry - Audit Content
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Connection Entry - Parse Text Value
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// MAYBE THIS IS IN CORE?
