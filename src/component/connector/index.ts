/**
 * Connector composables, constants, errors, types/interfaces and utilities.
 */

/** Vendor dependencies. */
import type { InferOutput } from 'valibot';

/** Framework dependencies. */
import type { Component } from '@/component';
import type { connectorConfigSchema } from '~/src/component/connector/connectorConfig.schema';
import type { ToolConfig } from '@/component/tool';
import type { ValueDelimiterId } from '@/component/dataView';
import type { ConnectionConfig, ConnectionDescription, ConnectionNodeConfig } from '~/src/component/connector/connection';
import { DEFAULT_LOCALE_CODE, type LocalisedString } from '@/index';

/** Authentication method identifiers supported by a connector implementation. */
// type AuthMethodId = InferOutput<typeof connectorAuthMethodIdSchema>;

/** Connector implementation. */
// type ConnectorImplementation = InferOutput<typeof connectorImplementationSchema>;

/** Category identifiers used for grouping and filtering connectors. */
// type ConnectorCategoryId = InferOutput<typeof connectorCategoryIdSchema>;

/** Operation names a connector may support. */
// type ConnectorOperationName = InferOutput<typeof connectorOperationNameSchema>;

/** Connector data pipeline usage identifiers. */
// type ConnectorUsageId = InferOutput<typeof connectorUsageIdSchema>;

/** Connector configuration. */
type ConnectorConfig = InferOutput<typeof connectorConfigSchema>;
type ConnectorLocalisedConfig = Omit<ConnectorConfig, 'label' | 'description'> & { label: string; description: string };

/** Connector runtime interface. */
interface ConnectorInterface extends Component {
    abortController: AbortController | undefined;
    readonly config: ConnectorConfig;
    readonly connectionConfig: ConnectionConfig;
    readonly toolConfigs: ToolConfig[];
    abortOperation?(connector: ConnectorInterface): void; // Abort the active long running operation for a specified connection.
    authenticateConnection?(accountId: string, windowCenterX: number, windowCenterY: number): Window; // Authenticate a specified connection.
    createObject?(connector: ConnectorInterface, settings: CreateSettings): Promise<void>; // Create an object for a specified connection.
    describeConnection?(connector: ConnectorInterface, settings: DescribeSettings): Promise<DescribeResult>; // Describe a specified connection.
    dropObject?(connector: ConnectorInterface, settings: DropSettings): Promise<void>; // Drop (delete) an object for a specified connection.
    findObject?(connector: ConnectorInterface, settings: FindObjectSettings): Promise<string | undefined>; // Find an object for a specified connection.
    getReadableStream?(connector: ConnectorInterface, settings: GetReadableStreamSettings): Promise<ReadableStream<Uint8Array<ArrayBuffer>>>; // Get a reader that can retrieve all records from an object for a specified connection.
    getRecord?(connector: ConnectorInterface, settings: GetRecordSettings): Promise<GetRecordResult>; // Get a record for an object for a specified connection.
    listNodes?(connector: ConnectorInterface, settings: ListSettings): Promise<ListResult>; // List nodes in a folder for a specified connection.
    previewObject?(connector: ConnectorInterface, settings: PreviewSettings): Promise<PreviewResult>; // Preview an object for a specified connection.
    removeRecords?(connector: ConnectorInterface, settings: RemoveSettings): Promise<void>; // Remove one or more records from an object for a specified connection.
    retrieveChunks?(
        connector: ConnectorInterface,
        settings: RetrieveChunksSettings,
        chunk: (records: (string[] | Record<string, unknown>)[]) => void,
        complete: (result: RetrieveChunksSummary) => void
    ): Promise<void>; // Retrieve all chunks from an object for a specified connection.
    retrieveRecords?(
        connector: ConnectorInterface,
        settings: RetrieveRecordsSettings,
        chunk: (records: (string[] | Record<string, unknown>)[]) => void,
        complete: (result: RetrieveRecordsSummary) => void
    ): Promise<void>; // Retrieve all records from an object for a specified connection.
    upsertRecords?(connector: ConnectorInterface, settings: UpsertSettings): Promise<void>; // Upsert one or more records into an object for a specified connection.
}

/** Connector operation settings. */
interface ConnectorOperationSettings {
    accountId?: string;
    appCheckToken?: string;
    sessionAccessToken?: string;
}

/** Get find object settings. */
interface FindObjectSettings extends ConnectorOperationSettings {
    containerName?: string;
    objectName: string;
}

/** Get readable stream settings. */
interface GetReadableStreamSettings extends ConnectorOperationSettings {
    id: string;
    path: string;
}

//#region Settings & Results

// Types/Interfaces/Operations - Create (object).
interface CreateSettings extends ConnectorOperationSettings {
    accountId?: string;
    path: string;
    structure: string;
}

// Types/Interfaces/Operations - Describe (Connection).
type DescribeSettings = ConnectorOperationSettings;
interface DescribeResult {
    description: ConnectionDescription;
}

// Types/Interfaces/Operations - Drop (object).
interface DropSettings extends ConnectorOperationSettings {
    path: string;
}

// Types/Interfaces/Operations - Get record (object).
interface GetRecordSettings extends ConnectorOperationSettings {
    id: string;
    path: string;
}
interface GetRecordResult {
    record?: string[] | Record<string, unknown>;
}

// Types/Interfaces/Operations - List (nodes).
interface ListSettings extends ConnectorOperationSettings {
    folderPath: string;
    limit?: number;
    offset?: number;
    totalCount?: number;
}
interface ListResult {
    cursor: string | number | undefined;
    connectionNodeConfigs: ConnectionNodeConfig[];
    isMore: boolean;
    totalCount: number;
}

// Types/Interfaces/Operations - Preview (object).
interface PreviewSettings extends ConnectorOperationSettings {
    chunkSize?: number;
    extension?: string;
    path: string;
}
interface PreviewResult {
    data: Record<string, unknown>[] | Uint8Array;
    typeId: 'jsonArray' | 'uint8Array';
}

// Types/Interfaces/Operations - Remove (records).
interface RemoveSettings extends ConnectorOperationSettings {
    keys: string[];
    path: string;
}

// Types/Interfaces/Operations - Retrieve (records).
interface RetrieveChunksSettings extends ConnectorOperationSettings {
    chunkSize?: number;
    encodingId: string;
    path: string;
    valueDelimiterId: ValueDelimiterId;
}
interface RetrieveRecordsSettings extends ConnectorOperationSettings {
    chunkSize?: number;
    encodingId: string;
    path: string;
    valueDelimiterId: ValueDelimiterId;
}

interface RetrieveChunksResult {
    records: (string[] | Record<string, unknown>)[];
}
interface RetrieveRecordsResult {
    records: (string[] | Record<string, unknown>)[];
}
interface RetrieveChunksSummary {
    byteCount: number;
    commentLineCount: number;
    emptyLineCount: number;
    invalidFieldLengthCount: number;
    lineCount: number;
    recordCount: number;
}
interface RetrieveRecordsSummary {
    byteCount: number;
    commentLineCount: number;
    emptyLineCount: number;
    invalidFieldLengthCount: number;
    lineCount: number;
    recordCount: number;
}

// Types/Interfaces/Operations - Upsert (records).
interface UpsertSettings extends ConnectorOperationSettings {
    records: Record<string, unknown>[];
    path: string;
}

//#endregion

// #region Connector Category

/** Types/Interfaces/Operations - Connector category. */
interface ConnectorCategory {
    id: string;
    label: string;
}

type LocaleLabelMap = ReadonlyMap<string, string>;

const createLocaleLabelMap = (labels: Partial<LocalisedString>): LocaleLabelMap => {
    const entries = Object.entries(labels).filter((entry): entry is [string, string] => typeof entry[1] === 'string');
    return new Map(entries);
};

const connectorCategories: { id: string; labels: LocaleLabelMap }[] = [
    { id: 'application', labels: createLocaleLabelMap({ 'en-gb': 'Application' }) },
    { id: 'curatedDataset', labels: createLocaleLabelMap({ 'en-gb': 'Curated Dataset' }) },
    { id: 'database', labels: createLocaleLabelMap({ 'en-gb': 'Database' }) },
    { id: 'fileStore', labels: createLocaleLabelMap({ 'en-gb': 'File Store' }) }
];

const resolveLocaleLabel = (labels: LocaleLabelMap, localeId: string, fallbackLocaleId = DEFAULT_LOCALE_CODE): string | undefined => {
    const localizedLabel = labels.get(localeId);
    if (localizedLabel !== undefined) return localizedLabel;
    if (fallbackLocaleId === localeId) return undefined;
    return labels.get(fallbackLocaleId);
};

const getConnectorCategory = (id: string, localeId = DEFAULT_LOCALE_CODE): ConnectorCategory => {
    const connectorCategory = connectorCategories.find((connectorCategory) => connectorCategory.id === id);
    if (connectorCategory) {
        const resolvedLabel = resolveLocaleLabel(connectorCategory.labels, localeId);
        return { id: connectorCategory.id, label: resolvedLabel ?? connectorCategory.id };
    }
    return { id, label: id };
};

//#endregion

/** Exports. */
export { getConnectorCategory };
export type { ConnectionColumnConfig, ConnectionConfig, ConnectionNodeConfig, Encoding, UsageTypeId } from '~/src/component/connector/connection';
export type { ConnectorConfig, ConnectorInterface, ConnectorLocalisedConfig, ConnectorOperationSettings };
export type {
    CreateSettings,
    DropSettings,
    FindObjectSettings,
    GetReadableStreamSettings,
    GetRecordResult,
    GetRecordSettings,
    ListResult,
    ListSettings,
    PreviewResult,
    PreviewSettings,
    RemoveSettings,
    RetrieveChunksResult,
    RetrieveChunksSettings,
    RetrieveChunksSummary,
    RetrieveRecordsResult,
    RetrieveRecordsSettings,
    RetrieveRecordsSummary,
    UpsertSettings
};

export { connectorConfigSchema } from '~/src/component/connector/connectorConfig.schema';
