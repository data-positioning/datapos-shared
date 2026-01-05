/**
 * Data view.
 */
// Vendor dependencies.
import type { FileTypeResult } from 'file-type';

// Framework dependencies.
import type { Component, ComponentConfig } from '@/component';
import type { ConnectionColumnConfig, ConnectionNodeConfig } from '@/component/connector/connection';
import { createLabelMap, DEFAULT_LOCALE_CODE, type LocaleLabelMap, resolveLabel } from '@/locale';

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

/**
 * Data view localised configuration.
 */
type DataViewLocalisedConfig = Omit<DataViewConfig, 'label' | 'description'> & { label: string; description: string };

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//#region Data view preview.
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

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

//#endregion ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//#region Data view audit.
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

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

//#endregion ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//#region Data view relationships.
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Data view relationships audit configuration.
 */
interface DataViewRelationshipsAuditConfig {
    placeholder?: string;
}

//#endregion ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//#region Object, Record and Value...
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type ObjectRecord = (NamedValueRecord | StringValueRecord | ValueRecord)[];
type NamedValueRecord = Record<string, bigint | boolean | number | string | null>;
type StringValueRecord = (string | null)[];
type ValueRecord = (bigint | boolean | number | string | null)[];

type ParseRecord = ParseField[];
interface ParseField {
    value: string | null;
    valueWasQuoted: boolean;
}

type ValueDataTypeId = 'boolean' | 'numeric' | 'string' | 'temporal' | 'unknown';

type NumericValueSignId = 'negative' | 'zero' | 'positive' | 'unknown';
type NumericValueSubtypeId = 'bigint' | 'integer' | 'decimal' | 'unknown';
type NumericValueUnitsId = 'currency' | 'percentage' | 'plain' | 'unknown';

type StringValueSubtypeId = 'email' | 'ipv4' | 'ipv6' | 'ulid' | 'uuid' | 'url' | 'plain' | 'unknown';

type TemporalValueSubtypeId = 'date' | 'dateTime' | 'time' | 'unknown';

//#endregion ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//#region Object data format...
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type DataFormatId = 'dpe' | 'dtv' | 'json' | 'spss' | 'xlsx' | 'xml';

interface ObjectDataFormat {
    id: DataFormatId;
    label: string;
}

/**
 * Object data formats configuration.
 */
const DATA_FORMATS_CONFIG: { id: DataFormatId; labels: LocaleLabelMap }[] = [
    { id: 'dpe', labels: createLabelMap({ 'en-gb': 'Data Positioning Events' }) },
    { id: 'dtv', labels: createLabelMap({ 'en-gb': 'Delimited Text' }) },
    { id: 'json', labels: createLabelMap({ 'en-gb': 'JSON' }) },
    { id: 'spss', labels: createLabelMap({ 'en-gb': 'SPSS' }) },
    { id: 'xlsx', labels: createLabelMap({ 'en-gb': 'XLSX' }) },
    { id: 'xml', labels: createLabelMap({ 'en-gb': 'XML' }) }
];

function getDataFormat(id: DataFormatId, localeId = DEFAULT_LOCALE_CODE): ObjectDataFormat {
    const dataFormat = DATA_FORMATS_CONFIG.find((dataFormat) => dataFormat.id === id);
    if (dataFormat) {
        const localizedLabel = resolveLabel(dataFormat.labels, localeId);
        return { id: dataFormat.id, label: localizedLabel ?? dataFormat.id };
    }
    return { id, label: id };
}

function getDataFormats(localeId = DEFAULT_LOCALE_CODE): ObjectDataFormat[] {
    const items: ObjectDataFormat[] = [];
    for (const dataFormat of DATA_FORMATS_CONFIG) {
        const localizedLabel = resolveLabel(dataFormat.labels, localeId);
        items.push({ id: dataFormat.id, label: localizedLabel ?? dataFormat.id });
    }
    return items.toSorted((first, second) => first.label.localeCompare(second.label));
}

//#endregion ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//#region Object record delimiter...
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type RecordDelimiterId = '\n' | '\r' | '\r\n'; // TODO: We need a special value here (NOT '') for when a user specified delimiter is implemented.

interface ObjectRecordDelimiter {
    id: RecordDelimiterId;
    label: string;
}

/**
 * Object record delimiters configuration.
 */
const RECORD_DELIMITERS_CONFIG: { id: RecordDelimiterId; labels: LocaleLabelMap }[] = [
    { id: '\n', labels: createLabelMap({ 'en-gb': 'Newline' }) },
    { id: '\r', labels: createLabelMap({ 'en-gb': 'Carriage Return' }) },
    { id: '\r\n', labels: createLabelMap({ 'en-gb': 'Carriage Return/Newline' }) }
];

const getRecordDelimiter = (id: RecordDelimiterId, localeId = DEFAULT_LOCALE_CODE): ObjectRecordDelimiter => {
    const recordDelimiter = RECORD_DELIMITERS_CONFIG.find((recordDelimiter) => recordDelimiter.id === id);
    if (recordDelimiter) {
        const localizedLabel = resolveLabel(recordDelimiter.labels, localeId);
        return { id: recordDelimiter.id, label: localizedLabel ?? recordDelimiter.id };
    }
    return { id, label: id };
};

const getRecordDelimiters = (localeId = DEFAULT_LOCALE_CODE): ObjectRecordDelimiter[] => {
    const items: ObjectRecordDelimiter[] = [];
    for (const recordDelimiter of RECORD_DELIMITERS_CONFIG) {
        const localizedLabel = resolveLabel(recordDelimiter.labels, localeId);
        items.push({ id: recordDelimiter.id, label: localizedLabel ?? recordDelimiter.id });
    }
    return items.toSorted((first, second) => first.label.localeCompare(second.label));
};

//#endregion ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//#region Record value delimiter...
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type ValueDelimiterId = '' | ':' | ',' | '!' | '0x1E' | ';' | ' ' | '\t' | '_' | '0x1F' | '|'; // TODO: We need a special value here (NOT '') for when a user specified delimiter is implemented.

interface ValueDelimiter {
    id: ValueDelimiterId;
    label: string;
}

/**
 * Record value delimiters configuration.
 */
const VALUE_DELIMITERS_CONFIG: { id: ValueDelimiterId; labels: LocaleLabelMap }[] = [
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

/**
 *
 */
const ORDERED_VALUE_DELIMITER_IDS: ValueDelimiterId[] = [',', ';', '\t', '|', ' ', ':', '_', '!', '0x1F', '0x1E']; // Ordered from estimated most common to least common.

const getValueDelimiter = (id: ValueDelimiterId, localeId = DEFAULT_LOCALE_CODE): ValueDelimiter => {
    const valueDelimiter = VALUE_DELIMITERS_CONFIG.find((valueDelimiter) => valueDelimiter.id === id);
    if (valueDelimiter) {
        const localizedLabel = resolveLabel(valueDelimiter.labels, localeId);
        return { id: valueDelimiter.id, label: localizedLabel ?? valueDelimiter.id };
    }
    return { id, label: id };
};
const getValueDelimiters = (localeId = DEFAULT_LOCALE_CODE): ValueDelimiter[] => {
    const items: ValueDelimiter[] = [];
    for (const valueDelimiter of VALUE_DELIMITERS_CONFIG) {
        const localizedLabel = resolveLabel(valueDelimiter.labels, localeId);
        items.push({ id: valueDelimiter.id, label: localizedLabel ?? valueDelimiter.id });
    }
    return items.toSorted((first, second) => first.label.localeCompare(second.label));
};

//#endregion ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// /**
//  * Parse result.
//  */
// interface ParseValueResult {
//     dataTypeId: RecordValueDataTypeId;
//     dataSubtypeId: NumericValueSubtypeId | StringValueSubtypeId | TemporalValueSubtypeId;
//     format: string | undefined;
//     inputValue: string;
//     parsedValue: ParsedValue;
//     isValid: boolean;
//     signId: NumericValueSignId;
// }

// /**
//  * Parsed value.
//  */
// type ParsedValue = bigint | boolean | number | string | null;

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//#region Record Value...
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

//#endregion ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Exports.
export { ORDERED_VALUE_DELIMITER_IDS };
export type {
    DataViewConfig,
    DataViewContentAuditConfig,
    DataViewInterface,
    DataViewLocalisedConfig,
    DataViewPreviewConfig,
    DataFormatId,
    NamedValueRecord,
    NumericValueSignId,
    NumericValueSubtypeId,
    NumericValueUnitsId,
    ObjectRecord,
    ParseField,
    ParseRecord,
    RecordDelimiterId,
    StringValueRecord,
    StringValueSubtypeId,
    TemporalValueSubtypeId,
    ValueDataTypeId,
    ValueDelimiterId,
    ValueRecord
};
