// Dependencies - Engine - Support
import type { ComponentConfig } from '../component';

// Declarations - Context
export interface ContextConfig extends ComponentConfig {
    focuses: ContextFocusReference[];
}

// Declarations - Context - Focus Reference
export interface ContextFocusReference {
    id: string;
    label: Record<string, string>;
    models: ContextModelReference[];
}
interface ContextModelReference {
    id: string;
    label: Record<string, string>;
}

// Declarations - Context - Dimension Config
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

// Declarations - Context - Entity Config
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

// Declarations - Context - Model Config
export interface ModelConfig extends ComponentConfig {
    dimensions: DimensionConfig[];
    entities: EntityConfig[];
    views: ViewConfig[];
}

// Declarations - Context - View Config
export interface ViewConfig extends ComponentConfig {
    placeholder: string;
}
