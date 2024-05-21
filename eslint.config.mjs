import globals from 'globals'
import path from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import pluginJs from '@eslint/js'

// mimic CommonJS variables -- not needed if using CommonJS
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const compat = new FlatCompat({
  baseDirectory: dirname,
  recommendedConfig: pluginJs.configs.recommended
})

export default [
  { languageOptions: { globals: globals.node } },
  ...compat.extends('standard-with-typescript'),
  ...compat.extends('plugin:@typescript-eslint/recommended'),
  {
    ignores: ['node_modules/', 'dist/', '.git/', '.eslintignore']
  }
]