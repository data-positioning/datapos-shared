import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
    build: {
        lib: {
            entry: resolve('src/index.ts'),
            fileName: (format) => `datapos-share-core.${format}.js`,
            formats: ['es'],
            name: 'DataposShareCore'
        },
        target: 'ESNext'
    },
    plugins: [dts({ outDir: 'dist/types' })],
    resolve: {
        alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
    }
});
