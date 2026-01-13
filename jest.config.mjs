/** @type {import('jest').Config} */
const config = {
  // Automatically clear mocks between every test
  clearMocks: true,

  // Collect coverage info while running tests
  collectCoverage: true,

  // Output coverage report in this folder
  coverageDirectory: "coverage",

  // Use jsdom to simulate the browser environment
  testEnvironment: "jsdom",

  // Tell Jest to use babel-jest to transform .js and .jsx files
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },

  // Recognize these file types as modules
  moduleFileExtensions: ["js", "jsx"],

  // Optional: Where Jest should look for test files
  testMatch: [
    "**/__tests__/**/*.test.js",
    "**/?(*.)+(spec|test).js"
  ]
};

export default config;
