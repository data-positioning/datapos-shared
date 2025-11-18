import { Component, ComponentRef, ModuleConfig } from '..';
export interface Presenter extends Component {
    readonly config: PresenterConfig;
    list(): ComponentRef[];
    render(presentationPath: string, renderTo: HTMLElement, data?: unknown): Promise<void>;
}
export interface PresenterConfig extends ModuleConfig {
    presentations: ComponentRef[];
    typeId: 'presenter';
}
export type PresenterModuleOperation = 'list' | 'render';
export type PresenterLocalisedConfig = Omit<PresenterConfig, 'label' | 'description'> & {
    label: string;
    description: string;
};
