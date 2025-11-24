/**
 * Presenter composables, constants, errors, types/interfaces and utilities.
 */

// Dependencies - Framework.
import type { Component, ComponentRef, ModuleConfig } from '@/component';

// Types/Interfaces - Presenter.
export interface Presenter extends Component {
    readonly config: PresenterConfig;

    list(): ComponentRef[]; // TODO: Do we need this. Configuration contains list.
    render(presentationPath: string, renderTo: HTMLElement, data?: unknown): Promise<void>;
    setColorMode(colorModeId: string): void;
}

// Types/Interfaces - Presenter configuration.
export interface PresenterConfig extends ModuleConfig {
    presentations: ComponentRef[];
    typeId: 'presenter';
}
export type PresenterModuleOperation = 'list' | 'render' | 'setColorMode';
export type PresenterLocalisedConfig = Omit<PresenterConfig, 'label' | 'description'> & { label: string; description: string };
