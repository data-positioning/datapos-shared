// Dependencies - Vendor.

// Dependencies - Framework.
import type { PresentationVisualContentConfig } from '@/component/presenter/presentation';

// Composables - Use data table.
export function useDataTable(): { render: (contentConfig: PresentationVisualContentConfig, element: HTMLElement) => void } {
    // Exposures
    return { render };
}

// Operations - Render.
function render(contentConfig: PresentationVisualContentConfig, element: HTMLElement): void {
    console.log(1111, contentConfig);
    console.log(2222, element);
    console.log(3333, element.childNodes);
    console.log(4444, element.children);
}
