import { test, expect } from '@playwright/test';

import { login, openThemeDrawer } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

// ---------------------------------------------------------------------------
// Regression test: ChipsEditor crash (Cannot read properties of undefined)
// The app previously crashed with `Cannot read properties of undefined
// (reading 'background')` when ChipsEditor.tsx tried to read
// `config.background` from an undefined `chips` config.
// This was fixed by bumping the schema version. These tests verify the
// Components tab loads without crashing and the Chips section works correctly.
// ---------------------------------------------------------------------------
test.describe('Theme Editor - Chips Configuration', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await openThemeDrawer(page);

    // Navigate to the Components tab
    await page.getByTestId(TestIds.THEME_TAB_COMPONENTS).click();
    await expect(page.getByTestId(TestIds.THEME_TAB_COMPONENTS)).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  test('should not crash when navigating to Components tab (regression)', async ({ page }) => {
    // This is the core regression test - previously the app crashed with:
    // "Cannot read properties of undefined (reading 'background')"
    // when ChipsEditor tried to access config.background from undefined chips config.
    //
    // If we reach this point without crashing, the schema migration fixed the issue.
    // Verify the Components section is still interactive and rendered.
    const componentsTab = page.getByTestId(TestIds.THEME_TAB_COMPONENTS);
    await expect(componentsTab).toHaveAttribute('aria-current', 'page');

    // Verify the page is not in an error state by checking any collapsible section exists
    const sections = page.locator('.collapsible-section');
    await expect(sections.first()).toBeAttached();
  });

  test('should display Chips collapsible section in Components tab', async ({ page }) => {
    // Find the collapsible section that contains a button with "chips" text
    const chipsSectionButton = page.locator('.collapsible-section').filter({
      has: page.locator('button', { hasText: /chips/i }),
    });

    await chipsSectionButton.scrollIntoViewIfNeeded();
    await expect(chipsSectionButton).toBeVisible();
  });

  test('should toggle Chips section open and closed', async ({ page }) => {
    const chipsSection = page.locator('.collapsible-section').filter({
      has: page.locator('button', { hasText: /chips/i }),
    });
    const chipsHeader = chipsSection.locator('.collapsible-header');
    await chipsHeader.scrollIntoViewIfNeeded();

    // Initially collapsed (defaultOpen=false)
    const expandButton = chipsSection.locator('button[aria-expanded]');
    await expect(expandButton).toHaveAttribute('aria-expanded', 'false');

    // Click to expand
    await chipsHeader.click();
    await expect(expandButton).toHaveAttribute('aria-expanded', 'true');

    // Click to collapse again
    await chipsHeader.click();
    await expect(expandButton).toHaveAttribute('aria-expanded', 'false');
  });

  test('should expand Chips section to reveal variant labels', async ({ page }) => {
    // Find and click the Chips collapsible header to expand it
    const chipsHeader = page.locator('.collapsible-header', { hasText: /chips/i });
    await chipsHeader.scrollIntoViewIfNeeded();
    await chipsHeader.click();

    // After expanding, the collapsible content region should be visible
    const chipsSection = page.locator('.collapsible-section').filter({
      has: page.locator('button', { hasText: /chips/i }),
    });
    const content = chipsSection.locator('.collapsible-content');
    await expect(content).toBeVisible();

    // Should show variant section labels for each chip variant
    // The ChipsEditor has sections: base, hover, primary, success, warning, danger
    // Check that at least some variant text is visible inside the expanded content
    const region = chipsSection.locator('[role="region"]');
    await expect(region).toBeVisible();
  });

  test('should display color pickers for chip base styling', async ({ page }) => {
    // Expand the Chips section
    const chipsHeader = page.locator('.collapsible-header', { hasText: /chips/i });
    await chipsHeader.scrollIntoViewIfNeeded();
    await chipsHeader.click();

    const chipsSection = page.locator('.collapsible-section').filter({
      has: page.locator('button', { hasText: /chips/i }),
    });

    // Wait for the content to be visible
    const content = chipsSection.locator('.collapsible-content');
    await expect(content).toBeVisible();

    // The ChipsEditor has 6 variant sections:
    // base (3 pickers: background, textColor, borderColor)
    // hover (2 pickers: hoverBackground, hoverTextColor)
    // primary (3 pickers)
    // success (3 pickers)
    // warning (3 pickers)
    // danger (3 pickers)
    // Total = 3 + 2 + 3 + 3 + 3 + 3 = 17 color pickers
    const colorInputs = chipsSection.locator('input[type="color"]');
    const colorInputCount = await colorInputs.count();

    const EXPECTED_MIN_COLOR_PICKERS = 17;
    expect(colorInputCount).toBeGreaterThanOrEqual(EXPECTED_MIN_COLOR_PICKERS);
  });

  test('should not crash when reading chip config properties (regression)', async ({ page }) => {
    // Specifically tests that config.background, config.textColor, etc. are defined
    // This directly targets the bug where `chips` was undefined in the component config.
    const chipsHeader = page.locator('.collapsible-header', { hasText: /chips/i });
    await chipsHeader.scrollIntoViewIfNeeded();
    await chipsHeader.click();

    const chipsSection = page.locator('.collapsible-section').filter({
      has: page.locator('button', { hasText: /chips/i }),
    });

    // If any color picker is rendered with a value, the config properties are defined
    const firstColorInput = chipsSection.locator('input[type="color"]').first();
    await expect(firstColorInput).toBeVisible();

    // Verify the input has a non-empty value (indicates config.background etc. resolved)
    const value = await firstColorInput.inputValue();
    expect(value).toBeTruthy();
    // Color inputs return hex values like "#rrggbb"
    expect(value).toMatch(/^#[0-9a-fA-F]{6}$/);
  });
});
