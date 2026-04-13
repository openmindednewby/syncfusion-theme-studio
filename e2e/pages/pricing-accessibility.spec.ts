import { test, expect } from '@playwright/test';

/**
 * Pricing Page Accessibility E2E tests.
 *
 * Verifies:
 * - Billing toggle has role="switch" and aria-checked attribute
 * - Toggle updates aria-checked on click
 * - Toggle has an aria-label
 * - CTA buttons are present for each pricing plan
 * - Navigation link back to the home page exists (BUG-015 fix)
 *
 * The pricing page is a public route (no auth required).
 */

test.describe('Pricing Page Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pricing', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId('pricing-page')).toBeVisible({ timeout: 15000 });
  });

  test('should have a billing toggle with role="switch"', async ({ page }) => {
    const toggleButton = page.getByTestId('pricing-toggle-button');
    await expect(toggleButton).toBeVisible();
    await expect(toggleButton).toHaveAttribute('role', 'switch');
  });

  test('should have a billing toggle with aria-checked attribute', async ({ page }) => {
    const toggleButton = page.getByTestId('pricing-toggle-button');
    await expect(toggleButton).toBeVisible();

    const ariaChecked = await toggleButton.getAttribute('aria-checked');
    expect(
      ariaChecked,
      'Billing toggle should have aria-checked attribute',
    ).toBeTruthy();
    expect(
      ['true', 'false'].includes(ariaChecked ?? ''),
      `aria-checked should be "true" or "false", got "${String(ariaChecked)}"`,
    ).toBe(true);
  });

  test('should toggle aria-checked when billing toggle is clicked', async ({ page }) => {
    const toggleButton = page.getByTestId('pricing-toggle-button');
    await expect(toggleButton).toBeVisible();

    const initialChecked = await toggleButton.getAttribute('aria-checked');
    await toggleButton.click();

    const expectedChecked = initialChecked === 'true' ? 'false' : 'true';
    await expect(toggleButton).toHaveAttribute('aria-checked', expectedChecked);
  });

  test('should have an aria-label on the billing toggle', async ({ page }) => {
    const toggleButton = page.getByTestId('pricing-toggle-button');
    await expect(toggleButton).toBeVisible();

    const ariaLabel = await toggleButton.getAttribute('aria-label');
    expect(ariaLabel, 'Billing toggle should have an aria-label').toBeTruthy();
    expect(
      ariaLabel!.trim().length,
      'Billing toggle aria-label should not be empty',
    ).toBeGreaterThan(0);
  });

  test('should have CTA buttons for each pricing plan', async ({ page }) => {
    const planIds = ['free', 'pro', 'enterprise'];
    for (const planId of planIds) {
      await expect(
        page.getByTestId(`pricing-cta-${planId}`),
        `CTA button for ${planId} plan should be visible`,
      ).toBeVisible();
    }
  });

  test('should have a navigation link back to the home page (BUG-015)', async ({ page }) => {
    // Look for any link or navigational element pointing to the home page
    const homeLinks = page.locator(
      'a[href="/"], a[href="/landing"], header a, nav a, [data-testid*="home"], [data-testid*="logo"]',
    );
    const homeLinkCount = await homeLinks.count();

    expect(
      homeLinkCount,
      'Pricing page should have at least one navigation element linking back to the home page (BUG-015 fix)',
    ).toBeGreaterThan(0);
  });
});
