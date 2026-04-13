import { test, expect } from '@playwright/test';

import { injectAuth } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

test.describe('Inventory Page', () => {
  test.beforeEach(async ({ page }) => {
    await injectAuth(page);
    await page.goto('/inventory', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId(TestIds.INVENTORY_PAGE)).toBeVisible({ timeout: 15000 });
  });

  test('should display the inventory heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /inventory/i })).toBeVisible();
  });

  test('should display the add item button', async ({ page }) => {
    await expect(page.getByTestId(TestIds.INVENTORY_ADD_BTN)).toBeVisible();
  });

  test('should display the inventory table', async ({ page }) => {
    await expect(page.getByTestId(TestIds.INVENTORY_TABLE)).toBeVisible();
  });

  test('should display search input', async ({ page }) => {
    await expect(page.locator('input[type="search"]')).toBeVisible();
  });

  test('should open dialog when add button is clicked', async ({ page }) => {
    await page.getByTestId(TestIds.INVENTORY_ADD_BTN).click();
    await expect(page.getByTestId(TestIds.INVENTORY_DIALOG)).toBeVisible();
  });

  test('should close dialog when cancel is clicked', async ({ page }) => {
    await page.getByTestId(TestIds.INVENTORY_ADD_BTN).click();
    await expect(page.getByTestId(TestIds.INVENTORY_DIALOG)).toBeVisible();
    await page.getByRole('button', { name: /cancel/i }).click();
    await expect(page.getByTestId(TestIds.INVENTORY_DIALOG)).not.toBeVisible();
  });

  test('should be navigable via sidebar nav item', async ({ page }) => {
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.getByTestId(TestIds.NAV_BUSINESS_EXPAND).click({ timeout: 15000 });
    await page.getByTestId(TestIds.NAV_INVENTORY).click({ timeout: 15000 });
    await expect(page).toHaveURL('/inventory');
    await expect(page.getByTestId(TestIds.INVENTORY_PAGE)).toBeVisible({ timeout: 15000 });
  });
});
