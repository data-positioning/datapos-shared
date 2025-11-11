/**
 * Informer composables, constants, errors, types/interfaces and utilities.
 */

// Dependencies - Framework.
import type { Module } from '@/module';
import type { Component, ComponentConfig, ComponentRef } from '@/component';

// Types/Interfaces - Informer.
export interface Informer extends Module, Component {
    readonly config: InformerConfig;
    readonly tools: InformerTools;

    list(): ComponentRef[];
    render(informerPath: string, renderTo: HTMLElement, data?: unknown): Promise<void>;
}

// Types/Interfaces - Informer configuration.
export interface InformerConfig extends ComponentConfig {
    version: string;
}
export type InformerLocalisedConfig = Omit<InformerConfig, 'label' | 'description'> & { label: string; description: string };

// Types/Interfaces - Informer tools.
export type InformerTools = {};
