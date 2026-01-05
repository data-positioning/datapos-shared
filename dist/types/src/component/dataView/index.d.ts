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
    records: ParseResult[][];
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
type DataFormatId = 'dpe' | 'dtv' | 'json' | 'spss' | 'xlsx' | 'xml';
type RecordDelimiterId = '\n' | '\r' | '\r\n';
type ValueDelimiterId = '' | ':' | ',' | '!' | '0x1E' | ';' | ' ' | '\t' | '_' | '0x1F' | '|';
/**
 *
 */
declare const ORDERED_VALUE_DELIMITER_IDS: ValueDelimiterId[];
export { ORDERED_VALUE_DELIMITER_IDS };
export type { DataViewConfig, DataViewContentAuditConfig, DataViewInterface, DataViewLocalisedConfig, DataViewPreviewConfig, DataFormatId, NamedValueRecord, NumericValueSignId, NumericValueSubtypeId, NumericValueUnitsId, ObjectRecord, ParseField, ParseRecord, RecordDelimiterId, StringValueRecord, StringValueSubtypeId, TemporalValueSubtypeId, ValueDataTypeId, ValueDelimiterId, ValueRecord };
