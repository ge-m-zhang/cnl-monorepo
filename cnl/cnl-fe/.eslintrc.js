module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'simple-import-sort', 'react', 'react-hooks'],
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:react/recommended', // Added for React-specific rules
    'plugin:react/jsx-runtime',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  env: {
    browser: true, // Added for frontend (browser) environment
    node: true,
    jest: true,
  },
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true, // Enable JSX parsing
    },
  },
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/function-component-definition': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-unsafe-optional-chaining': 'error',
    '@typescript-eslint/no-use-before-define': 'off',
    'react/require-default-props': [
      1,
      {
        functions: 'defaultArguments',
      },
    ],
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },
  ignorePatterns: ['.eslintrc.js', 'node_modules/', 'dist/'],
};