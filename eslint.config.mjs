import globals from 'globals'
import pluginJs from '@eslint/js'

export default [
    {
        files: ['**/*.js'],
        languageOptions: {
            sourceType: 'commonjs',
            globals: {
                ...globals.node,
            },
        },
        rules: {
            'no-unused-vars': 'error',
            'no-undef': 'error',
            'no-console': ['error', { allow: ['warn', 'error'] }],
        },
    },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
]
