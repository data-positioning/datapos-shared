import tseslint from '@typescript-eslint/eslint-plugin';
import tseslintParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';

export default [
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: { parser: tseslintParser, parserOptions: { project: './tsconfig.json' } },
        plugins: {
            '@typescript-eslint': tseslint,
            import: importPlugin
        },
        rules: {
            '@typescript-eslint/consistent-type-imports': 'warn',
            '@typescript-eslint/no-import-type-side-effects': 'warn',
            '@typescript-eslint/no-unused-vars': 'warn',

            'import/no-duplicates': 'off',
            'sort-imports': ['warn', { allowSeparatedGroups: true, ignoreCase: true, memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'] }],
            'export/sort-exports': ['warn', { ignoreCase: true }], // Does not support 'allowSeparatedGroups' as above. Turn on and off to check as required.

            'no-empty': 'warn',
            'prefer-const': 'warn'
        }
    }
];
