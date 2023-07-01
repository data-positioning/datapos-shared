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

export interface ModelConfig {
    id: string;
    label: Record<string, string>;
}
