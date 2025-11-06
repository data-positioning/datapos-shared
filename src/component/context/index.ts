/**
 * Context composables, constants, interfaces, errors, types and utilities.
 */

// Dependencies - Framework.
import type { ComponentConfig, ComponentRef } from '@/component';

// Interfaces/Types/Operations - Context.
export interface Context {
    readonly config: ContextConfig;
    list(settings?: ContextListSettings): Promise<ContextListResult>;
}
export type ContextOperationSettings = {}; // TODO.
export type ContextListSettings = {}; // TODO.
export type ContextListResult = { models: ContextModelGroupConfig[] };
export type ContextCallbackData = { typeId: string; properties: Record<string, unknown> };

// Interfaces/Types/Operations - Context configuration.
export interface ContextConfig extends ComponentConfig {
    models: ContextModelGroupConfig[];
    version: string;
}
export type ContextLocalisedConfig = Omit<ContextConfig, 'label' | 'description'> & { label: string; description: string };

// Interfaces/Types/Operations - Context model configuration
export interface ContextModelGroupConfig extends ComponentConfig {
    modelRefs: ComponentRef[];
    order: number;
}
export type ContextModelGroupLocalisedConfig = Omit<ContextModelGroupConfig, 'label' | 'description'> & { label: string; description: string };
export interface ContextModelConfig extends ComponentConfig {
    diagramURL?: string;
    dimension: ContextModelDimensionGroupConfig[];
    entities: ContextModelEntityGroupConfig[];
    secondaryMeasures: ContextModelSecondaryMeasureGroupConfig[];
}
export type ContextModelLocalisedConfig = Omit<ContextModelConfig, 'label' | 'description'> & { label: string; description: string };

// Interfaces/Types/Operations - Context model dimension configuration.
export interface ContextModelDimensionGroupConfig {
    id: string;
    label: Record<string, string>;
    description?: Record<string, unknown>;
    dimensionRefs: ComponentRef[];
}
export type ContextModelDimensionGroupLocalisedConfig = Omit<ContextModelDimensionGroupConfig, 'label' | 'description'> & { label: string; description: string };
export interface ContextModelDimensionConfig {
    id: string;
    label: Record<string, string>;
    hierarchies: ContextModelDimensionHierarchyConfig[];
}
export type ContextModelDimensionLocalisedConfig = Omit<ContextModelDimensionConfig, 'label' | 'description'> & { label: string; description: string };
export interface ContextModelDimensionHierarchyConfig {
    id: string;
    label: Record<string, string>;
}
export type ContextModelDimensionHierarchyLocalisedConfig = Omit<ContextModelDimensionHierarchyConfig, 'label' | 'description'> & { label: string; description: string };

// Interfaces/Types/Operations - Context model entity configuration.
export interface ContextModelEntityGroupConfig {
    id: string;
    label: Record<string, string>;
    description?: Record<string, unknown>;
    entityRefs: ComponentRef[];
}
export type ContextModelEntityGroupLocalisedConfig = Omit<ContextModelEntityGroupConfig, 'label' | 'description'> & { label: string; description: string };
export interface ContextModelEntityConfig {
    id: string;
    label: Record<string, string>;
    labelPlural: Record<string, string>;
    dataItems: ContextModelEntityDataItemConfig[];
    events: ContextModelEntityEventConfig[];
    primaryMeasures: ContextModelEntityPrimaryMeasureConfig[];
}
export type ContextModelEntityLocalisedConfig = Omit<ContextModelEntityConfig, 'label' | 'description'> & { label: string; description: string };
export interface ContextModelEntityDataItemConfig {
    id: string;
    label: Record<string, string>;
}
export type ContextModelEntityDataItemLocalisedConfig = Omit<ContextModelEntityDataItemConfig, 'label' | 'description'> & { label: string; description: string };
export interface ContextModelEntityEventConfig {
    id: string;
    labelAction: Record<string, string>;
    labelState: Record<string, string>;
}
export type ContextModelEntityEventLocalisedConfig = Omit<ContextModelEntityEventConfig, 'label' | 'description'> & { label: string; description: string };
export interface ContextModelEntityPrimaryMeasureConfig {
    id: string;
    label: Record<string, string>;
}
export type ContextModelEntityPrimaryMeasureLocalisedConfig = Omit<ContextModelEntityPrimaryMeasureConfig, 'label' | 'description'> & { label: string; description: string };

// Interfaces/Types/Operations - Context model secondary measure configuration.
export interface ContextModelSecondaryMeasureGroupConfig {
    id: string;
    label: Record<string, string>;
    description?: Record<string, unknown>;
    secondaryMeasureRefs: ComponentRef[];
}
export type ContextModelSecondaryMeasureGroupLocalisedConfig = Omit<ContextModelSecondaryMeasureGroupConfig, 'label' | 'description'> & { label: string; description: string };
export interface ContextModelSecondaryMeasureConfig {
    id: string;
    label: Record<string, string>;
}
export type ContextModelSecondaryMeasureLocalisedConfig = Omit<ContextModelSecondaryMeasureConfig, 'label' | 'description'> & { label: string; description: string };

// Interfaces/Types/Operations - Event.
type Event = {
    id?: number;
    entityId: string;
    effDate: number;
    typeId: string;
};
