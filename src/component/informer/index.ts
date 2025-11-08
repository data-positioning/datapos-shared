/**
 * Informer composables, constants, errors, types/interfaces and utilities.
 */

// Dependencies - Vendor.
import type markdownIt from 'markdown-it';

// Dependencies - Framework.
import type { Module } from '@/module';
import type { Component, ComponentConfig, ComponentRef } from '@/component';

// Interfaces/Types - Informer.
export interface Informer extends Module, Component {
    readonly config: InformerConfig;
    readonly tools: InformerTools;

    list(): ComponentRef[];
    render(informerPath: string, renderTo: HTMLElement, data?: unknown): Promise<void>;
}

// Interfaces/Types - Informer configuration.
export interface InformerConfig extends ComponentConfig {
    version: string;
}
export type InformerLocalisedConfig = Omit<InformerConfig, 'label' | 'description'> & { label: string; description: string };

// Interfaces/Types - Informer tools.
export type InformerTools = { markdownIt: typeof markdownIt };
