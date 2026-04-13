import { test, expect } from '@playwright/test';

/**
 * Pricing Page E2E tests.
 * Verifies the public pricing page renders all three tiers,
 * the billing toggle changes displayed prices, and supporting sections load.
 */
test.describe('Pricing Page', () => {
  test.beforeEach(async ({ page }) => {
    // Pricing page is public (not behind ProtectedRoute)
    await page.goto('/pricing', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId('pricing-page')).toBeVisible({ timeout: 15000 });
  });

  test('should display three pricing tier cards', async ({ page }) => {
    const cards = page.getByTestId('pricing-cards');
    await expect(cards).toBeVisible();

    // Three plans: free, pro, enterprise
    await expect(page.getByTestId('pricing-card-free')).toBeVisible();
    await expect(page.getByTestId('pricing-card-pro')).toBeVisible();
    await expect(page.getByTestId('pricing-card-enterprise')).toBeVisible();
  });

  test('should highlight the Pro plan as popular', async ({ page }) => {
    await expect(page.getByTestId('pricing-badge-popular')).toBeVisible();
  });

  test('should display the billing cycle toggle', async ({ page }) => {
    await expect(page.getByTestId('pricing-toggle')).toBeVisible();
  });

  test('should change prices when billing toggle is clicked', async ({ page }) => {
    // Capture the Pro price before toggling
    const proPriceLocator = page.getByTestId('pricing-price-pro');
    const initialPrice = await proPriceLocator.textContent();

    // Click the billing cycle toggle button
    await page.getByTestId('pricing-toggle-button').click();

    // Price should change after toggling between monthly and yearly
    await expect(proPriceLocator).not.toHaveText(initialPrice!, { timeout: 5000 });
  });

  test('should display the feature comparison table', async ({ page }) => {
    await expect(page.getByTestId('pricing-comparison')).toBeVisible();
  });

  test('should display the FAQ section', async ({ page }) => {
    await expect(page.getByTestId('pricing-faq')).toBeVisible();
  });

  test('should display CTA buttons for each plan', async ({ page }) => {
    await expect(page.getByTestId('pricing-cta-free')).toBeVisible();
    await expect(page.getByTestId('pricing-cta-pro')).toBeVisible();
    await expect(page.getByTestId('pricing-cta-enterprise')).toBeVisible();
  });
});
