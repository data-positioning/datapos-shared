import type { SourceViewConfig } from '../sourceView';
import type { Callback, Options, Parser } from 'csv-parse';
import type { ConnectionConfig, ConnectionDescription, ConnectionEntryDrilldownResult, ConnectionEntryPreview } from '../connection';
import type { Connector, ConnectorCallbackData, ConnectorConfig } from '.';

export interface DataConnector extends Connector {
    abortController?: AbortController;
    readonly config: ConnectorConfig;
    readonly connectionConfig: ConnectionConfig;
    readonly version: string;

    abort?(): void;
    authenticate?(accountId: string, windowCenterX: number, windowCenterY: number): Window;
    describe?(
        accountId: string | undefined,
        sessionAccessToken: string | undefined,
        connectionEntryId: string | undefined,
        callback: (data: ConnectorCallbackData) => void
    ): Promise<ConnectionDescription>;
    getCreateInterface?(): DataConnectorCreateInterface;
    getPreviewInterface?(): DataConnectorPreviewInterface;
    getReadInterface?(): DataConnectorReadInterface;
    getWriteInterface?(): DataConnectorWriteInterface;
    retrieveConnectionEntries?(
        accountId: string | undefined,
        sessionAccessToken: string | undefined,
        settings: DataConnectorRetrieveEntriesSettings,
        callback: (data: ConnectorCallbackData) => void
    ): Promise<ConnectionEntryDrilldownResult>;
}

// Create Interface
interface DataConnectorCreateInterface {
    connector: DataConnector;
}

// Preview Interface
export interface DataConnectorPreviewInterface {
    connector: DataConnector;
    previewConnectionEntry(
        connector: DataConnector,
        accountId: string | undefined,
        sessionAccessToken: string | undefined,
        sourceViewConfig: SourceViewConfig,
        previewInterfaceSettings: DataConnectorPreviewInterfaceSettings,
        callback: (data: ConnectorCallbackData) => void
    ): Promise<ConnectionEntryPreview>;
}
export interface DataConnectorPreviewInterfaceSettings {
    chunkSize?: number;
}

// Read Interface
export interface DataConnectorReadInterface {
    connector: DataConnector;
    readConnectionEntry(
        connector: DataConnector,
        accountId: string | undefined,
        sessionAccessToken: string | undefined,
        sourceViewConfig: SourceViewConfig,
        readInterfaceSettings: DataConnectorReadInterfaceSettings,
        csvParse: (options?: Options, callback?: Callback) => Parser,
        callback: (data: ConnectorCallbackData) => void
    ): Promise<void>;
}
export interface DataConnectorReadInterfaceSettings {
    chunk(records: DataConnectorRecord[]): void;
    chunkSize?: number;
    complete(fileInfo: DataConnectorFileInfo): void;
}
export interface DataConnectorFileInfo {
    byteCount: number;
    commentLineCount: number;
    emptyLineCount: number;
    invalidFieldLengthCount: number;
    lineCount: number;
    recordCount: number;
}
export interface DataConnectorRecord {
    fieldInfos: DataConnectorFieldInfo[];
    fieldValues: string[];
}
export interface DataConnectorFieldInfo {
    isQuoted: boolean;
}

// Retrieve Entries Settings
export interface DataConnectorRetrieveEntriesSettings {
    folderPath: string;
    limit?: number;
    offset?: number;
    totalCount?: number;
}

// Write Interface
interface DataConnectorWriteInterface {
    connector: DataConnector;
}
