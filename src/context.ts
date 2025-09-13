// Dependencies - Framework
import type { ComponentConfig, ComponentRef } from './component';

// Interfaces/Types - Connector
export interface Context {
    readonly config: ContextConfig;

    listFocuses(settings?: ContextFocusConfigListSettings): Promise<ContextFocusConfigListResult>;
}

// Interfaces/Types - Context Callback Data
export interface ContextCallbackData {
    typeId: string;
    properties: Record<string, unknown>;
}

// Interfaces - Context configuration.
export interface ContextConfig extends ComponentConfig {
    focuses: ContextFocusConfig[];
    version: string;
}

// Interfaces/Types - Context Focus Configuration
export interface ContextFocusConfig extends ComponentConfig {
    modelRefs: ComponentRef[];
    order: number;
}
export type LocaleContextFocusConfig = Omit<ContextFocusConfig, 'label' | 'description'> & { label: string; description: string };

// Interfaces/Types - Context Operator Settings
export interface ContextOperationSettings {
    accountId?: string;
    appCheckToken?: string;
    sessionAccessToken?: string;
}

// Interfaces/Types - Context Model Configuration
export interface ContextModelConfig extends ComponentConfig {
    diagramURL?: string;
    dimensionGroupConfigs: ContextDimensionGroupConfig[];
    entityGroupConfigs: ContextEntityGroupConfig[];
    secondaryMeasureGroupConfigs: ContextSecondaryMeasureGroupConfig[];
    viewGroupConfigs: ContextViewGroupConfig[];
}

// Interfaces/Types - Context Dimension Group Configuration
export interface ContextDimensionGroupConfig {
    id: string;
    label: Record<string, string>;
    description?: Record<string, unknown>;
    dimensionRefs: ComponentRef[];
}

// Interfaces/Types - Context Entity Group Configuration
export interface ContextEntityGroupConfig {
    id: string;
    label: Record<string, string>;
    description?: Record<string, unknown>;
    entityRefs: ComponentRef[];
}

// Interfaces/Types - Context Secondary Measure Group Configuration
export interface ContextSecondaryMeasureGroupConfig {
    id: string;
    label: Record<string, string>;
    description?: Record<string, unknown>;
    secondaryMeasureRefs: ComponentRef[];
}

// Interfaces/Types - Context View Group Configuration
export interface ContextViewGroupConfig {
    id: string;
    label: Record<string, string>;
    description?: Record<string, unknown>;
    viewRefs: ComponentRef[];
}

// Interfaces/Types - Context Dimension Configuration
export interface ContextDimensionConfig {
    id: string;
    label: Record<string, string>;
    hierarchies: ContextHierarchyConfig[];
}
export interface ContextHierarchyConfig {
    id: string;
    label: Record<string, string>;
}

// Interfaces/Types - Context Entity Configuration
export interface ContextEntityConfig {
    id: string;
    label: Record<string, string>;
    labelPlural: Record<string, string>;
    characteristics: ContextEntityCharacteristicConfig[];
    computations: ContextEntityComputationConfig[];
    events: ContextEntityEventConfig[];
}
export interface ContextEntityCharacteristicConfig {
    id: string;
    label: Record<string, string>;
}
export interface ContextEntityComputationConfig {
    id: string;
    label: Record<string, string>;
}
export interface ContextEntityEventConfig {
    id: string;
    labelAction: Record<string, string>;
    labelState: Record<string, string>;
}

// Interfaces/Types - Context Secondary Measure Configuration
export interface ContextSecondaryMeasureConfig {
    id: string;
    label: Record<string, string>;
}

// Interfaces/Types - Context View Configuration
export interface ContextViewConfig {
    id: string;
    label: Record<string, string>;
}

// Interfaces/Types - Context focus list result/settings.
export interface ContextFocusConfigListResult {
    focusConfigs: ContextFocusConfig[];
}
export interface ContextFocusConfigListSettings {}

// ...
export interface Event {
    id?: number;
    entityId: string;
    effDate: number;
    typeId: string;
}
