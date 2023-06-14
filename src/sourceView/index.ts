/**
 * @file datapos-engine-support/src/sourceView.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */

// Dependencies - Engine
import type { Component } from '../component';
import { ContentAuditColumn } from './ContentAuditColumn';
import { PreviewColumn } from './PreviewColumn';
import type { DPAFileSystemFileHandle, ParsedValue } from '..';

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Source View
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface SourceView extends Component {
    properties: SourceViewConfig;
}

export interface SourceViewConfig {
    connectionId: string;
    fileExtension?: string;
    fileHandle?: DPAFileSystemFileHandle;
    fileId?: string;
    fileName: string;
    folderPath: string;
    preview?: SourceViewPreview;
    contentAudit?: SourceViewContentAudit;
    relationshipsAudit?: SourceViewRelationshipsAudit;
    totalSize?: number;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Source View - Preview
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface SourceViewPreview {
    asAt: number;
    columns: PreviewColumn[];
    // commentPrefixId?: string;
    dataFormatId: DataFormatId;
    duration: number;
    encodingConfidenceLevel?: number;
    encodingId?: string;
    hasHeaderLine?: boolean;
    // lineDelimiterId?: string;
    // linesToSkipBeforeHeader?: number;
    // linesToSkipAfterHeader?: number;
    // linesToSkipAtEndOfFile?: number;
    size: number;
    // quoteEscapeCharacterId?: string;
    // quoteMarkId?: string;
    records: ParsedValue[][];
    // skipEmptyLines?: boolean;
    // skipLinesWithEmptyValues?: boolean;
    // skipLinesWithErrors?: boolean;
    text: string;
    valueDelimiterId?: ValueDelimiterId;
    // valueTrimMethodId?: string;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Source View - Content Audit
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface SourceViewContentAudit {
    asAt: number;
    columns: ContentAuditColumn[];
    commentLineCount: number;
    emptyLineCount: number;
    invalidFieldLengthCount: number;
    duration: number;
    lineCount: number;
    recordCount: number;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Source View - Relationships Audit
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface SourceViewRelationshipsAudit {
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

type DataFormat = { label: string };
const dataFormats: Record<string, DataFormat> = {
    dtv: { label: 'Delimited Text' },
    'e/e': { label: 'Entity/Event' },
    json: { label: 'JSON' },
    spss: { label: 'SPSS' },
    table: { label: 'Table' },
    xls: { label: 'XLS' },
    xlsx: { label: 'XLSX' },
    xml: { label: 'XML' }
};

export const getDataFormats = () => {
    const items = [];
    for (const [key, value] of Object.entries(dataFormats)) items.push({ id: key, label: value });
    return items;
};

export const lookupDataFormat = (id: string): DataFormat => (dataFormats[id] ? dataFormats[id] : { label: id });

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
