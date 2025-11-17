// Dependencies - Framework.
import type { PresentationVisualContentConfig } from '@/index';

// Composables - Use data table.
export function useDataTable() {
    // Operations - Render.
    function render(contentConfig: PresentationVisualContentConfig, element: HTMLElement) {
        console.log(1111, contentConfig);
        console.log(2222, element);
        console.log(3333, element.childNodes);
        console.log(4444, element.children);
    }

    // Exposures
    return { render };
}
