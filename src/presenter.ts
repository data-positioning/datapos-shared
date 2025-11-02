// Dependencies - Vendor.
import type markdownIt from 'markdown-it';

// Dependencies - Framework.
import type { ComponentConfig, ComponentRef } from '@/component';

// Interfaces/Types - Presenter.
export interface Presenter {
    readonly config: PresenterConfig;
    readonly tools: PresenterTools;

    list(): ComponentRef[];
    render(presentationPath: string, renderTo: HTMLElement): Promise<void>;
}
export interface PresenterConfig extends ComponentConfig {
    presentations: ComponentRef[];
    version: string;
}
export type PresenterLocalisedConfig = Omit<PresenterConfig, 'label' | 'description'> & { label: string; description: string };
export type PresenterTools = { markdownIt: typeof markdownIt };

// Interface/Types - Presentation Configuration
export interface PresentationConfig extends ComponentConfig {
    attributes: { label: Record<string, string>; description: Record<string, string>; order: number }; // TODO: Change code so we can remove this.
    content: string;
    order: number;
}

// Interfaces/Types - Presentation view.
export interface PresentationView {
    resize: () => void;
    vendorId: string;
}
