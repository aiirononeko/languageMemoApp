module.exports = {
  setupFiles: ["<rootDir>/tests/jest.setup.js"], // Load Mock setting
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/**/*.js",
    "<rootDir>/store/**/*.js",
    "<rootDir>/utils/**/*.js",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^~/(.*)$": "<rootDir>/$1",
  },
  moduleFileExtensions: ["js", "json", "vue"],
  transform: {
    "^.+\\.js$": "babel-jest",
    ".*\\.(vue)$": "vue-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
}
