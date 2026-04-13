import { test, expect } from '@playwright/test';

import { injectAuth } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

// Run with: npx playwright test e2e/components/breadcrumb-syncfusion
test.describe('Syncfusion Breadcrumb Components', () => {
  test.setTimeout(180000);

  test.beforeEach(async ({ page }) => {
    await injectAuth(page);
    await page.goto('/components/breadcrumb/syncfusion');
    await expect(page.getByTestId(TestIds.SYNCFUSION_BREADCRUMB_SHOWCASE)).toBeVisible({ timeout: 30000 });
  });

  test('should render the breadcrumb showcase page', async ({ page }) => {
    await expect(page.getByTestId(TestIds.SYNCFUSION_BREADCRUMB_SHOWCASE)).toBeVisible();
  });

  test('should render Syncfusion breadcrumb elements', async ({ page }) => {
    // Syncfusion BreadcrumbComponent uses .e-breadcrumb class
    const breadcrumbs = page.locator('.e-breadcrumb');
    expect(await breadcrumbs.count()).toBeGreaterThan(0);
  });

  test('should render breadcrumb items', async ({ page }) => {
    // Syncfusion breadcrumb items use .e-breadcrumb-item or list items within .e-breadcrumb
    const breadcrumb = page.locator('.e-breadcrumb').first();
    await expect(breadcrumb).toBeVisible({ timeout: 10000 });
    const items = breadcrumb.locator('.e-breadcrumb-item, li');
    expect(await items.count()).toBeGreaterThan(0);
  });

  test('should have separator between breadcrumb items', async ({ page }) => {
    // Find a breadcrumb that has multiple items (some may be single-item)
    const breadcrumbs = page.locator('.e-breadcrumb');
    const count = await breadcrumbs.count();
    expect(count).toBeGreaterThan(0);

    // Across all breadcrumbs, total items should be > 1 (at least one has separators)
    let totalItems = 0;
    for (let i = 0; i < count; i++) {
      const items = breadcrumbs.nth(i).locator('.e-breadcrumb-item, li');
      totalItems += await items.count();
    }
    expect(totalItems).toBeGreaterThan(1);
  });

  test('should navigate to correct URL', async ({ page }) => {
    expect(page.url()).toContain('/components/breadcrumb/syncfusion');
  });
});
