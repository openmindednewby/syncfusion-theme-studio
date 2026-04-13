import { test, expect } from '@playwright/test';

import { injectAuth } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

test.describe('Activity Log Page', () => {
  test.beforeEach(async ({ page }) => {
    await injectAuth(page);
    await page.goto('/activity-log', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId(TestIds.ACTIVITY_LOG_PAGE)).toBeVisible({ timeout: 15000 });
  });

  test('should display the activity log heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /activity log/i })).toBeVisible();
  });

  test('should display filters section', async ({ page }) => {
    await expect(page.getByTestId(TestIds.ACTIVITY_LOG_FILTERS)).toBeVisible();
  });

  test('should display search input', async ({ page }) => {
    const filters = page.getByTestId(TestIds.ACTIVITY_LOG_FILTERS);
    await expect(filters.locator('input[type="search"]')).toBeVisible();
  });

  test('should display type filter dropdown', async ({ page }) => {
    const filters = page.getByTestId(TestIds.ACTIVITY_LOG_FILTERS);
    await expect(filters.locator('select').first()).toBeVisible();
  });

  test('should display activity log grid', async ({ page }) => {
    await expect(page.getByTestId(TestIds.ACTIVITY_LOG_GRID)).toBeVisible();
  });

  test('should display seed data rows in the grid', async ({ page }) => {
    const grid = page.getByTestId(TestIds.ACTIVITY_LOG_GRID);
    // Seed data has 8 entries — verify at least one row is visible
    const rows = grid.locator('tbody tr');
    await expect(rows.first()).toBeVisible();
    const count = await rows.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should filter entries by search term', async ({ page }) => {
    const filters = page.getByTestId(TestIds.ACTIVITY_LOG_FILTERS);
    const searchInput = filters.locator('input[type="search"]');
    await searchInput.fill('john');
    // Grid should update to show only matching entries
    const grid = page.getByTestId(TestIds.ACTIVITY_LOG_GRID);
    const rows = grid.locator('tbody tr');
    const count = await rows.count();
    // john.doe appears in 2 of the 8 seed entries
    expect(count).toBeLessThan(8);
  });

  test('should filter entries by type', async ({ page }) => {
    const filters = page.getByTestId(TestIds.ACTIVITY_LOG_FILTERS);
    const select = filters.getByLabel('Filter by action');
    // Get the total count before filtering
    const grid = page.getByTestId(TestIds.ACTIVITY_LOG_GRID);
    await expect(grid.locator('tbody tr').first()).toBeVisible({ timeout: 5000 });
    const totalBefore = await grid.locator('tbody tr').count();

    await select.selectOption('LoggedIn');
    // After filtering, should have fewer rows than the full set
    await expect(async () => {
      const count = await grid.locator('tbody tr').count();
      expect(count).toBeLessThan(totalBefore);
    }).toPass({ timeout: 5000 });
  });

  test('should be navigable via sidebar nav item', async ({ page }) => {
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId(TestIds.NAV_ACTIVITY_LOG)).toBeVisible({ timeout: 15000 });
    await page.getByTestId(TestIds.NAV_ACTIVITY_LOG).click();
    await expect(page).toHaveURL('/activity-log');
    await expect(page.getByTestId(TestIds.ACTIVITY_LOG_PAGE)).toBeVisible({ timeout: 15000 });
  });
});
