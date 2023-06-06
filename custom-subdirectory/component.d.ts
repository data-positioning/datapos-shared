/**
 * @file datapos-engine-support/src/component.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */
import type { FirebaseTimestamp } from '.';
export interface Component {
    config: ComponentConfig;
}
export interface ComponentConfig {
    description: string;
    firstCreatedAt: FirebaseTimestamp;
    id: string;
    label: string;
    lastUpdatedAt: FirebaseTimestamp;
    logo: string;
    status: ComponentStatus;
    statusId: string;
    typeId: ComponentTypeId;
}
export type ComponentStatus = {
    color?: string;
    label: string;
};
export declare const lookupComponentStatus: (id: string) => ComponentStatus;
export declare enum ComponentTypeId {
    Connection = "connection",
    Connector = "connector",
    ContextModel = "contextModel",
    DataConnector = "dataConnector",
    Dimension = "dimension",
    Entity = "entity",
    EventQuery = "eventQuery",
    NodeConnector = "nodeConnector",
    SourceView = "sourceView",
    ViewTemplate = "viewTemplate",
    UsageKit = "usageKit"
}
