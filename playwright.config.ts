import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./playwright-tests",
  fullyParallel: false,
  forbidOnly: false,
  retries: 0,
  workers: 1,
  reporter: [
    ["html", { outputFolder: "playwright-output/report" }],
    ["json", { outputFile: "playwright-output/test-results.json" }],
  ],
  outputDir: "playwright-output/test-results",
  use: {
    baseURL: "http://10.28.149.50:9432",
    actionTimeout: 30000,
    navigationTimeout: 30000,
    trace: "retain-on-failure",
    screenshot: "on",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
