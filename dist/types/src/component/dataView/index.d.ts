import { Component, ComponentConfig } from '..';
import { ConnectionColumnConfig, ConnectionNodeConfig } from '../connector/connection';
export type DataView = Component;
export interface DataViewConfig extends ComponentConfig {
    connectionId?: string;
    connectionNodeConfig?: ConnectionNodeConfig;
    previewConfig?: DataViewPreviewConfig;
    contentAuditConfig?: DataViewContentAuditConfig;
    relationshipsAuditConfig?: DataViewRelationshipsAuditConfig;
}
export type DataViewLocalisedConfig = Omit<DataViewConfig, 'label' | 'description'> & {
    label: string;
    description: string;
};
export interface DataViewContentAuditConfig {
    asAt: number;
    columns: ConnectionColumnConfig[];
    commentLineCount: number;
    emptyLineCount: number;
    invalidFieldLengthCount: number;
    duration: number;
    lineCount: number;
    recordCount: number;
}
export interface DataViewPreviewConfig {
    asAt: number;
    columnConfigs: ConnectionColumnConfig[];
    dataFormatId: DataFormatId;
    duration: number;
    encodingConfidenceLevel: number | undefined;
    encodingId?: string;
    errorMessage?: string;
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
export interface DataViewRelationshipsAuditConfig {
    placeholder?: string;
}
export interface EncodingConfig {
    id: string;
    groupLabel: string;
    label: string;
    isDetectable: boolean;
    isDecodable: boolean;
}
interface DataFormat {
    id: string;
    label: string;
}
export declare const getDataFormat: (id: string, localeId?: import('../../index').LocaleCode) => DataFormat;
export declare const getDataFormats: (localeId?: import('../../index').LocaleCode) => DataFormat[];
interface RecordDelimiter {
    id: string;
    label: string;
}
export declare const getRecordDelimiter: (id: string, localeId?: import('../../index').LocaleCode) => RecordDelimiter;
export declare const getRecordDelimiters: (localeId?: import('../../index').LocaleCode) => RecordDelimiter[];
interface ValueDelimiter {
    id: string;
    label: string;
}
export declare const getValueDelimiter: (id: string, localeId?: import('../../index').LocaleCode) => ValueDelimiter;
export declare const getValueDelimiters: (localeId?: import('../../index').LocaleCode) => ValueDelimiter[];
export type ParsedValue = bigint | boolean | number | string | null;
export type DataFormatId = 'dtv' | 'e/e' | 'jsonArray' | 'spss' | 'xls' | 'xlsx' | 'xml';
export type RecordDelimiterId = '\n' | '\r' | '\r\n';
export type ValueDelimiterId = '' | ':' | ',' | '!' | '0x1E' | ';' | ' ' | '\t' | '_' | '0x1F' | '|';
export {};
