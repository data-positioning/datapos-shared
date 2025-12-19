// Dependencies - Vendor.

// Dependencies - Framework.
import type { PresentationView, PresentationVisualContentConfig } from '@/index';

// Types/Interfaces - Cytoscape.js view.
export interface CytoscapeJSView extends PresentationView {
    diagram: unknown;
}

// Composables - Use Cytoscape.js.
export function useCytoscapeJS(): { render: (viewType: unknown, contentConfig: PresentationVisualContentConfig, element: HTMLElement) => void } {
    // Exposures
    return { render };
}

// Operations - Render.
function render(viewType: unknown, contentConfig: PresentationVisualContentConfig, element: HTMLElement): void {
    element.textContent = 'Cytoscape.js diagram goes here...';
}
