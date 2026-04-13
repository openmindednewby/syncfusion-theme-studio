import { test, expect } from '@playwright/test';

import { injectAuth } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

test.describe('Dashboard Page', () => {
  test.beforeEach(async ({ page }) => {
    await injectAuth(page);
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId(TestIds.DASHBOARD_HEADING)).toBeVisible({ timeout: 15000 });
  });

  test('should display dashboard heading', async ({ page }) => {
    await expect(page.getByTestId(TestIds.DASHBOARD_HEADING)).toBeVisible();
  });

  test('should display all stat cards', async ({ page }) => {
    await expect(page.getByTestId(TestIds.STAT_TOTAL_USERS)).toBeVisible();
    await expect(page.getByTestId(TestIds.STAT_ACTIVE_SESSIONS)).toBeVisible();
    await expect(page.getByTestId(TestIds.STAT_REVENUE)).toBeVisible();
    await expect(page.getByTestId(TestIds.STAT_GROWTH)).toBeVisible();
  });

  test('should display chart placeholders', async ({ page }) => {
    await expect(page.getByTestId(TestIds.CHART_REVENUE)).toBeVisible();
    await expect(page.getByTestId(TestIds.CHART_USER_ACTIVITY)).toBeVisible();
  });

  test('should display Explore Components button', async ({ page }) => {
    await expect(page.getByTestId(TestIds.BTN_EXPLORE_COMPONENTS)).toBeVisible();
  });

  test('should display Theme Editor button', async ({ page }) => {
    await expect(page.getByTestId(TestIds.BTN_THEME_EDITOR)).toBeVisible();
  });

  test('should navigate to components page when clicking Explore Components', async ({ page }) => {
    await page.getByTestId(TestIds.BTN_EXPLORE_COMPONENTS).click();
    // /components redirects to /components/native
    await expect(page).toHaveURL('/components/native');
  });

  test('should open theme drawer when clicking Theme Editor button', async ({ page }) => {
    await page.getByTestId(TestIds.BTN_THEME_EDITOR).click();

    // Verify drawer is expanded
    const drawer = page.getByTestId(TestIds.THEME_SETTINGS_DRAWER);
    await expect(drawer).toBeVisible();
    const box = await drawer.boundingBox();
    expect(box!.width).toBeGreaterThan(400);
  });

  test('should display sidebar navigation', async ({ page }) => {
    await expect(page.getByTestId(TestIds.SIDEBAR)).toBeVisible();
    // Dashboard is now an expandable sub-menu with expand button
    await expect(page.getByTestId(TestIds.NAV_DASHBOARD_EXPAND)).toBeVisible();
    // Products is now an expandable sub-menu with expand button
    await expect(page.getByTestId(TestIds.NAV_PRODUCTS_EXPAND)).toBeVisible();
    // Components is now an expandable sub-menu with expand button
    await expect(page.getByTestId(TestIds.NAV_COMPONENTS_EXPAND)).toBeVisible();
    // Forms is an expandable sub-menu
    await expect(page.getByTestId(TestIds.NAV_FORMS_EXPAND)).toBeVisible();
  });

  test('should collapse and expand sidebar', async ({ page }) => {
    const sidebar = page.getByTestId(TestIds.SIDEBAR);
    const toggleBtn = page.getByTestId(TestIds.SIDEBAR_TOGGLE);

    // Verify expanded by default via data attribute
    await expect(sidebar).toHaveAttribute('data-collapsed', 'false');

    // Collapse sidebar
    await toggleBtn.click();
    await expect(sidebar).toHaveAttribute('data-collapsed', 'true');

    // Expand again
    await toggleBtn.click();
    await expect(sidebar).toHaveAttribute('data-collapsed', 'false');
  });

  test('should have active state on dashboard nav item', async ({ page }) => {
    // Navigate to a Dashboard child route so the expandable section is active
    await page.goto('/dashboard/home/overview', { waitUntil: 'domcontentloaded' });
    await page.getByTestId(TestIds.DASHBOARD_HEADING).waitFor({ state: 'visible' });

    const dashboardNav = page.getByTestId(TestIds.NAV_DASHBOARD_EXPAND);

    // Should have active styling via the 'active' class applied by NavExpandableItem
    const hasActiveClass = await dashboardNav.evaluate((el) =>
      el.classList.contains('active')
    );
    expect(hasActiveClass).toBe(true);
  });

  test('should navigate to products page via sidebar sub-menu', async ({ page }) => {
    // Products is now an expandable sub-menu - expand it first
    await page.getByTestId(TestIds.NAV_PRODUCTS_EXPAND).click();
    // Click on Native products (scoped to Products section to avoid duplicate testId matches)
    await page.locator('#nav-children-nav-products-expand').getByTestId(TestIds.NAV_PRODUCTS_NATIVE).click();
    await expect(page).toHaveURL('/products/native');
  });

  test('should navigate to components page via sidebar sub-menu', async ({ page }) => {
    // Components is now an expandable sub-menu - expand it first
    await page.getByTestId(TestIds.NAV_COMPONENTS_EXPAND).click();
    // Expand the Overview sub-group to reveal Native/Syncfusion links
    await page.getByTestId(TestIds.NAV_OVERVIEW_GROUP_EXPAND).click();
    // Click on Native components (scoped to Overview sub-group to avoid duplicate testId matches)
    await page.locator('#subgroup-nav-overview-group').getByTestId(TestIds.NAV_COMPONENTS_NATIVE).click();
    await expect(page).toHaveURL('/components/native');
  });

  // The sidebar no longer has a login/logout link. Authentication is
  // handled externally. Removed the nav-login test accordingly.

  test('should display theme color showcase section', async ({ page }) => {
    // Check for the Theme Colors in Action section
    await expect(page.getByRole('heading', { name: 'Theme Colors in Action' })).toBeVisible();
  });

  test('should display recent activity section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Recent Activity' })).toBeVisible();
  });

  test('should display stat card trend indicators', async ({ page }) => {
    // Stat cards should show trend percentages
    const totalUsersCard = page.getByTestId(TestIds.STAT_TOTAL_USERS);
    await expect(totalUsersCard).toContainText('12.5%');
  });

  test('should toggle theme mode via header button', async ({ page }) => {
    const toggleBtn = page.getByTestId(TestIds.THEME_TOGGLE);
    const htmlElement = page.locator('html');

    // Get initial mode
    const wasDark = await htmlElement.evaluate((el) => el.classList.contains('dark'));

    // Toggle mode
    await toggleBtn.click();

    // Verify mode changed
    if (wasDark) {
      await expect(htmlElement).not.toHaveClass(/dark/);
    } else {
      await expect(htmlElement).toHaveClass(/dark/);
    }
  });

  test('should open theme settings via header cog button', async ({ page }) => {
    await page.getByTestId(TestIds.THEME_SETTINGS_BUTTON).click();

    const drawer = page.getByTestId(TestIds.THEME_SETTINGS_DRAWER);
    await expect(drawer).toBeVisible();
    const box = await drawer.boundingBox();
    expect(box!.width).toBeGreaterThan(400);
  });
});
