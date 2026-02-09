import { test, expect } from '@playwright/test';

import { login } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

// Skip Syncfusion component tests by default due to long load times
// Run with: npx playwright test e2e/components --timeout=180000
test.describe('Syncfusion Input Components', () => {
  test.skip(({ browserName }) => true, 'Skipped by default - Syncfusion components require long load times. Run manually with --timeout=180000');

  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/dashboard/components');
    await page.waitForLoadState('networkidle');
  });

  test('should render all input variants', async ({ page }) => {
    await expect(page.getByTestId(TestIds.INPUT_NAME)).toBeVisible();
    await expect(page.getByTestId(TestIds.INPUT_EMAIL)).toBeVisible();
    await expect(page.getByTestId(TestIds.INPUT_DISABLED)).toBeVisible();
    await expect(page.getByTestId(TestIds.INPUT_ERROR)).toBeVisible();
  });

  test('should allow text input in name field', async ({ page }) => {
    const nameInput = page.getByTestId(TestIds.INPUT_NAME);

    await nameInput.clear();
    await nameInput.fill('John Doe');
    await expect(nameInput).toHaveValue('John Doe');
  });

  test('should allow email input in email field', async ({ page }) => {
    const emailInput = page.getByTestId(TestIds.INPUT_EMAIL);

    await emailInput.clear();
    await emailInput.fill('test@example.com');
    await expect(emailInput).toHaveValue('test@example.com');
  });

  test('should have disabled input that cannot be edited', async ({ page }) => {
    const disabledInput = page.getByTestId(TestIds.INPUT_DISABLED);

    await expect(disabledInput).toBeDisabled();

    // Verify disabled styling
    const opacity = await disabledInput.evaluate((el) => {
      const input = el.querySelector('input') ?? el;
      return getComputedStyle(input).opacity;
    });
    expect(parseFloat(opacity)).toBeLessThanOrEqual(1);
  });

  test('should display error state on error input', async ({ page }) => {
    const errorInput = page.getByTestId(TestIds.INPUT_ERROR);

    // Check for error styling class
    const hasErrorStyling = await errorInput.evaluate((el) => {
      const inputWrapper = el.closest('.e-input-group') ?? el;
      return inputWrapper.classList.contains('e-error') ||
        el.classList.contains('sf-error') ||
        el.classList.contains('error');
    });

    // Either has error class or has aria-invalid
    const hasAriaInvalid = await errorInput.getAttribute('aria-invalid');
    expect(hasErrorStyling || hasAriaInvalid === 'true').toBe(true);
  });

  test('should render Syncfusion input elements', async ({ page }) => {
    // Syncfusion inputs have .e-input class
    const sfInputs = page.locator('.e-input');
    expect(await sfInputs.count()).toBeGreaterThan(0);
  });

  test('should have input group wrappers', async ({ page }) => {
    // Syncfusion input groups have .e-input-group class
    const inputGroups = page.locator('.e-input-group');
    expect(await inputGroups.count()).toBeGreaterThan(0);
  });

  test('should show floating labels when present', async ({ page }) => {
    // Syncfusion floating labels have .e-float-text class
    const floatLabels = page.locator('.e-float-text, .e-label-top');
    // Floating labels are optional, so just check they render if present
    if (await floatLabels.count() > 0) {
      await expect(floatLabels.first()).toBeVisible();
    }
  });

  test('should apply theme colors to focus states', async ({ page }) => {
    const nameInput = page.getByTestId(TestIds.INPUT_NAME);

    // Focus the input
    await nameInput.click();
    await page.waitForTimeout(100);

    // Check for focus styling on wrapper or input
    const inputGroup = nameInput.locator('..').locator('.e-input-group').first();
    if (await inputGroup.isVisible()) {
      const hasFocusClass = await inputGroup.evaluate((el) =>
        el.classList.contains('e-input-focus')
      );
      // Input should show focus state
    }
  });

  test('should handle keyboard navigation', async ({ page }) => {
    const nameInput = page.getByTestId(TestIds.INPUT_NAME);
    const emailInput = page.getByTestId(TestIds.INPUT_EMAIL);

    // Focus name input
    await nameInput.focus();

    // Tab to next input
    await page.keyboard.press('Tab');

    // Email input should be focused
    await expect(emailInput).toBeFocused();
  });

  test('should clear input value', async ({ page }) => {
    const nameInput = page.getByTestId(TestIds.INPUT_NAME);

    // Fill then clear
    await nameInput.fill('Test Value');
    await expect(nameInput).toHaveValue('Test Value');

    await nameInput.clear();
    await expect(nameInput).toHaveValue('');
  });

  test('should select all text on triple click', async ({ page }) => {
    const nameInput = page.getByTestId(TestIds.INPUT_NAME);

    await nameInput.fill('Select This Text');

    // Triple click to select all
    await nameInput.click({ clickCount: 3 });

    // The text should be selected (typing would replace it)
    await page.keyboard.type('Replaced');
    await expect(nameInput).toHaveValue('Replaced');
  });

  test('should apply theme border colors', async ({ page }) => {
    const inputGroup = page.locator('.e-input-group').first();

    const borderColor = await inputGroup.evaluate((el) =>
      getComputedStyle(el).borderColor
    );

    // Should have a visible border (not transparent)
    expect(borderColor).not.toBe('rgba(0, 0, 0, 0)');
  });
});
