/**
 * @file datapos-engine-support/src/dataConnector.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */

// Dependencies - Engine
import type { SourceViewConfig } from './sourceView';
import type { CallbackProperties, Progress } from '.';
import type { ConnectionConfig, ConnectionDescription } from './connection';
import type { ConnectionEntriesPage, ConnectionEntryPreview } from './connectionEntry';
import type { Connector, ConnectorConfig } from './connector';

// Dependencies - Framework/Vendor
import { type Callback, type Options, type Parser } from 'csv-parse';

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Data Connector
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// interface DataConnectorConstructor {
//     new (connectionConfig: ConnectionConfig): DataConnector;
// }

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
        progressCallback: (progress: Progress) => void
    ): Promise<ConnectionDescription>;
    getCreateInterface?(): DataConnectorCreateInterface;
    getPreviewInterface?(): DataConnectorPreviewInterface;
    getReadInterface?(): DataConnectorReadInterface;
    getWriteInterface?(): DataConnectorWriteInterface;
    retrieveEntries?(accountId: string | undefined, sessionAccessToken: string | undefined, settings: DataConnectorRetrieveEntriesSettings): Promise<ConnectionEntriesPage>;
}

export interface DataConnectorRetrieveEntriesSettings {
    folderPath: string;
    limit?: number;
    offset?: number;
    totalCount?: number;
    folderChildEntryCountCallback?: (folderChildEntryCount: CallbackProperties) => void;
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
        accountId: string | undefined,
        sessionAccessToken: string | undefined,
        sourceViewConfig: SourceViewConfig,
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
        accountId: string | undefined,
        sessionAccessToken: string | undefined,
        sourceViewConfig: SourceViewConfig,
        readInterfaceSettings: DataConnectorReadInterfaceSettings,
        csvParse: (options?: Options, callback?: Callback) => Parser
    ): Promise<void>;
}

export interface DataConnectorReadInterfaceSettings {
    chunk(records: FieldData[]): void;
    chunkSize?: number;
    complete(info: FileInfo): void;
    error(error: unknown): void;
}

export interface FieldData {
    fieldInfos: FieldInfo[];
    fieldValues: string[];
}

export interface FieldInfo {
    isQuoted: boolean;
}

interface FileInfo {
    byteCount: number;
    commentLineCount: number;
    emptyLineCount: number;
    invalidFieldLengthCount: number;
    lineCount: number;
    recordCount: number;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Data Connector - Write Interface
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

interface DataConnectorWriteInterface {
    connector: DataConnector;
}
