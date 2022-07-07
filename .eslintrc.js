module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'no-underscore-dangle': 'off',
    'react/button-has-type': 'off',
    'max-len': 'off',
  },
};
