export default {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "esbuild-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
