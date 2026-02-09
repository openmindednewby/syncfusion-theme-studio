import { test, expect } from '@playwright/test';

import { TestIds } from '../shared/testIds';

/**
 * Helper to get the actual input element inside a testId wrapper
 */
function getInput(page: import('@playwright/test').Page, testId: string) {
  return page.getByTestId(testId).locator('input');
}

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display login form with pre-filled demo credentials', async ({ page }) => {
    // Verify form elements are visible
    await expect(page.getByTestId(TestIds.LOGIN_USERNAME)).toBeVisible();
    await expect(page.getByTestId(TestIds.LOGIN_PASSWORD)).toBeVisible();
    await expect(page.getByTestId(TestIds.LOGIN_SUBMIT)).toBeVisible();

    // Verify demo credentials are pre-filled (input is inside the wrapper)
    await expect(getInput(page, TestIds.LOGIN_USERNAME)).toHaveValue('demo@example.com');
    await expect(getInput(page, TestIds.LOGIN_PASSWORD)).toHaveValue('demo123');
  });

  test('should display license key input field', async ({ page }) => {
    await expect(page.getByTestId(TestIds.LOGIN_LICENSE_KEY)).toBeVisible();
  });

  test('should redirect to dashboard on successful login', async ({ page }) => {
    // Click submit with pre-filled credentials
    await page.getByTestId(TestIds.LOGIN_SUBMIT).click();

    // Verify redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByTestId(TestIds.DASHBOARD_HEADING)).toBeVisible();
  });

  test('should toggle between light and dark mode on login page', async ({ page }) => {
    const htmlElement = page.locator('html');

    // Check initial mode and toggle
    const initiallyDark = await htmlElement.evaluate((el) => el.classList.contains('dark'));

    // Click theme toggle
    await page.getByTestId(TestIds.THEME_TOGGLE).click();

    // Wait for mode to change using web-first assertion
    if (initiallyDark)
      await expect(htmlElement).not.toHaveClass(/dark/);
    else
      await expect(htmlElement).toHaveClass(/dark/);
  });

  test('should use native components (not Syncfusion) for performance', async ({ page }) => {
    // Verify login page doesn't load heavy Syncfusion components
    // Native inputs should NOT have .e-control class
    const syncfusionElements = page.locator('.e-control');
    await expect(syncfusionElements).toHaveCount(0);
  });

  test('should have accessible form labels', async ({ page }) => {
    // Check for input types inside wrappers
    const usernameInput = getInput(page, TestIds.LOGIN_USERNAME);
    await expect(usernameInput).toHaveAttribute('type', 'email');

    const passwordInput = getInput(page, TestIds.LOGIN_PASSWORD);
    await expect(passwordInput).toHaveAttribute('type', 'password');

    // Check that labels are associated with inputs
    const usernameLabel = page.getByTestId(TestIds.LOGIN_USERNAME).locator('label');
    await expect(usernameLabel).toBeVisible();

    const passwordLabel = page.getByTestId(TestIds.LOGIN_PASSWORD).locator('label');
    await expect(passwordLabel).toBeVisible();
  });

  test('should allow clearing and entering custom credentials', async ({ page }) => {
    const usernameInput = getInput(page, TestIds.LOGIN_USERNAME);
    const passwordInput = getInput(page, TestIds.LOGIN_PASSWORD);

    // Clear and enter custom values
    await usernameInput.clear();
    await usernameInput.fill('custom@test.com');

    await passwordInput.clear();
    await passwordInput.fill('custompassword');

    // Verify values were updated
    await expect(usernameInput).toHaveValue('custom@test.com');
    await expect(passwordInput).toHaveValue('custompassword');

    // Should still redirect (demo app accepts any credentials)
    await page.getByTestId(TestIds.LOGIN_SUBMIT).click();
    await expect(page).toHaveURL('/dashboard');
  });

  test('should preserve theme preference after navigation', async ({ page }) => {
    // Switch to dark mode
    const isDark = await page.evaluate(() =>
      document.documentElement.classList.contains('dark')
    );

    if (!isDark) {
      await page.getByTestId(TestIds.THEME_TOGGLE).click();
    }

    // Login and navigate to dashboard
    await page.getByTestId(TestIds.LOGIN_SUBMIT).click();
    await expect(page).toHaveURL('/dashboard');

    // Verify dark mode is preserved
    const stillDark = await page.evaluate(() =>
      document.documentElement.classList.contains('dark')
    );
    expect(stillDark).toBe(true);
  });
});
