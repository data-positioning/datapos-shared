import { Component, ComponentRef, ModuleConfig } from '..';
export interface Presenter extends Component {
    readonly config: PresenterConfig;
    list(): ComponentRef[];
    render(presentationPath: string, renderTo: HTMLElement, data?: unknown): Promise<void>;
    setColorMode(colorModeId: string): void;
}
export interface PresenterConfig extends ModuleConfig {
    presentations: ComponentRef[];
    operations: PresenterOperation[];
    typeId: 'presenter';
}
export type PresenterOperation = 'list' | 'render' | 'setColorMode';
export type PresenterLocalisedConfig = Omit<PresenterConfig, 'label' | 'description'> & {
    label: string;
    description: string;
};
