export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  testMatch: ["**/tests/**/*.test.ts"], // Only test files inside `tests/` folder
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  transform: {
    "^.+\.(t|j)sx?$": ["ts-jest", {
      useESM: true,
      tsconfig: {
        module: "esnext",
        moduleResolution: "node",
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
      },
    }],
  },
  moduleNameMapper: {
    "^(\.{1,2}/.*)\.js$": "$1",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(.*\.mjs$)|supertest|express)",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
