const globals = require('globals');
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const eslintPrettier = require('eslint-plugin-prettier');

module.exports = tseslint.config(
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/coverage/**',
      '.prettierrc.js',
      'eslint.config.js',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  require('eslint-config-prettier'),
  {
    plugins: {
      'typescript-eslint':
        tseslint.plugin,
      prettier: eslintPrettier,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      parser: tseslint.parser,
      parserOptions: {
        project: true,
      },
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  {
    files: ['**/*.md'],
    plugins: {
      markdown: require('eslint-plugin-markdown'),
    },
    processor: 'markdown/markdown',
  },
);
