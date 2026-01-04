/**
 * Data view.
 */

// Framework dependencies
import { DEFAULT_LOCALE_CODE } from '@/locale';
import type { FileTypeResult } from 'file-type';
import type { Component, ComponentConfig } from '@/component';
import type { ConnectionColumnConfig, ConnectionNodeConfig, UsageTypeId } from '@/component/connector/connection';

/**
 * Data view interface.
 */
type DataViewInterface = Component;

/**
 * Data view configuration.
 */
interface DataViewConfig extends ComponentConfig {
    connectionId?: string;
    connectionNodeConfig?: ConnectionNodeConfig;
    previewConfig?: DataViewPreviewConfig;
    contentAuditConfig?: DataViewContentAuditConfig;
    relationshipsAuditConfig?: DataViewRelationshipsAuditConfig;
}
type DataViewLocalisedConfig = Omit<DataViewConfig, 'label' | 'description'> & { label: string; description: string };

/**
 * Data view content audit configuration.
 */
interface DataViewContentAuditConfig {
    asAt: number;
    columns: ConnectionColumnConfig[];
    commentLineCount: number;
    emptyLineCount: number;
    invalidFieldLengthCount: number;
    duration: number;
    lineCount: number;
    recordCount: number;
}

/**
 * Data view preview configuration.
 */
interface DataViewPreviewConfig {
    asAt: number;
    // commentPrefixId?: string;
    columnConfigs: ConnectionColumnConfig[];
    dataFormatId: DataFormatId | undefined;
    duration: number;
    encodingConfidenceLevel: number | undefined;
    encodingId: string | undefined;
    errorMessage?: string;
    fileType: FileTypeResult | undefined;
    hasHeaders: boolean | undefined;
    // linesToSkipBeforeHeader?: number;
    // linesToSkipAfterHeader?: number;
    // linesToSkipAtEnd?: number;
    // quoteEscapeCharacterId?: string;
    // quoteMarkId?: string;
    recordDelimiterId?: RecordDelimiterId;
    records: ParseResult[][];
    size: number;
    // skipEmptyLines?: boolean;
    // skipLinesWithEmptyValues?: boolean;
    // skipLinesWithErrors?: boolean;
    text: string;
    valueDelimiterId?: ValueDelimiterId;
    // valueTrimMethodId?: string;
}

/**
 * Data view relationships audit configuration.
 */
interface DataViewRelationshipsAuditConfig {
    placeholder?: string;
}

type LocaleLabelMap = ReadonlyMap<string, string>;
const createLabelMap = (labels: Record<string, string>): LocaleLabelMap => new Map(Object.entries(labels));
const resolveLabel = (labels: LocaleLabelMap, localeId: string, fallbackLocaleId = DEFAULT_LOCALE_CODE): string | undefined => {
    const localizedLabel = labels.get(localeId);
    if (localizedLabel !== undefined) return localizedLabel;
    if (fallbackLocaleId === localeId) return undefined;
    return labels.get(fallbackLocaleId);
};

interface DataFormat {
    id: string;
    label: string;
}
interface DataFormatConfig {
    id: string;
    labels: LocaleLabelMap;
}
const dataFormats: DataFormatConfig[] = [
    { id: 'dtv', labels: createLabelMap({ 'en-gb': 'Delimited Text' }) },
    { id: 'e/e', labels: createLabelMap({ 'en-gb': 'Entity/Event' }) },
    { id: 'json', labels: createLabelMap({ 'en-gb': 'JSON' }) },
    { id: 'spss', labels: createLabelMap({ 'en-gb': 'SPSS' }) },
    { id: 'xls', labels: createLabelMap({ 'en-gb': 'XLS' }) },
    { id: 'xlsx', labels: createLabelMap({ 'en-gb': 'XLSX' }) },
    { id: 'xml', labels: createLabelMap({ 'en-gb': 'XML' }) }
];
const getDataFormat = (id: string, localeId = DEFAULT_LOCALE_CODE): DataFormat => {
    const dataFormat = dataFormats.find((dataFormat) => dataFormat.id === id);
    if (dataFormat) {
        const localizedLabel = resolveLabel(dataFormat.labels, localeId);
        return { id: dataFormat.id, label: localizedLabel ?? dataFormat.id };
    }
    return { id, label: id };
};
const getDataFormats = (localeId = DEFAULT_LOCALE_CODE): DataFormat[] => {
    const items: DataFormat[] = [];
    for (const dataFormat of dataFormats) {
        const localizedLabel = resolveLabel(dataFormat.labels, localeId);
        items.push({ id: dataFormat.id, label: localizedLabel ?? dataFormat.id });
    }
    // return items.sort((first, second) => first.label.localeCompare(second.label));
    return items;
};

// Utilities - Record Delimiter
interface RecordDelimiter {
    id: string;
    label: string;
}
interface RecordDelimiterConfig {
    id: string;
    labels: LocaleLabelMap;
}
const recordDelimiters: RecordDelimiterConfig[] = [
    { id: '\n', labels: createLabelMap({ 'en-gb': 'Newline' }) },
    { id: '\r', labels: createLabelMap({ 'en-gb': 'Carriage Return' }) },
    { id: '\r\n', labels: createLabelMap({ 'en-gb': 'Carriage Return/Newline' }) }
];
const getRecordDelimiter = (id: string, localeId = DEFAULT_LOCALE_CODE): RecordDelimiter => {
    const recordDelimiter = recordDelimiters.find((recordDelimiter) => recordDelimiter.id === id);
    if (recordDelimiter) {
        const localizedLabel = resolveLabel(recordDelimiter.labels, localeId);
        return { id: recordDelimiter.id, label: localizedLabel ?? recordDelimiter.id };
    }
    return { id, label: id };
};
const getRecordDelimiters = (localeId = DEFAULT_LOCALE_CODE): RecordDelimiter[] => {
    const items: RecordDelimiter[] = [];
    for (const recordDelimiter of recordDelimiters) {
        const localizedLabel = resolveLabel(recordDelimiter.labels, localeId);
        items.push({ id: recordDelimiter.id, label: localizedLabel ?? recordDelimiter.id });
    }
    // return items.sort((first, second) => first.label.localeCompare(second.label));
    return items;
};

// Utilities - Value Delimiter
interface ValueDelimiter {
    id: string;
    label: string;
}
interface ValueDelimiterConfig {
    id: string;
    labels: LocaleLabelMap;
}
const valueDelimiters: ValueDelimiterConfig[] = [
    { id: ':', labels: createLabelMap({ 'en-gb': 'Colon' }) },
    { id: ',', labels: createLabelMap({ 'en-gb': 'Comma' }) },
    { id: '!', labels: createLabelMap({ 'en-gb': 'Exclamation Mark' }) },
    // { id: '', label: { 'en-gb': 'Other' } }, // TODO: Maybe set this to a 'not printing' or special ascii character when there is a user supplied delimited, rather than ''?
    { id: '0x1E', labels: createLabelMap({ 'en-gb': 'Record Separator' }) },
    { id: ';', labels: createLabelMap({ 'en-gb': 'Semicolon' }) },
    { id: ' ', labels: createLabelMap({ 'en-gb': 'Space' }) },
    { id: '\t', labels: createLabelMap({ 'en-gb': 'Tab' }) },
    { id: '_', labels: createLabelMap({ 'en-gb': 'Underscore' }) },
    { id: '0x1F', labels: createLabelMap({ 'en-gb': 'Unit Separator' }) },
    { id: '|', labels: createLabelMap({ 'en-gb': 'Vertical Bar' }) }
];
const ORDERED_VALUE_DELIMITER_IDS: ValueDelimiterId[] = [',', ';', '\t', '|', ' ', ':', '_', '!', '0x1F', '0x1E']; // Ordered from estimated most common to least common.

const getValueDelimiter = (id: string, localeId = DEFAULT_LOCALE_CODE): ValueDelimiter => {
    const valueDelimiter = valueDelimiters.find((valueDelimiter) => valueDelimiter.id === id);
    if (valueDelimiter) {
        const localizedLabel = resolveLabel(valueDelimiter.labels, localeId);
        return { id: valueDelimiter.id, label: localizedLabel ?? valueDelimiter.id };
    }
    return { id, label: id };
};
const getValueDelimiters = (localeId = DEFAULT_LOCALE_CODE): ValueDelimiter[] => {
    const items: ValueDelimiter[] = [];
    for (const valueDelimiter of valueDelimiters) {
        const localizedLabel = resolveLabel(valueDelimiter.labels, localeId);
        items.push({ id: valueDelimiter.id, label: localizedLabel ?? valueDelimiter.id });
    }
    // return items.sort((first, second) => first.label.localeCompare(second.label));
    return items;
};

/**
 * Parsed value.
 */
type ParsedValue = bigint | boolean | number | string | null;

/**
 * Parse result.
 */
interface ParseResult {
    isValid: boolean;
    originalValue: string | null | undefined;
    parsedValue: ParsedValue;
    usageTypeId: UsageTypeId;
}

// Types/Interfaces - Basic
type DataFormatId = 'dtv' | 'e/e' | 'json' | 'spss' | 'xls' | 'xlsx' | 'xml';
type RecordDelimiterId = '\n' | '\r' | '\r\n'; // TODO: We need a special value here (NOT '') for when a user specified delimiter is implemented.
type ValueDelimiterId = '' | ':' | ',' | '!' | '0x1E' | ';' | ' ' | '\t' | '_' | '0x1F' | '|'; // TODO: We need a special value here (NOT '') for when a user specified delimiter is implemented.

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//#region Data...
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type DataTypeId = 'boolean' | 'numeric' | 'string' | 'temporal';

type NumericTypeId = 'bigint' | 'integer' | 'decimal';

type NumericUnitsId = 'currency' | 'percentage' | 'plain';

type StringTypeId = 'email' | 'ipv4' | 'ipv6' | 'ulid' | 'uuid' | 'url' | 'plain';

type TemporalTypeId = 'date' | 'dateTime' | 'time';

//#endregion ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Exports.
export { ORDERED_VALUE_DELIMITER_IDS };
export type { DataFormatId, DataViewContentAuditConfig, DataViewConfig, DataViewPreviewConfig, ParseResult, RecordDelimiterId, ValueDelimiterId };

export type { DataTypeId, NumericTypeId, NumericUnitsId, StringTypeId, TemporalTypeId };
