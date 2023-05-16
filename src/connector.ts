/**
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 * @file datapos-engine-support/src/connector.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 */

// Engine Dependencies
// import type { PluginItem } from './plugin';
import type { Component, ComponentConfig } from '.';

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Connector
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface Connector extends Component {
    version: string;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Connector - Config
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface ConnectorConfig extends ComponentConfig {
    implementations: Implementation[];
    logo: string;
    usageId: ConnectorUsageId;
}

interface Implementation {
    activeConnectionCount: number;
    canDescribe: boolean;
    id: string;
    authMethodId: ConnectorAuthMethodId;
    label: string;
    maxConnectionCount: number;
    params: Record<string, string>[];
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Connector - Item
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// export interface ConnectorItem extends PluginItem {
//     activeConnectionCount: number;
//     canDescribe: boolean;
//     categoryId: string;
//     hasOnlyAuthImplementations: boolean;
//     implementations: ConnectorImplementation[];
//     logo: string;
//     logoWidth: string;
//     maxConnectionCount: number;
//     statusId: string;
//     usageId: ConnectorUsageId;
// }

export interface ConnectorImplementation {
    activeConnectionCount: number;
    canDescribe: boolean;
    id: string;
    authMethodId: ConnectorAuthMethodId;
    label: string;
    maxConnectionCount: number;
    params: Record<string, string>[];
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Connector - Enumerations
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export enum ConnectorAuthMethodId {
    APIKey = 'apiKey',
    Disabled = 'disabled',
    OAuth2 = 'oAuth2',
    None = 'none'
}

export type ConnectorCategory = { label: string };
const componentCategories: Record<string, ConnectorCategory> = {
    application: { label: 'Application' },
    curatedDataset: { label: 'Curated Dataset' },
    database: { label: 'Database' },
    fileStore: { label: 'File Store' }
};
export const lookupConnectorCategory = (id: string): ConnectorCategory => (componentCategories[id] ? componentCategories[id] : { label: id });

export type ConnectorStatus = { color?: string; label: string };
const connectorStatuses: Record<string, ConnectorStatus> = {
    alpha: { color: '#d62728', label: 'alpha' },
    beta: { color: '#8c564b', label: 'beta' },
    generalAvailability: { label: '' },
    preAlpha: { color: '#d62728', label: 'pre-alpha' },
    proposed: { color: '#666666', label: 'proposed' },
    releaseCandidate: { color: '#ff7f0e', label: 'release-candidate' },
    unavailable: { color: '#d62728', label: 'unavailable' },
    underReview: { color: '#666666', label: 'under-review' }
};
export const lookupConnectorStatus = (id: string): ConnectorStatus => (connectorStatuses[id] ? connectorStatuses[id] : { color: '#984ea3', label: id });

export enum ConnectorUsageId {
    Bidirectional = 'bidirectional',
    Destination = 'destination',
    Node = 'node',
    Source = 'source',
    None = 'none'
}
