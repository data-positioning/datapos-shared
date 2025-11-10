import { PresentationView, PresentationVisualContentConfig } from '../index';
export interface CytoscapeJSView extends PresentationView {
    diagram: unknown;
}
export declare function useMicromark(): {
    render: (viewType: unknown, contentConfig: PresentationVisualContentConfig, element: HTMLElement) => Promise<void>;
};
