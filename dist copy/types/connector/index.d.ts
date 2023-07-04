import type { ConnectionConfig } from '../connection';
import type { Component, ComponentConfig } from '../component';
export interface Connector extends Component {
    config: ConnectorConfig;
    connectionConfig: ConnectionConfig;
}
export interface ConnectorCallbackData {
    typeId: string;
    properties: Record<string, unknown>;
}
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
    label: Record<string, string>;
    maxConnectionCount: number;
    params: Record<string, string>[];
}
export declare enum ConnectorAuthMethodId {
    APIKey = "apiKey",
    Disabled = "disabled",
    OAuth2 = "oAuth2",
    None = "none"
}
type ConnectorCategory = {
    id: string;
    label: string;
};
export declare const getConnectorCategory: (id: string, localeId?: string) => ConnectorCategory;
export declare enum ConnectorUsageId {
    Bidirectional = "bidirectional",
    Destination = "destination",
    Node = "node",
    Source = "source",
    None = "none"
}
export {};
