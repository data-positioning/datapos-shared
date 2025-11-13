/**
 * Presenter composables, constants, errors, types/interfaces and utilities.
 */

// Dependencies - Framework.
import type { Module } from '@/module';
import type { Component, ComponentConfig, ComponentRef } from '@/component';

// Types/Interfaces - Presenter.
export interface Presenter extends Module, Component {
    readonly config: PresenterConfig;

    list(): ComponentRef[];
    render(presentationPath: string, renderTo: HTMLElement, data?: unknown): Promise<void>;
}

// Types/Interfaces - Presenter configuration.
export interface PresenterConfig extends ComponentConfig {
    presentations: ComponentRef[];
    version: string;
}
export type PresenterLocalisedConfig = Omit<PresenterConfig, 'label' | 'description'> & { label: string; description: string };
