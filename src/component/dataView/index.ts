/**
 * Data view.
 */
// Vendor dependencies.
import type { FileTypeResult } from 'file-type';

// Framework dependencies.
import type { Component, ComponentConfig } from '@/component';
import type { ConnectionNodeConfig, ObjectColumnConfig } from '@/component/connector/connection';
import { createLabelMap, DEFAULT_LOCALE_CODE, type LocaleLabelMap, resolveLabel } from '@/locale';

/**
 * Data view interface.
 */
type DataViewInterface = Component;

/**
 * Data view configuration.
 */
interface DataViewConfig extends ComponentConfig {
    connectionId: string | undefined;
    connectionNodeConfig: ConnectionNodeConfig | undefined;
    previewConfig: PreviewConfig | undefined;
    contentAuditConfig: ContentAuditConfig | undefined;
    relationshipsAuditConfig: RelationshipsAuditConfig | undefined;
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
interface PreviewConfig {
    asAt: number;
    commentMarkId?: string | undefined; // TODO: under review.
    commentMarkOtherCharSeq?: string | undefined; // TODO: under review.
    columnConfigs: ObjectColumnConfig[] | undefined;
    dataFormatId: DataFormatId;
    duration: number;
    encodingConfidenceLevel: number | undefined;
    encodingId: string | undefined;
    errorMessage?: string | undefined; // TODO: under review.
    fileType: FileTypeResult | undefined;
    hasHeaders: boolean | undefined;
    inferenceRecords: InferenceRecord[] | undefined;
    linesToSkipAtStart?: number | undefined; // TODO: under review.
    parsedRecords: ParsingRecord[] | undefined;
    quoteEscapeChar?: string | undefined; // TODO: under review.
    quoteMarkId?: string | undefined; // TODO: under review.
    quoteMarkOtherCharSeq?: string | undefined; // TODO: under review.
    recordDelimiterId: RecordDelimiterId | undefined;
    recordDelimiterOtherCharSeq?: RecordDelimiterId | undefined; // TODO: under review.
    size: number | undefined;
    skipEmptyLines?: boolean | undefined; // TODO: under review.
    skipLinesWithEmptyValues?: boolean | undefined; // TODO: under review.
    skipLinesWithErrors?: boolean | undefined; // TODO: under review.
    text: string | undefined;
    valueDelimiterId: ValueDelimiterId | undefined;
    valueDelimiterOtherCharSeq?: string | undefined; // TODO: under review.
    valueTrimMethodId?: string | undefined; // TODO: under review.
}

/**
 *
 */
type ValueTrimMethodId = 'both' | 'left' | 'right' | 'none';

//#endregion ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//#region Data view audit.
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Data view content audit configuration.
 */
interface ContentAuditConfig {
    asAt: number;
    columns: ObjectColumnConfig[];
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
interface RelationshipsAuditConfig {
    placeholder?: string;
}

//#endregion ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//#region Record and Value...
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type ObjectRecord = (NamedValueRecord | StringValueRecord)[];

type NamedValueRecord = Record<string, bigint | boolean | number | string | null>;

type StringValueRecord = (string | null)[];

type DataTypeId = 'boolean' | 'numeric' | 'string' | 'temporal' | 'unknown';

type DataSubtypeId = NumericSubtypeId | StringSubtypeId | TemporalSubtypeId;

type NumericSubtypeId = 'bigint' | 'integer' | 'decimal';

type NumericSignId = 'negative' | 'zero' | 'positive';

type NumericUnitsId = 'currency' | 'percentage' | 'plain';

type StringSubtypeId = 'email' | 'ipv4' | 'ipv6' | 'ulid' | 'uuid' | 'url' | 'plain';

type TemporalSubtypeId = 'date' | 'dateTime' | 'time';

//#endregion ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//#region Parsing...
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type ParsingRecord = ParsingResult[];

interface ParsingResult {
    value: string | null;
    valueWasQuoted: boolean;
}

//#endregion ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//#region Inference, cast, type...
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type InferenceRecord = InferenceResult[];

/**
 * Inferred value.
 */
type InferenceResult = BooleanInferenceResult | NumericInferenceResult | StringInferenceResult | TemporalInferenceResult | UnknownInferenceResult;

/**
 * Boolean inference result.
 */
interface BooleanInferenceResult {
    dataTypeId: 'boolean';
    dataSubtypeId: undefined;
    inputValue: boolean | string | undefined;
    inferredValue: boolean;
}

type NumericInferenceResult = BigIntInferenceResult | NumberInferenceResult;

interface BigIntInferenceResult {
    dataTypeId: 'numeric';
    dataSubtypeId: 'bigint';
    format: string;
    inputValue: bigint | string | undefined;
    inferredValue: bigint;
    currencySymbolId: string | undefined;
    decimalPlaces: number;
    signId: NumericSignId;
    unitsId: NumericUnitsId;
}

interface NumberInferenceResult {
    dataTypeId: 'numeric';
    dataSubtypeId: 'integer' | 'decimal';
    format: string;
    inputValue: number | string | undefined;
    inferredValue: number;
    currencySymbolId: string | undefined;
    decimalPlaces: number;
    signId: NumericSignId;
    unitsId: NumericUnitsId;
}

/**
 * String inference result.
 */
interface StringInferenceResult {
    dataTypeId: 'string';
    dataSubtypeId: StringSubtypeId;
    format: undefined;
    inputValue: string;
    inferredValue: string;
}

interface TemporalInferenceResult {
    dataTypeId: 'temporal';
    dataSubtypeId: TemporalSubtypeId;
    format: string;
    inputValue: string;
    inferredValue: Date;
}

interface UnknownInferenceResult {
    dataTypeId: 'unknown';
    dataSubtypeId: undefined;
    inputValue: string | null | undefined;
    inferredValue: null;
}

interface TypeParsedRecordsResult {
    columnConfigs: ObjectColumnConfig[];
    typedRecords: InferenceRecord[];
}

//#endregion ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//#region Data format identifier.
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type DataFormatId = 'dpe' | 'dtv' | 'json' | 'spss' | 'xlsx' | 'xml' | 'unknown';

interface ObjectDataFormat {
    id: DataFormatId;
    label: string;
}

/**
 * Data formats configuration.
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
//#region Record delimiter identifier.
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type RecordDelimiterId = '\n' | '\r' | '\r\n'; // TODO: We need a special value here (NOT '') for when a user specified delimiter is implemented.

interface ObjectRecordDelimiter {
    id: RecordDelimiterId;
    label: string;
}

/**
 * Record delimiters configuration.
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
//#region Value delimiter identifier.
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type ValueDelimiterId = '' | ':' | ',' | '!' | '0x1E' | ';' | ' ' | '\t' | '_' | '0x1F' | '|'; // TODO: We need a special value here (NOT '') for when a user specified delimiter is implemented.

interface ValueDelimiter {
    id: ValueDelimiterId;
    label: string;
}

/**
 * Value delimiters configuration.
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

// Exports.
export { ORDERED_VALUE_DELIMITER_IDS };
export type {
    // Data view interface and configuration.
    DataViewInterface,
    DataViewConfig,
    DataViewLocalisedConfig,
    PreviewConfig,
    ContentAuditConfig,
    RelationshipsAuditConfig,

    // Data format, types, subtypes and characteristics.
    DataFormatId, // Data format.
    DataTypeId, // Data type.
    DataSubtypeId,
    NumericSubtypeId, // Numeric subtype and characteristics.
    NumericSignId,
    NumericUnitsId,
    StringSubtypeId, // String subtype.
    TemporalSubtypeId, // Temporal subtype.

    // Input records and delimiters.
    ObjectRecord,
    NamedValueRecord,
    StringValueRecord,
    RecordDelimiterId,
    ValueDelimiterId,

    // Parsing record and result.
    ParsingRecord,
    ParsingResult,

    // Inference record and results.
    InferenceRecord,
    InferenceResult,
    BooleanInferenceResult, // Boolean.
    NumericInferenceResult, // Numeric.
    BigIntInferenceResult,
    NumberInferenceResult,
    StringInferenceResult, // String.
    TemporalInferenceResult, // Temporal.
    UnknownInferenceResult, // Unknown.
    TypeParsedRecordsResult
};
