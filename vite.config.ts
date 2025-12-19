/**
 * Vite configuration.
 */

// Dependencies - Vendor.
import { defineConfig } from 'vite'; // Core Vite API.
import dts from 'vite-plugin-dts'; // Emit .d.ts files alongside the bundle.
import type { PackageJson } from 'type-fest';
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
            entry: fileURLToPath(new URL('src/index.ts', import.meta.url)), // Absolute entry path.
            fileName: (format) => `${config.id}.${format}.js`, // Bundle name derived from config identifier and format.
            formats: ['es'] // Only emit native ES modules.
        },
        rollupOptions: {
            external,
            plugins: [
                visualizer({
                    filename: 'stats.html', // Write report to stats.html in project root.
                    open: false, // Do not auto-open browser post-build.
                    gzipSize: true, // Display gzip sizes.
                    brotliSize: true // Display brotli sizes.
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
