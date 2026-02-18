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

  test('navigates to products page via sidebar sub-menu', async ({ page }) => {
    // Products is now an expandable sub-menu - expand it first
    await page.getByTestId(TestIds.NAV_PRODUCTS_EXPAND).click();
    // Click on Native products (scoped to Products section to avoid duplicate testId matches)
    await page.locator('#nav-children-nav-products-expand').getByTestId(TestIds.NAV_PRODUCTS_NATIVE).click();
    await expect(page).toHaveURL('/dashboard/products/native');
  });

  test('navigates to components page via sidebar sub-menu', async ({ page }) => {
    // Components is an expandable sub-menu - expand it first
    await page.getByTestId(TestIds.NAV_COMPONENTS_EXPAND).click();
    // Expand the Overview sub-group to reveal Native/Syncfusion links
    await page.getByTestId(TestIds.NAV_OVERVIEW_GROUP_EXPAND).click();
    // Click on Native components (scoped to Overview sub-group)
    await page.locator('#subgroup-nav-overview-group').getByTestId(TestIds.NAV_COMPONENTS_NATIVE).click();
    await expect(page).toHaveURL('/dashboard/components/native');
  });

  test('opens theme settings drawer via cog icon', async ({ page }) => {
    // Click the theme settings button (cog icon) to expand drawer
    await page.getByTestId(TestIds.THEME_SETTINGS_BUTTON).click();

    // Wait for drawer to expand using web-first assertion (auto-waits for attribute)
    await expect(page.getByTestId(TestIds.THEME_CLOSE_BTN)).toHaveAttribute('aria-expanded', 'true');
  });
});
