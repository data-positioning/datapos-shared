export interface Component {
    config: ComponentConfig;
}
export interface ComponentConfig {
    description: Record<string, string>;
    firstCreatedAt: FirebaseTimestamp;
    id: string;
    label: Record<string, string>;
    lastUpdatedAt: FirebaseTimestamp;
    logo: string;
    status: ComponentStatus;
    statusId: string;
    typeId: ComponentTypeId;
}
export type ComponentStatus = {
    id: string;
    color?: string;
    label: string;
};
export declare const getComponentStatus: (id: string, localeId?: string) => ComponentStatus;
export declare enum ComponentTypeId {
    Connection = "connection",
    Context = "context",
    DataConnector = "dataConnector",
    EventQuery = "eventQuery",
    NodeConnector = "nodeConnector",
    SourceView = "sourceView",
    UsageKit = "usageKit"
}
export interface FirebaseTimestamp {
    nanoseconds: number;
    seconds: number;
}
