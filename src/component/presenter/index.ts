/**
 * Presenter composables, constants, errors, types/interfaces and utilities.
 */

// Dependencies - Vendor.
import type { micromark } from 'micromark';
import type { gfm, gfmHtml } from 'micromark-extension-gfm';
import type { math, mathHtml } from 'micromark-extension-math';

// Dependencies - Framework.
import type { Module } from '@/module';
import type { Component, ComponentConfig, ComponentRef } from '@/component';

// Types/Interfaces - Presenter.
export interface Presenter extends Module, Component {
    readonly config: PresenterConfig;
    readonly tools: PresenterTools;

    list(): ComponentRef[];
    render(presentationPath: string, renderTo: HTMLElement, data?: unknown): Promise<void>;
}

// Types/Interfaces - Presenter configuration.
export interface PresenterConfig extends ComponentConfig {
    presentations: ComponentRef[];
    version: string;
}
export type PresenterLocalisedConfig = Omit<PresenterConfig, 'label' | 'description'> & { label: string; description: string };

// Types/Interfaces - Presenter tools.
export type PresenterTools = {
    gfmExtension: typeof gfm;
    gfmHtmlExtension: typeof gfmHtml;
    mathExtension: typeof math;
    mathHtmlExtension: typeof mathHtml;
    micromark: typeof micromark;
};
