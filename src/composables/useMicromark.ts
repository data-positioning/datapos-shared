/**
 * Micromark and Prism composable..
 */

// Dependencies - Vendor.
import type { micromark } from 'micromark';
import type prism from 'prismjs';

// Dependencies - Framework.
import type { PresentationView, PresentationVisualContentConfig } from '@/index';

// Interfaces/Types - Cytoscape.js view.
export interface CytoscapeJSView extends PresentationView {
    diagram: unknown;
}

// Constants
const MICROMARK_DOWNLOAD_RELEASE = 4;
const MICROMARK_DOWNLOAD_URL_ = `https://cdn.jsdelivr.net/npm/micromark@${MICROMARK_DOWNLOAD_RELEASE}/+esm`;
const PRISM_DOWNLOAD_RELEASE = 1;
const PRISM_DOWNLOAD_URL = `https://cdn.jsdelivr.net/npm/prismjs@${PRISM_DOWNLOAD_RELEASE}/+esm`;
const PRISM_JAVASCRIPT_URL = `https://cdn.jsdelivr.net/npm/prismjs@${PRISM_DOWNLOAD_RELEASE}/components/prism-javascript.min.js`;
const PRISM_JSON_URL = `https://cdn.jsdelivr.net/npm/prismjs@${PRISM_DOWNLOAD_RELEASE}/components/prism-javascript.min.js`;

// Module Variables
let micromarkModule: typeof micromark | undefined = undefined;
let prismModule: typeof prism | undefined = undefined;

// Composables - Use Micromark and Prism.
export function useMicromark() {
    // Operations - Render.
    async function render(viewType: unknown, contentConfig: PresentationVisualContentConfig, element: HTMLElement) {
        await loadMicromarkAndPrism();

        element.textContent = 'Micromark & Prism content goes here...';
    }

    // Utilities - Load Micromark and Prism.
    async function loadMicromarkAndPrism(): Promise<void> {
        if (micromarkModule && prismModule) return;
        micromarkModule = await import(/* @vite-ignore */ MICROMARK_DOWNLOAD_URL_);
        prismModule = await import(/* @vite-ignore */ PRISM_DOWNLOAD_URL);
        await import(/* @vite-ignore */ PRISM_JAVASCRIPT_URL);
        await import(/* @vite-ignore */ PRISM_JSON_URL);

        console.log('micromarkModule', micromarkModule);
        console.log('prismModule', prismModule);
    }

    // Exposures
    return { micromarkModule, prismModule, render };
}
