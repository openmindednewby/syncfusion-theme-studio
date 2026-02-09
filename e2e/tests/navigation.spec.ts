import { test, expect } from '@playwright/test';

import { TestIds } from '../shared/testIds';
import { DashboardPage } from '../page-objects/DashboardPage';

test.describe('Navigation', () => {
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
  });

  test('displays dashboard on initial load', async () => {
    await dashboardPage.expectDashboardVisible();
  });

  test('navigates to products page', async ({ page }) => {
    await page.getByTestId(TestIds.NAV_PRODUCTS).click();
    await expect(page).toHaveURL('/dashboard/products');
  });

  test('navigates to components page', async ({ page }) => {
    await page.getByTestId(TestIds.NAV_COMPONENTS).click();
    await expect(page).toHaveURL('/dashboard/components');
  });

  test('opens theme settings drawer via cog icon', async ({ page }) => {
    // Click the theme settings button (cog icon) to expand drawer
    await page.getByTestId(TestIds.THEME_SETTINGS_BUTTON).click();
    await page.waitForTimeout(350);

    // Verify drawer is expanded (aria-expanded=true)
    await expect(page.getByTestId(TestIds.THEME_CLOSE_BTN)).toHaveAttribute('aria-expanded', 'true');
  });

  test('navigates to login page', async ({ page }) => {
    await page.getByTestId(TestIds.NAV_LOGIN).click();
    await expect(page).toHaveURL('/');
  });
});
