import { test, expect } from '@playwright/test';

import { TestIds } from '../shared/testIds';
import { DashboardPage } from '../pages/DashboardPage';

test.describe('Theme Toggle', () => {
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
  });

  test('toggles from light to dark mode', async ({ page }) => {
    // Initially should be light mode (no dark class)
    await expect(page.locator('html')).not.toHaveClass(/dark/);

    // Toggle to dark
    await page.getByTestId(TestIds.THEME_TOGGLE).click();

    // Should now have dark class
    await expect(page.locator('html')).toHaveClass(/dark/);
  });

  test('toggles from dark to light mode', async ({ page }) => {
    // Toggle to dark first
    await page.getByTestId(TestIds.THEME_TOGGLE).click();
    await expect(page.locator('html')).toHaveClass(/dark/);

    // Toggle back to light
    await page.getByTestId(TestIds.THEME_TOGGLE).click();
    await expect(page.locator('html')).not.toHaveClass(/dark/);
  });

  test('persists theme preference across navigation', async ({ page }) => {
    // Toggle to dark
    await page.getByTestId(TestIds.THEME_TOGGLE).click();
    await expect(page.locator('html')).toHaveClass(/dark/);

    // Navigate to another page
    await page.getByTestId(TestIds.NAV_PRODUCTS).click();
    await expect(page).toHaveURL('/products');

    // Theme should still be dark
    await expect(page.locator('html')).toHaveClass(/dark/);

    // Navigate back
    await page.getByTestId(TestIds.NAV_HOME).click();
    await expect(page).toHaveURL('/');

    // Theme should still be dark
    await expect(page.locator('html')).toHaveClass(/dark/);
  });
});
