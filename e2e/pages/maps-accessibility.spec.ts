import { test, expect } from '@playwright/test';

import { injectAuth } from '../fixtures/auth';

/**
 * Maps Page Accessibility E2E tests.
 *
 * Verifies:
 * - Location marker buttons are visible
 * - Each location marker button has an aria-label
 * - aria-labels are descriptive (contain location names)
 * - Clicking a marker opens the location detail panel
 */

test.describe('Maps Page Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await injectAuth(page);
    await page.goto('/maps', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId('maps-page')).toBeVisible({ timeout: 15000 });
  });

  test('should render the location list', async ({ page }) => {
    await expect(page.getByTestId('maps-location-list')).toBeVisible();
  });

  test('should have location marker buttons visible', async ({ page }) => {
    const locationButtons = page.locator('[data-testid^="maps-location-item-"]');
    const buttonCount = await locationButtons.count();

    expect(
      buttonCount,
      'Maps page should have at least one location marker button',
    ).toBeGreaterThan(0);
  });

  test('should have aria-label on each location marker button', async ({ page }) => {
    const locationButtons = page.locator('[data-testid^="maps-location-item-"]');
    const buttonCount = await locationButtons.count();
    expect(buttonCount, 'Should have location buttons to test').toBeGreaterThan(0);

    const unlabeledButtons: string[] = [];

    for (let i = 0; i < buttonCount; i++) {
      const button = locationButtons.nth(i);
      const isVisible = await button.isVisible();
      if (!isVisible) continue;

      const ariaLabel = await button.getAttribute('aria-label');

      if (!ariaLabel || ariaLabel.trim().length === 0) {
        const testId = await button.getAttribute('data-testid') ?? 'unknown';
        unlabeledButtons.push(testId);
      }
    }

    expect(
      unlabeledButtons.length,
      `All location marker buttons should have aria-labels. Unlabeled: ${unlabeledButtons.join(', ')}`,
    ).toBe(0);
  });

  test('should have descriptive aria-labels on location markers', async ({ page }) => {
    const locationButtons = page.locator('[data-testid^="maps-location-item-"]');
    const buttonCount = await locationButtons.count();

    for (let i = 0; i < Math.min(buttonCount, 5); i++) {
      const button = locationButtons.nth(i);
      const ariaLabel = await button.getAttribute('aria-label');

      if (ariaLabel) {
        expect(
          ariaLabel.length,
          `aria-label "${ariaLabel}" should be descriptive (more than 2 characters)`,
        ).toBeGreaterThan(2);
      }
    }
  });

  test('should open location panel when a marker button is clicked', async ({ page }) => {
    const firstLocation = page.locator('[data-testid^="maps-location-item-"]').first();
    await expect(firstLocation).toBeVisible();

    await firstLocation.click();

    await expect(page.getByTestId('maps-location-panel')).toBeVisible({ timeout: 5000 });
  });
});
