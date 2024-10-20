module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['react-native', 'simple-import-sort'],
  rules: {
    'react-native/no-unused-styles': 2,
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
};
