import { test, expect } from '@playwright/test';

/**
 * Layer 1 -- heartbeat. Cheapest proof the deployed ThemeStudio
 * boots without throwing.
 *
 * Targets `/` (not `/login`) because the deployed app runs in demo mode
 * and auto-redirects `/login` -> `/dashboard` (no login form ever renders).
 * The heartbeat proves that React mounts + the app shell renders without
 * runtime errors, independent of which route lands.
 *
 * Failure modes caught:
 *   - 404 / 5xx on the deploy URL
 *   - JS syntax errors on boot
 *   - React failing to mount (ErrorBoundary crash)
 *   - CSS/font asset load failures
 *   - Any unhandled exception during initial render
 */

test('heartbeat -- app boots with no runtime errors', async ({ page }) => {
  const consoleErrors: string[] = [];
  const pageErrors: Error[] = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      // Ignore known benign errors (favicon 404s, service-worker scope)
      const text = msg.text();
      if (text.includes('favicon') || text.includes('service-worker')) return;
      consoleErrors.push(text);
    }
  });
  page.on('pageerror', (err) => pageErrors.push(err));

  await page.goto('/', { waitUntil: 'networkidle' });

  // Wait for React to mount SOMETHING into #root. We don't assert on a
  // specific element (login form, dashboard, pricing) because the landing
  // route depends on demo-mode auth state; only that the bundle executed
  // and mounted a non-empty tree.
  await page.waitForFunction(
    () => {
      const root = document.querySelector('#root');
      return root !== null && root.children.length > 0;
    },
    { timeout: 15_000 }
  );

  await page.screenshot({ path: 'test-results/heartbeat-root.png' });

  expect(pageErrors, 'pageerror events fired during boot').toEqual([]);
  expect(consoleErrors, 'console error messages emitted during boot').toEqual(
    []
  );

  const title = await page.title();
  expect(title.length, 'page has a title').toBeGreaterThan(0);
});
