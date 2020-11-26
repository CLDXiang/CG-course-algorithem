module.exports = {
  env: {
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions:  {
    ecmaVersion: 'esnext',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  extends: ['airbnb-typescript/base'],
  rules: {
    'no-console': 0,
    'import/prefer-default-export': 0,
  }
}
