// Dependencies - Framework
import type { ComponentConfig } from './component';
import type { Timestamp } from './timestamp';
import type { ConnectionColumnConfig, ConnectionConfig, ConnectionItemConfig } from './connection';

// Interfaces/Types - Data View Configuration
export interface DataViewConfig extends ComponentConfig {
    connectionConfig: ConnectionConfig;
    connectionItemConfig: ConnectionItemConfig;
    previewConfig?: DataViewPreviewConfig;
    contentAuditConfig?: DataViewContentAuditConfig;
    relationshipsAuditConfig?: DataViewRelationshipsAuditConfig;
}

// Interfaces/Types - Parsed Value
export type ParsedValue = bigint | boolean | number | string | null;

// Interfaces/Types - Data View Preview Configuration
export interface DataViewPreviewConfig {
    asAt: Timestamp;
    // commentPrefixId?: string;
    columnConfigs?: ConnectionColumnConfig[];
    dataFormatId: DataFormatId;
    duration?: number;
    encodingConfidenceLevel?: number;
    encodingId?: string;
    hasHeaders?: boolean;
    // linesToSkipBeforeHeader?: number;
    // linesToSkipAfterHeader?: number;
    // linesToSkipAtEnd?: number;
    // quoteEscapeCharacterId?: string;
    // quoteMarkId?: string;
    recordDelimiterId?: RecordDelimiterId;
    records?: ParsedValue[][];
    size?: number;
    // skipEmptyLines?: boolean;
    // skipLinesWithEmptyValues?: boolean;
    // skipLinesWithErrors?: boolean;
    text?: string;
    valueDelimiterId?: ValueDelimiterId;
    // valueTrimMethodId?: string;
}

// Interfaces/Types - Data View Content Audit Configuration
export interface DataViewContentAuditConfig {
    asAt: Timestamp;
    columns: ConnectionColumnConfig[];
    commentLineCount: number;
    emptyLineCount: number;
    invalidFieldLengthCount: number;
    duration: number;
    lineCount: number;
    recordCount: number;
}

// Interfaces/Types - Data View Relationships Audit Configuration
export interface DataViewRelationshipsAuditConfig {
    placeholder?: string;
}

// Utilities - Data Format
type DataFormat = { id: string; label: string };
type DataFormatConfig = { id: string; label: Record<string, string> };
const dataFormats: DataFormatConfig[] = [
    { id: 'dtv', label: { en: 'Delimited Text' } },
    { id: 'e/e', label: { en: 'Entity/Event' } },
    { id: 'json', label: { en: 'JSON' } },
    { id: 'jsonTable', label: { en: 'JSON Table' } },
    { id: 'spss', label: { en: 'SPSS' } },
    { id: 'xls', label: { en: 'XLS' } },
    { id: 'xlsx', label: { en: 'XLSX' } },
    { id: 'xml', label: { en: 'XML' } }
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

// Utilities - Record Delimiter
type RecordDelimiter = { id: string; label: string };
type RecordDelimiterConfig = { id: string; label: Record<string, string> };
const recordDelimiters: RecordDelimiterConfig[] = [
    { id: '\n', label: { en: 'Newline (Unix/Linux systems)' } },
    { id: '\r', label: { en: 'Carriage Return (Older Macintosh systems)' } },
    { id: '\r\n', label: { en: 'Carriage Return/Newline (Windows Systems)' } }
];
export const getRecordDelimiter = (id: string, localeId = 'en'): RecordDelimiter => {
    const recordDelimiter = recordDelimiters.find((recordDelimiter) => recordDelimiter.id === id);
    if (recordDelimiter) return { ...recordDelimiter, label: recordDelimiter.label[localeId] || recordDelimiter.label['en'] || id };
    return { id, label: id };
};
export const getRecordDelimiters = (localeId = 'en'): RecordDelimiter[] => {
    const items: RecordDelimiter[] = [];
    for (const recordDelimiter of recordDelimiters) items.push({ ...recordDelimiter, label: recordDelimiter.label[localeId] || recordDelimiter.label['en'] || recordDelimiter.id });
    return items.sort((first, second) => first.label.localeCompare(second.label));
};

// Utilities - Value Delimiter
type ValueDelimiter = { id: string; label: string };
type ValueDelimiterConfig = { id: string; label: Record<string, string> };
const valueDelimiters: ValueDelimiterConfig[] = [
    { id: ':', label: { en: 'Colon' } },
    { id: ',', label: { en: 'Comma' } },
    { id: '!', label: { en: 'Exclamation Mark' } },
    // { id: '', label: { en: 'Other' } }, // TODO: Maybe set this to a 'not printing' or special ascii character when there is a user supplied delimited, rather than ''?
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

// Interfaces/Types - Basic
export type DataFormatId = 'dtv' | 'e/e' | 'json' | 'jsonTable' | 'spss' | 'xls' | 'xlsx' | 'xml';
export type RecordDelimiterId = '\n' | '\r' | '\r\n'; // TODO: We need a special value here (NOT '') for when a user specified delimiter is implemented.
export type ValueDelimiterId = ':' | ',' | '!' | '0x1E' | ';' | ' ' | '\t' | '_' | '0x1F' | '|'; // TODO: We need a special value here (NOT '') for when a user specified delimiter is implemented.
