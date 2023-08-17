import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: resolve('src/index.ts'),
            name: 'DataPosSupport',
            formats: ['es'],
            fileName: (format) => `datapos-support.${format}.js`
        },
        target: 'ESNext'
    },
    plugins: [dts({ outDir: 'dist/types' })]
});
