/**
 * @file datapos-engine-support/src/connector.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */
import { ConnectionConfig } from '../connection';
import type { Component, ComponentConfig } from '../component';
export interface Connector extends Component {
    config: ConnectorConfig;
    connectionConfig: ConnectionConfig;
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
    label: string;
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
    label: string;
};
export declare const lookupConnectorCategory: (id: string) => ConnectorCategory;
export declare enum ConnectorUsageId {
    Bidirectional = "bidirectional",
    Destination = "destination",
    Node = "node",
    Source = "source",
    None = "none"
}
export {};
