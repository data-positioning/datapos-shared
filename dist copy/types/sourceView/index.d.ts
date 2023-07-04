import type { Component } from '../component';
import type { ContentAuditColumn } from './ContentAuditColumn';
import type { PreviewColumn } from './PreviewColumn';
import type { ConnectionEntryParsedValue, DPAFileSystemFileHandle } from '../connection';
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
    size: number;
    records: ConnectionEntryParsedValue[][];
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
type DataFormat = {
    id: string;
    label: string;
};
export declare const getDataFormat: (id: string, localeId?: string) => DataFormat;
export declare const getDataFormats: (localeId?: string) => DataFormat[];
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
type ValueDelimiter = {
    id: string;
    label: string;
};
export declare const getValueDelimiter: (id: string, localeId?: string) => ValueDelimiter;
export declare const getValueDelimiters: (localeId?: string) => ValueDelimiter[];
export {};
