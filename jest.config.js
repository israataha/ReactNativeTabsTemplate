module.exports = {
  preset: 'react-native',
  collectCoverageFrom: ['**/*.{ts,tsx}'],
  coverageReporters: ['json-summary', ['text', { file: 'coverage.txt' }]],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'coverage',
        outputName: 'jest-junit.xml',
        ancestorSeparator: ' › ',
        uniqueOutputName: 'false',
      },
    ],
  ],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
  transformIgnorePatterns: [
    'node_modules/(?!(?:.pnpm/)?((jest-)?react-native|@react-native(-community)?|react-navigation|@react-navigation/.*|sentry-expo|react-native-svg))',
  ],
};
