import { test, expect } from '@playwright/test';

import { injectAuth } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

// Run with: npx playwright test e2e/components/checkbox-syncfusion
test.describe('Syncfusion Checkbox Components', () => {
  test.setTimeout(180000);

  test.beforeEach(async ({ page }) => {
    await injectAuth(page);
    await page.goto('/components/checkbox/syncfusion');
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
    expect(page.url()).toContain('/components/checkbox/syncfusion');
  });
});
