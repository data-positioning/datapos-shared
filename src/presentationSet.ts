// Dependencies - Framework
import type { ComponentConfig, ComponentItemTypeId } from './component';

// Interfaces/Types - Presentation Set
export interface PresentationSet {
    readonly config: PresentationSetConfig;

    getIndex(): PresentationItemConfig[];
    render(id: string, renderTo: string | HTMLElement): Promise<void>;
}

// Interfaces/Types - Presentation Set Configuration
export interface PresentationSetConfig extends ComponentConfig {
    placeholder?: string;
}

// Interfaces/Types - Presentation Item Configuration
export interface PresentationItemConfig {
    children: PresentationItemConfig[];
    id: string;
    label: string;
    typeId: ComponentItemTypeId;
}
