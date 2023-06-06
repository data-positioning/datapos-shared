/**
 * @file datapos-engine-support/src/sourceView.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */
import type { Component } from '../component';
import { ContentAuditColumn } from './ContentAuditColumn';
import { PreviewColumn } from './PreviewColumn';
import type { DPAFileSystemFileHandle, ParsedValue } from '..';
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
export interface SourceViewPreview {
    asAt: number;
    columns: PreviewColumn[];
    dataFormatId: DataFormatId;
    duration: number;
    encodingConfidenceLevel?: number;
    encodingId?: string;
    hasHeaderLine?: boolean;
    previewSize: number;
    records: ParsedValue[][];
    text: string;
    valueDelimiterId?: ValueDelimiterId;
}
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
export interface SourceViewRelationshipsAudit {
    placeholder?: string;
}
export declare enum DataFormatId {
    DelimitedText = "dtv",
    EntityEvent = "e/e",
    JSON = "json",
    SPSS = "spss",
    Table = "table",
    XLS = "xls",
    XLSX = "xlsx",
    XML = "xml"
}
export declare enum ValueDelimiterId {
    Colon = ":",
    Comma = ",",
    ExclamationMark = "!",
    Other = "",
    RecordSeparator = "0x1E",
    Semicolon = ";",
    Space = " ",
    Tab = "\t",
    Underscore = "_",
    UnitSeparator = "0x1F",
    VerticalBar = "|"
}
