import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  resetMocks: true,
  collectCoverage: true,
  coverageReporters: ["json", "lcov", "text", "clover"],
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/$1",
  },

  // disable console warnings
  // silent: true,

  coverageThreshold: {
    global: {
      // branches: 90,
      // functions: 90,
      // lines: 90,
    },
  },
};

export default createJestConfig(config);
