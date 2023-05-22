/**
 * @file datapos-workbench-vue/eslintrc.cjs
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Initialisation
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = {
    env: { browser: true, node: true },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    overrides: [
        { files: ['*.js'], parser: 'babel-eslint' } // Use the Babel parser for JavaScript files.
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest'
    },
    plugins: ['@typescript-eslint', 'import'],
    root: true,
    rules: {
        'sort-imports': ['warn', { allowSeparatedGroups: true, ignoreCase: true, memberSyntaxSortOrder: ['none', 'all', 'single', 'multiple'] }]
    }
};
