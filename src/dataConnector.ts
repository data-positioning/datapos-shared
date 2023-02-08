/**
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 * @file datapos-engine-support/src/dataConnector.ts
 * @license ISC
 */

// Engine Dependencies
import type { Progress, CallbackProperties } from '.';
import type { ConnectionEntriesPage, ConnectionEntriesRetrievalProperties, ConnectionItem } from './connection';
import type { ConnectionEntry, ConnectionEntryPreview } from './connectionEntry';
import { DataUsageTypeId } from './connectionEntry';
import type { Connector } from './connector';
import type { SourceViewProperties } from './sourceView';

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Data Connector
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface DataConnectorConstructor {
    new (connectionItem: ConnectionItem): DataConnector;
}

export interface DataConnector extends Connector {
    abortController?: AbortController;
    readonly connectionItem: ConnectionItem;
    abort?(): void;
    authenticate?(accountId: string, windowCenterX: number, windowCenterY: number): Window;
    describe?(
        accountId: string | undefined,
        sessionAccessToken: string | undefined,
        connectionEntryId: string | undefined,
        progressCallback: (progress: Progress) => void
    ): Promise<ConnectionDescription>;
    getCreateInterface?(): DataConnectorCreateInterface;
    getPreviewInterface?(): DataConnectorPreviewInterface;
    getReadInterface?(): DataConnectorReadInterface;
    getWriteInterface?(): DataConnectorWriteInterface;
    retrieveEntries?(
        accountId: string | undefined,
        sessionAccessToken: string | undefined,
        parentConnectionEntry: ConnectionEntry,
        properties: ConnectionEntriesRetrievalProperties,
        folderChildEntryCountCallback?: (folderChildEntryCount: CallbackProperties) => void
    ): Promise<ConnectionEntriesPage>;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Data Connector - Describe
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export type ConnectionDescription = { fileEntries: Record<string, FileEntry>; objectTypes: Record<string, ObjectType> };

export interface FileEntry {
    description?: string;
    fields: Record<string, Field>;
    folderIds: string[];
    label?: string;
    summary?: string;
}

export interface ObjectType {
    description?: string;
    fields: Record<string, Field>;
    folderIds: string[];
    label?: string;
    summary?: string;
}

interface Field {
    dataType: DataType;
    isIgnored: boolean;
    label: string;
    maxLength?: number;
}

export interface DataType {
    maximumLength?: number;
    objectName?: string;
    storageTypeId: DataStorageTypeId;
    usageTypeId: DataUsageTypeId;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Data Connector - Create Interface
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

interface DataConnectorCreateInterface {
    connector: DataConnector;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Data Connector - Preview Interface
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface DataConnectorPreviewInterface {
    connector: DataConnector;
    previewFileEntry(
        connector: DataConnector,
        sourceViewProperties: SourceViewProperties,
        accountId: string | undefined,
        sessionAccessToken: string | undefined,
        previewInterfaceSettings: DataConnectorPreviewInterfaceSettings
    ): Promise<ConnectionEntryPreview>;
}

export interface DataConnectorPreviewInterfaceSettings {
    chunkSize?: number;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Data Connector - Read Interface
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface DataConnectorReadInterface {
    connector: DataConnector;
    readFileEntry(
        connector: DataConnector,
        sourceViewProperties: SourceViewProperties,
        accountId: string | undefined,
        sessionAccessToken: string | undefined,
        readInterfaceSettings: DataConnectorReadInterfaceSettings,
        csvParse: typeof import('csv-parse/browser/esm')
    ): Promise<void>;
}

export interface DataConnectorReadInterfaceSettings {
    chunk(records: { fieldInfos: FieldInfos[]; fieldValues: string[] }[]): void;
    chunkSize?: number;
    complete(info: FileInfo): void;
    error(error: unknown): void;
}

export interface FieldInfos {
    isQuoted: boolean;
}

interface FileInfo {
    commentLineCount: number;
    emptyLineCount: number;
    lineCount: number;
    recordCount: number;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Data Connector - Write Interface
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface DataConnectorWriteInterface {
    connector: DataConnector;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Data Connector - Enumerations
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export enum DataStorageTypeId {
    Binary = 'binary',
    Boolean = 'boolean',
    Byte = 'byte',
    Date = 'date',
    DateTime = 'dateTime',
    DateTimeOffset = 'dateTimeOffset',
    Decimal = 'decimal',
    Double = 'double',
    Int8 = 'int8',
    Int16 = 'int16',
    Int32 = 'int32',
    Int64 = 'int64',
    Object = 'object',
    Single = 'single',
    String = 'string',
    Time = 'time',
    Unknown = 'unknown'
}

export const convertODataTypeToDataType = (type: string, maximumLength?: number): DataType => {
    // See: https://www.odata.org/documentation/odata-version-2-0/overview/
    switch (type) {
        case 'Edm.Binary':
            return { storageTypeId: DataStorageTypeId.Binary, usageTypeId: DataUsageTypeId.Binary };
        case 'Edm.Boolean':
            return { storageTypeId: DataStorageTypeId.Boolean, usageTypeId: DataUsageTypeId.Boolean };
        case 'Edm.Byte':
            return { storageTypeId: DataStorageTypeId.Byte, usageTypeId: DataUsageTypeId.WholeNumber };
        case 'Edm.DateTime':
            return { storageTypeId: DataStorageTypeId.DateTime, usageTypeId: DataUsageTypeId.DateTime };
        case 'Edm.DateTimeOffset':
            return { storageTypeId: DataStorageTypeId.DateTimeOffset, usageTypeId: DataUsageTypeId.DateTimeOffset };
        case 'Edm.Decimal':
            return { storageTypeId: DataStorageTypeId.Decimal, usageTypeId: DataUsageTypeId.DecimalNumber };
        case 'Edm.Double':
            return { storageTypeId: DataStorageTypeId.Double, usageTypeId: DataUsageTypeId.DecimalNumber };
        case 'Edm.Guid':
            return { storageTypeId: DataStorageTypeId.String, usageTypeId: DataUsageTypeId.String };
        case 'Edm.Int16':
            return { storageTypeId: DataStorageTypeId.Int16, usageTypeId: DataUsageTypeId.WholeNumber };
        case 'Edm.Int32':
            return { storageTypeId: DataStorageTypeId.Int32, usageTypeId: DataUsageTypeId.WholeNumber };
        case 'Edm.Int64':
            return { storageTypeId: DataStorageTypeId.Int64, usageTypeId: DataUsageTypeId.WholeNumber };
        case 'Edm.SByte':
            return { storageTypeId: DataStorageTypeId.Int8, usageTypeId: DataUsageTypeId.WholeNumber };
        case 'Edm.Single':
            return { storageTypeId: DataStorageTypeId.Single, usageTypeId: DataUsageTypeId.DecimalNumber };
        case 'Edm.String':
            return { maximumLength, storageTypeId: DataStorageTypeId.String, usageTypeId: DataUsageTypeId.String };
        case 'Edm.Time':
            return { storageTypeId: DataStorageTypeId.Time, usageTypeId: DataUsageTypeId.Time };
        default:
            return { storageTypeId: DataStorageTypeId.Unknown, usageTypeId: DataUsageTypeId.Unknown };
    }
};
