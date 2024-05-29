// Dependencies - Vendor
import type { Timestamp } from 'firebase/firestore';

// Dependencies - Framework
import type { ConnectionConfig } from '../connection';
import type { ConnectionItemConfig } from '../connection';
import type { Component, ComponentConfig } from '../component';
import type { ContentAuditColumn, ParsedValue } from './ContentAuditColumn';

// Interfaces/Types - Data View
export interface DataView extends Component {
    properties: DataViewConfig;
}

// Interfaces/Types - Data View Configuration
export interface DataViewConfig extends ComponentConfig {
    connectionConfig: ConnectionConfig;
    connectionItemConfig: ConnectionItemConfig;
    previewConfig?: DataViewPreviewConfig;
    contentAuditConfig?: DataViewContentAuditConfig;
    relationshipsAuditConfig?: DataViewRelationshipsAuditConfig;
}

// Interfaces/Types - Data View Preview Configuration
export interface DataViewPreviewConfig {
    asAt: Timestamp;
    // commentPrefixId?: string;
    contentAudit?: DataViewContentAuditConfig;
    dataFormatId: 'dtv' | 'e/e' | 'json' | 'jsonTable' | 'spss' | 'xls' | 'xlsx' | 'xml';
    duration: number;
    encodingConfidenceLevel?: number;
    encodingId?: string;
    hasHeaderLine?: boolean;
    // lineDelimiterId?: string;
    // linesToSkipBeforeHeader?: number;
    // linesToSkipAfterHeader?: number;
    // linesToSkipAtEnd?: number;
    // quoteEscapeCharacterId?: string;
    // quoteMarkId?: string;
    records: ParsedValue[][];
    size: number;
    // skipEmptyLines?: boolean;
    // skipLinesWithEmptyValues?: boolean;
    // skipLinesWithErrors?: boolean;
    text: string;
    valueDelimiterId?: ':' | ',' | '!' | '' | '0x1E' | ';' | ' ' | '\t' | '_' | '0x1F' | '|'; // TODO: What about this one "| ''"?
    // valueTrimMethodId?: string;
}

// Interfaces/Types - Data View Content Audit Configuration
export interface DataViewContentAuditConfig {
    asAt: Timestamp;
    columns: ContentAuditColumn[];
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

// Interfaces/Types - Encoding
export interface Encoding {
    id: string;
    confidenceLevel?: number;
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

// Utilities - Value Delimiter
type ValueDelimiter = { id: string; label: string };
type ValueDelimiterConfig = { id: string; label: Record<string, string> };
const valueDelimiters: ValueDelimiterConfig[] = [
    { id: ':', label: { en: 'Colon' } },
    { id: ',', label: { en: 'Comma' } },
    { id: '!', label: { en: 'Exclamation Mark' } },
    { id: '', label: { en: 'Other' } }, // TODO: Maybe set this to a 'not printing' or special ascii character when there is a user supplied delimited, rather than ''?
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
