import { test, expect } from '@playwright/test';

import { injectAuth } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

test.describe('Settings Page', () => {
  test.beforeEach(async ({ page }) => {
    await injectAuth(page);
    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId(TestIds.SETTINGS_PAGE)).toBeVisible({ timeout: 15000 });
  });

  test('should display the settings heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Settings', exact: true })).toBeVisible();
  });

  test('should display all three tab buttons', async ({ page }) => {
    await expect(page.getByTestId(TestIds.SETTINGS_TAB_ACCOUNT)).toBeVisible();
    await expect(page.getByTestId(TestIds.SETTINGS_TAB_APPEARANCE)).toBeVisible();
    await expect(page.getByTestId(TestIds.SETTINGS_TAB_NOTIFICATIONS)).toBeVisible();
  });

  test('should show account settings by default', async ({ page }) => {
    await expect(page.getByText(/account settings/i)).toBeVisible();
  });

  test('should switch to appearance tab when clicked', async ({ page }) => {
    await page.getByTestId(TestIds.SETTINGS_TAB_APPEARANCE).click();
    await expect(page.getByRole('heading', { name: 'Appearance', exact: true })).toBeVisible();
  });

  test('should switch to notifications tab when clicked', async ({ page }) => {
    await page.getByTestId(TestIds.SETTINGS_TAB_NOTIFICATIONS).click();
    await expect(page.getByText(/notification preferences/i)).toBeVisible();
  });

  test('should be navigable via sidebar settings nav item', async ({ page }) => {
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.getByTestId(TestIds.NAV_SETTINGS).click();
    await expect(page).toHaveURL('/settings');
    await expect(page.getByTestId(TestIds.SETTINGS_PAGE)).toBeVisible();
  });
});
