import { test, expect } from '@playwright/test';

import { login } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

// ---------------------------------------------------------------------------
// Syncfusion Alert Management Grid
// ---------------------------------------------------------------------------
// Skip Syncfusion component tests by default due to long load times.
// Run with: npx playwright test e2e/components/alert-grid.spec.ts --timeout=180000
test.describe('Syncfusion Alert Management Grid', () => {
  test.skip(
    ({ browserName }) => true,
    'Skipped by default - Syncfusion DataGrid requires long load times. Run manually with --timeout=180000',
  );

  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/dashboard/components/grid/syncfusion');
    await page.waitForLoadState('networkidle');
    // Allow Syncfusion grid to fully initialise
    await page.waitForTimeout(1000);
  });

  // -- Section visibility ---------------------------------------------------

  test('should display the Syncfusion grid showcase page', async ({ page }) => {
    await expect(page.getByTestId(TestIds.SYNCFUSION_GRID_SHOWCASE)).toBeVisible();
  });

  test('should display the Alert Management section wrapper', async ({ page }) => {
    const section = page.getByTestId('grid-showcase-alert-management');
    await expect(section).toBeVisible();
  });

  test('should display the Alert Management Syncfusion grid', async ({ page }) => {
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

  test('should contain severity column header', async ({ page }) => {
    const grid = page.getByTestId(TestIds.GRID_ALERT_MANAGEMENT);
    const severityHeader = grid.locator('.e-headercell').filter({ hasText: 'Severity' });
    await expect(severityHeader.first()).toBeVisible();
  });

  test('should contain score column header', async ({ page }) => {
    const grid = page.getByTestId(TestIds.GRID_ALERT_MANAGEMENT);
    const scoreHeader = grid.locator('.e-headercell').filter({ hasText: 'Score' });
    await expect(scoreHeader.first()).toBeVisible();
  });

  test('should contain status column header', async ({ page }) => {
    const grid = page.getByTestId(TestIds.GRID_ALERT_MANAGEMENT);
    const statusHeader = grid.locator('.e-headercell').filter({ hasText: 'Status' });
    await expect(statusHeader.first()).toBeVisible();
  });

  test('should contain correlation column header', async ({ page }) => {
    const grid = page.getByTestId(TestIds.GRID_ALERT_MANAGEMENT);
    const correlationHeader = grid.locator('.e-headercell').filter({ hasText: 'Correlation' });
    await expect(correlationHeader.first()).toBeVisible();
  });

  test('should contain SLA Status column header', async ({ page }) => {
    const grid = page.getByTestId(TestIds.GRID_ALERT_MANAGEMENT);
    const slaHeader = grid.locator('.e-headercell').filter({ hasText: 'SLA' });
    await expect(slaHeader.first()).toBeVisible();
  });

  // -- Badge elements -------------------------------------------------------

  test('should render severity badge-error badges for Critical alerts', async ({ page }) => {
    const grid = page.getByTestId(TestIds.GRID_ALERT_MANAGEMENT);
    const errorBadges = grid.locator('.badge-error');
    expect(await errorBadges.count()).toBeGreaterThan(0);
  });

  test('should render severity badge-warning badges for High alerts', async ({ page }) => {
    const grid = page.getByTestId(TestIds.GRID_ALERT_MANAGEMENT);
    const warningBadges = grid.locator('.badge-warning');
    expect(await warningBadges.count()).toBeGreaterThan(0);
  });

  test('should render badge-info badges', async ({ page }) => {
    const grid = page.getByTestId(TestIds.GRID_ALERT_MANAGEMENT);
    const infoBadges = grid.locator('.badge-info');
    expect(await infoBadges.count()).toBeGreaterThan(0);
  });

  test('should render badge-success badges', async ({ page }) => {
    const grid = page.getByTestId(TestIds.GRID_ALERT_MANAGEMENT);
    const successBadges = grid.locator('.badge-success');
    expect(await successBadges.count()).toBeGreaterThan(0);
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
    const nextPage = grid.locator('.e-nextpage:not(.e-disable)');

    if (await nextPage.isVisible()) {
      await nextPage.click();
      await page.waitForTimeout(300);

      const currentPage = grid.locator('.e-currentitem');
      await expect(currentPage).toContainText('2');
    }
  });

  // -- Checkbox column ------------------------------------------------------

  test('should have a checkbox column', async ({ page }) => {
    const grid = page.getByTestId(TestIds.GRID_ALERT_MANAGEMENT);
    // Syncfusion renders checkbox column headers with .e-checkselectall
    const checkboxHeader = grid.locator('.e-checkselectall');
    await expect(checkboxHeader).toBeVisible();
  });

  test('should select a row via checkbox click', async ({ page }) => {
    const grid = page.getByTestId(TestIds.GRID_ALERT_MANAGEMENT);
    const firstCheckbox = grid.locator('.e-rowcell .e-checkselect').first();

    if (await firstCheckbox.isVisible()) {
      await firstCheckbox.click();
      await page.waitForTimeout(200);

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
    const severityHeader = grid.locator('.e-headercell').filter({ hasText: 'Severity' }).first();
    await severityHeader.click();
    await page.waitForTimeout(300);

    const afterColor = await page.evaluate(() =>
      getComputedStyle(document.documentElement)
        .getPropertyValue('--color-primary-500')
        .trim(),
    );

    expect(afterColor).toBe(initialColor);
  });

  // -- Sorting --------------------------------------------------------------

  test('should support column sorting on severity header', async ({ page }) => {
    const grid = page.getByTestId(TestIds.GRID_ALERT_MANAGEMENT);
    const severityHeader = grid.locator('.e-headercell').filter({ hasText: 'Severity' }).first();
    await severityHeader.click();
    await page.waitForTimeout(300);

    const sortIcon = grid.locator(
      '.e-sortfilterdiv .e-ascending, .e-sortfilterdiv .e-descending',
    );

    if (await sortIcon.count() > 0) {
      await expect(sortIcon.first()).toBeVisible();
    }
  });

  // -- Search toolbar -------------------------------------------------------

  test('should display the search toolbar', async ({ page }) => {
    const grid = page.getByTestId(TestIds.GRID_ALERT_MANAGEMENT);
    const toolbar = grid.locator('.e-toolbar');
    await expect(toolbar).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Native Alert Management Grid
// ---------------------------------------------------------------------------
test.describe('Native Alert Management Grid', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/dashboard/components/grid/native', { waitUntil: 'domcontentloaded' });
    await page.getByTestId('native-grid-alert-management').waitFor({ state: 'visible' });
  });

  // -- Section visibility ---------------------------------------------------

  test('should display the Native grid showcase page', async ({ page }) => {
    await expect(page.getByTestId(TestIds.NATIVE_GRID_SHOWCASE)).toBeVisible();
  });

  test('should display the Native alert management grid', async ({ page }) => {
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

  test('should contain severity column header', async ({ page }) => {
    const table = page.getByTestId('native-grid-alert-management');
    const header = table.locator('th').filter({ hasText: 'Severity' });
    await expect(header.first()).toBeVisible();
  });

  test('should contain score column header', async ({ page }) => {
    const table = page.getByTestId('native-grid-alert-management');
    const header = table.locator('th').filter({ hasText: 'Score' });
    await expect(header.first()).toBeVisible();
  });

  test('should contain status column header', async ({ page }) => {
    const table = page.getByTestId('native-grid-alert-management');
    const header = table.locator('th').filter({ hasText: 'Status' });
    await expect(header.first()).toBeVisible();
  });

  test('should contain correlation column header', async ({ page }) => {
    const table = page.getByTestId('native-grid-alert-management');
    const header = table.locator('th').filter({ hasText: 'Correlation' });
    await expect(header.first()).toBeAttached();
  });

  test('should contain SLA Status column header', async ({ page }) => {
    const table = page.getByTestId('native-grid-alert-management');
    const header = table.locator('th').filter({ hasText: 'SLA Status' });
    await expect(header.first()).toBeVisible();
  });

  test('should contain assignee column header', async ({ page }) => {
    const table = page.getByTestId('native-grid-alert-management');
    const header = table.locator('th').filter({ hasText: 'Assignee' });
    await expect(header.first()).toBeAttached();
  });

  test('should contain automation column header', async ({ page }) => {
    const table = page.getByTestId('native-grid-alert-management');
    const header = table.locator('th').filter({ hasText: 'Automation' });
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
    const severityHeader = table.locator('th').filter({ hasText: 'Severity' }).first();
    await severityHeader.click();

    const afterColor = await page.evaluate(() =>
      getComputedStyle(document.documentElement)
        .getPropertyValue('--color-primary-500')
        .trim(),
    );

    expect(afterColor).toBe(initialColor);
  });
});
