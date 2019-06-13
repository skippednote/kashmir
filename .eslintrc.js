module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['prettier', '@typescript-eslint'],
  extends: ['prettier', 'plugin:@typescript-eslint/recommended'],
  rules: {
    'prettier/prettier': ['error'],
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off'
  }
};
