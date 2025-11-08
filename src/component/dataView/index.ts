// Dependencies - Framework
import type { ComponentConfig } from '@/component';
import { DEFAULT_LOCALE_CODE } from '@/index';
import type { Timestamp } from '@/timestamp';
import type { ConnectionColumnConfig, ConnectionNodeConfig } from '@/component/connector/connection';

// Interfaces/Types - Data View Configuration
export interface DataViewConfig extends ComponentConfig {
    connectionId?: string;
    connectionNodeConfig?: ConnectionNodeConfig;
    previewConfig?: DataViewPreviewConfig;
    contentAuditConfig?: DataViewContentAuditConfig;
    relationshipsAuditConfig?: DataViewRelationshipsAuditConfig;
}
export type DataViewLocalisedConfig = Omit<DataViewConfig, 'label' | 'description'> & { label: string; description: string };

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

// Interfaces/Types - Data View Preview Configuration
export interface DataViewPreviewConfig {
    asAt: Timestamp;
    // commentPrefixId?: string;
    columnConfigs: ConnectionColumnConfig[];
    dataFormatId: DataFormatId;
    duration: number;
    encodingConfidenceLevel?: number;
    encodingId?: string;
    errorMessage?: string;
    hasHeaders?: boolean;
    // linesToSkipBeforeHeader?: number;
    // linesToSkipAfterHeader?: number;
    // linesToSkipAtEnd?: number;
    // quoteEscapeCharacterId?: string;
    // quoteMarkId?: string;
    recordDelimiterId?: RecordDelimiterId;
    records: { isValid: boolean; value: ParsedValue }[][];
    size: number;
    // skipEmptyLines?: boolean;
    // skipLinesWithEmptyValues?: boolean;
    // skipLinesWithErrors?: boolean;
    text: string;
    valueDelimiterId?: ValueDelimiterId;
    // valueTrimMethodId?: string;
}

// Interfaces/Types - Data View Relationships Audit Configuration
export interface DataViewRelationshipsAuditConfig {
    placeholder?: string;
}

// Interfaces/Types - Encoding Config
export interface EncodingConfig {
    id: string;
    groupLabel: string;
    label: string;
    isDetectable: boolean;
    isDecodable: boolean;
}

// Utilities - Data Format
type DataFormat = { id: string; label: string };
type DataFormatConfig = { id: string; label: Record<string, string> };
const dataFormats: DataFormatConfig[] = [
    { id: 'dtv', label: { 'en-gb': 'Delimited Text' } },
    { id: 'e/e', label: { 'en-gb': 'Entity/Event' } },
    { id: 'jsonArray', label: { 'en-gb': 'JSON Array' } },
    { id: 'spss', label: { 'en-gb': 'SPSS' } },
    { id: 'xls', label: { 'en-gb': 'XLS' } },
    { id: 'xlsx', label: { 'en-gb': 'XLSX' } },
    { id: 'xml', label: { 'en-gb': 'XML' } }
];
export const getDataFormat = (id: string, localeId = DEFAULT_LOCALE_CODE): DataFormat => {
    const dataFormat = dataFormats.find((dataFormat) => dataFormat.id === id);
    if (dataFormat) return { ...dataFormat, label: dataFormat.label[localeId] || dataFormat.label[DEFAULT_LOCALE_CODE] || id };
    return { id, label: id };
};
export const getDataFormats = (localeId = DEFAULT_LOCALE_CODE): DataFormat[] => {
    const items: DataFormat[] = [];
    for (const dataFormat of dataFormats) items.push({ ...dataFormat, label: dataFormat.label[localeId] || dataFormat.label[DEFAULT_LOCALE_CODE] || dataFormat.id });
    // return items.sort((first, second) => first.label.localeCompare(second.label));
    return items;
};

// Utilities - Record Delimiter
type RecordDelimiter = { id: string; label: string };
type RecordDelimiterConfig = { id: string; label: Record<string, string> };
const recordDelimiters: RecordDelimiterConfig[] = [
    { id: '\n', label: { 'en-gb': 'Newline' } },
    { id: '\r', label: { 'en-gb': 'Carriage Return' } },
    { id: '\r\n', label: { 'en-gb': 'Carriage Return/Newline' } }
];
export const getRecordDelimiter = (id: string, localeId = DEFAULT_LOCALE_CODE): RecordDelimiter => {
    const recordDelimiter = recordDelimiters.find((recordDelimiter) => recordDelimiter.id === id);
    if (recordDelimiter) return { ...recordDelimiter, label: recordDelimiter.label[localeId] || recordDelimiter.label[DEFAULT_LOCALE_CODE] || id };
    return { id, label: id };
};
export const getRecordDelimiters = (localeId = DEFAULT_LOCALE_CODE): RecordDelimiter[] => {
    const items: RecordDelimiter[] = [];
    for (const recordDelimiter of recordDelimiters)
        items.push({ ...recordDelimiter, label: recordDelimiter.label[localeId] || recordDelimiter.label[DEFAULT_LOCALE_CODE] || recordDelimiter.id });
    // return items.sort((first, second) => first.label.localeCompare(second.label));
    return items;
};

// Utilities - Value Delimiter
type ValueDelimiter = { id: string; label: string };
type ValueDelimiterConfig = { id: string; label: Record<string, string> };
const valueDelimiters: ValueDelimiterConfig[] = [
    { id: ':', label: { 'en-gb': 'Colon' } },
    { id: ',', label: { 'en-gb': 'Comma' } },
    { id: '!', label: { 'en-gb': 'Exclamation Mark' } },
    // { id: '', label: { 'en-gb': 'Other' } }, // TODO: Maybe set this to a 'not printing' or special ascii character when there is a user supplied delimited, rather than ''?
    { id: '0x1E', label: { 'en-gb': 'Record Separator' } },
    { id: ';', label: { 'en-gb': 'Semicolon' } },
    { id: ' ', label: { 'en-gb': 'Space' } },
    { id: '\t', label: { 'en-gb': 'Tab' } },
    { id: '_', label: { 'en-gb': 'Underscore' } },
    { id: '0x1F', label: { 'en-gb': 'Unit Separator' } },
    { id: '|', label: { 'en-gb': 'Vertical Bar' } }
];
export const getValueDelimiter = (id: string, localeId = DEFAULT_LOCALE_CODE): ValueDelimiter => {
    const valueDelimiter = valueDelimiters.find((valueDelimiter) => valueDelimiter.id === id);
    if (valueDelimiter) return { ...valueDelimiter, label: valueDelimiter.label[localeId] || valueDelimiter.label[DEFAULT_LOCALE_CODE] || id };
    return { id, label: id };
};
export const getValueDelimiters = (localeId = DEFAULT_LOCALE_CODE): ValueDelimiter[] => {
    const items: ValueDelimiter[] = [];
    for (const valueDelimiter of valueDelimiters)
        items.push({ ...valueDelimiter, label: valueDelimiter.label[localeId] || valueDelimiter.label[DEFAULT_LOCALE_CODE] || valueDelimiter.id });
    // return items.sort((first, second) => first.label.localeCompare(second.label));
    return items;
};

// Interfaces/Types - Parsed Value
export type ParsedValue = bigint | boolean | number | string | null;

// Interfaces/Types - Basic
export type DataFormatId = 'dtv' | 'e/e' | 'jsonArray' | 'spss' | 'xls' | 'xlsx' | 'xml';
export type RecordDelimiterId = '\n' | '\r' | '\r\n'; // TODO: We need a special value here (NOT '') for when a user specified delimiter is implemented.
export type ValueDelimiterId = '' | ':' | ',' | '!' | '0x1E' | ';' | ' ' | '\t' | '_' | '0x1F' | '|'; // TODO: We need a special value here (NOT '') for when a user specified delimiter is implemented.
