import { defineConfig, devices } from '@playwright/test';

// Default to production preview server (fast static files).
// Override with BASE_URL=http://localhost:4444 for dev server debugging.
const PREVIEW_URL = 'http://localhost:4445';
const BASE_URL = process.env.BASE_URL ?? PREVIEW_URL;
const TIMEOUT_MS = 60000;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  // Cap workers to avoid overwhelming the single-threaded Vite preview server.
  // 4 workers balances speed vs reliability (12+ caused intermittent 15s+ page loads).
  workers: process.env.CI ? 1 : 4,
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
  ],
  timeout: TIMEOUT_MS,
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Firefox and WebKit require browser installation via: npx playwright install
    // Uncomment when browsers are installed:
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
  webServer: {
    command: BASE_URL === PREVIEW_URL
      ? 'npm run build && npm run preview'
      : `npm run dev -- --port ${new URL(BASE_URL).port}`,
    url: BASE_URL,
    reuseExistingServer: true,
    timeout: 300000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
