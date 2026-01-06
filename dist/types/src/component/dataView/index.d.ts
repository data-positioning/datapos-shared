import { FileTypeResult } from 'file-type';
import { Component, ComponentConfig } from '..';
import { ConnectionColumnConfig, ConnectionNodeConfig } from '../connector/connection';
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
type DataViewLocalisedConfig = Omit<DataViewConfig, 'label' | 'description'> & {
    label: string;
    description: string;
};
/**
 * Data view preview configuration.
 */
interface DataViewPreviewConfig {
    asAt: number;
    columnConfigs: ConnectionColumnConfig[];
    dataFormatId: DataFormatId | undefined;
    duration: number;
    encodingConfidenceLevel: number | undefined;
    encodingId: string | undefined;
    errorMessage?: string;
    fileType: FileTypeResult | undefined;
    hasHeaders: boolean | undefined;
    recordDelimiterId?: RecordDelimiterId;
    parsingRecords: ParsingRecord[];
    inferenceRecords: InferenceRecord[];
    size: number;
    text: string;
    valueDelimiterId?: ValueDelimiterId;
}
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
 * Data view relationships audit configuration.
 */
interface DataViewRelationshipsAuditConfig {
    placeholder?: string;
}
type ObjectRecord = (NamedValueRecord | StringValueRecord | ValueRecord)[];
type NamedValueRecord = Record<string, bigint | boolean | number | string | null>;
type StringValueRecord = (string | null)[];
type ValueRecord = (bigint | boolean | number | string | null)[];
type DataTypeId = 'boolean' | 'numeric' | 'string' | 'temporal' | 'unknown';
type NumericSubtypeId = 'bigint' | 'integer' | 'decimal';
type NumericSignId = 'negative' | 'zero' | 'positive';
type NumericUnitsId = 'currency' | 'percentage' | 'plain';
type StringSubtypeId = 'email' | 'ipv4' | 'ipv6' | 'ulid' | 'uuid' | 'url' | 'plain';
type TemporalSubtypeId = 'date' | 'dateTime' | 'time';
type ParsingRecord = ParsingResult[];
interface ParsingResult {
    value: string | null;
    valueWasQuoted: boolean;
}
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
    inputValue: string | null | undefined;
    inferredValue: null;
}
type DataFormatId = 'dpe' | 'dtv' | 'json' | 'spss' | 'xlsx' | 'xml';
type RecordDelimiterId = '\n' | '\r' | '\r\n';
type ValueDelimiterId = '' | ':' | ',' | '!' | '0x1E' | ';' | ' ' | '\t' | '_' | '0x1F' | '|';
/**
 *
 */
declare const ORDERED_VALUE_DELIMITER_IDS: ValueDelimiterId[];
export { ORDERED_VALUE_DELIMITER_IDS };
export type { DataViewInterface, DataViewConfig, DataViewContentAuditConfig, DataViewLocalisedConfig, DataViewPreviewConfig, DataFormatId, // Data format.
DataTypeId, // Data type.
NumericSubtypeId, // Numeric subtype and characteristics.
NumericSignId, NumericUnitsId, StringSubtypeId, // String subtype.
TemporalSubtypeId, // Temporal subtype.
ObjectRecord, NamedValueRecord, StringValueRecord, ValueRecord, RecordDelimiterId, ValueDelimiterId, ParsingRecord, ParsingResult, InferenceRecord, InferenceResult, BooleanInferenceResult, // Boolean.
NumericInferenceResult, // Numeric.
BigIntInferenceResult, NumberInferenceResult, StringInferenceResult, // String.
TemporalInferenceResult, // Temporal.
UnknownInferenceResult };
