import { micromark } from 'micromark';
import { default as prism } from 'prismjs';
import { PresentationView, PresentationVisualContentConfig } from '../index';
export interface CytoscapeJSView extends PresentationView {
    diagram: unknown;
}
export declare function useMicromark(): {
    micromarkModule: typeof micromark | undefined;
    prismModule: typeof prism | undefined;
    render: (viewType: unknown, contentConfig: PresentationVisualContentConfig, element: HTMLElement) => Promise<void>;
};
