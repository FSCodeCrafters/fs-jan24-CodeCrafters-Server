import globals from 'globals';
import path from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';

// mimic CommonJS variables -- not needed if using CommonJS
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const compat = new FlatCompat({
  baseDirectory: dirname,
  recommendedConfig: pluginJs.configs.recommended
});

export default [
  { languageOptions: { globals: globals.node } },
  ...compat.extends('standard-with-typescript'),
  ...compat.extends('plugin:@typescript-eslint/recommended'),
  {
    rules: {
      semi: 'off',
      '@typescript-eslint/semi': ['error', 'always'],
      'semi-style': ['error', 'last'],
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/no-misused-promises': 'off'
    },
    ignores: [
      'node_modules/',
      'dist/',
      '.git/',
      '.eslintignore',
      'tsconfig.json',
      '"prisma/*.ts"'
    ]
  }
];
