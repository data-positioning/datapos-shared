/**
 * @file datapos-engine-support/src/sourceView.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */

// Dependencies - Engine
import type { Component } from './component';
import type { ConnectionEntry, DPAFileSystemFileHandle, DataUsageTypeId } from '.';
import { SourceViewContentAuditField } from './SourceViewContentAuditField';

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Source View
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface SourceView extends Component {
    properties: SourceViewConfig;
    preview: SourceViewPreview;
    contentAudit: SourceViewContentAudit;
    relationshipsAudit: SourceViewRelationshipsAudit;
}

export interface SourceViewConfig {
    connectionId?: string;
    folderPath?: string;
    fileExtension?: string;
    fileHandle?: DPAFileSystemFileHandle;
    fileId?: string;
    fileName?: string;
    preview?: SourceViewPreview;
    contentAudit?: SourceViewContentAudit;
    relationshipsAudit?: SourceViewRelationshipsAudit;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Connection - Retrieve Entries
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface ConnectionEntryPreview {
    data: ParsedValue[][] | Uint8Array;
    fields: PreviewField[];
    typeId: ConnectionEntryPreviewTypeId;
}

export type ParsedValue = boolean | number | string | null;

export interface PreviewField {
    dataUsageTypeId: DataUsageTypeId;
    id: string;
    label: string;
    previewValues: PreviewValue[];
}

interface PreviewValue {
    id: string;
    label: string;
}
export enum ConnectionEntryPreviewTypeId {
    JSON = 'json',
    Table = 'table',
    Uint8Array = 'uint8Array'
}

export interface SourceViewPreview {
    asAt: number;
    commentPrefixId?: string;
    dataFormatId: DataFormatId;
    fields?: PreviewField[];
    encodingConfidenceLevel?: number;
    encodingId?: string;
    hasHeaderLine?: boolean;
    lineDelimiterId?: string;
    linesToSkipBeforeHeader?: number;
    linesToSkipAfterHeader?: number;
    linesToSkipAtEndOfFile?: number;
    previewSize: number;
    quoteEscapeCharacterId?: string;
    quoteMarkId?: string;
    records?: ParsedValue[][];
    skipEmptyLines?: boolean;
    skipLinesWithEmptyValues?: boolean;
    skipLinesWithErrors?: boolean;
    text?: string;
    totalSize?: number;
    valueDelimiterId?: ValueDelimiterId;
    valueTrimMethodId?: string;
}

interface SourceViewContentAudit {
    asAt: number;
    fields: SourceViewContentAuditField[];
    lineCount: number;
}

// interface SourceViewContentAuditField extends PreviewField {
//     dataUsageTypeId: DataUsageTypeId;
//     id: string;
//     invalidValueCount: number;
//     missingValueCount: number;
//     uniqueValueCount: number;
//     validValueCount: number;
//     values: Record<string, number>;
// }

interface SourceViewRelationshipsAudit {
    placeholder?: string;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Source View - Enumerations
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
