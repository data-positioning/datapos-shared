/**
 * @file datapos-engine-support/src/sourceView.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */

// Dependencies - Engine
import type { Component } from './component';
import { SourceViewContentAuditField } from './SourceViewContentAuditField';
import type { DataUsageTypeId, DPAFileSystemFileHandle } from '.';

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
// Source View - Preview
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
    records?: (boolean | number | string | null)[][];
    skipEmptyLines?: boolean;
    skipLinesWithEmptyValues?: boolean;
    skipLinesWithErrors?: boolean;
    text?: string;
    totalSize?: number;
    valueDelimiterId?: ValueDelimiterId;
    valueTrimMethodId?: string;
}

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

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Source View - Content Audit
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

interface SourceViewContentAudit {
    asAt: number;
    fields: SourceViewContentAuditField[];
    lineCount: number;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Source View - Relationships Audit
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
