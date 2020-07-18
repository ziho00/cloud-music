module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
  },
  parser: 'vue-eslint-parser',
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  plugins: ['prettier'],
  extends: ['plugin:vue/essential', 'eslint:recommended'],
  rules: {
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		'no-undef': 0
  },
  // eslint-disable-next-line no-dupe-keys
  parserOptions: {
    parser: 'babel-eslint',
  },
}
