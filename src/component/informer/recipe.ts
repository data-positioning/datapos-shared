// Dependencies - Framework
import type { ComponentConfig } from '@/component';

// Types/Interfaces - Presenter
export interface Recipe {
    readonly config: RecipeConfig;

    list(path: string): RecipeItemConfig[];
    render(id: string, renderTo: string | HTMLElement): Promise<void>;
}

// Types/Interfaces - Recipe Configuration
export interface RecipeConfig extends ComponentConfig {
    // index: RecipeItemConfig[];
    version: string;
}
export type RecipeLocalisedConfig = Omit<RecipeConfig, 'label' | 'description'> & { label: string; description: string };

// Types/Interfaces - Recipe Item Configuration
export interface RecipeItemConfig {
    items?: RecipeItemConfig[];
    label: Record<string, string>;
    name: string;
    typeId: 'folder' | 'object'; // TODO: Maybe standardise.
}
