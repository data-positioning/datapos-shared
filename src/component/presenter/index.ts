/**
 * Presenter composables, constants, errors, types/interfaces and utilities.
 */

// Dependencies - Vendor.
import type { gfm } from 'micromark-extension-gfm';
import type { micromark } from 'micromark';

// Dependencies - Framework.
import type { Module } from '@/module';
import type { Component, ComponentConfig, ComponentRef } from '@/component';

// Interfaces/Types - Presenter.
export interface Presenter extends Module, Component {
    readonly config: PresenterConfig;
    readonly tools: PresenterTools;

    list(): ComponentRef[];
    render(presentationPath: string, renderTo: HTMLElement, data?: unknown): Promise<void>;
}

// Interfaces/Types - Presenter configuration.
export interface PresenterConfig extends ComponentConfig {
    presentations: ComponentRef[];
    version: string;
}
export type PresenterLocalisedConfig = Omit<PresenterConfig, 'label' | 'description'> & { label: string; description: string };

// Interfaces/Types - Presenter tools.
export type PresenterTools = { gfmExtension: typeof gfm; micromark: typeof micromark };
