import { test, expect } from '@playwright/test';

/**
 * Layer 1 -- heartbeat. Cheapest proof the deployed ThemeStudio
 * loads its login page without throwing.
 *
 * Failure modes caught:
 *   - 404 / 5xx on the deploy URL
 *   - JS syntax errors on boot
 *   - React failing to mount (ErrorBoundary crash)
 *   - CSS/font asset load failures
 *   - Any unhandled exception during initial render
 */

test('heartbeat -- login page loads with no runtime errors', async ({
  page,
}) => {
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

  await page.goto('/login', { waitUntil: 'networkidle' });

  // The login page should render a form with at least an email/username input.
  // Wait for the page to have meaningful DOM content.
  await page.waitForSelector('input', { timeout: 15_000 });

  await page.screenshot({ path: 'test-results/heartbeat-login.png' });

  // Assertions
  expect(pageErrors, 'pageerror events fired during boot').toEqual([]);
  expect(consoleErrors, 'console error messages emitted during boot').toEqual(
    []
  );

  // Verify the page has a title (React rendered something)
  const title = await page.title();
  expect(title.length, 'page has a title').toBeGreaterThan(0);
});
