import { test, expect } from '@playwright/test';

import { injectAuth } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

test.describe('Spreadsheet Page', () => {
  test.describe.configure({ timeout: 120000 });

  test.beforeEach(async ({ page }) => {
    await injectAuth(page);
    await page.goto('/spreadsheet', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId(TestIds.SPREADSHEET_PAGE)).toBeVisible({ timeout: 15000 });
  });

  test('should render the spreadsheet page with heading', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('should render the sheet selector', async ({ page }) => {
    await expect(page.getByTestId(TestIds.SPREADSHEET_SHEET_SELECTOR)).toBeVisible();
  });

  test('should render the spreadsheet view container', async ({ page }) => {
    await expect(page.getByTestId(TestIds.SPREADSHEET_VIEW)).toBeVisible();
  });

  test('should render the Syncfusion Spreadsheet component', async ({ page }) => {
    const spreadsheet = page.locator('.e-spreadsheet');
    await expect(spreadsheet).toBeVisible({ timeout: 15000 });
  });

  test('should render the ribbon toolbar with tab items', async ({ page }) => {
    // The ribbon renders tab items (Home, Insert, Formulas, etc.) —
    // check for the text content rather than internal Syncfusion CSS classes
    // which may degrade in different rendering modes.
    const spreadsheet = page.locator('.e-spreadsheet');
    await expect(spreadsheet).toBeVisible({ timeout: 15000 });
    await expect(spreadsheet.getByText('Home')).toBeVisible({ timeout: 15000 });
  });

  test('should not show color picker dialog on initial load', async ({ page }) => {
    // Wait for spreadsheet to be ready
    const spreadsheet = page.locator('.e-spreadsheet');
    await expect(spreadsheet).toBeVisible({ timeout: 15000 });

    // Color picker dialog should NOT be visible on load
    const colorPickerDialog = page.locator('.e-colorpicker-wrapper .e-dropdown-popup');
    await expect(colorPickerDialog).not.toBeVisible();
  });

  test('should render spreadsheet cells with data', async ({ page }) => {
    // The spreadsheet should have cell content from sample data
    const cells = page.locator('.e-spreadsheet .e-cell');
    const cellCount = await cells.count();
    expect(cellCount).toBeGreaterThan(0);
  });
});
