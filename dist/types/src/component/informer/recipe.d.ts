import { ComponentConfig } from '..';
export interface Recipe {
    readonly config: RecipeConfig;
    list(path: string): RecipeItemConfig[];
    render(id: string, renderTo: string | HTMLElement): Promise<void>;
}
export interface RecipeConfig extends ComponentConfig {
    version: string;
}
export type RecipeLocalisedConfig = Omit<RecipeConfig, 'label' | 'description'> & {
    label: string;
    description: string;
};
export interface RecipeItemConfig {
    items?: RecipeItemConfig[];
    label: Record<string, string>;
    name: string;
    typeId: 'folder' | 'object';
}
