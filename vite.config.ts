/**
 * @file datapos-engine-support/vite.config.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */

// Dependencies - Framework/Vendor
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export default defineConfig({
    build: {
        target: 'ESNext',
        lib: {
            entry: resolve('src/index.ts'),
            name: 'DataPosEngine',
            formats: ['es'],
            fileName: (format) => `datapos-engine-support.${format}.js`
        }
    },
    plugins: [dts({ outputDir: 'dist/types' })]
});
