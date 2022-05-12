/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  moduleDirectories: ["node_modules"],
  testPathIgnorePatterns: ["<rootDir>/cypress/"],
  testEnvironment: "jest-environment-jsdom",
  preset: "ts-jest",
};

module.exports = createJestConfig(customJestConfig);
