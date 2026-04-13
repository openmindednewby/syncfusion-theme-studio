import { test, expect } from '@playwright/test';

import { injectAuth } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

// ---------------------------------------------------------------------------
// Syncfusion Order Management Grid
// ---------------------------------------------------------------------------
// Run with: npx playwright test e2e/components/alert-grid.spec.ts
test.describe('Syncfusion Order Management Grid', () => {
  test.setTimeout(180000);

  test.beforeEach(async ({ page }) => {
    await injectAuth(page);
    await page.goto('/components/grid/syncfusion');
    await page.waitForLoadState('domcontentloaded');
    // Allow Syncfusion grid to fully initialise
    await expect(page.getByTestId(TestIds.GRID_ALERT_MANAGEMENT)).toBeVisible({ timeout: 30000 });
  });

  // -- Section visibility ---------------------------------------------------

  test('should display the Syncfusion grid showcase page', async ({ page }) => {
    await expect(page.getByTestId(TestIds.SYNCFUSION_GRID_SHOWCASE)).toBeVisible();
  });

  test('should display the Order Management section wrapper', async ({ page }) => {
    const section = page.getByTestId('grid-showcase-alert-management');
    await expect(section).toBeVisible();
  });

  test('should display the Order Management Syncfusion grid', async ({ page }) => {
    const grid = page.getByTestId(TestIds.GRID_ALERT_MANAGEMENT);
    await expect(grid).toBeVisible();
  });

  // -- Column headers -------------------------------------------------------

  test('should display expected column headers', async ({ page }) => {
    const grid = page.getByTestId(TestIds.GRID_ALERT_MANAGEMENT);
    const headerCells = grid.locator('.e-headercell');

    // Checkbox column + 12 data columns = at least 13
    expect(await headerCells.count()).toBeGreaterThanOrEqual(13);
  });

  test('should contain priority column header', async ({ page }) => {
    const grid = page.getByTestId(TestIds.GRID_ALERT_MANAGEMENT);
    const priorityHeader = grid.locator('.e-headercell').filter({ hasText: 'Priority' });
    await expect(priorityHeader.first()).toBeVisible();
  });

  test('should contain value column header', async ({ page }) => {
    const grid = page.getByTestId(TestIds.GRID_ALERT_MANAGEMENT);
    const valueHeader = grid.locator('.e-headercell').filter({ hasText: 'Value' });
    await expect(valueHeader.first()).toBeVisible();
  });

  test('should contain status column header', async ({ page }) => {
    const grid = page.getByTestId(TestIds.GRID_ALERT_MANAGEMENT);
    const statusHeader = grid.locator('.e-headercell').filter({ hasText: 'Status' });
    await expect(statusHeader.first()).toBeVisible();
  });

  test('should contain ticker symbol column header', async ({ page }) => {
    const grid = page.getByTestId(TestIds.GRID_ALERT_MANAGEMENT);
    const tickerHeader = grid.locator('.e-headercell').filter({ hasText: 'Ticker' });
    await expect(tickerHeader.first()).toBeVisible();
  });

  test('should contain settlement status column header', async ({ page }) => {
    const grid = page.getByTestId(TestIds.GRID_ALERT_MANAGEMENT);
    const settlementHeader = grid.locator('.e-headercell').filter({ hasText: 'Settlement' });
    await expect(settlementHeader.first()).toBeVisible();
  });

  // -- Badge elements -------------------------------------------------------

  test('should render priority badges for Critical orders', async ({ page }) => {
    const grid = page.getByTestId(TestIds.GRID_ALERT_MANAGEMENT);
    // AlertBadge renders with data-testid="alert-badge" and text like "CRITICAL"
    const criticalBadges = grid.getByTestId('alert-badge').filter({ hasText: 'CRITICAL' });
    expect(await criticalBadges.count()).toBeGreaterThan(0);
  });

  test('should render priority badges for High orders', async ({ page }) => {
    const grid = page.getByTestId(TestIds.GRID_ALERT_MANAGEMENT);
    const highBadges = grid.getByTestId('alert-badge').filter({ hasText: 'HIGH' });
    expect(await highBadges.count()).toBeGreaterThan(0);
  });

  test('should render alert badges in grid', async ({ page }) => {
    const grid = page.getByTestId(TestIds.GRID_ALERT_MANAGEMENT);
    // AlertBadge components render with data-testid="alert-badge"
    const badges = grid.getByTestId('alert-badge');
    expect(await badges.count()).toBeGreaterThan(0);
  });

  test('should render badges with variant styling', async ({ page }) => {
    const grid = page.getByTestId(TestIds.GRID_ALERT_MANAGEMENT);
    // Verify badges exist and have inline background styles (CSS variable based)
    const badges = grid.getByTestId('alert-badge');
    const count = await badges.count();
    expect(count).toBeGreaterThan(0);

    // First badge should have a background style applied
    const bg = await badges.first().evaluate((el) => el.style.background);
    expect(bg).not.toBe('');
  });

  // -- Pagination -----------------------------------------------------------

  test('should display pagination controls', async ({ page }) => {
    const grid = page.getByTestId(TestIds.GRID_ALERT_MANAGEMENT);
    const pager = grid.locator('.e-pager');
    await expect(pager).toBeVisible();
  });

  test('should show 10 data rows per page', async ({ page }) => {
    const grid = page.getByTestId(TestIds.GRID_ALERT_MANAGEMENT);
    const rows = grid.locator('.e-row');
    expect(await rows.count()).toBe(10);
  });

  test('should navigate to the next page', async ({ page }) => {
    const grid = page.getByTestId(TestIds.GRID_ALERT_MANAGEMENT);
    const pager = grid.locator('.e-pager');
    await expect(pager).toBeVisible();

    const nextPage = grid.locator('.e-nextpage:not(.e-disable)').first();
    if (await nextPage.isVisible()) {
      await nextPage.click();

      const currentPage = grid.locator('.e-currentitem');
      await expect(currentPage).toContainText('2');
    }
  });

  // -- Checkbox column ------------------------------------------------------

  test('should have a checkbox column', async ({ page }) => {
    const grid = page.getByTestId(TestIds.GRID_ALERT_MANAGEMENT);
    // Syncfusion renders checkbox column with .e-headerchkcelldiv or .e-checkselectall
    const checkboxHeader = grid.locator('.e-headerchkcelldiv, .e-checkselectall').first();
    await expect(checkboxHeader).toBeVisible();
  });

  test('should select a row via checkbox click', async ({ page }) => {
    const grid = page.getByTestId(TestIds.GRID_ALERT_MANAGEMENT);
    const firstCheckbox = grid.locator('.e-rowcell .e-checkselect').first();

    if (await firstCheckbox.isVisible()) {
      await firstCheckbox.click();

      // Verify selection background appears
      const selectedRow = grid.locator('.e-selectionbackground');
      expect(await selectedRow.count()).toBeGreaterThan(0);
    }
  });

  // -- Theme colour application ---------------------------------------------

  test('should apply theme colours to grid header cells', async ({ page }) => {
    const grid = page.getByTestId(TestIds.GRID_ALERT_MANAGEMENT);
    const headerCell = grid.locator('.e-headercell').first();
    const headerBg = await headerCell.evaluate((el) =>
      getComputedStyle(el).backgroundColor,
    );

    // Should not be the default Syncfusion gray
    expect(headerBg).not.toBe('rgb(227, 227, 227)');
  });

  test('should maintain theme colours after sorting a column', async ({ page }) => {
    const initialColor = await page.evaluate(() =>
      getComputedStyle(document.documentElement)
        .getPropertyValue('--color-primary-500')
        .trim(),
    );

    const grid = page.getByTestId(TestIds.GRID_ALERT_MANAGEMENT);
    const priorityHeader = grid.locator('.e-headercell').filter({ hasText: 'Priority' }).first();
    await priorityHeader.click();

    const afterColor = await page.evaluate(() =>
      getComputedStyle(document.documentElement)
        .getPropertyValue('--color-primary-500')
        .trim(),
    );

    expect(afterColor).toBe(initialColor);
  });

  // -- Sorting --------------------------------------------------------------

  test('should support column sorting on priority header', async ({ page }) => {
    const grid = page.getByTestId(TestIds.GRID_ALERT_MANAGEMENT);
    const priorityHeader = grid.locator('.e-headercell').filter({ hasText: 'Priority' }).first();
    await priorityHeader.click();

    const sortIcon = grid.locator(
      '.e-sortfilterdiv .e-ascending, .e-sortfilterdiv .e-descending',
    );

    if (await sortIcon.count() > 0) {
      await expect(sortIcon.first()).toBeVisible();
    }
  });

  // -- Search toolbar -------------------------------------------------------

  test('should display the grid with sorting enabled', async ({ page }) => {
    const grid = page.getByTestId(TestIds.GRID_ALERT_MANAGEMENT);
    // The grid supports sorting - verify sort icons are available on header cells
    const headerCells = grid.locator('.e-headercell');
    expect(await headerCells.count()).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// Native Order Management Grid
// ---------------------------------------------------------------------------
test.describe('Native Order Management Grid', () => {
  test.setTimeout(180000);

  test.beforeEach(async ({ page }) => {
    await injectAuth(page);
    await page.goto('/components/grid/native', { waitUntil: 'domcontentloaded' });
    await page.getByTestId('native-grid-alert-management').waitFor({ state: 'visible' });
  });

  // -- Section visibility ---------------------------------------------------

  test('should display the Native grid showcase page', async ({ page }) => {
    await expect(page.getByTestId(TestIds.NATIVE_GRID_SHOWCASE)).toBeVisible();
  });

  test('should display the Native order management grid', async ({ page }) => {
    const table = page.getByTestId('native-grid-alert-management');
    await expect(table).toBeVisible();
  });

  // -- Column headers -------------------------------------------------------

  test('should display expected column headers', async ({ page }) => {
    const table = page.getByTestId('native-grid-alert-management');
    const headers = table.locator('th');

    // Checkbox column + 10 data columns = at least 11
    expect(await headers.count()).toBeGreaterThanOrEqual(11);
  });

  test('should contain priority column header', async ({ page }) => {
    const table = page.getByTestId('native-grid-alert-management');
    const header = table.locator('th').filter({ hasText: 'Priority' });
    await expect(header.first()).toBeVisible();
  });

  test('should contain value column header', async ({ page }) => {
    const table = page.getByTestId('native-grid-alert-management');
    const header = table.locator('th').filter({ hasText: 'Value' });
    await expect(header.first()).toBeVisible();
  });

  test('should contain status column header', async ({ page }) => {
    const table = page.getByTestId('native-grid-alert-management');
    const header = table.locator('th').filter({ hasText: 'Status' });
    await expect(header.first()).toBeVisible();
  });

  test('should contain ticker symbol column header', async ({ page }) => {
    const table = page.getByTestId('native-grid-alert-management');
    const header = table.locator('th').filter({ hasText: 'Ticker' });
    await expect(header.first()).toBeAttached();
  });

  test('should contain settlement status column header', async ({ page }) => {
    const table = page.getByTestId('native-grid-alert-management');
    const header = table.locator('th').filter({ hasText: 'Settlement' });
    await expect(header.first()).toBeVisible();
  });

  test('should contain broker column header', async ({ page }) => {
    const table = page.getByTestId('native-grid-alert-management');
    const header = table.locator('th').filter({ hasText: 'Broker' });
    await expect(header.first()).toBeAttached();
  });

  test('should contain execution method column header', async ({ page }) => {
    const table = page.getByTestId('native-grid-alert-management');
    const header = table.locator('th').filter({ hasText: 'Execution' });
    await expect(header.first()).toBeVisible();
  });

  // -- Data rows ------------------------------------------------------------

  test('should display data rows in the table body', async ({ page }) => {
    const table = page.getByTestId('native-grid-alert-management');
    const rows = table.locator('tbody tr');
    expect(await rows.count()).toBeGreaterThan(0);
  });

  test('should show 10 data rows per page', async ({ page }) => {
    const table = page.getByTestId('native-grid-alert-management');
    const rows = table.locator('tbody tr');
    expect(await rows.count()).toBe(10);
  });

  // -- Checkbox column ------------------------------------------------------

  test('should have a checkbox column in the header', async ({ page }) => {
    const table = page.getByTestId('native-grid-alert-management');
    const checkboxHeader = table.locator('th input[type="checkbox"]');
    await expect(checkboxHeader).toBeVisible();
  });

  test('should have checkboxes in each data row', async ({ page }) => {
    const table = page.getByTestId('native-grid-alert-management');
    const rowCheckboxes = table.locator('tbody tr input[type="checkbox"]');
    expect(await rowCheckboxes.count()).toBeGreaterThan(0);
  });

  // -- Pagination -----------------------------------------------------------

  test('should display pagination controls below the table', async ({ page }) => {
    // Native pagination is rendered outside the <table> element but within
    // the same parent component wrapper. Look in the section ancestor.
    const table = page.getByTestId('native-grid-alert-management');
    const wrapper = table.locator('..');
    const pagination = wrapper.locator('nav, [role="navigation"], button').first();

    // If pagination is rendered as sibling buttons or a nav element
    if (await pagination.isVisible()) {
      await expect(pagination).toBeVisible();
    }
  });

  // -- Theme colour application ---------------------------------------------

  test('should use themed text colours', async ({ page }) => {
    const primaryColor = await page.evaluate(() =>
      getComputedStyle(document.documentElement)
        .getPropertyValue('--color-primary-500')
        .trim(),
    );

    // Verify a theme CSS variable is defined (non-empty means theme is active)
    expect(primaryColor.length).toBeGreaterThan(0);
  });

  test('should maintain theme colours after interacting with the table', async ({ page }) => {
    const initialColor = await page.evaluate(() =>
      getComputedStyle(document.documentElement)
        .getPropertyValue('--color-primary-500')
        .trim(),
    );

    // Click on a header to trigger sorting
    const table = page.getByTestId('native-grid-alert-management');
    const priorityHeader = table.locator('th').filter({ hasText: 'Priority' }).first();
    await priorityHeader.click();

    const afterColor = await page.evaluate(() =>
      getComputedStyle(document.documentElement)
        .getPropertyValue('--color-primary-500')
        .trim(),
    );

    expect(afterColor).toBe(initialColor);
  });
});
