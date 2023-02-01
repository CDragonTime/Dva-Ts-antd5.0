module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    'no-empty': [true, 'allow-empty-catch'],
    'no-var-requires': false,
    '@typescript-eslint/no-inferrable-types': false,
  },
}
// {
//   "extends": "umi"
// }
