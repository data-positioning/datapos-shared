/**
 * @file datapos-engine-support/src/dataConnector.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */
import type { SourceViewConfig } from '../sourceView';
import type { CallbackProperties, Progress } from '..';
import type { ConnectionConfig, ConnectionDescription } from '../connection';
import type { ConnectionEntryDrilldownResult, ConnectionEntryPreview } from '../connection/connectionEntry';
import type { Connector, ConnectorConfig } from '.';
import { type Callback, type Options, type Parser } from 'csv-parse';
export interface DataConnector extends Connector {
    abortController?: AbortController;
    readonly config: ConnectorConfig;
    readonly connectionConfig: ConnectionConfig;
    readonly version: string;
    abort?(): void;
    authenticate?(accountId: string, windowCenterX: number, windowCenterY: number): Window;
    describe?(accountId: string | undefined, sessionAccessToken: string | undefined, connectionEntryId: string | undefined, progressCallback: (progress: Progress) => void): Promise<ConnectionDescription>;
    getCreateInterface?(): DataConnectorCreateInterface;
    getPreviewInterface?(): DataConnectorPreviewInterface;
    getReadInterface?(): DataConnectorReadInterface;
    getWriteInterface?(): DataConnectorWriteInterface;
    retrieveEntries?(accountId: string | undefined, sessionAccessToken: string | undefined, settings: DataConnectorRetrieveEntriesSettings): Promise<ConnectionEntryDrilldownResult>;
}
export interface DataConnectorRetrieveEntriesSettings {
    folderPath: string;
    limit?: number;
    offset?: number;
    totalCount?: number;
    folderChildEntryCountCallback?: (folderChildEntryCount: CallbackProperties) => void;
}
interface DataConnectorCreateInterface {
    connector: DataConnector;
}
export interface DataConnectorPreviewInterface {
    connector: DataConnector;
    previewEntry(connector: DataConnector, accountId: string | undefined, sessionAccessToken: string | undefined, sourceViewConfig: SourceViewConfig, previewInterfaceSettings: DataConnectorPreviewInterfaceSettings): Promise<ConnectionEntryPreview>;
}
export interface DataConnectorPreviewInterfaceSettings {
    chunkSize?: number;
}
export interface DataConnectorReadInterface {
    connector: DataConnector;
    readEntry(connector: DataConnector, accountId: string | undefined, sessionAccessToken: string | undefined, sourceViewConfig: SourceViewConfig, readInterfaceSettings: DataConnectorReadInterfaceSettings, csvParse: (options?: Options, callback?: Callback) => Parser): Promise<void>;
}
export interface DataConnectorReadInterfaceSettings {
    chunk(records: DataConnectorRecord[]): void;
    chunkSize?: number;
    complete(fileInfo: DataConnectorFileInfo): void;
}
interface DataConnectorWriteInterface {
    connector: DataConnector;
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
export {};
