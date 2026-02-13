import { test, expect } from '@playwright/test';

import { login } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

// Skip Syncfusion component tests by default due to long load times
// Run with: npx playwright test e2e/components/toast-syncfusion --timeout=180000
test.describe('Syncfusion Toast Components', () => {
  test.skip(({ browserName }) => true, 'Skipped by default - Syncfusion components require long load times. Run manually with --timeout=180000');

  test.beforeEach(async ({ page }) => {
    await login(page);
    // SPA navigation via sidebar
    await page.getByTestId(TestIds.NAV_COMPONENTS_EXPAND).click();
    await page.getByTestId(TestIds.NAV_COMPONENTS_SYNCFUSION_EXPAND).click();
    await page.getByTestId(TestIds.NAV_TOAST_SYNCFUSION).click();
    await expect(page.getByTestId(TestIds.SYNCFUSION_TOAST_SHOWCASE)).toBeVisible({ timeout: 30000 });
  });

  test('should render the toast showcase page', async ({ page }) => {
    await expect(page.getByTestId(TestIds.SYNCFUSION_TOAST_SHOWCASE)).toBeVisible();
  });

  test('should render Syncfusion toast trigger buttons', async ({ page }) => {
    // Toast showcases have buttons to trigger toasts
    const buttons = page.locator('.e-btn');
    expect(await buttons.count()).toBeGreaterThan(0);
  });

  test('should show toast notification when triggered', async ({ page }) => {
    // Click a trigger button to show a toast
    const triggerBtn = page.locator('.e-btn').first();
    await triggerBtn.scrollIntoViewIfNeeded();
    await triggerBtn.click();

    // Syncfusion toast container should appear
    const toastContainer = page.locator('.e-toast-container');
    await expect(toastContainer).toBeVisible({ timeout: 5000 });
  });

  test('should navigate to correct URL', async ({ page }) => {
    expect(page.url()).toContain('/dashboard/components/toast/syncfusion');
  });
});
