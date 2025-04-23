// Dependencies - Vendor
import type { Callback, Options, Parser } from 'csv-parse';

// Dependencies - Framework
import type { ComponentConfig } from './component';
import type { ConnectionConfig, ConnectionDescription, ConnectionItemConfig } from './connection';
import type { DataViewPreviewConfig, ParsedValue } from './dataView';

// Interfaces/Types - Connector
export interface Connector {
    abortController?: AbortController | undefined;
    readonly config: ConnectorConfig;
    readonly connectionConfig: ConnectionConfig;

    abort?(): void;
    authenticate?(accountId: string, windowCenterX: number, windowCenterY: number): Window;
    // create?(): unknown;
    describe?(callback: (data: ConnectorCallbackData) => void, settings: DescribeSettings): Promise<DescribeResult>;
    // drop?(): unknown;
    find?(findSettings: FindSettings): Promise<FindResult>;
    getCreateInterface?(): CreateInterface;
    getDropInterface?(): DropInterface;
    getPreviewInterface?(): PreviewInterface;
    getPutInterface?(): PutInterface;
    getRetrieveInterface?(): RetrieveInterface;
    getRemoveInterface?(): RemoveInterface;
    list?(settings: ListSettings): Promise<ListResult>;
    preview(connectionItemConfig: ConnectionItemConfig, settings: PreviewSettings): Promise<PreviewResult>;
}

// Interfaces/Types - Connector Callback Data
export interface ConnectorCallbackData {
    typeId: string;
    properties: Record<string, unknown>;
}

// Interfaces/Types - Connector Configuration
export interface ConnectorConfig extends ComponentConfig {
    category?: ConnectorCategory;
    categoryId: string;
    implementations: Record<string, ConnectorImplementation>;
    usageId: 'bidirectional' | 'destination' | 'source';
    vendorAccountURL?: string;
    vendorDocumentationURL?: string;
    vendorHomeURL?: string;
    version?: string;
}
interface ConnectorImplementation {
    activeConnectionCount?: number;
    canDescribe?: boolean;
    id?: string;
    authMethodId: 'apiKey' | 'disabled' | 'oAuth2' | 'none';
    label?: Record<string, string>;
    maxConnectionCount?: number;
    params?: Record<string, string>[];
}

// Interfaces/Types - Create Interface
export interface CreateInterface {
    create(containerName: string, objectName: string, structure: Record<string, string>): Promise<{ error?: unknown }>;
}
export interface CreateSettings {
    accountId?: string;
    sessionAccessToken?: string;
}
export interface CreateResult {
    placeholder: string;
}

// Interfaces/Types - Describe
interface DescribeSettings {
    accountId: string | undefined;
    sessionAccessToken: string | undefined;
}
interface DescribeResult {
    description: ConnectionDescription;
}

// Interfaces/Types - Drop Interface
export interface DropInterface {
    drop(containerName: string, objectName: string): Promise<{ error?: unknown }>;
}
export interface DropSettings {
    accountId?: string;
    sessionAccessToken?: string;
}
export interface DropResult {
    placeholder: string;
}

// // Interfaces/Types - Establish Container
// export interface EstablishContainerResult {
//     id?: string;
// }
// export interface EstablishContainerSettings {
//     name: string;
// }

// Interfaces/Types - Find
export interface FindSettings {
    containerName?: string;
    objectName: string;
}
export interface FindResult {
    folderPath?: string;
}

// Interfaces/Types - List
export interface ListSettings {
    containerName?: string;
    folderPath: string;
    limit?: number;
    offset?: number;
    totalCount?: number;
}
export interface ListResult {
    cursor: string | number | undefined;
    connectionItemConfigs: ConnectionItemConfig[];
    isMore: boolean;
    totalCount: number;
}

// Interfaces/Types - Preview Interface
export interface PreviewInterface {
    preview(connectionItemConfig: ConnectionItemConfig, settings: PreviewSettings): Promise<PreviewResult>;
}
export interface PreviewSettings {
    accountId?: string;
    chunkSize?: number;
    containerName?: string;
    sessionAccessToken?: string;
}
export interface PreviewResult {
    data: Record<string, unknown>[] | Uint8Array;
    typeId: 'jsonArray' | 'uint8Array';
}

// Interfaces/Types - Put Interface
export interface PutInterface {
    put(
        containerName: string,
        objectName: string,
        data: Record<string, unknown> | Record<string, unknown>[],
        callback: (data: ConnectorCallbackData) => void
    ): Promise<{ error?: unknown }>;
}

// Interfaces/Types - Retrieve Interface
export interface RetrieveInterface {
    retrieve(
        connectionItemConfig: ConnectionItemConfig,
        previewConfig: DataViewPreviewConfig,
        settings: RetrieveSettings,
        callback: (data: ConnectorCallbackData) => void
    ): Promise<void>;
}
export interface RetrieveSettings {
    accountId?: string;
    chunk(records: RetrieveRecord[]): void;
    chunkSize?: number;
    complete(info: RetrieveSummary): void;
    containerName?: string;
    csvParse?: (options?: Options, callback?: Callback) => Parser | undefined;
    sessionAccessToken?: string;
}
export interface RetrieveRecord {
    fieldQuotings: boolean[];
    fieldValues: string[];
}
export interface RetrieveSummary {
    byteCount: number;
    commentLineCount: number;
    emptyLineCount: number;
    invalidFieldLengthCount: number;
    lineCount: number;
    recordCount: number;
}

// Interfaces/Types - Remove Interface
export interface RemoveInterface {
    remove(containerName: string, objectName: string, keys: Record<string, unknown>[]): Promise<{ error?: unknown }>;
}

// Connector Category
type ConnectorCategory = { id: string; label: string };
type ConnectorCategoryConfig = { id: string; label: Record<string, string> };
const connectorCategories: ConnectorCategoryConfig[] = [
    { id: 'application', label: { en: 'Application' } },
    { id: 'curatedDataset', label: { en: 'Curated Dataset' } },
    { id: 'database', label: { en: 'Database' } },
    { id: 'fileStore', label: { en: 'File Store' } }
];
const getConnectorCategory = (id: string, localeId = 'en'): ConnectorCategory => {
    const connectorCategory = connectorCategories.find((connectorCategory) => connectorCategory.id === id);
    if (connectorCategory) return { ...connectorCategory, label: connectorCategory.label[localeId] || connectorCategory.label['en'] || id };
    return { id, label: id };
};
