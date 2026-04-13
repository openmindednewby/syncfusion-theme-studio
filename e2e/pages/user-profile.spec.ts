import { test, expect } from '@playwright/test';

import { injectAuth } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

test.describe('User Profile Page', () => {
  test.beforeEach(async ({ page }) => {
    await injectAuth(page);
    await page.goto('/profile', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId(TestIds.PROFILE_PAGE)).toBeVisible({ timeout: 15000 });
  });

  test('should display the profile page', async ({ page }) => {
    await expect(page.getByTestId(TestIds.PROFILE_PAGE)).toBeVisible();
  });

  test('should display the profile form', async ({ page }) => {
    await expect(page.getByTestId(TestIds.PROFILE_FORM)).toBeVisible();
  });

  test('should display save button in profile form', async ({ page }) => {
    await expect(page.getByTestId(TestIds.PROFILE_SAVE)).toBeVisible();
  });

  test('should display form input fields', async ({ page }) => {
    const form = page.getByTestId(TestIds.PROFILE_FORM);
    await expect(form.locator('#firstName')).toBeVisible();
    await expect(form.locator('#lastName')).toBeVisible();
    await expect(form.locator('#email')).toBeVisible();
    await expect(form.locator('#phone')).toBeVisible();
    await expect(form.locator('#username')).toBeVisible();
  });

  test('should show saved indicator after form submit', async ({ page }) => {
    const form = page.getByTestId(TestIds.PROFILE_FORM);
    // Modify a field to enable the save button (disabled when form is not dirty)
    const firstNameInput = form.locator('#firstName');
    await firstNameInput.fill('Updated');
    await page.getByTestId(TestIds.PROFILE_SAVE).click();
    // Saved indicator text appears after submitting
    await expect(form.getByText(/saved/i)).toBeVisible();
  });

  test('should be navigable via sidebar bottom nav', async ({ page }) => {
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.getByTestId(TestIds.NAV_USER_PROFILE).click();
    await expect(page).toHaveURL('/profile');
    await expect(page.getByTestId(TestIds.PROFILE_PAGE)).toBeVisible();
  });
});
