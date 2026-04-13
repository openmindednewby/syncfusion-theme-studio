import { test, expect } from '@playwright/test';

import { injectAuth } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

// Run with: npx playwright test e2e/components/toast-syncfusion
test.describe('Syncfusion Toast Components', () => {
  test.setTimeout(180000);

  test.beforeEach(async ({ page }) => {
    await injectAuth(page);
    await page.goto('/components/toast/syncfusion');
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
    expect(page.url()).toContain('/components/toast/syncfusion');
  });
});
