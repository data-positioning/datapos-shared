/**
 * Vite configuration.
 */

// Dependencies - Vendor.
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import { fileURLToPath, URL } from 'node:url';

// Exposures - Configuration.
export default defineConfig({
    build: {
        lib: {
            entry: resolve('src/index.ts'),
            fileName: (format) => `datapos-shared.${format}.js`,
            formats: ['es'],
            name: 'DataPosShared'
        },
        target: 'ESNext'
    },
    plugins: [dts({ outDir: 'dist/types' })],
    resolve: {
        alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
    }
});
