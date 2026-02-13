import { test, expect } from '@playwright/test';

import { login } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

// Skip Syncfusion component tests by default due to long load times
// Run with: npx playwright test e2e/components/toolbar-syncfusion --timeout=180000
test.describe('Syncfusion Toolbar Components', () => {
  test.skip(({ browserName }) => true, 'Skipped by default - Syncfusion components require long load times. Run manually with --timeout=180000');

  test.beforeEach(async ({ page }) => {
    await login(page);
    // SPA navigation via sidebar
    await page.getByTestId(TestIds.NAV_COMPONENTS_EXPAND).click();
    await page.getByTestId(TestIds.NAV_COMPONENTS_SYNCFUSION_EXPAND).click();
    await page.getByTestId(TestIds.NAV_TOOLBAR_SYNCFUSION).click();
    await expect(page.getByTestId(TestIds.SYNCFUSION_TOOLBAR_SHOWCASE)).toBeVisible({ timeout: 30000 });
  });

  test('should render the toolbar showcase page', async ({ page }) => {
    await expect(page.getByTestId(TestIds.SYNCFUSION_TOOLBAR_SHOWCASE)).toBeVisible();
  });

  test('should render Syncfusion toolbar elements', async ({ page }) => {
    // Syncfusion ToolbarComponent uses .e-toolbar class
    const toolbars = page.locator('.e-toolbar');
    expect(await toolbars.count()).toBeGreaterThan(0);
  });

  test('should have clickable toolbar items', async ({ page }) => {
    const toolbarItem = page.locator('.e-toolbar-item').first();
    await toolbarItem.scrollIntoViewIfNeeded();
    await expect(toolbarItem).toBeVisible();
    await toolbarItem.click();
  });

  test('should navigate to correct URL', async ({ page }) => {
    expect(page.url()).toContain('/dashboard/components/toolbar/syncfusion');
  });
});
