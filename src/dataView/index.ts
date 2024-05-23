import type { PreviewColumn } from './PreviewColumn';
import type { Component, ComponentConfig } from '../component';
import type { ContentAuditColumn, ParsedValue } from './ContentAuditColumn';
import type { DPAFileSystemFileHandle, ListEntryParsedValue } from '../connector';

// Declarations - Data View
export interface DataView extends Component {
    properties: DataViewConfig;
}

// Declarations - Data View - Config
export interface DataViewConfig extends ComponentConfig {
    connectionId: string;
    folderPath: string;
    objectExtension?: string;
    objectHandle?: DPAFileSystemFileHandle;
    objectId: string;
    objectName: string;
    preview?: DataViewPreview;
    contentAudit?: DataViewContentAudit;
    relationshipsAudit?: DataViewRelationshipsAudit;
    totalSize?: number;
}

// Declarations - Data View - Config - Preview
export interface DataViewPreview {
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
    // linesToSkipAtEnd?: number;
    size: number;
    // quoteEscapeCharacterId?: string;
    // quoteMarkId?: string;
    records: ListEntryParsedValue[][];
    // skipEmptyLines?: boolean;
    // skipLinesWithEmptyValues?: boolean;
    // skipLinesWithErrors?: boolean;
    text: string;
    valueDelimiterId?: ValueDelimiterId;
    // valueTrimMethodId?: string;
}

// Declarations - Data View - Config - Content Audit
export interface DataViewContentAudit {
    asAt: number;
    columns: ContentAuditColumn[];
    commentLineCount: number;
    emptyLineCount: number;
    invalidFieldLengthCount: number;
    duration: number;
    lineCount: number;
    recordCount: number;
}

// Declarations - Data View - Config - Relationships Audit
export interface DataViewRelationshipsAudit {
    placeholder?: string;
}

// Declarations - Data View - Data Format
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
type DataFormat = { id: string; label: string };
type DataFormatConfig = { id: string; label: Record<string, string> };
const dataFormats: DataFormatConfig[] = [
    { id: 'dtv', label: { en: 'Delimited Text' } },
    { id: 'e/e', label: { en: 'Entity/Event' } },
    { id: 'json', label: { en: 'JSON' } },
    { id: 'spss', label: { en: 'SPSS' } },
    { id: 'table', label: { en: 'Table' } },
    { id: ' xls', label: { en: 'XLS' } },
    { id: ' xlsx', label: { en: 'XLSX' } },
    { id: ' xml', label: { en: 'XML' } }
];
export const getDataFormat = (id: string, localeId = 'en'): DataFormat => {
    const dataFormat = dataFormats.find((dataFormat) => dataFormat.id === id);
    if (dataFormat) return { ...dataFormat, label: dataFormat.label[localeId] || dataFormat.label['en'] || id };
    return { id, label: id };
};
export const getDataFormats = (localeId = 'en'): DataFormat[] => {
    const items: DataFormat[] = [];
    for (const dataFormat of dataFormats) items.push({ ...dataFormat, label: dataFormat.label[localeId] || dataFormat.label['en'] || dataFormat.id });
    return items.sort((first, second) => first.label.localeCompare(second.label));
};

// Declarations - Data View - Value Delimiter
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
type ValueDelimiter = { id: string; label: string };
type ValueDelimiterConfig = { id: string; label: Record<string, string> };
const valueDelimiters: ValueDelimiterConfig[] = [
    { id: ':', label: { en: 'Colon' } },
    { id: ',', label: { en: 'Comma' } },
    { id: '!', label: { en: 'Exclamation Mark' } },
    { id: '', label: { en: 'Other' } },
    { id: '0x1E', label: { en: 'Record Separator' } },
    { id: ';', label: { en: 'Semicolon' } },
    { id: ' ', label: { en: 'Space' } },
    { id: '\t', label: { en: 'Tab' } },
    { id: '_', label: { en: 'Underscore' } },
    { id: '0x1F', label: { en: 'Unit Separator' } },
    { id: '|', label: { en: 'Vertical Bar' } }
];
export const getValueDelimiter = (id: string, localeId = 'en'): ValueDelimiter => {
    const valueDelimiter = valueDelimiters.find((valueDelimiter) => valueDelimiter.id === id);
    if (valueDelimiter) return { ...valueDelimiter, label: valueDelimiter.label[localeId] || valueDelimiter.label['en'] || id };
    return { id, label: id };
};
export const getValueDelimiters = (localeId = 'en'): ValueDelimiter[] => {
    const items: ValueDelimiter[] = [];
    for (const valueDelimiter of valueDelimiters) items.push({ ...valueDelimiter, label: valueDelimiter.label[localeId] || valueDelimiter.label['en'] || valueDelimiter.id });
    return items.sort((first, second) => first.label.localeCompare(second.label));
};

// Declarations
export interface Encoding {
    id: string;
    confidenceLevel?: number;
}

// Declarations
export interface EncodingConfig {
    id: string;
    groupLabel: string;
    label: string;
    isDetectable: boolean;
    isDecodable: boolean;
}

// Declarations
export interface ObjectSchema {
    columns: PreviewColumn[];
    hasHeaderLine: boolean;
    records: ParsedValue[][];
    text: string;
    valueDelimiterId: ValueDelimiterId;
}
