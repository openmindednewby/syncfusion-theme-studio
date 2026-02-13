import { test, expect } from '@playwright/test';

import { login } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

test.describe('Catch-All Routes', () => {
  test.describe('Dashboard catch-all', () => {
    test.beforeEach(async ({ page }) => {
      await login(page);
    });

    test('should redirect unknown dashboard paths to /dashboard', async ({ page }) => {
      await page.goto('/dashboard/nonexistent-page');

      await expect(page).toHaveURL('/dashboard');
      await expect(page.getByTestId(TestIds.DASHBOARD_HEADING)).toBeVisible();
    });

    test('should redirect deeply nested unknown dashboard paths to /dashboard', async ({ page }) => {
      await page.goto('/dashboard/some/deeply/nested/unknown/path');

      await expect(page).toHaveURL('/dashboard');
      await expect(page.getByTestId(TestIds.DASHBOARD_HEADING)).toBeVisible();
    });
  });

  test.describe('Top-level catch-all', () => {
    test('should redirect unknown top-level paths to /', async ({ page }) => {
      await page.goto('/nonexistent-top-level-page');

      await expect(page).toHaveURL('/');
      // Login page should be visible at root
      await expect(page.getByTestId(TestIds.LOGIN_SUBMIT)).toBeVisible();
    });

    test('should redirect arbitrary top-level paths to /', async ({ page }) => {
      await page.goto('/some-random-route');

      await expect(page).toHaveURL('/');
      await expect(page.getByTestId(TestIds.LOGIN_SUBMIT)).toBeVisible();
    });
  });
});
