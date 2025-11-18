/**
 * Presenter composables, constants, errors, types/interfaces and utilities.
 */

// Dependencies - Framework.
import type { Component, ComponentRef, ModuleConfig } from '@/component';

// Types/Interfaces - Presenter.
export interface Presenter extends Component {
    readonly config: PresenterConfig;

    list(): ComponentRef[];
    render(presentationPath: string, renderTo: HTMLElement, data?: unknown): Promise<void>;
}

// Types/Interfaces - Presenter configuration.
export interface PresenterConfig extends ModuleConfig {
    presentations: ComponentRef[];
    typeId: 'presenter';
}
export type PresenterModuleOperation = 'list' | 'render';
export type PresenterLocalisedConfig = Omit<PresenterConfig, 'label' | 'description'> & { label: string; description: string };
