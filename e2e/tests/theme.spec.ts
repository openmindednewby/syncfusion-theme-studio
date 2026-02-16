import { test, expect } from '@playwright/test';

import { TestIds } from '../shared/testIds';
import { DashboardPage } from '../page-objects/DashboardPage';

test.describe('Theme Toggle', () => {
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
  });

  test('toggles from dark to light mode', async ({ page }) => {
    // Default is dark mode
    await expect(page.locator('html')).toHaveClass(/dark/);

    // Toggle to light
    await page.getByTestId(TestIds.THEME_TOGGLE).click();

    // Should no longer have dark class
    await expect(page.locator('html')).not.toHaveClass(/dark/);
  });

  test('toggles from light back to dark mode', async ({ page }) => {
    // Toggle to light first (from dark default)
    await page.getByTestId(TestIds.THEME_TOGGLE).click();
    await expect(page.locator('html')).not.toHaveClass(/dark/);

    // Toggle back to dark
    await page.getByTestId(TestIds.THEME_TOGGLE).click();
    await expect(page.locator('html')).toHaveClass(/dark/);
  });

  test('persists theme preference across navigation', async ({ page }) => {
    // Toggle to light (from dark default)
    await page.getByTestId(TestIds.THEME_TOGGLE).click();
    await expect(page.locator('html')).not.toHaveClass(/dark/);

    // Navigate to another page using URL
    await page.goto('/dashboard/products');
    await page.waitForLoadState('domcontentloaded');

    // Theme should still be light
    await expect(page.locator('html')).not.toHaveClass(/dark/);

    // Navigate back
    await page.goto('/dashboard');
    await page.waitForLoadState('domcontentloaded');

    // Theme should still be light
    await expect(page.locator('html')).not.toHaveClass(/dark/);
  });
});
