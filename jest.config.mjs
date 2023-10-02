/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: false,
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
};

export default config;
