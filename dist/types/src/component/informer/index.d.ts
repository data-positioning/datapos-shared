import { Module } from '../../module';
import { Component, ComponentConfig, ComponentRef } from '..';
export interface Informer extends Module, Component {
    readonly config: InformerConfig;
    readonly tools: InformerTools;
    list(): ComponentRef[];
    render(informerPath: string, renderTo: HTMLElement, data?: unknown): Promise<void>;
}
export interface InformerConfig extends ComponentConfig {
    version: string;
}
export type InformerLocalisedConfig = Omit<InformerConfig, 'label' | 'description'> & {
    label: string;
    description: string;
};
export type InformerTools = {};
