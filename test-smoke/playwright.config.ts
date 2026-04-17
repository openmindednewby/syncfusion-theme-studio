import { defineConfig } from '@playwright/test';

/**
 * Smoke-test harness config for SyncfusionThemeStudio.
 *
 * Targets the live deploy at syncfusion-theme-studio.dloizides.com by
 * default; override via THEME_STUDIO_TEST_URL env for local dev runs.
 *
 * Reporter chain:
 *   - 'list' for human terminal readability during development
 *   - 'json' to test-results/results.json for the markdown
 *     report writer (personalServerNotes/scripts/smoke-report-writer.mjs)
 */
export default defineConfig({
  testDir: '.',
  timeout: 30_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  reporter: [
    ['list'],
    ['json', { outputFile: '../test-results/results.json' }],
  ],
  use: {
    baseURL:
      process.env.THEME_STUDIO_TEST_URL ??
      'https://syncfusion-theme-studio.dloizides.com',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    viewport: { width: 1280, height: 720 },
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
  outputDir: '../test-results/artifacts',
});
