import { test, expect } from '@playwright/test';

import { injectAuth } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

test.describe('Customers Page', () => {
  test.beforeEach(async ({ page }) => {
    await injectAuth(page);
    await page.goto('/customers', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId(TestIds.CUSTOMERS_PAGE)).toBeVisible({ timeout: 15000 });
  });

  test('should display the customers heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /customers/i })).toBeVisible();
  });

  test('should display the add customer button', async ({ page }) => {
    await expect(page.getByTestId(TestIds.CUSTOMERS_ADD_BTN)).toBeVisible();
  });

  test('should display the customers table', async ({ page }) => {
    await expect(page.getByTestId(TestIds.CUSTOMERS_TABLE)).toBeVisible();
  });

  test('should open dialog when add button is clicked', async ({ page }) => {
    await page.getByTestId(TestIds.CUSTOMERS_ADD_BTN).click();
    await expect(page.getByTestId(TestIds.CUSTOMERS_DIALOG)).toBeVisible();
  });

  test('should close dialog when cancel is clicked', async ({ page }) => {
    await page.getByTestId(TestIds.CUSTOMERS_ADD_BTN).click();
    await expect(page.getByTestId(TestIds.CUSTOMERS_DIALOG)).toBeVisible();
    await page.getByRole('button', { name: /cancel/i }).click();
    await expect(page.getByTestId(TestIds.CUSTOMERS_DIALOG)).not.toBeVisible();
  });

  test('should be navigable via sidebar nav item', async ({ page }) => {
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.getByTestId(TestIds.NAV_BUSINESS_EXPAND).click();
    await page.getByTestId(TestIds.NAV_CUSTOMERS).click();
    await expect(page).toHaveURL('/customers');
    await expect(page.getByTestId(TestIds.CUSTOMERS_PAGE)).toBeVisible();
  });
});
