module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/ban-types': 'off',
    'object-curly-spacing': [ 2, 'always'],
    'array-bracket-spacing' : [ 2, 'never'],
    'comma-spacing': [ 2, { 'before': false, 'after': true } ],
    'no-trailing-spaces': 2,
    'no-multi-spaces': 2,
    'no-spaced-func': 2,
    'no-console': 1,
    'indent': [ 1, 2 ],
    'func-call-spacing': [2, 'never'],
    'prettier/prettier': 2,
  },
};
