import { test, expect } from '@playwright/test';

import { login } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

test.describe('Dashboard Page', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
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
    await expect(page.getByTestId(TestIds.CHART_USERS)).toBeVisible();
  });

  test('should display Explore Components button', async ({ page }) => {
    await expect(page.getByTestId(TestIds.BTN_EXPLORE_COMPONENTS)).toBeVisible();
  });

  test('should display Theme Editor button', async ({ page }) => {
    await expect(page.getByTestId(TestIds.BTN_THEME_EDITOR)).toBeVisible();
  });

  test('should navigate to components page when clicking Explore Components', async ({ page }) => {
    await page.getByTestId(TestIds.BTN_EXPLORE_COMPONENTS).click();
    // /dashboard/components redirects to /dashboard/components/native
    await expect(page).toHaveURL('/dashboard/components/native');
  });

  test('should open theme drawer when clicking Theme Editor button', async ({ page }) => {
    await page.getByTestId(TestIds.BTN_THEME_EDITOR).click();
    await page.waitForTimeout(350);

    // Verify drawer is expanded
    const drawer = page.getByTestId(TestIds.THEME_SETTINGS_DRAWER);
    const box = await drawer.boundingBox();
    expect(box!.width).toBeGreaterThan(400);
  });

  test('should display sidebar navigation', async ({ page }) => {
    await expect(page.getByTestId(TestIds.SIDEBAR)).toBeVisible();
    await expect(page.getByTestId(TestIds.NAV_HOME)).toBeVisible();
    await expect(page.getByTestId(TestIds.NAV_PRODUCTS)).toBeVisible();
    // Components is now an expandable sub-menu with expand button
    await expect(page.getByTestId(TestIds.NAV_COMPONENTS_EXPAND)).toBeVisible();
    await expect(page.getByTestId(TestIds.NAV_THEME_EDITOR)).toBeVisible();
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
    const dashboardNav = page.getByTestId(TestIds.NAV_HOME);

    // Should have active styling via the 'active' class applied by NavLink
    const hasActiveClass = await dashboardNav.evaluate((el) =>
      el.classList.contains('active')
    );
    expect(hasActiveClass).toBe(true);
  });

  test('should navigate to products page', async ({ page }) => {
    await page.getByTestId(TestIds.NAV_PRODUCTS).click();
    await expect(page).toHaveURL('/dashboard/products');
  });

  test('should navigate to components page via sidebar sub-menu', async ({ page }) => {
    // Components is now an expandable sub-menu - expand it first
    await page.getByTestId(TestIds.NAV_COMPONENTS_EXPAND).click();
    // Click on Native components (first sub-item)
    await page.getByTestId(TestIds.NAV_COMPONENTS_NATIVE).click();
    // /dashboard/components redirects to /dashboard/components/native
    await expect(page).toHaveURL('/dashboard/components/native');
  });

  test('should navigate back to login page', async ({ page }) => {
    await page.getByTestId(TestIds.NAV_LOGIN).click();
    await expect(page).toHaveURL('/');
  });

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
    await page.waitForTimeout(100); // Wait for theme transition

    // Verify mode changed
    if (wasDark) {
      await expect(htmlElement).not.toHaveClass(/dark/);
    } else {
      await expect(htmlElement).toHaveClass(/dark/);
    }
  });

  test('should open theme settings via header cog button', async ({ page }) => {
    await page.getByTestId(TestIds.THEME_SETTINGS_BUTTON).click();
    await page.waitForTimeout(350);

    const drawer = page.getByTestId(TestIds.THEME_SETTINGS_DRAWER);
    const box = await drawer.boundingBox();
    expect(box!.width).toBeGreaterThan(400);
  });
});
