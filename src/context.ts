// Dependencies - Framework
import type { ComponentConfig } from './component';

// Interfaces/Types - Context Configuration
export interface ContextConfig extends ComponentConfig {
    focuses: FocusConfig[];
}

// Interfaces/Types - Focus Configuration
export interface FocusConfig extends ComponentConfig {
    models: ModelConfig[];
}

// Interfaces/Types - Model Configuration
export interface ModelConfig extends ComponentConfig {
    dimensions: DimensionConfig[];
    entities: EntityConfig[];
    views: ViewConfig[];
}

// Config - Dimension
export interface DimensionConfig extends ComponentConfig {
    id: string;
    hierarchies: HierarchyConfig[];
    label: Record<string, string>;
}
export interface HierarchyConfig extends ComponentConfig {
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

// Config - View
export interface ViewConfig extends ComponentConfig {
    placeholder: string;
}

// ...
export interface Event {
    id?: number;
    entityId: string;
    effDate: number;
    typeId: string;
}
