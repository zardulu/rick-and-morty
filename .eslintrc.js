module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: ['plugin:react/recommended'],
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
    parserOptions: {
      ecmaVersion: 2021, // or "latest"
      sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
      // Common ESLint rules
      'no-console': 'off', 
      'no-unused-vars': 'off',
      'no-undef': 'warn',
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
      'react/no-deprecated': 'off',
      'react/prop-types': 'off', 
       "react/no-unknown-property": ['error', { ignore: ['css'] }]
    },
    settings: {
      'import/resolver': {
        alias: {
          map: [['@emotion/react', '@emotion/react', '@emotion/styled', 'theme-ui']],
          extensions: ['.ts', '.tsx', '.js', '.jsx'],
        },
      },
    },
  };