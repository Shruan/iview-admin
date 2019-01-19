module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': 'off',
    'object-curly-spacing': 'off',
    'no-return-assign': 'off',
    'no-tabs': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
