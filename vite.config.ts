/**
 * @file datapos-engine-support/vite.config.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */

import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import wasm from 'vite-plugin-wasm';

export default defineConfig({
    build: {
        target: 'ESNext',
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'DataPosEngine',
            formats: ['es'],
            fileName: (format) => `datapos-engine-support.${format}.js`
        }
        // minify: 'esbuild'
    },
    plugins: [wasm(), dts()]
    // resolve: {
    //     alias: {
    //         '@/': new URL('./src/', import.meta.url).pathname
    //     }
    // }
});
