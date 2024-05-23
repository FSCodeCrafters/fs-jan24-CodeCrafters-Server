module.exports = {
  env: {
    browser: true,
    es2016: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/no-shadow': 'warn',
    'no-console': 'error',
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    '.git/',
    '.eslintignore',
    'tsconfig.json',
    'prisma/*.ts',
  ],
};
