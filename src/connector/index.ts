// Dependencies - Engine
import type { ConnectionConfig } from '../connection';
import type { Component, ComponentConfig } from '../component';

// Declaration - Connector
export interface Connector extends Component {
    config: ConnectorConfig;
    connectionConfig: ConnectionConfig;
}

// Declaration - Connector Config
export interface ConnectorConfig extends ComponentConfig {
    category: ConnectorCategory;
    categoryId: string;
    implementations: Record<string, ConnectorImplementation>;
    usageId: ConnectorUsageId;
    vendorAccountURL: string;
    vendorDocumentationURL: string;
    vendorHomeURL: string;
    version: string;
}

export interface ConnectorImplementation {
    activeConnectionCount: number;
    canDescribe: boolean;
    id: string;
    authMethodId: ConnectorAuthMethodId;
    label: string;
    maxConnectionCount: number;
    params: Record<string, string>[];
}

export enum ConnectorAuthMethodId {
    APIKey = 'apiKey',
    Disabled = 'disabled',
    OAuth2 = 'oAuth2',
    None = 'none'
}

type ConnectorCategory = { label: string };
const componentCategories: Record<string, ConnectorCategory> = {
    application: { label: 'Application' },
    curatedDataset: { label: 'Curated Dataset' },
    database: { label: 'Database' },
    fileStore: { label: 'File Store' }
};
export const lookupConnectorCategory = (id: string): ConnectorCategory => (componentCategories[id] ? componentCategories[id] : { label: id });

export enum ConnectorUsageId {
    Bidirectional = 'bidirectional',
    Destination = 'destination',
    Node = 'node',
    Source = 'source',
    None = 'none'
}
