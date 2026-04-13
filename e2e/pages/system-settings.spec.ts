import { test, expect } from '@playwright/test';

import { injectAuth } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

test.describe('System Settings Page', () => {
  test.beforeEach(async ({ page }) => {
    await injectAuth(page);
    await page.goto('/admin/system-settings', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId(TestIds.ADMIN_SETTINGS_PAGE)).toBeVisible({ timeout: 15000 });
  });

  test('should display the system settings heading', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('should render the settings tabs navigation', async ({ page }) => {
    await expect(page.getByTestId(TestIds.ADMIN_SETTINGS_TABS)).toBeVisible();
  });

  test('should display all five setting tab buttons', async ({ page }) => {
    await expect(page.getByTestId(TestIds.ADMIN_SETTINGS_TAB_GENERAL_BTN)).toBeVisible();
    await expect(page.getByTestId(TestIds.ADMIN_SETTINGS_TAB_SECURITY_BTN)).toBeVisible();
    await expect(page.getByTestId(TestIds.ADMIN_SETTINGS_TAB_EMAIL_BTN)).toBeVisible();
    await expect(page.getByTestId(TestIds.ADMIN_SETTINGS_TAB_NOTIFICATIONS_BTN)).toBeVisible();
    await expect(page.getByTestId(TestIds.ADMIN_SETTINGS_TAB_MAINTENANCE_BTN)).toBeVisible();
  });

  test('should show General tab as active by default', async ({ page }) => {
    const generalBtn = page.getByTestId(TestIds.ADMIN_SETTINGS_TAB_GENERAL_BTN);
    await expect(generalBtn).toHaveAttribute('aria-selected', 'true');
  });

  test('should switch to Security tab when clicked', async ({ page }) => {
    const securityBtn = page.getByTestId(TestIds.ADMIN_SETTINGS_TAB_SECURITY_BTN);
    await securityBtn.click();
    await expect(securityBtn).toHaveAttribute('aria-selected', 'true');

    // General tab should no longer be active
    const generalBtn = page.getByTestId(TestIds.ADMIN_SETTINGS_TAB_GENERAL_BTN);
    await expect(generalBtn).toHaveAttribute('aria-selected', 'false');
  });

  test('should switch to Email tab when clicked', async ({ page }) => {
    const emailBtn = page.getByTestId(TestIds.ADMIN_SETTINGS_TAB_EMAIL_BTN);
    await emailBtn.click();
    await expect(emailBtn).toHaveAttribute('aria-selected', 'true');
  });

  test('should switch to Maintenance tab when clicked', async ({ page }) => {
    const maintenanceBtn = page.getByTestId(TestIds.ADMIN_SETTINGS_TAB_MAINTENANCE_BTN);
    await maintenanceBtn.click();
    await expect(maintenanceBtn).toHaveAttribute('aria-selected', 'true');
  });
});
