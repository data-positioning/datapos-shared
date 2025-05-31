// Dependencies - Framework
import type { ComponentConfig, ComponentRef } from './component';

// Interfaces/Types - Focus Configuration
export interface FocusConfig extends ComponentConfig {
    modelRefs: ComponentRef[];
}

// Interfaces/Types - Model Configuration
export interface ModelConfig extends ComponentConfig {
    diagramURL?: string;
    dimensionGroupConfigs: DimensionGroupConfig[];
    entityGroupConfigs: EntityGroupConfig[];
    secondaryMeasureGroupConfigs: SecondaryMeasureGroupConfig[];
    viewGroupConfigs: ViewGroupConfig[];
}

// Interfaces/Types - Dimension Group Configuration
export interface DimensionGroupConfig {
    id: string;
    label: Record<string, string>;
    description?: Record<string, unknown>[];
    dimensionRefs: ComponentRef[];
}

// Interfaces/Types - Entity Group Configuration
export interface EntityGroupConfig {
    id: string;
    label: Record<string, string>;
    description?: Record<string, unknown>[];
    entityRefs: ComponentRef[];
}

// Interfaces/Types - Secondary Measure Group Configuration
export interface SecondaryMeasureGroupConfig {
    id: string;
    label: Record<string, string>;
    description?: Record<string, unknown>[];
    secondaryMeasureRefs: ComponentRef[];
}

// Interfaces/Types - View Group Configuration
export interface ViewGroupConfig {
    id: string;
    label: Record<string, string>;
    description?: Record<string, unknown>[];
    viewRefs: ComponentRef[];
}

// Interfaces/Types - Dimension Configuration
export interface DimensionConfig {
    id: string;
    label: Record<string, string>;
    hierarchies: HierarchyConfig[];
}
export interface HierarchyConfig {
    id: string;
    label: Record<string, string>;
}

// Interfaces/Types - Entity Configuration
export interface EntityConfig {
    id: string;
    label: Record<string, string>;
    labelPlural: Record<string, string>;
    characteristics: EntityCharacteristicConfig[];
    computations: EntityComputationConfig[];
    events: EntityEventConfig[];
}
export interface EntityCharacteristicConfig {
    id: string;
    label: Record<string, string>;
}
export interface EntityComputationConfig {
    id: string;
    label: Record<string, string>;
}
export interface EntityEventConfig {
    id: string;
    labelAction: Record<string, string>;
    labelState: Record<string, string>;
}

// Interfaces/Types - Secondary Measure Configuration
export interface SecondaryMeasureConfig {
    id: string;
    label: Record<string, string>;
}

// Interfaces/Types - View Configuration
export interface ViewConfig {
    id: string;
    label: Record<string, string>;
}

// ...
export interface Event {
    id?: number;
    entityId: string;
    effDate: number;
    typeId: string;
}
