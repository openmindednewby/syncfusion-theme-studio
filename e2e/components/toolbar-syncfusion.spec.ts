import { test, expect } from '@playwright/test';

import { injectAuth } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

// Run with: npx playwright test e2e/components/toolbar-syncfusion
test.describe('Syncfusion Toolbar Components', () => {
  test.setTimeout(180000);

  test.beforeEach(async ({ page }) => {
    await injectAuth(page);
    await page.goto('/components/toolbar/syncfusion');
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
    expect(page.url()).toContain('/components/toolbar/syncfusion');
  });
});
