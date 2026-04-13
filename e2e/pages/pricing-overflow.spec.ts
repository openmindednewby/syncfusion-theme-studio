import { test, expect } from '@playwright/test';

/**
 * Pricing Page Mobile Horizontal Overflow Verification.
 *
 * Verifies that the pricing page does not overflow horizontally at
 * 375px mobile viewport width.
 */

const MOBILE_VIEWPORT_WIDTH = 375;

test.describe('Pricing Page Mobile Horizontal Overflow', () => {
  test('should not have horizontal overflow at 375px viewport width', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: MOBILE_VIEWPORT_WIDTH, height: 812 },
    });
    const page = await context.newPage();

    try {
      // Pricing page is public (no auth needed)
      await page.goto('/pricing', { waitUntil: 'domcontentloaded' });
      await expect(page.getByTestId('pricing-page')).toBeVisible({ timeout: 15000 });

      const overflowData = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        overflowAmount: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      }));

      expect(
        overflowData.hasOverflow,
        `No horizontal overflow at ${String(MOBILE_VIEWPORT_WIDTH)}px. ` +
        `scrollWidth=${String(overflowData.scrollWidth)}, clientWidth=${String(overflowData.clientWidth)}, ` +
        `overflow=${String(overflowData.overflowAmount)}px`,
      ).toBe(false);
    } finally {
      await context.close();
    }
  });

  test('should keep pricing cards within viewport at mobile width', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: MOBILE_VIEWPORT_WIDTH, height: 812 },
    });
    const page = await context.newPage();

    try {
      await page.goto('/pricing', { waitUntil: 'domcontentloaded' });
      await expect(page.getByTestId('pricing-cards')).toBeVisible({ timeout: 15000 });

      const containerBox = await page.getByTestId('pricing-cards').boundingBox();
      if (containerBox) {
        expect(
          containerBox.x + containerBox.width,
          `Pricing cards right edge should not exceed ${String(MOBILE_VIEWPORT_WIDTH)}px`,
        ).toBeLessThanOrEqual(MOBILE_VIEWPORT_WIDTH + 1);
      }
    } finally {
      await context.close();
    }
  });
});
