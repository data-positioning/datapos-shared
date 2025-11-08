import { PresentationView, PresentationVisualContentConfig } from '../index';
export interface CytoscapeJSView extends PresentationView {
    diagram: unknown;
}
export declare function useCytoscapeJS(): {
    render: (viewType: unknown, contentConfig: PresentationVisualContentConfig, element: HTMLElement) => void;
};
