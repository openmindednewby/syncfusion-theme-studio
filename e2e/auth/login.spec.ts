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

  test('should redirect to dashboard on successful login', async ({ page }) => {
    // Click submit with pre-filled credentials
    await page.getByTestId(TestIds.LOGIN_SUBMIT).click();

    // Verify redirect to dashboard — allow extra time for lazy-loaded dashboard content
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByTestId(TestIds.DASHBOARD_HEADING)).toBeVisible({ timeout: 15000 });
  });

  // Login page intentionally has no theme toggle — it is rendered via the Header
  // component on the dashboard only. Theme toggling is tested in mode-toggle.spec.ts.

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
    // Default is dark mode — verify it's active on login page
    await expect(page.locator('html')).toHaveClass(/dark/);

    // Login and navigate to dashboard
    await page.getByTestId(TestIds.LOGIN_SUBMIT).click();
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByTestId(TestIds.DASHBOARD_HEADING)).toBeVisible({ timeout: 15000 });

    // Verify dark mode is preserved (web-first assertion auto-retries)
    await expect(page.locator('html')).toHaveClass(/dark/);
  });
});
