import { test, expect } from '@playwright/test';

import { login } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

// Skip Syncfusion component tests by default due to long load times
// Run with: npx playwright test e2e/components/menu-syncfusion --timeout=180000
test.describe('Syncfusion Menu Components', () => {
  test.skip(({ browserName }) => true, 'Skipped by default - Syncfusion components require long load times. Run manually with --timeout=180000');

  test.beforeEach(async ({ page }) => {
    await login(page);
    // SPA navigation via sidebar
    await page.getByTestId(TestIds.NAV_COMPONENTS_EXPAND).click();
    await page.getByTestId(TestIds.NAV_COMPONENTS_SYNCFUSION_EXPAND).click();
    await page.getByTestId(TestIds.NAV_MENU_SYNCFUSION).click();
    await expect(page.getByTestId(TestIds.SYNCFUSION_MENU_SHOWCASE)).toBeVisible({ timeout: 30000 });
  });

  test('should render the menu showcase page', async ({ page }) => {
    await expect(page.getByTestId(TestIds.SYNCFUSION_MENU_SHOWCASE)).toBeVisible();
  });

  test('should render Syncfusion menu elements', async ({ page }) => {
    // Syncfusion MenuComponent uses .e-menu-wrapper class
    const menus = page.locator('.e-menu-wrapper');
    expect(await menus.count()).toBeGreaterThan(0);
  });

  test('should open sub-menu on hover', async ({ page }) => {
    // Hover over a top-level menu item to reveal sub-menu
    const menuItem = page.locator('.e-menu-item').first();
    await menuItem.scrollIntoViewIfNeeded();
    await menuItem.hover();

    // Sub-menu popup should appear
    const subMenu = page.locator('.e-ul');
    await expect(subMenu.first()).toBeVisible({ timeout: 5000 });
  });

  test('should navigate to correct URL', async ({ page }) => {
    expect(page.url()).toContain('/dashboard/components/menu/syncfusion');
  });
});
