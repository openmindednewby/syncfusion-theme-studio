import { test, expect } from '@playwright/test';

import { TestIds } from '../shared/testIds';

/**
 * Landing Page E2E tests.
 * Verifies the public marketing page renders correctly when not logged in,
 * including the hero section, features grid, CTA, and navigation links.
 */
test.describe('Landing Page', () => {
  test.describe.configure({ timeout: 120000 });

  test.beforeEach(async ({ page }) => {
    // Clear any existing auth state so PublicRoute renders the landing page
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => localStorage.removeItem('auth-storage'));
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId(TestIds.LANDING_PAGE)).toBeVisible({ timeout: 15000 });
  });

  test('should display the hero section', async ({ page }) => {
    await expect(page.getByTestId(TestIds.LANDING_HERO)).toBeVisible();
  });

  test('should display the features section', async ({ page }) => {
    await expect(page.getByTestId(TestIds.LANDING_FEATURES)).toBeVisible();
  });

  test('should display the stats bar', async ({ page }) => {
    await expect(page.getByTestId(TestIds.LANDING_STATS)).toBeVisible();
  });

  test('should display the CTA section', async ({ page }) => {
    await expect(page.getByTestId(TestIds.LANDING_CTA)).toBeVisible();
  });

  test('should display the footer', async ({ page }) => {
    await expect(page.getByTestId(TestIds.LANDING_FOOTER)).toBeVisible();
  });

  test('should navigate to login when Get Started is clicked', async ({ page }) => {
    const getStartedButton = page.getByTestId(TestIds.LANDING_GET_STARTED);
    await expect(getStartedButton).toBeVisible();
    await getStartedButton.click();

    // Should navigate to the login page
    await expect(page).toHaveURL('/login', { timeout: 15000 });
  });

  test('should display the testimonials section', async ({ page }) => {
    await expect(page.getByTestId(TestIds.LANDING_TESTIMONIALS)).toBeVisible();
  });

  test('should use semantic main landmark', async ({ page }) => {
    const landingPage = page.getByTestId(TestIds.LANDING_PAGE);
    await expect(landingPage).toBeVisible();

    const tagName = await landingPage.evaluate((el) => el.tagName.toLowerCase());
    expect(tagName).toBe('main');
  });

  test('should have adequate touch targets on footer links (mobile)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => localStorage.removeItem('auth-storage'));
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId(TestIds.LANDING_PAGE)).toBeVisible({ timeout: 15000 });

    const minTouchTarget = 44;

    const pricingLink = page.getByTestId(TestIds.LANDING_FOOTER_PRICING);
    await pricingLink.scrollIntoViewIfNeeded();
    const pricingBox = await pricingLink.boundingBox();
    expect(pricingBox).not.toBeNull();
    expect(pricingBox!.width).toBeGreaterThanOrEqual(minTouchTarget);
    expect(pricingBox!.height).toBeGreaterThanOrEqual(minTouchTarget);

    const loginLink = page.getByTestId(TestIds.LANDING_FOOTER_LOGIN);
    const loginBox = await loginLink.boundingBox();
    expect(loginBox).not.toBeNull();
    expect(loginBox!.width).toBeGreaterThanOrEqual(minTouchTarget);
    expect(loginBox!.height).toBeGreaterThanOrEqual(minTouchTarget);
  });
});
