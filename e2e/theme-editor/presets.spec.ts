import { test, expect } from '@playwright/test';

import { login, openThemeDrawer, getCSSVariable, clearThemeStorage } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

test.describe('Theme Presets', () => {
  test.beforeEach(async ({ page }) => {
    // Clear theme storage before each test for isolation
    await page.goto('/');
    await clearThemeStorage(page);
    await login(page);
    await openThemeDrawer(page);
    // Click on Presets tab
    await page.getByTestId(TestIds.THEME_TAB_PRESETS).click();
  });

  test('should display all preset options', async ({ page }) => {
    // Find all preset cards
    const presetCards = page.getByTestId(TestIds.THEME_PRESET_CARD);

    // Should have multiple presets (14 according to presets.ts)
    await expect(presetCards).toHaveCount(14);
  });

  test('should apply preset and update UI colors', async ({ page }) => {
    // Get initial primary color
    const initialColor = await getCSSVariable(page, '--color-primary-500');

    // Find and click a different preset (Forest Green)
    const forestGreenPreset = page.locator(`[data-testid="${TestIds.THEME_PRESET_CARD}"]`).filter({
      hasText: 'Forest Green'
    });

    await forestGreenPreset.click();

    // Wait for theme to apply
    await page.waitForTimeout(100);

    // Verify color changed
    const newColor = await getCSSVariable(page, '--color-primary-500');
    expect(newColor).not.toBe(initialColor);
  });

  test('should visually indicate the active preset', async ({ page }) => {
    // Click on Ocean Blue preset
    const oceanBluePreset = page.locator('[data-preset-id="ocean-blue"]');

    await oceanBluePreset.click();
    await page.waitForTimeout(100);

    // The active preset should have aria-pressed="true"
    await expect(oceanBluePreset).toHaveAttribute('aria-pressed', 'true');
  });

  test('should persist preset after page reload', async ({ page }) => {
    // Apply Royal Purple preset
    const royalPurplePreset = page.locator(`[data-testid="${TestIds.THEME_PRESET_CARD}"]`).filter({
      hasText: 'Royal Purple'
    });

    await royalPurplePreset.click();
    await page.waitForTimeout(100);

    // Get the color value
    const colorBefore = await getCSSVariable(page, '--color-primary-500');

    // Reload page
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Verify color persisted
    const colorAfter = await getCSSVariable(page, '--color-primary-500');
    expect(colorAfter).toBe(colorBefore);
  });

  test('should reset to default when reset button is clicked', async ({ page }) => {
    // First apply a different preset
    const copperPreset = page.locator(`[data-testid="${TestIds.THEME_PRESET_CARD}"]`).filter({
      hasText: 'Copper'
    });

    await copperPreset.click();
    await page.waitForTimeout(100);

    // Get the copper color
    const copperColor = await getCSSVariable(page, '--color-primary-500');

    // Click reset button
    const resetBtn = page.getByTestId(TestIds.THEME_RESET_BTN);
    await resetBtn.scrollIntoViewIfNeeded();
    await resetBtn.click();

    // Wait for reset
    await page.waitForTimeout(100);

    // Verify color changed back to default
    const resetColor = await getCSSVariable(page, '--color-primary-500');
    expect(resetColor).not.toBe(copperColor);
  });

  test('should apply each preset without errors', async ({ page }) => {
    const presetCards = page.getByTestId(TestIds.THEME_PRESET_CARD);
    const count = await presetCards.count();

    for (let i = 0; i < count; i++) {
      const preset = presetCards.nth(i);
      const name = await preset.innerText();

      // Click preset
      await preset.click();
      await page.waitForTimeout(50);

      // Verify no error indicators
      const errors = page.locator('.error, [data-error="true"], .text-error-500');
      await expect(errors).toHaveCount(0);

      // Verify primary color CSS variable exists
      const primaryColor = await getCSSVariable(page, '--color-primary-500');
      expect(primaryColor).toBeTruthy();
    }
  });

  test('should display preset with name and description', async ({ page }) => {
    // Each preset card should show name and description
    const firstPreset = page.getByTestId(TestIds.THEME_PRESET_CARD).first();
    await expect(firstPreset).toBeVisible();

    // Preset should contain text (the name)
    const text = await firstPreset.textContent();
    expect(text).toBeTruthy();
    expect(text!.length).toBeGreaterThan(0);
  });
});
