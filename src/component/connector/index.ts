/**
 * Connector composables, constants, errors, types/interfaces and utilities.
 */

/** Dependencies - Vendor. */
import type { parse as csvParse } from 'csv-parse/browser/esm';
import type { parse as dateFnsParse } from 'date-fns';
import type { InferOutput } from 'valibot';
import type { nanoid } from 'nanoid'; // TODO: Check package.json if removed, currently both peer and dev dependency.

/** Dependencies - Framework. */
import type { Component } from '@/component';
import { DEFAULT_LOCALE_CODE } from '@/index';
import type { LocalisedString } from '@/index';
import type { buildFetchError, OperationalError } from '@/errors';
import type { ConnectionConfig, ConnectionDescription, ConnectionNodeConfig } from '@/component/connector/connection';
import type {
    connectorCategoryIdSchema,
    connectorConfigSchema,
    connectorImplementationSchema,
    connectorOperationNameSchema,
    connectorUsageIdSchema
} from '@/component/connector/connectorConfig.schema';
import type { DataViewContentAuditConfig, ValueDelimiterId } from '@/component/dataView';
import type { extractExtensionFromPath, extractNameFromPath, lookupMimeTypeForExtension } from '@/utilities';

/** Interfaces/Types - Connector category identifier. */
export type ConnectorCategoryId = InferOutput<typeof connectorCategoryIdSchema>;

/** Interfaces/Types - Connector operation name. */
export type ConnectorOperationName = InferOutput<typeof connectorOperationNameSchema>;

/** Interfaces/Types - Connector usage identifier. */
export type ConnectorUsageId = InferOutput<typeof connectorUsageIdSchema>;

/** Interfaces/Types - Connector implementation. */
export type ConnectorImplementation = InferOutput<typeof connectorImplementationSchema>;

/** Interfaces/Types - Connector configuration. */
export type ConnectorConfig = InferOutput<typeof connectorConfigSchema>;
export type ConnectorLocalisedConfig = Omit<ConnectorConfig, 'label' | 'description'> & { label: string; description: string };

/** Interfaces/Types - Connector. */
export interface Connector extends Component {
    abortController?: AbortController;
    readonly config: ConnectorConfig;
    readonly connectionConfig: ConnectionConfig;
    readonly tools: ConnectorTools;
    abortOperation?(connector: Connector): void; // Abort the active long running operation for a specified connection.
    authenticateConnection?(accountId: string, windowCenterX: number, windowCenterY: number): Window; // Authenticate a specified connection.
    createObject?(connector: Connector, settings: CreateSettings): Promise<void>; // Create an object for a specified connection.
    describeConnection?(connector: Connector, settings: DescribeSettings): Promise<DescribeResult>; // Describe a specified connection.
    dropObject?(connector: Connector, settings: DropSettings): Promise<void>; // Drop (delete) an object for a specified connection.
    findObject?(connector: Connector, findSettings: FindSettings): Promise<FindResult>; // Find an object for a specified connection.
    getReadableStream?(connector: Connector, getSettings: GetReadableStreamSettings): Promise<GetReadableStreamResult>; // Get a reader that can retrieve all records from an object for a specified connection.
    getRecord?(connector: Connector, getSettings: GetRecordSettings): Promise<GetRecordResult>; // Get a record for an object for a specified connection.
    listNodes?(connector: Connector, settings: ListSettings): Promise<ListResult>; // List nodes in a folder for a specified connection.
    previewObject?(connector: Connector, settings: PreviewSettings): Promise<PreviewResult>; // Preview an object for a specified connection.
    removeRecords?(connector: Connector, settings: RemoveSettings): Promise<void>; // Remove one or more records from an object for a specified connection.
    retrieveChunks?(
        connector: Connector,
        settings: RetrieveChunksSettings,
        chunk: (records: (string[] | Record<string, unknown>)[]) => void,
        complete: (result: RetrieveChunksSummary) => void
    ): Promise<void>; // Retrieve all chunks from an object for a specified connection.
    retrieveRecords?(
        connector: Connector,
        settings: RetrieveRecordsSettings,
        chunk: (records: (string[] | Record<string, unknown>)[]) => void,
        complete: (result: RetrieveRecordsSummary) => void
    ): Promise<void>; // Retrieve all records from an object for a specified connection.
    upsertRecords?(connector: Connector, settings: UpsertSettings): Promise<void>; // Upsert one or more records into an object for a specified connection.
}

export interface ConnectorTools {
    csvParse: typeof csvParse;
    dataPos: {
        buildFetchError: typeof buildFetchError;
        extractExtensionFromPath: typeof extractExtensionFromPath;
        extractNameFromPath: typeof extractNameFromPath;
        lookupMimeTypeForExtension: typeof lookupMimeTypeForExtension;
        OperationalError: typeof OperationalError;
    };
    dateFns: { parse: typeof dateFnsParse };
    nanoid: typeof nanoid;
}

/** Constants  */
export const CONNECTOR_DESTINATION_OPERATIONS = ['createObject', 'dropObject', 'removeRecords', 'upsertRecords'];
export const CONNECTOR_SOURCE_OPERATIONS = ['findObject', 'getRecord', 'listNodes', 'previewObject', 'retrieveRecords'];

// Types/Interfaces/Operations - Initialise settings.
export interface InitialiseSettings {
    connectorStorageURLPrefix: string;
}

// Types/Interfaces/Operations - Connector operation settings.
export interface ConnectorOperationSettings {
    accountId?: string;
    appCheckToken?: string;
    sessionAccessToken?: string;
}

// Types/Interfaces/Operations - Audit Content (object).
export interface AuditContentSettings extends ConnectorOperationSettings {
    chunkSize?: number;
    encodingId: string;
    path: string;
    valueDelimiterId: ValueDelimiterId;
}
export interface AuditContentResult {
    contentAuditConfig: DataViewContentAuditConfig;
}

// Types/Interfaces/Operations - Create (object).
export interface CreateSettings extends ConnectorOperationSettings {
    accountId?: string;
    path: string;
    structure: string;
}

// Types/Interfaces/Operations - Describe (Connection).
export type DescribeSettings = ConnectorOperationSettings;
export interface DescribeResult {
    description: ConnectionDescription;
}

// Types/Interfaces/Operations - Drop (object).
export interface DropSettings extends ConnectorOperationSettings {
    path: string;
}

// Types/Interfaces/Operations - Find (object).
export interface FindSettings extends ConnectorOperationSettings {
    containerName?: string;
    objectName: string;
}
export interface FindResult {
    folderPath?: string;
}

// Types/Interfaces/Operations - Get readable stream.
export interface GetReadableStreamSettings extends ConnectorOperationSettings {
    id: string;
    path: string;
}
export interface GetReadableStreamResult {
    readable?: ReadableStream<unknown>;
}

// Types/Interfaces/Operations - Get record (object).
export interface GetRecordSettings extends ConnectorOperationSettings {
    id: string;
    path: string;
}
export interface GetRecordResult {
    record?: string[] | Record<string, unknown>;
}

// Types/Interfaces/Operations - List (nodes).
export interface ListSettings extends ConnectorOperationSettings {
    folderPath: string;
    limit?: number;
    offset?: number;
    totalCount?: number;
}
export interface ListResult {
    cursor: string | number | undefined;
    connectionNodeConfigs: ConnectionNodeConfig[];
    isMore: boolean;
    totalCount: number;
}

// Types/Interfaces/Operations - Preview (object).
export interface PreviewSettings extends ConnectorOperationSettings {
    chunkSize?: number;
    extension?: string;
    path: string;
}
export interface PreviewResult {
    data: Record<string, unknown>[] | Uint8Array;
    typeId: 'jsonArray' | 'uint8Array';
}

// Types/Interfaces/Operations - Remove (records).
export interface RemoveSettings extends ConnectorOperationSettings {
    keys: string[];
    path: string;
}

// Types/Interfaces/Operations - Retrieve (records).
export interface RetrieveChunksSettings extends ConnectorOperationSettings {
    chunkSize?: number;
    encodingId: string;
    path: string;
    valueDelimiterId: ValueDelimiterId;
}
export interface RetrieveRecordsSettings extends ConnectorOperationSettings {
    chunkSize?: number;
    encodingId: string;
    path: string;
    valueDelimiterId: ValueDelimiterId;
}
export interface RetrieveRecordsResult {
    records: (string[] | Record<string, unknown>)[];
}
export interface RetrieveChunksSummary {
    byteCount: number;
    commentLineCount: number;
    emptyLineCount: number;
    invalidFieldLengthCount: number;
    lineCount: number;
    recordCount: number;
}
export interface RetrieveRecordsSummary {
    byteCount: number;
    commentLineCount: number;
    emptyLineCount: number;
    invalidFieldLengthCount: number;
    lineCount: number;
    recordCount: number;
}

// Types/Interfaces/Operations - Upsert (records).
export interface UpsertSettings extends ConnectorOperationSettings {
    records: Record<string, unknown>[];
    path: string;
}

// Types/Interfaces/Operations - Connector callback data.
export interface ConnectorCallbackData {
    typeId: string;
    properties: Record<string, unknown>;
}

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
const resolveLocaleLabel = (labels: LocaleLabelMap, localeId: string, fallbackLocaleId = DEFAULT_LOCALE_CODE): string | undefined => {
    const localizedLabel = labels.get(localeId);
    if (localizedLabel !== undefined) return localizedLabel;
    if (fallbackLocaleId === localeId) return undefined;
    return labels.get(fallbackLocaleId);
};
interface ConnectorCategoryConfig {
    id: string;
    labels: LocaleLabelMap;
}
const connectorCategories: ConnectorCategoryConfig[] = [
    { id: 'application', labels: createLocaleLabelMap({ 'en-gb': 'Application' }) },
    { id: 'curatedDataset', labels: createLocaleLabelMap({ 'en-gb': 'Curated Dataset' }) },
    { id: 'database', labels: createLocaleLabelMap({ 'en-gb': 'Database' }) },
    { id: 'fileStore', labels: createLocaleLabelMap({ 'en-gb': 'File Store' }) }
];
const getConnectorCategory = (id: string, localeId = DEFAULT_LOCALE_CODE): ConnectorCategory => {
    const connectorCategory = connectorCategories.find((connectorCategory) => connectorCategory.id === id);
    if (connectorCategory) {
        const resolvedLabel = resolveLocaleLabel(connectorCategory.labels, localeId);
        return { id: connectorCategory.id, label: resolvedLabel ?? connectorCategory.id };
    }
    return { id, label: id };
};

/** Exposures */
export { connectorConfigSchema } from '@/component/connector/connectorConfig.schema';
