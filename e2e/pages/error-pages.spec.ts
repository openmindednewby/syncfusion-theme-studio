import { test, expect } from '@playwright/test';

import { injectAuth } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

test.describe('Error Pages', () => {
  test.beforeEach(async ({ page }) => {
    await injectAuth(page);
  });

  test.describe('401 Unauthorized', () => {
    test('should display 401 page at /errors/401', async ({ page }) => {
      await page.goto('/errors/401', { waitUntil: 'domcontentloaded' });
      await expect(page.getByRole('heading', { name: /401/i })).toBeVisible({ timeout: 10000 });
    });

    test('should have a go to dashboard button', async ({ page }) => {
      await page.goto('/errors/401', { waitUntil: 'domcontentloaded' });
      await expect(page.getByTestId(TestIds.ERROR_401_GO_HOME)).toBeVisible({ timeout: 10000 });
    });

    test('should navigate to dashboard when button clicked', async ({ page }) => {
      await page.goto('/errors/401', { waitUntil: 'domcontentloaded' });
      await expect(page.getByTestId(TestIds.ERROR_401_GO_HOME)).toBeVisible({ timeout: 10000 });
      await page.getByTestId(TestIds.ERROR_401_GO_HOME).click();
      await expect(page).toHaveURL('/dashboard');
    });
  });

  test.describe('403 Forbidden', () => {
    test('should display 403 page at /errors/403', async ({ page }) => {
      await page.goto('/errors/403', { waitUntil: 'domcontentloaded' });
      await expect(page.getByRole('heading', { name: /403/i })).toBeVisible({ timeout: 10000 });
    });

    test('should have a go to dashboard button', async ({ page }) => {
      await page.goto('/errors/403', { waitUntil: 'domcontentloaded' });
      await expect(page.getByTestId(TestIds.ERROR_403_GO_HOME)).toBeVisible({ timeout: 10000 });
    });

    test('should navigate to dashboard when button clicked', async ({ page }) => {
      await page.goto('/errors/403', { waitUntil: 'domcontentloaded' });
      await expect(page.getByTestId(TestIds.ERROR_403_GO_HOME)).toBeVisible({ timeout: 10000 });
      await page.getByTestId(TestIds.ERROR_403_GO_HOME).click();
      await expect(page).toHaveURL('/dashboard');
    });
  });

  test.describe('500 Server Error', () => {
    test('should display 500 page at /errors/500', async ({ page }) => {
      await page.goto('/errors/500', { waitUntil: 'domcontentloaded' });
      await expect(page.getByRole('heading', { name: /500/i })).toBeVisible({ timeout: 10000 });
    });

    test('should have a go to dashboard button', async ({ page }) => {
      await page.goto('/errors/500', { waitUntil: 'domcontentloaded' });
      await expect(page.getByTestId(TestIds.ERROR_500_GO_HOME)).toBeVisible({ timeout: 10000 });
    });

    test('should navigate to dashboard when button clicked', async ({ page }) => {
      await page.goto('/errors/500', { waitUntil: 'domcontentloaded' });
      await expect(page.getByTestId(TestIds.ERROR_500_GO_HOME)).toBeVisible({ timeout: 10000 });
      await page.getByTestId(TestIds.ERROR_500_GO_HOME).click();
      await expect(page).toHaveURL('/dashboard');
    });
  });
});
