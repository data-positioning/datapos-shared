/**
 * Micromark composable.
 */

// Dependencies - Vendor.
import type { gfm } from 'micromark-extension-gfm';
import type { micromark } from 'micromark';

// Constants
const MICROMARK_VERSION = 4;
const MICROMARK_DOWNLOAD_URL_ = `https://cdn.jsdelivr.net/npm/micromark@${MICROMARK_VERSION}/+esm`;
const GFM_EXTENSION_VERSION = 3;
const GFM_EXTENSION_DOWNLOAD_URL = `https://cdn.jsdelivr.net/npm/micromark-extension-gfm@${GFM_EXTENSION_VERSION}/+esm`;
const PRISM_VERSION = 1;
const PRISM_DOWNLOAD_URL = `https://cdn.jsdelivr.net/npm/prismjs@${PRISM_VERSION}/+esm`;
// const PRISM_JSON_URL = `https://cdn.jsdelivr.net/npm/prismjs@${PRISM_DOWNLOAD_VERSION}/components/prism-json.min.js`;

// Module Variables
let micromarkFunction: typeof micromark | undefined = undefined;
let gfmExtensionFunction: typeof gfm | undefined = undefined;

// Composables - Use Micromark.
export function useMicromark() {
    // Operations - ????
    async function getStuff(): Promise<{ gfmExtension: typeof gfm; micromark: typeof micromark }> {
        await loadMicromarkAndPrism();
        return { gfmExtension: gfmExtensionFunction!, micromark: micromarkFunction! };
    }

    // Operations - Render.
    async function render() {
        await loadMicromarkAndPrism();
    }

    // Utilities - Load Micromark, Micromark extensions and Prism.
    async function loadMicromarkAndPrism(): Promise<void> {
        if (micromarkFunction && gfmExtensionFunction) return;

        const modules = await Promise.all([
            import(/* @vite-ignore */ MICROMARK_DOWNLOAD_URL_),
            import(/* @vite-ignore */ GFM_EXTENSION_DOWNLOAD_URL),
            import(/* @vite-ignore */ PRISM_DOWNLOAD_URL)
        ]);
        micromarkFunction = modules[0].micromark;
        gfmExtensionFunction = modules[1].gfm;

        // if (!globalThis.Prism) return;
        // await Promise.all([ import(/* @vite-ignore */ PRISM_JSON_URL)]);
    }

    // Exposures
    return { getStuff, render };
}
