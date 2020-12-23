module.exports = {
  extends: [
    './node_modules/hitoka/.eslintrc.js',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    'no-console': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },
}
