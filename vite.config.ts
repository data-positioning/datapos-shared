/**
 * Vite configuration.
 */

// Dependencies - Vendor.
import { defineConfig } from 'vite'; // Core Vite API.
import dts from 'vite-plugin-dts'; // Emit .d.ts files alongside the bundle.
import type { PackageJson } from 'type-fest';
import Sonda from 'sonda/vite'; // Visualize bundle results with Sonda plugin.
import { visualizer } from 'rollup-plugin-visualizer'; // Generate bundle size report.
import { fileURLToPath, URL } from 'node:url'; // ESM-safe path helpers.

// Dependencies - Data.
import config from './config.json' with { type: 'json' }; // Provide configuration identifier for naming.
import package_ from './package.json' with { type: 'json' }; // Provide package for peer dependency detection.

// Initialisation
const { peerDependencies } = package_ as PackageJson;
const external = peerDependencies ? Object.keys(peerDependencies) : []; // Keep peer dependencies out of the bundle.

// Exposures - Configuration.
export default defineConfig({
    build: {
        lib: {
            entry: {
                index: fileURLToPath(new URL('src/index.ts', import.meta.url)), // Absolute entry path.
                utilities: fileURLToPath(new URL('src/utilities/index.ts', import.meta.url))
            },
            fileName: (format) => `${config.id}.${format}.js`, // Bundle name derived from config identifier and format.
            formats: ['es'] // Only emit native ES modules.
        },
        rollupOptions: {
            external,
            plugins: [
                Sonda({
                    filename: 'index', // Output file name.
                    format: 'html', // Output file format.
                    gzip: true, // Include gzip sizes.
                    brotli: true, // Include brotli sizes.
                    open: false, // Do not auto-open browser post-build.
                    outputDir: './bundle-analysis-reports/sonda' // Output directory.
                }), // Run Sonda analyser to generate additional bundle insights.
                visualizer({
                    filename: './bundle-analysis-reports/rollup-visualiser/index.html', // Output file path.
                    open: false, // Do not auto-open browser post-build.
                    gzipSize: true, // Include gzip sizes.
                    brotliSize: true // Include brotli sizes.
                })
            ]
        },
        target: 'ESNext' // Emit modern JavaScript for consumers.
    },
    plugins: [dts({ outDir: 'dist/types' })], // Generate type declarations in dist/types.
    resolve: {
        alias: {
            '~': fileURLToPath(new URL('./', import.meta.url)), // Base alias matching tsconfig.
            '@': fileURLToPath(new URL('src', import.meta.url)) // Source alias matching tsconfig.
        }
    }
});
