import { test, expect } from '@playwright/test';

import { injectAuth } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

// Run with: npx playwright test e2e/components/toggle-syncfusion
test.describe('Syncfusion Toggle Components', () => {
  test.setTimeout(180000);

  test.beforeEach(async ({ page }) => {
    await injectAuth(page);
    await page.goto('/components/toggle/syncfusion');
    await expect(page.getByTestId(TestIds.SYNCFUSION_TOGGLE_SHOWCASE)).toBeVisible({ timeout: 30000 });
  });

  test('should render the toggle showcase page', async ({ page }) => {
    await expect(page.getByTestId(TestIds.SYNCFUSION_TOGGLE_SHOWCASE)).toBeVisible();
  });

  test('should render Syncfusion switch elements', async ({ page }) => {
    // Syncfusion SwitchComponent uses .e-switch-wrapper class
    const switches = page.locator('.e-switch-wrapper');
    expect(await switches.count()).toBeGreaterThan(0);
  });

  test('should toggle switch on click', async ({ page }) => {
    const firstSwitch = page.locator('.e-switch-wrapper').first();
    await firstSwitch.scrollIntoViewIfNeeded();
    await expect(firstSwitch).toBeVisible();

    // Get initial checked state
    const input = firstSwitch.locator('input[type="checkbox"]');
    const wasChecked = await input.isChecked();

    // Click to toggle
    await firstSwitch.click();

    // State should change
    const isChecked = await input.isChecked();
    expect(isChecked).not.toBe(wasChecked);
  });

  test('should navigate to correct URL', async ({ page }) => {
    expect(page.url()).toContain('/components/toggle/syncfusion');
  });
});
