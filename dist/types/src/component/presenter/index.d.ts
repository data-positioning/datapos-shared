import { micromark } from 'micromark';
import { gfm, gfmHtml } from 'micromark-extension-gfm';
import { Module } from '../../module';
import { Component, ComponentConfig, ComponentRef } from '..';
export interface Presenter extends Module, Component {
    readonly config: PresenterConfig;
    readonly tools: PresenterTools;
    list(): ComponentRef[];
    render(presentationPath: string, renderTo: HTMLElement, data?: unknown): Promise<void>;
}
export interface PresenterConfig extends ComponentConfig {
    presentations: ComponentRef[];
    version: string;
}
export type PresenterLocalisedConfig = Omit<PresenterConfig, 'label' | 'description'> & {
    label: string;
    description: string;
};
export type PresenterTools = {
    gfmExtension: typeof gfm;
    gfmHtmlExtension: typeof gfmHtml;
    micromark: typeof micromark;
};
