import type { ComponentConfig } from '../component';

// Config
export interface ContextConfig extends ComponentConfig {
    focuses: ContextFocusReference[];
}
export interface ContextFocusReference {
    id: string;
    label: Record<string, string>;
    models: ContextModelReference[];
}
interface ContextModelReference {
    id: string;
    label: Record<string, string>;
}

// Config - Dimension
export interface DimensionConfig extends ComponentConfig {
    id: string;
    hierarchies: DimensionHierarchyConfig[];
    label: Record<string, string>;
}
export interface DimensionHierarchyConfig {
    id: string;
    label: Record<string, string>;
    levels: DimensionLevelConfig[];
}
export interface DimensionLevelConfig {
    id: string;
    label: Record<string, string>;
}

// Config - Entity
export interface EntityConfig extends ComponentConfig {
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

// Config - Model
export interface ModelConfig extends ComponentConfig {
    dimensions: DimensionConfig[];
    entities: EntityConfig[];
    views: ViewConfig[];
}

// Config - View
export interface ViewConfig extends ComponentConfig {
    placeholder: string;
}
