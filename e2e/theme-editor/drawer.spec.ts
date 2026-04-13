import { test, expect } from '@playwright/test';

import { login, openThemeDrawer, closeThemeDrawer } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

test.describe('Theme Settings Drawer', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('should toggle drawer open and closed', async ({ page }) => {
    const toggleBtn = page.getByTestId(TestIds.THEME_CLOSE_BTN);

    // Ensure drawer is open first
    await openThemeDrawer(page);
    await expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');

    // Close the drawer
    await closeThemeDrawer(page);
    await expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');

    // Open the drawer again
    await openThemeDrawer(page);
    await expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');
  });

  test('should close drawer when clicking toggle button again', async ({ page }) => {
    const toggleBtn = page.getByTestId(TestIds.THEME_CLOSE_BTN);

    // Open drawer first
    await openThemeDrawer(page);
    await expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');

    // Close drawer
    await closeThemeDrawer(page);

    // Verify drawer collapsed
    await expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
  });

  test('should open drawer via Theme Editor button in dashboard', async ({ page }) => {
    // Click the Theme Editor button on dashboard
    await page.getByTestId(TestIds.BTN_THEME_EDITOR).click();

    // Wait for drawer to be fully expanded using aria-expanded attribute
    const toggleBtn = page.getByTestId(TestIds.THEME_CLOSE_BTN);
    await expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');

    // Verify drawer is visible
    const drawer = page.getByTestId(TestIds.THEME_SETTINGS_DRAWER);
    await expect(drawer).toBeVisible();
  });

  // The sidebar no longer has a Theme Editor nav item. The drawer
  // is opened via the header cog button or the dashboard Theme Editor button.

  test('should open drawer via header settings cog button', async ({ page }) => {
    // Click the cog icon in header
    await page.getByTestId(TestIds.THEME_SETTINGS_BUTTON).click();

    // Wait for drawer to be fully expanded using aria-expanded attribute
    const toggleBtn = page.getByTestId(TestIds.THEME_CLOSE_BTN);
    await expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');

    // Verify drawer is visible
    const drawer = page.getByTestId(TestIds.THEME_SETTINGS_DRAWER);
    await expect(drawer).toBeVisible();
  });

  test('should display all navigation tabs when open', async ({ page }) => {
    await openThemeDrawer(page);

    // Verify all tabs are visible
    await expect(page.getByTestId(TestIds.THEME_TAB_COLORS)).toBeVisible();
    await expect(page.getByTestId(TestIds.THEME_TAB_TYPOGRAPHY)).toBeVisible();
    await expect(page.getByTestId(TestIds.THEME_TAB_LAYOUT)).toBeVisible();
    await expect(page.getByTestId(TestIds.THEME_TAB_LIGHT)).toBeVisible();
    await expect(page.getByTestId(TestIds.THEME_TAB_DARK)).toBeVisible();
    await expect(page.getByTestId(TestIds.THEME_TAB_COMPONENTS)).toBeVisible();
    await expect(page.getByTestId(TestIds.THEME_TAB_PRESETS)).toBeVisible();
  });

  test('should switch between tabs', async ({ page }) => {
    await openThemeDrawer(page);

    // Click Typography tab
    await page.getByTestId(TestIds.THEME_TAB_TYPOGRAPHY).click();

    // Verify Typography tab is active
    await expect(page.getByTestId(TestIds.THEME_TAB_TYPOGRAPHY)).toHaveAttribute('aria-current', 'page');

    // Click Layout tab
    await page.getByTestId(TestIds.THEME_TAB_LAYOUT).click();
    await expect(page.getByTestId(TestIds.THEME_TAB_LAYOUT)).toHaveAttribute('aria-current', 'page');

    // Verify Typography is no longer active
    await expect(page.getByTestId(TestIds.THEME_TAB_TYPOGRAPHY)).not.toHaveAttribute('aria-current', 'page');
  });

  test('should display export and import buttons', async ({ page }) => {
    await openThemeDrawer(page);

    // Scroll to bottom if needed and check export/import buttons
    await expect(page.getByTestId(TestIds.THEME_EXPORT_BTN)).toBeVisible();
    await expect(page.getByTestId(TestIds.THEME_IMPORT_TOGGLE_BTN)).toBeVisible();
  });

  test('should display reset button', async ({ page }) => {
    await openThemeDrawer(page);

    // Scroll down to find reset button
    const resetBtn = page.getByTestId(TestIds.THEME_RESET_BTN);
    await resetBtn.scrollIntoViewIfNeeded();
    await expect(resetBtn).toBeVisible();
  });

  test('should have proper ARIA attributes', async ({ page }) => {
    await openThemeDrawer(page);

    const drawer = page.getByTestId(TestIds.THEME_SETTINGS_DRAWER);

    // Verify drawer has proper ARIA label
    await expect(drawer).toHaveAttribute('aria-label');

    // Verify toggle button has expanded state
    const toggleBtn = page.getByTestId(TestIds.THEME_CLOSE_BTN);
    await expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');
  });
});
