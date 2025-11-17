// Dependencies - Framework.
import type { PresentationVisualContentConfig, PresentationVisualValueTableViewType } from '@/index';

// Composables - Use data table.
export function useDataTable() {
    // Operations - Render.
    function render(viewType: PresentationVisualValueTableViewType, contentConfig: PresentationVisualContentConfig, element: HTMLElement) {
        console.log(1111, viewType);
        console.log(2222, contentConfig);
        console.log(3333, element);
        console.log(4444, element.childNodes);
        console.log(5555, element.children);
    }

    // Exposures
    return { render };
}
