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
    records: InferredResult[][];
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
type ValueDataTypeId = 'boolean' | 'numeric' | 'string' | 'temporal' | 'unknown';
type NumericValueSignId = 'negative' | 'zero' | 'positive';
type NumericValueSubtypeId = 'bigint' | 'integer' | 'decimal';
type NumericValueUnitsId = 'currency' | 'percentage' | 'plain';
type StringValueSubtypeId = 'email' | 'ipv4' | 'ipv6' | 'ulid' | 'uuid' | 'url' | 'plain';
type TemporalValueSubtypeId = 'date' | 'dateTime' | 'time';
type ParseRecord = ParseField[];
interface ParseField {
    value: string | null;
    valueWasQuoted: boolean;
}
/**
 * Inferred result.
 */
type InferredResult = BooleanInferenceResult | NumericInferenceResult | StringInferenceResult | TemporalInferenceResult | UnknownInferenceResult;
/**
 * Boolean inference result.
 */
interface BooleanInferenceResult {
    dataTypeId: 'boolean';
    inputValue: boolean | string | undefined;
    parsedValue: boolean;
}
type NumericInferenceResult = BigIntInferenceResult | NumberInferenceResult;
interface BigIntInferenceResult {
    dataTypeId: 'numeric';
    dataSubtypeId: 'bigint';
    format: string;
    inputValue: bigint | string | undefined;
    parsedValue: bigint;
    currencySymbolId: string | undefined;
    decimalPlaces: number;
    signId: NumericValueSignId;
    unitsId: NumericValueUnitsId;
}
interface NumberInferenceResult {
    dataTypeId: 'numeric';
    dataSubtypeId: 'integer' | 'decimal';
    format: string;
    inputValue: number | string | undefined;
    parsedValue: number;
    currencySymbolId: string | undefined;
    decimalPlaces: number;
    signId: NumericValueSignId;
    unitsId: NumericValueUnitsId;
}
/**
 * String inference result.
 */
interface StringInferenceResult {
    dataTypeId: 'string';
    dataSubtypeId: StringValueSubtypeId;
    format: undefined;
    inputValue: string;
    parsedValue: string;
}
interface TemporalInferenceResult {
    dataTypeId: 'temporal';
    dataSubtypeId: TemporalValueSubtypeId;
    format: string;
    inputValue: string;
    parsedValue: Date;
}
interface UnknownInferenceResult {
    dataTypeId: 'unknown';
    inputValue: string | null | undefined;
    parsedValue: null;
}
/**
 * Schema configuration.
 */
interface SchemaConfig {
    columnConfigs: ConnectionColumnConfig[];
    recordDelimiterId: RecordDelimiterId;
    records: InferredResult[][];
    valueDelimiterId: ValueDelimiterId;
}
type DataFormatId = 'dpe' | 'dtv' | 'json' | 'spss' | 'xlsx' | 'xml';
type RecordDelimiterId = '\n' | '\r' | '\r\n';
type ValueDelimiterId = '' | ':' | ',' | '!' | '0x1E' | ';' | ' ' | '\t' | '_' | '0x1F' | '|';
/**
 *
 */
declare const ORDERED_VALUE_DELIMITER_IDS: ValueDelimiterId[];
export { ORDERED_VALUE_DELIMITER_IDS };
export type { BigIntInferenceResult, BooleanInferenceResult, DataViewConfig, DataViewContentAuditConfig, DataViewInterface, DataViewLocalisedConfig, DataViewPreviewConfig, DataFormatId, InferredResult, NamedValueRecord, NumberInferenceResult, NumericInferenceResult, NumericValueSignId, NumericValueSubtypeId, NumericValueUnitsId, ObjectRecord, ParseField, ParseRecord, RecordDelimiterId, SchemaConfig, StringInferenceResult, StringValueRecord, StringValueSubtypeId, TemporalInferenceResult, TemporalValueSubtypeId, UnknownInferenceResult, ValueDataTypeId, ValueDelimiterId, ValueRecord };
