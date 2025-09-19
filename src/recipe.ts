// Dependencies - Framework
import type { ComponentConfig } from './component';

// Interfaces/Types - Presenter
export interface Recipe {
    readonly config: RecipeConfig;

    list(path: string): RecipeItemConfig[];
    render(id: string, renderTo: string | HTMLElement): Promise<void>;
}

// Interfaces/Types - Recipe Configuration
export interface RecipeConfig extends ComponentConfig {
    index: RecipeItemConfig[];
}

// Interfaces/Types - Recipe Item Configuration
export interface RecipeItemConfig {
    items?: RecipeItemConfig[];
    label: Record<string, string>;
    name: string;
    typeId: 'folder' | 'object'; // TODO: Maybe standardise.
}
