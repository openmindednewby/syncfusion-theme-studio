import { test, expect } from '@playwright/test';

import { injectAuth } from '../fixtures/auth';

test.describe('Catch-All Routes', () => {
  test.describe('404 page for unknown paths', () => {
    test.beforeEach(async ({ page }) => {
      await injectAuth(page);
    });

    test('should show 404 page for unknown paths', async ({ page }) => {
      await page.goto('/nonexistent-page');

      await expect(page.getByText('404')).toBeVisible();
    });

    test('should show 404 page for deeply nested unknown paths', async ({ page }) => {
      await page.goto('/some/deeply/nested/unknown/path');

      await expect(page.getByText('404')).toBeVisible();
    });

    test('should have a button that navigates back to the dashboard', async ({ page }) => {
      await page.goto('/nonexistent-page');

      await expect(page.getByText('404')).toBeVisible();

      const goHomeButton = page.getByRole('button', { name: 'Go to Dashboard', exact: true });
      await expect(goHomeButton).toBeVisible();

      await goHomeButton.click();
      await expect(page).toHaveURL('/dashboard');
    });
  });
});
