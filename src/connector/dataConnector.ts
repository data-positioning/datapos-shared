import type { SourceViewConfig } from '../sourceView';
import type { Callback, Options, Parser } from 'csv-parse';
import type { ConnectionConfig, ConnectionDescription, ListEntryDrilldownResult, ListEntryPreview } from '../connection';
import type { Connector, ConnectorCallbackData, ConnectorConfig } from '.';

export interface DataConnector extends Connector {
    abortController?: AbortController;
    readonly config: ConnectorConfig;
    readonly connectionConfig: ConnectionConfig;

    abort?(): void;
    authenticate?(accountId: string, windowCenterX: number, windowCenterY: number): Window;
    describe?(
        accountId: string | undefined,
        sessionAccessToken: string | undefined,
        connectionEntryId: string | undefined,
        callback: (data: ConnectorCallbackData) => void
    ): Promise<ConnectionDescription>;
    getCreateInterface?(): CreateInterface;
    getPreviewInterface?(): PreviewInterface;
    getReadInterface?(): ReadInterface;
    getWriteInterface?(): WriteInterface;
    listEntries?(settings: ListEntriesSettings): Promise<ListEntryDrilldownResult>;
}

// Create Interface
interface CreateInterface {
    connector: DataConnector;
}

// Preview Interface
export interface PreviewInterface {
    connector: DataConnector;
    previewEntry(
        connector: DataConnector,
        sourceViewConfig: SourceViewConfig,
        settings: PreviewInterfaceSettings,
        callback: (data: ConnectorCallbackData) => void
    ): Promise<ListEntryPreview>;
}
export interface PreviewInterfaceSettings {
    chunkSize?: number;
}

// Read Interface
export interface ReadInterface {
    connector: DataConnector;
    readEntry(
        connector: DataConnector,
        sourceViewConfig: SourceViewConfig,
        settings: ReadInterfaceSettings,
        csvParse: (options?: Options, callback?: Callback) => Parser,
        callback: (data: ConnectorCallbackData) => void
    ): Promise<void>;
}
export interface ReadInterfaceSettings {
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

// List Entries Settings
export interface ListEntriesSettings {
    folderPath: string;
    limit?: number;
    offset?: number;
    totalCount?: number;
}

// Write Interface
interface WriteInterface {
    connector: DataConnector;
}
