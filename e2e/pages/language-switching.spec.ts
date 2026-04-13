import { test, expect } from '@playwright/test';

import { injectAuth } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

/**
 * Language Switching E2E tests.
 *
 * Verifies that the language switcher:
 * - Sets document.documentElement.lang when switching languages
 * - Sets document.documentElement.dir to "ltr" for LTR languages
 * - Sets document.documentElement.dir to "rtl" for RTL languages (Hebrew)
 * - Correctly restores English after switching away
 */

test.describe('Language Switching', () => {
  test.beforeEach(async ({ page }) => {
    await injectAuth(page);
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId(TestIds.DASHBOARD_HEADING)).toBeVisible({ timeout: 15000 });
  });

  test('should have the language switcher visible', async ({ page }) => {
    await expect(page.getByTestId('language-switcher')).toBeVisible();
  });

  test('should show language options when switcher is clicked', async ({ page }) => {
    await page.getByTestId('language-switcher').click();

    await expect(page.getByTestId('language-option-en')).toBeVisible();
    await expect(page.getByTestId('language-option-es')).toBeVisible();
    await expect(page.getByTestId('language-option-he')).toBeVisible();

    // Close the dropdown
    await page.keyboard.press('Escape');
  });

  test('should switch to Spanish and set lang="es" and dir="ltr"', async ({ page }) => {
    // Open switcher and select Spanish
    await page.getByTestId('language-switcher').click();
    await page.getByTestId('language-option-es').click();

    // Wait for dropdown to close
    await expect(page.getByTestId('language-option-es')).not.toBeVisible({ timeout: 5000 });

    // Verify document.documentElement.lang
    const lang = await page.evaluate(() => document.documentElement.lang);
    expect(lang, 'Document lang should be "es"').toBe('es');

    // Verify direction is LTR (Spanish is LTR)
    // The app removes the dir attribute for LTR languages, so dir is null/empty or "ltr"
    const dir = await page.evaluate(
      () => document.documentElement.getAttribute('dir'),
    );
    expect(
      dir === null || dir === '' || dir === 'ltr',
      `Document dir should be ltr for Spanish, got "${String(dir)}"`,
    ).toBe(true);
  });

  test('should switch to Hebrew and set lang="he" and dir="rtl"', async ({ page }) => {
    // Open switcher and select Hebrew
    await page.getByTestId('language-switcher').click();
    await page.getByTestId('language-option-he').click();

    await expect(page.getByTestId('language-option-he')).not.toBeVisible({ timeout: 5000 });

    const lang = await page.evaluate(() => document.documentElement.lang);
    expect(lang, 'Document lang should be "he"').toBe('he');

    const dir = await page.evaluate(
      () => document.documentElement.getAttribute('dir'),
    );
    expect(dir, 'Document dir should be "rtl" for Hebrew').toBe('rtl');
  });

  test('should switch back to English and set lang="en" and dir="ltr"', async ({ page }) => {
    // First switch to Hebrew to set RTL
    await page.getByTestId('language-switcher').click();
    await page.getByTestId('language-option-he').click();
    await expect(page.getByTestId('language-option-he')).not.toBeVisible({ timeout: 5000 });

    // Now switch back to English
    await page.getByTestId('language-switcher').click();
    await page.getByTestId('language-option-en').click();
    await expect(page.getByTestId('language-option-en')).not.toBeVisible({ timeout: 5000 });

    const lang = await page.evaluate(() => document.documentElement.lang);
    expect(lang, 'Document lang should be "en"').toBe('en');

    const dir = await page.evaluate(
      () => document.documentElement.getAttribute('dir'),
    );
    expect(
      dir === null || dir === '' || dir === 'ltr',
      `Document dir should be ltr for English, got "${String(dir)}"`,
    ).toBe(true);
  });
});
