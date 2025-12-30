import { FileTypeResult } from 'file-type';
import { ComponentConfig } from '..';
import { ConnectionColumnConfig, ConnectionNodeConfig, UsageTypeId } from '../connector/connection';
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
    columnConfigs: ConnectionColumnConfig[];
    dataFormatId: DataFormatId | undefined;
    duration: number;
    encodingConfidenceLevel: number | undefined;
    encodingId: string | undefined;
    errorMessage?: string;
    fileType: FileTypeResult | undefined;
    hasHeaders: boolean | undefined;
    recordDelimiterId?: RecordDelimiterId;
    records: {
        isValid: boolean;
        value: ParsedValue | undefined;
    }[][];
    size: number;
    text: string;
    valueDelimiterId?: ValueDelimiterId;
}
/**
 * Data view relationships audit configuration.
 */
interface DataViewRelationshipsAuditConfig {
    placeholder?: string;
}
declare const ORDERED_VALUE_DELIMITER_IDS: ValueDelimiterId[];
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
type DataFormatId = 'dtv' | 'e/e' | 'json' | 'spss' | 'xls' | 'xlsx' | 'xml';
type RecordDelimiterId = '\n' | '\r' | '\r\n';
type ValueDelimiterId = '' | ':' | ',' | '!' | '0x1E' | ';' | ' ' | '\t' | '_' | '0x1F' | '|';
export { ORDERED_VALUE_DELIMITER_IDS };
export type { DataViewContentAuditConfig, DataViewConfig, DataViewPreviewConfig, ParseResult, ParsedValue, ValueDelimiterId };
