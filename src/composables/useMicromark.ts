/**
 * Micromark composable.
 */

// Dependencies - Vendor.
import type { micromark } from 'micromark';
import type { gfm, gfmHtml } from 'micromark-extension-gfm';
import type { math, mathHtml } from 'micromark-extension-math';

// Constants
const MICROMARK_VERSION = 4;
const MICROMARK_DOWNLOAD_URL_ = `https://cdn.jsdelivr.net/npm/micromark@${MICROMARK_VERSION}/+esm`;
const GFM_EXTENSION_VERSION = 3;
const GFM_EXTENSION_DOWNLOAD_URL = `https://cdn.jsdelivr.net/npm/micromark-extension-gfm@${GFM_EXTENSION_VERSION}/+esm`;
const MATH_EXTENSION_VERSION = 3;
const MATH_EXTENSION_DOWNLOAD_URL = `https://cdn.jsdelivr.net/npm/micromark-extension-math@${MATH_EXTENSION_VERSION}/+esm`;
const PRISM_VERSION = 1;
const PRISM_DOWNLOAD_URL = `https://cdn.jsdelivr.net/npm/prismjs@${PRISM_VERSION}/+esm`;
// const PRISM_JSON_URL = `https://cdn.jsdelivr.net/npm/prismjs@${PRISM_DOWNLOAD_VERSION}/components/prism-json.min.js`;

// Types/Interfaces
type MicromarkTools = { gfmExtension: typeof gfm; gfmHtmlExtension: typeof gfmHtml; mathExtension: typeof math; mathHtmlExtension: typeof mathHtml; micromark: typeof micromark };

// Module Variables
let micromarkFunction: typeof micromark | undefined = undefined;
let gfmExtensionFunction: typeof gfm | undefined = undefined;
let gfmHtmlExtensionFunction: typeof gfmHtml | undefined = undefined;
let mathExtensionFunction: typeof math | undefined = undefined;
let mathHtmlExtensionFunction: typeof mathHtml | undefined = undefined;

// Composables - Use Micromark.
export function useMicromark() {
    // Operations - Get tools.
    async function getTools(): Promise<MicromarkTools> {
        await loadMicromarkAndPrism();
        return {
            gfmExtension: gfmExtensionFunction!,
            gfmHtmlExtension: gfmHtmlExtensionFunction!,
            mathExtension: mathExtensionFunction!,
            mathHtmlExtension: mathHtmlExtensionFunction!,
            micromark: micromarkFunction!
        };
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
            import(/* @vite-ignore */ MATH_EXTENSION_DOWNLOAD_URL),
            import(/* @vite-ignore */ PRISM_DOWNLOAD_URL)
        ]);
        micromarkFunction = modules[0].micromark;
        gfmExtensionFunction = modules[1].gfm;
        gfmHtmlExtensionFunction = modules[1].gfmHtml;
        mathExtensionFunction = modules[2].math;
        mathHtmlExtensionFunction = modules[2].mathHtml;

        // if (!globalThis.Prism) return; // This is purely defensive.
        // await Promise.all([ import(/* @vite-ignore */ PRISM_JSON_URL)]);
    }

    // Exposures
    return { getTools, render };
}
