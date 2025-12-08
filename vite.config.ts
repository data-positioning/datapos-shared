/**
 * Vite configuration.
 */

// Dependencies - Vendor.
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { visualizer } from 'rollup-plugin-visualizer';
import { fileURLToPath, URL } from 'node:url';

// Dependencies - Data.
import config from './config.json' with { type: 'json' };
import pkg from './package.json' with { type: 'json' };

// Initialisation
const external = [...Object.keys(pkg.peerDependencies ?? {})]; // Keep peer dependencies out of the bundle.

// Exposures - Configuration.
export default defineConfig({
    build: {
        lib: {
            entry: fileURLToPath(new URL('src/index.ts', import.meta.url)),
            fileName: (format) => `${config.id}.${format}.js`,
            formats: ['es']
        },
        rollupOptions: {
            external,
            plugins: [
                visualizer({
                    filename: 'stats.html', // HTML report.
                    open: false, // Automatically opens in browser.
                    gzipSize: true, // Show gzip sizes.
                    brotliSize: true // Show brotli sizes.
                })
            ]
        },
        target: 'ESNext'
    },
    plugins: [dts({ outDir: 'dist/types' })],
    resolve: {
        alias: {
            '~': fileURLToPath(new URL('./', import.meta.url)),
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
});
