import { test, expect } from '@playwright/test';

import { injectAuth } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

test.describe('Organization Switcher', () => {
  test.beforeEach(async ({ page }) => {
    await injectAuth(page);
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId(TestIds.DASHBOARD_HEADING)).toBeVisible({ timeout: 15000 });
  });

  // The org switcher renders in both expanded and collapsed sidebar — use .first() to target the visible one
  test('should display the org switcher button in the sidebar', async ({ page }) => {
    await expect(page.getByTestId(TestIds.ORG_SWITCHER).first()).toBeVisible();
  });

  test('should show the current organization name in the switcher', async ({ page }) => {
    const switcher = page.getByTestId(TestIds.ORG_SWITCHER).first();
    await expect(switcher).toBeVisible();
    await expect(switcher).not.toBeEmpty();
  });

  test('should open the org dropdown menu when clicked', async ({ page }) => {
    const switcher = page.getByTestId(TestIds.ORG_SWITCHER).first();
    await switcher.click();
    await expect(page.getByTestId(TestIds.ORG_SWITCHER_MENU).first()).toBeVisible();
  });

  test('should display organization items in the dropdown', async ({ page }) => {
    const switcher = page.getByTestId(TestIds.ORG_SWITCHER).first();
    await switcher.click();
    await expect(page.getByTestId(TestIds.ORG_SWITCHER_MENU).first()).toBeVisible();

    const items = page.getByTestId(TestIds.ORG_SWITCHER_ITEM);
    await expect(items.first()).toBeVisible();
  });

  test('should close the dropdown when clicking the switcher again', async ({ page }) => {
    const switcher = page.getByTestId(TestIds.ORG_SWITCHER).first();

    // Open
    await switcher.click();
    await expect(page.getByTestId(TestIds.ORG_SWITCHER_MENU).first()).toBeVisible();

    // Close
    await switcher.click();
    await expect(page.getByTestId(TestIds.ORG_SWITCHER_MENU)).not.toBeVisible();
  });

  test('should switch organization when clicking a different org item', async ({ page }) => {
    const switcher = page.getByTestId(TestIds.ORG_SWITCHER).first();

    // Open the menu
    await switcher.click();
    await expect(page.getByTestId(TestIds.ORG_SWITCHER_MENU).first()).toBeVisible();

    const items = page.getByTestId(TestIds.ORG_SWITCHER_ITEM);
    const itemCount = await items.count();

    if (itemCount > 1) {
      // eslint-disable-next-line no-fragile-selectors/no-fragile-selectors -- selecting by index is intentional here
      await items.nth(1).click();

      // Menu should close after selection
      await expect(page.getByTestId(TestIds.ORG_SWITCHER_MENU)).not.toBeVisible();

      // The switcher should still be functional
      await expect(switcher).toBeVisible();
    }
  });
});
