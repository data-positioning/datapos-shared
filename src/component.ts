/**
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 * @file datapos-engine-support/src/component.ts
 * @license ISC
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
    firstCreatedAt: FirebaseTimestamp;
    id: string;
    lastUpdatedAt: FirebaseTimestamp;
    statusId: ComponentStatusId;
    typeId: ComponentTypeId;
}

export interface PrimaryComponentConfig extends ComponentConfig {
    categoryId: string;
    description: string;
    label: string;
    reference: string;
    version: string;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Component - Item
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface ComponentItem {
    firstCreatedAt: FirebaseTimestamp;
    id: string;
    lastUpdatedAt: FirebaseTimestamp;
    summary?: string;
    typeId: ComponentTypeId;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Component - Enumerations
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export enum ComponentTypeId {
    Connection = 'connection',
    ContextModel = 'contextModel',
    DataConnector = 'dataConnector',
    NodeConnector = 'nodeConnector',
    UsageKit = 'usageKit'
}

export enum ComponentStatusId {
    Proposed = 'proposed',
    UnderReview = 'underReview',
    PreAlpha = 'preAlpha',
    Alpha = 'alpha',
    Beta = 'beta',
    ReleaseCandidate = 'releaseCandidate',
    GeneralAvailability = 'generalAvailability',
    Unavailable = 'unavailable'
}
