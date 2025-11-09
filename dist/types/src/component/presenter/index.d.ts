import { default as MarkdownIt } from 'markdown-it';
import { micromark } from 'micromark';
import { default as prism } from 'prismjs';
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
    MarkdownIt: typeof MarkdownIt;
    micromark: typeof micromark;
    prism: typeof prism;
};
