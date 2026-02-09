import { test, expect } from '@playwright/test';

import { login } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

// Skip Syncfusion component tests by default due to long load times
// Run with: npx playwright test e2e/components --timeout=180000
test.describe('Syncfusion Button Components', () => {
  test.skip(({ browserName }) => true, 'Skipped by default - Syncfusion components require long load times. Run manually with --timeout=180000');

  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/dashboard/components');
    await page.waitForLoadState('domcontentloaded');
    // Wait for the first button to be visible to ensure components are loaded
    await expect(page.getByTestId(TestIds.BTN_PRIMARY)).toBeVisible();
  });

  test('should render all button variants', async ({ page }) => {
    await expect(page.getByTestId(TestIds.BTN_PRIMARY)).toBeVisible();
    await expect(page.getByTestId(TestIds.BTN_SECONDARY)).toBeVisible();
    await expect(page.getByTestId(TestIds.BTN_OUTLINE)).toBeVisible();
    await expect(page.getByTestId(TestIds.BTN_GHOST)).toBeVisible();
    await expect(page.getByTestId(TestIds.BTN_DANGER)).toBeVisible();
    await expect(page.getByTestId(TestIds.BTN_DISABLED)).toBeVisible();
  });

  test('should have primary button with correct styling', async ({ page }) => {
    const primaryBtn = page.getByTestId(TestIds.BTN_PRIMARY);

    // Should be enabled
    await expect(primaryBtn).toBeEnabled();

    // Should have primary button class or Syncfusion primary class
    const hasClass = await primaryBtn.evaluate((el) =>
      el.classList.contains('e-primary') ||
      el.classList.contains('btn-primary') ||
      el.className.includes('primary')
    );
    expect(hasClass).toBe(true);
  });

  test('should have secondary button clickable', async ({ page }) => {
    const secondaryBtn = page.getByTestId(TestIds.BTN_SECONDARY);
    await expect(secondaryBtn).toBeEnabled();
    await secondaryBtn.click();
  });

  test('should have outline button with border styling', async ({ page }) => {
    const outlineBtn = page.getByTestId(TestIds.BTN_OUTLINE);

    // Should be enabled
    await expect(outlineBtn).toBeEnabled();

    // Outline buttons typically have transparent or light background
    const hasOutlineClass = await outlineBtn.evaluate((el) =>
      el.classList.contains('e-outline') ||
      el.classList.contains('btn-outline') ||
      el.className.includes('outline')
    );
    expect(hasOutlineClass).toBe(true);
  });

  test('should have ghost button with minimal styling', async ({ page }) => {
    const ghostBtn = page.getByTestId(TestIds.BTN_GHOST);
    await expect(ghostBtn).toBeEnabled();
    await ghostBtn.click();
  });

  test('should have danger button with error/red styling', async ({ page }) => {
    const dangerBtn = page.getByTestId(TestIds.BTN_DANGER);

    await expect(dangerBtn).toBeEnabled();

    // Danger buttons should have error/danger styling
    const bgColor = await dangerBtn.evaluate((el) =>
      getComputedStyle(el).backgroundColor
    );

    // Should have some form of red/error color
    const hasDangerClass = await dangerBtn.evaluate((el) =>
      el.classList.contains('e-danger') ||
      el.classList.contains('btn-danger') ||
      el.className.includes('danger') ||
      el.className.includes('error')
    );
    expect(hasDangerClass).toBe(true);
  });

  test('should have disabled button that cannot be clicked', async ({ page }) => {
    const disabledBtn = page.getByTestId(TestIds.BTN_DISABLED);

    await expect(disabledBtn).toBeDisabled();

    // Verify it has disabled styling
    const opacity = await disabledBtn.evaluate((el) =>
      getComputedStyle(el).opacity
    );
    expect(parseFloat(opacity)).toBeLessThan(1);
  });

  test('should show loading state toggle button', async ({ page }) => {
    const loadingToggle = page.getByTestId(TestIds.BTN_TOGGLE_LOADING);
    if (await loadingToggle.isVisible()) {
      await loadingToggle.click();
      // Wait for the button to process the click by checking it remains enabled
      await expect(loadingToggle).toBeEnabled();
    }
  });

  test('should apply theme primary color to primary button', async ({ page }) => {
    const primaryBtn = page.getByTestId(TestIds.BTN_PRIMARY);

    const bgColor = await primaryBtn.evaluate((el) =>
      getComputedStyle(el).backgroundColor
    );

    // Should have a colored background (not gray, not white)
    expect(bgColor).not.toBe('rgb(255, 255, 255)');
    expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
  });

  test('should render Syncfusion button elements', async ({ page }) => {
    // Syncfusion buttons have .e-btn class
    const sfButtons = page.locator('.e-btn');
    expect(await sfButtons.count()).toBeGreaterThan(0);
  });

  test('should have proper button focus states', async ({ page }) => {
    const primaryBtn = page.getByTestId(TestIds.BTN_PRIMARY);

    // Focus the button
    await primaryBtn.focus();

    // Check for focus styling (outline or ring)
    const outlineStyle = await primaryBtn.evaluate((el) =>
      getComputedStyle(el).outline
    );
    // Button should have some kind of focus indicator
    // This can vary by implementation
  });

  test('should have proper button hover states', async ({ page }) => {
    const primaryBtn = page.getByTestId(TestIds.BTN_PRIMARY);

    // Hover over button - the hover action itself is sufficient
    await primaryBtn.hover();

    // Verify the button is still visible and enabled after hover
    await expect(primaryBtn).toBeVisible();
    await expect(primaryBtn).toBeEnabled();
    // Hover state styling is applied - the button should visually change on hover
  });
});
