import { test, expect } from '@playwright/test';

import { TestIds } from '../shared/testIds';
import { DashboardPage } from '../pages/DashboardPage';

test.describe('Sidebar', () => {
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
  });

  test('sidebar is visible on initial load', async ({ page }) => {
    await expect(page.getByTestId(TestIds.SIDEBAR)).toBeVisible();
  });

  test('collapses sidebar on toggle button click', async ({ page }) => {
    const sidebar = page.getByTestId(TestIds.SIDEBAR);

    // Initially should be expanded
    await expect(sidebar).toHaveAttribute('data-collapsed', 'false');

    // Click toggle
    await page.getByTestId(TestIds.SIDEBAR_TOGGLE).click();

    // Should be collapsed
    await expect(sidebar).toHaveAttribute('data-collapsed', 'true');
  });

  test('expands sidebar after being collapsed', async ({ page }) => {
    const sidebar = page.getByTestId(TestIds.SIDEBAR);

    // Collapse first
    await page.getByTestId(TestIds.SIDEBAR_TOGGLE).click();
    await expect(sidebar).toHaveAttribute('data-collapsed', 'true');

    // Expand again
    await page.getByTestId(TestIds.SIDEBAR_TOGGLE).click();
    await expect(sidebar).toHaveAttribute('data-collapsed', 'false');
  });

  test('persists sidebar state across navigation', async ({ page }) => {
    const sidebar = page.getByTestId(TestIds.SIDEBAR);

    // Collapse sidebar
    await page.getByTestId(TestIds.SIDEBAR_TOGGLE).click();
    await expect(sidebar).toHaveAttribute('data-collapsed', 'true');

    // Navigate to another page
    await page.getByTestId(TestIds.NAV_PRODUCTS).click();
    await expect(page).toHaveURL('/products');

    // Sidebar should still be collapsed
    await expect(sidebar).toHaveAttribute('data-collapsed', 'true');

    // Navigate back
    await page.getByTestId(TestIds.NAV_HOME).click();
    await expect(page).toHaveURL('/');

    // Sidebar should still be collapsed
    await expect(sidebar).toHaveAttribute('data-collapsed', 'true');
  });

  test('navigation links are accessible in both states', async ({ page }) => {
    // Test navigation while expanded
    await page.getByTestId(TestIds.NAV_PRODUCTS).click();
    await expect(page).toHaveURL('/products');

    // Go back and collapse sidebar
    await page.getByTestId(TestIds.NAV_HOME).click();
    await page.getByTestId(TestIds.SIDEBAR_TOGGLE).click();

    // Test navigation while collapsed
    await page.getByTestId(TestIds.NAV_COMPONENTS).click();
    await expect(page).toHaveURL('/components');
  });
});
