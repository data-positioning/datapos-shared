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
    dataFormatId: ObjectDataFormatId | undefined;
    duration: number;
    encodingConfidenceLevel: number | undefined;
    encodingId: string | undefined;
    errorMessage?: string;
    fileType: FileTypeResult | undefined;
    hasHeaders: boolean | undefined;
    recordDelimiterId?: ObjectRecordDelimiterId;
    records: ParseResult[][];
    size: number;
    text: string;
    valueDelimiterId?: RecordValueDelimiterId;
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
type ObjectDataFormatId = 'dpe' | 'dtv' | 'json' | 'spss' | 'xlsx' | 'xml';
type ObjectRecordDelimiterId = '\n' | '\r' | '\r\n';
type RecordValueDelimiterId = '' | ':' | ',' | '!' | '0x1E' | ';' | ' ' | '\t' | '_' | '0x1F' | '|';
/**
 *
 */
declare const ORDERED_VALUE_DELIMITER_IDS: RecordValueDelimiterId[];
/**
 * Parse result.
 */
interface ParseResult {
    isValid: boolean;
    originalValue: string | null | undefined;
    parsedValue: ParsedValue;
    valueDataTypeId: ValueDataTypeId;
}
/**
 * Parsed value.
 */
type ParsedValue = bigint | boolean | number | string | null;
type ValueDataTypeId = 'boolean' | 'numeric' | 'string' | 'temporal' | 'unknown';
type ValueNumericSignId = 'negative' | 'zero' | 'positive' | 'unknown';
type ValueNumericTypeId = 'bigint' | 'integer' | 'decimal' | 'unknown';
type ValueNumericUnitsId = 'currency' | 'percentage' | 'plain' | 'unknown';
type ValueStringTypeId = 'email' | 'ipv4' | 'ipv6' | 'ulid' | 'uuid' | 'url' | 'plain' | 'unknown';
type ValueTemporalTypeId = 'date' | 'dateTime' | 'time' | 'unknown';
export { ORDERED_VALUE_DELIMITER_IDS };
export type { DataViewConfig, DataViewContentAuditConfig, DataViewInterface, DataViewLocalisedConfig, DataViewPreviewConfig, ObjectDataFormatId, ObjectRecordDelimiterId, ParseResult, RecordValueDelimiterId, ValueDataTypeId, ValueNumericSignId, ValueNumericTypeId, ValueNumericUnitsId, ValueStringTypeId, ValueTemporalTypeId };
