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

// export interface PrimaryComponentConfig extends ComponentConfig {
//     categoryId: string;
//     description: string;
//     label: string;
//     reference: string;
//     version: string;
// }

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Component - Item
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// export interface ComponentItem {
//     firstCreatedAt: FirebaseTimestamp;
//     id: string;
//     lastUpdatedAt: FirebaseTimestamp;
//     summary?: string;
//     typeId: ComponentTypeId;
// }

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Component - Enumerations
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export enum ComponentTypeId {
    Connection = 'connection',
    ContextModel = 'contextModel',
    DataConnector = 'dataConnector',
    NodeConnector = 'nodeConnector',
    ResultTemplate = 'resultTemplate',
    UsageKit = 'usageKit'
}

export enum ComponentStatusId {
    Proposed = 'proposed',
    UnderReview = 'under-review',
    PreAlpha = 'pre-alpha',
    Alpha = 'alpha',
    Beta = 'beta',
    ReleaseCandidate = 'release-candidate',
    GeneralAvailability = 'general-availability',
    Unavailable = 'unavailable'
}
