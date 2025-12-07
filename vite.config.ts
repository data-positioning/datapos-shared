/**
 * Vite configuration.
 */

// Dependencies - Vendor.
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import pkg from './package.json' with { type: 'json' };
import { resolve } from 'path';
import { fileURLToPath, URL } from 'node:url';

// Initialisation
const external = [...Object.keys(pkg.peerDependencies ?? {})];

// Exposures - Configuration.
export default defineConfig({
    build: {
        lib: {
            entry: {
                index: resolve('src/index.ts'),
                schemas: resolve('src/schemas.ts')
            },
            fileName: (format, entryName) => {
                if (entryName === 'index') return 'datapos-shared.es.js';
                if (entryName === 'schemas') return 'schemas.js';
                return `${entryName}.${format}.js`;
            },
            formats: ['es'],
            name: 'DataPosShared'
        },
        rollupOptions: { external },
        target: 'ESNext'
    },
    plugins: [
        dts({
            outDir: 'dist/types',
            entryRoot: 'src',
            tsconfigPath: 'tsconfig.json'
        })
    ],
    resolve: {
        alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
    }
});
