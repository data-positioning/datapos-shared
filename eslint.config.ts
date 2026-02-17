// External dependencies
import sonarjs from 'eslint-plugin-sonarjs';

// DPU framework
import datapos from '@datapos/eslint-config-datapos';

// ESLint configuration
export default [
    ...datapos,
    {
        plugins: {
            sonarjs
        },
        rules: {
            // 'sonarjs/cognitive-complexity': ['error', 18]
        }
    }
];
