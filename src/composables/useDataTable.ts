// Dependencies - Framework.
import type { PresentationVisualContentConfig, PresentationVisualValueTableViewType } from '@/index';

// Composables - Use data table.
export function useDataTable() {
    // Operations - Render.
    function render(viewType: PresentationVisualValueTableViewType, contentConfig: PresentationVisualContentConfig, element: HTMLElement) {
        element.textContent = 'values table goes here...';
    }

    // Exposures
    return { render };
}
