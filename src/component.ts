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
    id: string;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Component - Config
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface ComponentConfig {
    id: string;
    label?: string;
    firstCreatedAt: FirebaseTimestamp;
    lastUpdatedAt: FirebaseTimestamp;
    logo?: string;
    statusId: ComponentStatusId;
    typeId: ComponentTypeId;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Component - Enumerations
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export enum ComponentTypeId {
    /* eslint-disable no-unused-vars */
    Connection = 'connection',
    ContextModel = 'contextModel',
    DataConnector = 'dataConnector',
    NodeConnector = 'nodeConnector',
    ResultTemplate = 'resultTemplate',
    UsageKit = 'usageKit'
    /* eslint-enable no-unused-vars */
}

export enum ComponentStatusId {
    /* eslint-disable no-unused-vars */
    Proposed = 'proposed',
    UnderReview = 'under-review',
    PreAlpha = 'pre-alpha',
    Alpha = 'alpha',
    Beta = 'beta',
    ReleaseCandidate = 'release-candidate',
    GeneralAvailability = 'general-availability',
    Unavailable = 'unavailable'
    /* eslint-enable no-unused-vars */
}
