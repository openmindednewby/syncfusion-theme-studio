import { test, expect, type ConsoleMessage } from '@playwright/test';

import { injectAuth } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

/**
 * BreadcrumbNative Duplicate Key Warning Verification.
 *
 * Verifies that navigating to pages with breadcrumbs does not produce
 * React console warnings about duplicate keys.
 */

test.describe('BreadcrumbNative No Duplicate Key Warnings', () => {
  test('should not produce console warnings about duplicate React keys', async ({ page }) => {
    const duplicateKeyWarnings: string[] = [];

    page.on('console', (msg: ConsoleMessage) => {
      if (msg.type() === 'warning' || msg.type() === 'error') {
        const text = msg.text();
        if (text.includes('duplicate key') || text.includes('unique "key" prop')) {
          duplicateKeyWarnings.push(text);
        }
      }
    });

    await injectAuth(page);
    await page.goto('/dashboard/home/overview', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('domcontentloaded');

    // Wait for page content (including breadcrumbs) to fully render
    const mainContent = page.locator('main, [role="main"], h1, h2').first();
    await expect(mainContent).toBeVisible({ timeout: 15000 });

    expect(
      duplicateKeyWarnings,
      'No console warnings about duplicate React keys in breadcrumbs',
    ).toHaveLength(0);
  });

  test('should render breadcrumb navigation without duplicate elements', async ({ page }) => {
    await injectAuth(page);
    await page.goto('/dashboard/home/overview', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('domcontentloaded');

    const breadcrumbNav = page.getByTestId(TestIds.HEADER_BREADCRUMB_NAV);
    const breadcrumbExists = await breadcrumbNav.count() > 0;

    if (breadcrumbExists) {
      await expect(breadcrumbNav).toBeVisible();

      // Collect breadcrumb text to check for unexpected duplicates
      const breadcrumbLinks = breadcrumbNav.locator('a, span').filter({ hasText: /.+/ });
      const linkCount = await breadcrumbLinks.count();
      expect(linkCount, 'Breadcrumb should have at least one item').toBeGreaterThan(0);

      const texts: string[] = [];
      for (let i = 0; i < linkCount; i++) {
        const text = await breadcrumbLinks.nth(i).textContent();
        if (text?.trim()) texts.push(text.trim());
      }

      // No two consecutive breadcrumb items should be identical
      for (let i = 1; i < texts.length; i++) {
        expect(
          texts[i],
          `Consecutive breadcrumb items should not duplicate: "${texts[i]}"`,
        ).not.toBe(texts[i - 1]);
      }
    }
  });
});
