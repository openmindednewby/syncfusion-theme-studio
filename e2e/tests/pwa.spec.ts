import { test, expect } from '@playwright/test';

import { TestIds } from '../shared/testIds';

test.describe('PWA', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('has a web app manifest link', async ({ page }) => {
    const manifestLink = page.locator('link[rel="manifest"]');
    await expect(manifestLink).toHaveCount(1);
    const href = await manifestLink.getAttribute('href');
    expect(href).toBeTruthy();
  });

  test('manifest is accessible and contains required fields', async ({ page, request }) => {
    const manifestLink = page.locator('link[rel="manifest"]');
    const href = await manifestLink.getAttribute('href');
    expect(href).toBeTruthy();

    const baseUrl = page.url().replace(/\/$/, '');
    const manifestUrl = href?.startsWith('/') ? `${baseUrl}${href}` : href;
    const response = await request.get(manifestUrl!);
    expect(response.ok()).toBeTruthy();

    const manifest = await response.json();
    expect(manifest.name).toBeTruthy();
    expect(manifest.short_name).toBeTruthy();
    expect(manifest.start_url).toBeTruthy();
    expect(manifest.display).toBe('standalone');
    expect(manifest.icons.length).toBeGreaterThan(0);
  });

  test('has apple-touch-icon', async ({ page }) => {
    const appleIcon = page.locator('link[rel="apple-touch-icon"]');
    await expect(appleIcon).toHaveCount(1);
  });

  test('has theme-color meta tag', async ({ page }) => {
    const themeColor = page.locator('meta[name="theme-color"]');
    await expect(themeColor).toHaveCount(1);
    const content = await themeColor.getAttribute('content');
    expect(content).toBeTruthy();
  });

  test('offline indicator appears when network is disabled', async ({ page, context }) => {
    // Wait for React app to fully render (login button proves the component tree is mounted)
    await page.getByTestId(TestIds.LOGIN_SUBMIT).waitFor({ state: 'visible', timeout: 15000 });

    // Verify indicator is not shown when online
    await expect(page.getByTestId(TestIds.OFFLINE_INDICATOR)).not.toBeVisible();

    // Go offline
    await context.setOffline(true);
    await expect(page.getByTestId(TestIds.OFFLINE_INDICATOR)).toBeVisible();

    // Go back online
    await context.setOffline(false);
    await expect(page.getByTestId(TestIds.OFFLINE_INDICATOR)).not.toBeVisible();
  });
});
