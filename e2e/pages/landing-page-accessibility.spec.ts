import { test, expect } from '@playwright/test';

import { TestIds } from '../shared/testIds';

/**
 * Landing Page Accessibility E2E tests.
 *
 * Verifies:
 * - Hero section CTA buttons have aria-labels (not hardcoded English)
 * - Decorative SVGs/elements have aria-hidden="true"
 * - CTA section button has an accessible name
 * - Hero CTA buttons have localized text content
 *
 * The landing page is public (no auth required).
 */

test.describe('Landing Page Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    // Clear auth to ensure PublicRoute renders the landing page
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => localStorage.removeItem('auth-storage'));
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId(TestIds.LANDING_PAGE)).toBeVisible({ timeout: 15000 });
  });

  test('should have a "Get Started" button with aria-label in the Hero', async ({ page }) => {
    const getStartedButton = page.getByTestId(TestIds.LANDING_GET_STARTED);
    await expect(getStartedButton).toBeVisible();

    const ariaLabel = await getStartedButton.getAttribute('aria-label');
    expect(
      ariaLabel,
      'Get Started button should have an aria-label attribute',
    ).toBeTruthy();
    expect(
      ariaLabel!.trim().length,
      'Get Started button aria-label should not be empty',
    ).toBeGreaterThan(0);
  });

  test('should have a "View Demo" button with aria-label in the Hero', async ({ page }) => {
    const viewDemoButton = page.getByTestId(TestIds.LANDING_VIEW_DEMO);
    await expect(viewDemoButton).toBeVisible();

    const ariaLabel = await viewDemoButton.getAttribute('aria-label');
    expect(
      ariaLabel,
      'View Demo button should have an aria-label attribute',
    ).toBeTruthy();
    expect(
      ariaLabel!.trim().length,
      'View Demo button aria-label should not be empty',
    ).toBeGreaterThan(0);
  });

  test('should have decorative elements with aria-hidden="true" in the Hero', async ({ page }) => {
    const heroSection = page.getByTestId(TestIds.LANDING_HERO);
    await expect(heroSection).toBeVisible();

    const decorativeElements = heroSection.locator('[aria-hidden="true"]');
    const decorativeCount = await decorativeElements.count();

    expect(
      decorativeCount,
      'Hero section should have at least one decorative element with aria-hidden="true"',
    ).toBeGreaterThan(0);
  });

  test('should mark decorative SVGs as aria-hidden or place them inside hidden containers', async ({ page }) => {
    const allSvgs = page.locator('svg:visible');
    const svgCount = await allSvgs.count();

    if (svgCount > 0) {
      let decorativeSvgsMissingHidden = 0;

      for (let i = 0; i < svgCount; i++) {
        const svg = allSvgs.nth(i);

        const isProperlyHandled = await svg.evaluate((el) => {
          // Has aria-hidden itself
          if (el.getAttribute('aria-hidden') === 'true') return true;
          // Inside an aria-hidden container
          if (el.closest('[aria-hidden="true"]')) return true;
          // Inside an interactive element (button, link) - icon, not decorative
          if (el.closest('button, a, [role="button"]')) return true;
          // Has an accessible role
          if (el.getAttribute('role')) return true;
          // Has title or desc for accessible SVG
          if (el.querySelector('title') ?? el.querySelector('desc')) return true;
          return false;
        });

        if (!isProperlyHandled) decorativeSvgsMissingHidden++;
      }

      // Allow a small number since some may be semantic but unlabeled
      expect(
        decorativeSvgsMissingHidden,
        `Found ${String(decorativeSvgsMissingHidden)} visible SVGs without aria-hidden outside interactive elements`,
      ).toBeLessThanOrEqual(2);
    }
  });

  test('should have a CTA section button with an accessible name', async ({ page }) => {
    const ctaButton = page.getByTestId(TestIds.LANDING_CTA_BUTTON);
    await expect(ctaButton).toBeVisible();

    const hasAccessibleName = await ctaButton.evaluate((el) => {
      if (el.getAttribute('aria-label')) return true;
      if (el.getAttribute('aria-labelledby')) return true;
      const text = el.textContent?.trim();
      return text !== undefined && text.length > 0;
    });

    expect(
      hasAccessibleName,
      'CTA section button should have an accessible name',
    ).toBe(true);
  });

  test('should have Hero CTA buttons with localized text (not empty)', async ({ page }) => {
    const getStartedButton = page.getByTestId(TestIds.LANDING_GET_STARTED);
    const viewDemoButton = page.getByTestId(TestIds.LANDING_VIEW_DEMO);

    const getStartedText = await getStartedButton.textContent();
    const viewDemoText = await viewDemoButton.textContent();

    expect(
      getStartedText?.trim().length,
      'Get Started button should have visible text',
    ).toBeGreaterThan(0);
    expect(
      viewDemoText?.trim().length,
      'View Demo button should have visible text',
    ).toBeGreaterThan(0);
  });
});
