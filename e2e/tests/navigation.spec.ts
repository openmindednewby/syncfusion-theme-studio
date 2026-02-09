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

  test('navigates to components page via sidebar sub-menu', async ({ page }) => {
    // Components is now an expandable sub-menu - expand it first
    await page.getByTestId(TestIds.NAV_COMPONENTS_EXPAND).click();
    // Click on Native components (first sub-item)
    await page.getByTestId(TestIds.NAV_COMPONENTS_NATIVE).click();
    // /dashboard/components redirects to /dashboard/components/native
    await expect(page).toHaveURL('/dashboard/components/native');
  });

  test('opens theme settings drawer via cog icon', async ({ page }) => {
    // Click the theme settings button (cog icon) to expand drawer
    await page.getByTestId(TestIds.THEME_SETTINGS_BUTTON).click();

    // Wait for drawer to expand using web-first assertion (auto-waits for attribute)
    await expect(page.getByTestId(TestIds.THEME_CLOSE_BTN)).toHaveAttribute('aria-expanded', 'true');
  });

  test('navigates to login page', async ({ page }) => {
    await page.getByTestId(TestIds.NAV_LOGIN).click();
    await expect(page).toHaveURL('/');
  });
});
