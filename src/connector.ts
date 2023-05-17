/**
 * @file datapos-engine-support/src/connector.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */

// Engine Dependencies
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

// export interface ConnectorImplementation {
//     activeConnectionCount: number;
//     canDescribe: boolean;
//     id: string;
//     authMethodId: ConnectorAuthMethodId;
//     label: string;
//     maxConnectionCount: number;
//     params: Record<string, string>[];
// }

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Connector - Enumerations
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export enum ConnectorAuthMethodId {
    /* eslint-disable no-unused-vars */
    APIKey = 'apiKey',
    Disabled = 'disabled',
    OAuth2 = 'oAuth2',
    None = 'none'
    /* eslint-enable no-unused-vars */
}

export type ConnectorCategory = { label: string };
const componentCategories: Record<string, ConnectorCategory> = {
    Application: { label: 'Application' },
    CuratedDataset: { label: 'Curated Dataset' },
    Database: { label: 'Database' },
    FileStore: { label: 'File Store' }
};
export const lookupConnectorCategory = (id: string): ConnectorCategory => (componentCategories[id] ? componentCategories[id] : { label: id });

export type ConnectorStatus = { color?: string; label: string };
const connectorStatuses: Record<string, ConnectorStatus> = {
    Alpha: { color: '#d62728', label: 'alpha' },
    Beta: { color: '#8c564b', label: 'beta' },
    GeneralAvailability: { label: '' },
    PreAlpha: { color: '#d62728', label: 'pre-alpha' },
    Proposed: { color: '#666666', label: 'proposed' },
    ReleaseCandidate: { color: '#ff7f0e', label: 'release-candidate' },
    Unavailable: { color: '#d62728', label: 'unavailable' },
    UnderReview: { color: '#666666', label: 'under-review' }
};
export const lookupConnectorStatus = (id: string): ConnectorStatus => (connectorStatuses[id] ? connectorStatuses[id] : { color: '#984ea3', label: id });

export enum ConnectorUsageId {
    /* eslint-disable no-unused-vars */
    Bidirectional = 'bidirectional',
    Destination = 'destination',
    Node = 'node',
    Source = 'source',
    None = 'none'
    /* eslint-enable no-unused-vars */
}
