import { test, expect } from '@playwright/test';

import { login } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

// Skip Syncfusion component tests by default due to long load times
// Run with: npx playwright test e2e/components/breadcrumb-syncfusion --timeout=180000
test.describe('Syncfusion Breadcrumb Components', () => {
  test.skip(({ browserName }) => true, 'Skipped by default - Syncfusion components require long load times. Run manually with --timeout=180000');

  test.beforeEach(async ({ page }) => {
    await login(page);
    // SPA navigation via sidebar
    await page.getByTestId(TestIds.NAV_COMPONENTS_EXPAND).click();
    await page.getByTestId(TestIds.NAV_COMPONENTS_SYNCFUSION_EXPAND).click();
    await page.getByTestId(TestIds.NAV_BREADCRUMB_SYNCFUSION).click();
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
    // Breadcrumb items use .e-breadcrumb-item class
    const items = page.locator('.e-breadcrumb-item');
    expect(await items.count()).toBeGreaterThan(0);
  });

  test('should have separator between breadcrumb items', async ({ page }) => {
    // Syncfusion breadcrumbs have separator elements
    const separators = page.locator('.e-breadcrumb-separator');
    expect(await separators.count()).toBeGreaterThan(0);
  });

  test('should navigate to correct URL', async ({ page }) => {
    expect(page.url()).toContain('/dashboard/components/breadcrumb/syncfusion');
  });
});
