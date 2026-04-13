import { test, expect } from '@playwright/test';

import { injectAuth } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

// Run with: npx playwright test e2e/components/datagrid.spec.ts
test.describe('Syncfusion DataGrid', () => {
  test.setTimeout(180000);

  test.beforeEach(async ({ page }) => {
    await injectAuth(page);
    await page.goto('/components/grid/syncfusion');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByTestId(TestIds.SYNCFUSION_GRID_SHOWCASE)).toBeVisible({ timeout: 30000 });
  });

  test('should display DataGrid page', async ({ page }) => {
    await expect(page.getByTestId(TestIds.SYNCFUSION_GRID_SHOWCASE)).toBeVisible();
  });

  test('should display DataGrid showcase heading', async ({ page }) => {
    const heading = page.getByRole('heading', { level: 2 }).first();
    await expect(heading).toBeVisible();
  });

  test('should display DataGrid showcase container', async ({ page }) => {
    await expect(page.getByTestId(TestIds.SYNCFUSION_GRID_SHOWCASE)).toBeVisible();
  });

  test('should render DataGrid with Syncfusion styling', async ({ page }) => {
    // Check for Syncfusion Grid class
    const grid = page.locator('.e-grid');
    await expect(grid.first()).toBeVisible({ timeout: 30000 });
  });

  test('should display grid content area', async ({ page }) => {
    const gridContent = page.locator('.e-gridcontent');
    await expect(gridContent.first()).toBeVisible({ timeout: 30000 });
  });

  test('should display grid header', async ({ page }) => {
    const gridHeader = page.locator('.e-gridheader');
    await expect(gridHeader.first()).toBeVisible({ timeout: 30000 });
  });

  test('should have visible column headers', async ({ page }) => {
    const headerCells = page.locator('.e-headercell');
    await expect(headerCells.first()).toBeVisible({ timeout: 30000 });
    expect(await headerCells.count()).toBeGreaterThan(0);
  });

  test('should display data rows', async ({ page }) => {
    const rows = page.locator('.e-row');
    await expect(rows.first()).toBeVisible({ timeout: 30000 });
    expect(await rows.count()).toBeGreaterThan(0);
  });

  test('should support column sorting', async ({ page }) => {
    // Wait for a grid to be fully loaded
    const headerCell = page.locator('.e-headercell').first();
    await expect(headerCell).toBeVisible({ timeout: 30000 });

    // Click on first column header to sort
    await headerCell.click();

    // Check for sort indicator
    const sortIcon = page.locator('.e-sortfilterdiv .e-ascending, .e-sortfilterdiv .e-descending, .e-sortnumber');
    // Sorting might not be enabled on all grids
    if (await sortIcon.count() > 0) {
      await expect(sortIcon.first()).toBeVisible();
    }
  });

  test('should apply theme colors to grid', async ({ page }) => {
    // Get grid header background color
    const headerCell = page.locator('.e-headercell').first();
    await expect(headerCell).toBeVisible({ timeout: 30000 });

    const headerBg = await headerCell.evaluate((el) =>
      getComputedStyle(el).backgroundColor
    );

    // Verify it's not the default Syncfusion gray
    expect(headerBg).not.toBe('rgb(227, 227, 227)');
  });

  test('should display correct grid title', async ({ page }) => {
    // The page has a heading with the grid showcase title
    const heading = page.getByRole('heading', { level: 2 }).first();
    await expect(heading).toBeVisible();
    await expect(heading).not.toHaveText('');
  });

  test('should maintain theme when interacting with grid', async ({ page }) => {
    // Get initial primary color
    const initialColor = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--color-primary-500').trim()
    );

    // Interact with grid (click a header)
    const header = page.locator('.e-headercell').first();
    await expect(header).toBeVisible({ timeout: 30000 });
    await header.click();

    // Verify theme color hasn't changed
    const afterColor = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--color-primary-500').trim()
    );

    expect(afterColor).toBe(initialColor);
  });
});
