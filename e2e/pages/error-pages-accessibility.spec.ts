import { test, expect } from '@playwright/test';

import { injectAuth } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

/**
 * Error Pages Accessibility and Navigation E2E tests.
 *
 * Verifies bug fixes on /errors/401, /errors/403, and /errors/500:
 * - Each "Go Home" button has an aria-label attribute
 * - Each "Go Home" button has a data-testid attribute
 * - Clicking "Go Home" navigates to the dashboard
 * - Each error page has unique heading content
 */

interface ErrorPageConfig {
  path: string;
  name: string;
  goHomeTestId: string;
}

const ERROR_PAGES: ErrorPageConfig[] = [
  { path: '/errors/401', name: 'Unauthorized (401)', goHomeTestId: TestIds.ERROR_401_GO_HOME },
  { path: '/errors/403', name: 'Forbidden (403)', goHomeTestId: TestIds.ERROR_403_GO_HOME },
  { path: '/errors/500', name: 'Server Error (500)', goHomeTestId: TestIds.ERROR_500_GO_HOME },
];

for (const errorPage of ERROR_PAGES) {
  test.describe(`${errorPage.name} - Accessibility`, () => {
    test.beforeEach(async ({ page }) => {
      await injectAuth(page);
      await page.goto(errorPage.path);
      await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });
    });

    test(`should have a Go Home button with aria-label`, async ({ page }) => {
      const goHomeButton = page.getByTestId(errorPage.goHomeTestId);
      await expect(goHomeButton).toBeVisible();

      const ariaLabel = await goHomeButton.getAttribute('aria-label');
      expect(
        ariaLabel,
        `Go Home button on ${errorPage.path} should have an aria-label attribute`,
      ).toBeTruthy();

      expect(
        ariaLabel!.trim().length,
        `aria-label should not be empty on ${errorPage.path}`,
      ).toBeGreaterThan(0);
    });

    test(`should have a Go Home button with data-testid`, async ({ page }) => {
      const goHomeButton = page.getByTestId(errorPage.goHomeTestId);
      await expect(goHomeButton).toBeVisible();

      const testId = await goHomeButton.getAttribute('data-testid');
      expect(
        testId,
        `Go Home button on ${errorPage.path} should have a data-testid`,
      ).toBe(errorPage.goHomeTestId);
    });

    test(`should navigate to dashboard when Go Home is clicked`, async ({ page }) => {
      const goHomeButton = page.getByTestId(errorPage.goHomeTestId);
      await expect(goHomeButton).toBeVisible();
      await goHomeButton.click();

      await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });
    });
  });
}

test.describe('Error Pages - Unique Content', () => {
  test('should render unique heading text for each error page', async ({ page }) => {
    await injectAuth(page);
    const pageTexts: string[] = [];

    for (const errorPage of ERROR_PAGES) {
      await page.goto(errorPage.path);
      await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });

      const heading = await page.locator('h1').textContent();
      expect(heading, `${errorPage.path} should have a heading`).toBeTruthy();
      pageTexts.push(heading ?? '');
    }

    const uniqueTexts = new Set(pageTexts);
    expect(
      uniqueTexts.size,
      `Each error page should have a unique heading. Found: ${pageTexts.join(', ')}`,
    ).toBe(ERROR_PAGES.length);
  });
});
