import { test, expect } from '@playwright/test';

import { login } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

// Skip Syncfusion component tests by default due to long load times
// Run with: npx playwright test e2e/components/checkbox-syncfusion --timeout=180000
test.describe('Syncfusion Checkbox Components', () => {
  test.skip(({ browserName }) => true, 'Skipped by default - Syncfusion components require long load times. Run manually with --timeout=180000');

  test.beforeEach(async ({ page }) => {
    await login(page);
    // SPA navigation via sidebar
    await page.getByTestId(TestIds.NAV_COMPONENTS_EXPAND).click();
    await page.getByTestId(TestIds.NAV_COMPONENTS_SYNCFUSION_EXPAND).click();
    await page.getByTestId(TestIds.NAV_CHECKBOX_SYNCFUSION).click();
    await expect(page.getByTestId(TestIds.SYNCFUSION_CHECKBOX_SHOWCASE)).toBeVisible({ timeout: 30000 });
  });

  test('should render the checkbox showcase page', async ({ page }) => {
    await expect(page.getByTestId(TestIds.SYNCFUSION_CHECKBOX_SHOWCASE)).toBeVisible();
  });

  test('should render Syncfusion checkbox elements', async ({ page }) => {
    // Syncfusion checkboxes use .e-checkbox-wrapper class
    const checkboxes = page.locator('.e-checkbox-wrapper');
    expect(await checkboxes.count()).toBeGreaterThan(0);
  });

  test('should have clickable checkboxes', async ({ page }) => {
    const firstCheckbox = page.locator('.e-checkbox-wrapper').first();
    await firstCheckbox.scrollIntoViewIfNeeded();
    await expect(firstCheckbox).toBeVisible();
    await firstCheckbox.click();
  });

  test('should navigate to correct URL', async ({ page }) => {
    expect(page.url()).toContain('/dashboard/components/checkbox/syncfusion');
  });
});
