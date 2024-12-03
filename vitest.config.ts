import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    clearMocks: true,
    includeSource: ["src/**/*.ts"],
    mockReset: true,
    restoreMocks: true,
  },
})
