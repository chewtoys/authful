module.exports = {
  testEnvironment: 'node',
  testURL: 'http://localhost/',
  modulePaths: ['<rootDir>/lib', '<rootDir>/node_modules'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)?$': 'ts-jest'
  },
  moduleNameMapper: {
    '@lib/(.*)': '<rootDir>/lib/$1'
  }
}
