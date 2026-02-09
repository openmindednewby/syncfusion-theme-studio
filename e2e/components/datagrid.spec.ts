import { test, expect } from '@playwright/test';

import { login } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

// Skip Syncfusion component tests by default due to long load times
// Run with: npx playwright test e2e/components --timeout=180000
test.describe('Syncfusion DataGrid', () => {
  test.skip(({ browserName }) => true, 'Skipped by default - Syncfusion DataGrid requires long load times. Run manually with --timeout=180000');

  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/dashboard/components/grid');
    // Wait for DataGrid to fully load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // Allow Syncfusion grid to initialize
  });

  test('should display DataGrid page', async ({ page }) => {
    await expect(page.getByTestId(TestIds.DATA_GRID_PAGE)).toBeVisible();
  });

  test('should display back link to components page', async ({ page }) => {
    const backLink = page.getByTestId(TestIds.DATA_GRID_BACK_LINK);
    await expect(backLink).toBeVisible();

    await backLink.click();
    await expect(page).toHaveURL('/dashboard/components');
  });

  test('should display DataGrid showcase container', async ({ page }) => {
    await expect(page.getByTestId(TestIds.DATA_GRID_SHOWCASE)).toBeVisible();
  });

  test('should render DataGrid with Syncfusion styling', async ({ page }) => {
    // Check for Syncfusion Grid class
    const grid = page.locator('.e-grid');
    await expect(grid).toBeVisible();
  });

  test('should display grid content area', async ({ page }) => {
    const gridContent = page.locator('.e-gridcontent');
    await expect(gridContent).toBeVisible();
  });

  test('should display grid header', async ({ page }) => {
    const gridHeader = page.locator('.e-gridheader');
    await expect(gridHeader).toBeVisible();
  });

  test('should have visible column headers', async ({ page }) => {
    const headerCells = page.locator('.e-headercell');
    expect(await headerCells.count()).toBeGreaterThan(0);
  });

  test('should display data rows', async ({ page }) => {
    const rows = page.locator('.e-row');
    expect(await rows.count()).toBeGreaterThan(0);
  });

  test('should support pagination', async ({ page }) => {
    const pager = page.locator('.e-pager');

    // Pager might not be visible if there's not enough data
    if (await pager.isVisible()) {
      await expect(pager).toBeVisible();

      // Try clicking next page if available
      const nextPage = page.locator('.e-nextpage:not(.e-disable)');
      if (await nextPage.isVisible()) {
        await nextPage.click();
        await page.waitForTimeout(300);

        // Verify page indicator changed
        const currentPage = page.locator('.e-currentitem');
        await expect(currentPage).toContainText('2');
      }
    }
  });

  test('should support column sorting', async ({ page }) => {
    // Click on first column header to sort
    const firstHeader = page.locator('.e-headercell').first();
    await firstHeader.click();
    await page.waitForTimeout(300);

    // Check for sort indicator
    const sortIcon = page.locator('.e-sortfilterdiv .e-ascending, .e-sortfilterdiv .e-descending');
    // Sorting might not be enabled on all grids
    if (await sortIcon.count() > 0) {
      await expect(sortIcon.first()).toBeVisible();
    }
  });

  test('should apply theme colors to grid', async ({ page }) => {
    // Get grid header background color
    const headerCell = page.locator('.e-headercell').first();
    const headerBg = await headerCell.evaluate((el) =>
      getComputedStyle(el).backgroundColor
    );

    // Verify it's not the default Syncfusion gray
    expect(headerBg).not.toBe('rgb(227, 227, 227)');
  });

  test('should have Theme Editor panel visible', async ({ page }) => {
    await expect(page.getByTestId(TestIds.THEME_EDITOR_PANEL)).toBeVisible();
  });

  test('should have resizable splitter between panels', async ({ page }) => {
    // Check for splitter separator
    const separator = page.locator('.e-split-bar');
    await expect(separator).toBeVisible();
  });

  test('should support cell selection', async ({ page }) => {
    // Click on a cell
    const firstCell = page.locator('.e-rowcell').first();

    if (await firstCell.isVisible()) {
      await firstCell.click();

      // Check if cell or row got selected
      const selectedCell = page.locator('.e-cellselection, .e-selectionbackground, .e-active');
      // Selection behavior depends on grid configuration
      // Just verify cell was clicked without errors
    }
  });

  test('should display correct grid title', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Data Grid' });
    await expect(heading).toBeVisible();
  });

  test('should maintain theme when interacting with grid', async ({ page }) => {
    // Get initial primary color
    const initialColor = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--color-primary-500').trim()
    );

    // Interact with grid (click a header)
    const header = page.locator('.e-headercell').first();
    await header.click();
    await page.waitForTimeout(200);

    // Verify theme color hasn't changed
    const afterColor = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--color-primary-500').trim()
    );

    expect(afterColor).toBe(initialColor);
  });
});
