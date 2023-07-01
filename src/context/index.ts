// Dependencies - Engine
import type { ComponentConfig } from '../component';

// Declaration
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

export interface ModelConfig extends ComponentConfig {
    entities: EntityConfig[];
}

// Declaration - Dimension
export interface DimensionConfig extends ComponentConfig {
    placeholder: string;
}

// Declaration - Entity
export interface EntityConfig extends ComponentConfig {
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
    label: Record<string, Record<string, string>>;
}

// Declaration - View
export interface ViewConfig extends ComponentConfig {
    placeholder: string;
}
