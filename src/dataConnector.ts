/**
 * @file datapos-engine-support/src/dataConnector.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */

// Engine Dependencies
import type { Connector } from './connector';
import type { SourceViewProperties } from './sourceView';
import type { CallbackProperties, Progress } from '.';
import type { ConnectionConfig, ConnectionDescription } from './connection';
import type { ConnectionEntriesPage, ConnectionEntriesRetrievalProperties, ConnectionEntry, ConnectionEntryPreview } from './connectionEntry';

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Data Connector
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface DataConnector extends Connector {
    abortController?: AbortController;
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

export interface DataConnectorConstructor {
    new (connectionConfig: ConnectionConfig): DataConnector;
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
