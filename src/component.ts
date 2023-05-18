/**
 * @file datapos-engine-support/src/component.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */

// Engine Dependencies
import type { FirebaseTimestamp } from '.';

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface Component {
    config: ComponentConfig;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Component - Config
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface ComponentConfig {
    id: string;
    label: string;
    description: string;
    firstCreatedAt: FirebaseTimestamp;
    lastUpdatedAt: FirebaseTimestamp;
    logo?: string;
    statusId: string;
    typeId: ComponentTypeId;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Component - Enumerations
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export type ComponentStatus = { color?: string; label: string };
const componentStatuses: Record<string, ComponentStatus> = {
    alpha: { color: '#d62728', label: 'alpha' },
    beta: { color: '#8c564b', label: 'beta' },
    generalAvailability: { label: '' },
    preAlpha: { color: '#d62728', label: 'pre-alpha' },
    proposed: { color: '#666666', label: 'proposed' },
    releaseCandidate: { color: '#ff7f0e', label: 'release-candidate' },
    unavailable: { color: '#d62728', label: 'unavailable' },
    underReview: { color: '#666666', label: 'under-review' }
};
export const lookupComponentStatus = (id: string): ComponentStatus => (componentStatuses[id] ? componentStatuses[id] : { color: '#984ea3', label: id });

export enum ComponentTypeId {
    /* eslint-disable no-unused-vars */
    Connection = 'connection',
    Connector = 'connector', // TODO: Need all of these?
    ContextModel = 'contextModel',
    DataConnector = 'dataConnector', // TODO: Need all of these?
    Dimension = 'dimension',
    Entity = 'entity',
    EventQuery = 'eventQuery',
    NodeConnector = 'nodeConnector', // TODO: Need all of these?
    SourceView = 'sourceView',
    ViewTemplate = 'viewTemplate',
    UsageKit = 'usageKit'
    /* eslint-enable no-unused-vars */
}
