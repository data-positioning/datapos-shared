/**
 * Vite configuration.
 */

// Dependencies - Vendor.
import config from './config.json';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import pkg from './package.json' with { type: 'json' };
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { fileURLToPath, URL } from 'node:url';

// Initialisation
const external = [...Object.keys(pkg.peerDependencies ?? {})];

// Exposures - Configuration.
export default defineConfig({
    build: {
        lib: {
            entry: resolve('src/index.ts'),
            fileName: (format) => `${config.id}.${format}.js`,
            formats: ['es'],
            name: 'DataPosShared'
        },
        rollupOptions: {
            external,
            plugins: [
                visualizer({
                    filename: 'stats/index.html', // HTML report.
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
        alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
    }
});
