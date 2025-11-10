/**
 * Micromark composable.
 */

// Dependencies - Vendor.
import type { micromark } from 'micromark';
import type prism from 'prismjs';

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

// Composables - Use Micromark.
export function useMicromark() {
    // Operations - ????
    function getStuff() {
        return { micromark: micromarkModule, prism: prismModule };
    }

    // Operations - Render.
    async function render() {
        await loadMicromarkAndPrism();
    }

    // Utilities - Load Micromark and Prism.
    async function loadMicromarkAndPrism(): Promise<void> {
        if (micromarkModule && prismModule) return;
        const modules = await Promise.all([
            import(/* @vite-ignore */ MICROMARK_DOWNLOAD_URL_),
            import(/* @vite-ignore */ PRISM_DOWNLOAD_URL),
            import(/* @vite-ignore */ PRISM_JAVASCRIPT_URL),
            import(/* @vite-ignore */ PRISM_JSON_URL)
        ]);

        micromarkModule = modules[0].micromark;
        prismModule = modules[1].default;
    }

    // Exposures
    return { getStuff, render };
}
