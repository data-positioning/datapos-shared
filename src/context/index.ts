import type { ComponentConfig } from '../component';

// Config
export interface ContextConfig extends ComponentConfig {
    focuses: ContextFocusReference[];
}
interface ContextFocusReference {
    id: string;
    label: Record<string, string>;
    models: ContextModelReference[];
}
interface ContextModelReference {
    id: string;
    label: Record<string, string>;
}

// Config - Context Model
export interface ContextModelConfig extends ComponentConfig {
    dimensions: ContextDimensionConfig[];
    entities: ContextEntityConfig[];
    views: ContextViewConfig[];
}

// Config - Dimension
export interface ContextDimensionConfig extends ComponentConfig {
    id: string;
    hierarchies: ContextHierarchyConfig[];
    label: Record<string, string>;
}
export interface ContextHierarchyConfig extends ComponentConfig {
    id: string;
    label: Record<string, string>;
}

// Config - Entity
export interface ContextEntityConfig extends ComponentConfig {
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

// Config - View
export interface ContextViewConfig extends ComponentConfig {
    placeholder: string;
}

// ...
export interface Event {
    id?: number;
    entityId: string;
    effDate: number;
    typeId: string;
}
