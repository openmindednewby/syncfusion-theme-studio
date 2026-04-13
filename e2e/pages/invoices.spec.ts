import { test, expect } from '@playwright/test';

import { injectAuth } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

test.describe('Invoices Page', () => {
  test.beforeEach(async ({ page }) => {
    await injectAuth(page);
    await page.goto('/invoices', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId(TestIds.INVOICES_PAGE)).toBeVisible({ timeout: 15000 });
  });

  test('should display the invoices heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /invoices/i })).toBeVisible();
  });

  test('should display the add invoice button', async ({ page }) => {
    await expect(page.getByTestId(TestIds.INVOICES_ADD_BTN)).toBeVisible();
  });

  test('should display the invoices table', async ({ page }) => {
    await expect(page.getByTestId(TestIds.INVOICES_TABLE)).toBeVisible();
  });

  test('should display status filter dropdown', async ({ page }) => {
    await expect(page.locator('select')).toBeVisible();
  });

  test('should open dialog when add button is clicked', async ({ page }) => {
    await page.getByTestId(TestIds.INVOICES_ADD_BTN).click();
    await expect(page.getByTestId(TestIds.INVOICES_DIALOG)).toBeVisible();
  });

  test('should close dialog when cancel is clicked', async ({ page }) => {
    await page.getByTestId(TestIds.INVOICES_ADD_BTN).click();
    await expect(page.getByTestId(TestIds.INVOICES_DIALOG)).toBeVisible();
    await page.getByRole('button', { name: /cancel/i }).click();
    await expect(page.getByTestId(TestIds.INVOICES_DIALOG)).not.toBeVisible();
  });

  test('should be navigable via sidebar nav item', async ({ page }) => {
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.getByTestId(TestIds.NAV_BUSINESS_EXPAND).click({ timeout: 15000 });
    await page.getByTestId(TestIds.NAV_INVOICES).click({ timeout: 15000 });
    await expect(page).toHaveURL('/invoices');
    await expect(page.getByTestId(TestIds.INVOICES_PAGE)).toBeVisible({ timeout: 15000 });
  });
});
