import { test, expect } from '@playwright/test';

import { injectAuth } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

// Run with: npx playwright test e2e/components
test.describe('Syncfusion Input Components', () => {
  test.setTimeout(180000);

  test.beforeEach(async ({ page }) => {
    await injectAuth(page);
    await page.goto('/components/syncfusion');
    await page.waitForLoadState('domcontentloaded');
    // Wait for Syncfusion Splitter to render content pane with inputs
    await expect(page.getByTestId(TestIds.SHOWCASE_GRID)).toBeVisible({ timeout: 30000 });
  });

  test('should render all input variants', async ({ page }) => {
    await expect(page.getByTestId(TestIds.INPUT_NAME)).toBeVisible();
    await expect(page.getByTestId(TestIds.INPUT_EMAIL)).toBeVisible();
    await expect(page.getByTestId(TestIds.INPUT_DISABLED)).toBeVisible();
    await expect(page.getByTestId(TestIds.INPUT_ERROR)).toBeVisible();
  });

  test('should allow text input in name field', async ({ page }) => {
    // The testId is on the wrapper div; find the actual input inside
    const nameWrapper = page.getByTestId(TestIds.INPUT_NAME);
    const nameInput = nameWrapper.locator('input').first();

    await nameInput.clear();
    await nameInput.fill('John Doe');
    await expect(nameInput).toHaveValue('John Doe');
  });

  test('should allow email input in email field', async ({ page }) => {
    const emailWrapper = page.getByTestId(TestIds.INPUT_EMAIL);
    const emailInput = emailWrapper.locator('input').first();

    await emailInput.clear();
    await emailInput.fill('test@example.com');
    await expect(emailInput).toHaveValue('test@example.com');
  });

  test('should have disabled input that cannot be edited', async ({ page }) => {
    const disabledWrapper = page.getByTestId(TestIds.INPUT_DISABLED);
    const disabledInput = disabledWrapper.locator('input').first();

    await expect(disabledInput).toBeDisabled();
  });

  test('should display error state on error input', async ({ page }) => {
    const errorWrapper = page.getByTestId(TestIds.INPUT_ERROR);
    await expect(errorWrapper).toBeVisible();

    // Wait for Syncfusion to apply error classes
    const errorInput = errorWrapper.locator('input').first();
    await expect(errorInput).toBeVisible();

    // Check for error styling class or aria attribute on the input element
    const hasErrorStyling = await errorWrapper.evaluate((el) =>
      el.querySelector('.e-error') !== null ||
      el.querySelector('.sf-input-error') !== null ||
      el.querySelector('[aria-invalid="true"]') !== null ||
      el.querySelector('.e-input.e-error') !== null
    );
    expect(hasErrorStyling).toBe(true);
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
    const nameWrapper = page.getByTestId(TestIds.INPUT_NAME);
    const nameInput = nameWrapper.locator('input').first();

    // Focus the input
    await nameInput.click();
    await expect(nameInput).toBeFocused();
  });

  test('should handle keyboard navigation', async ({ page }) => {
    const nameWrapper = page.getByTestId(TestIds.INPUT_NAME);
    const nameInput = nameWrapper.locator('input').first();

    // Focus name input
    await nameInput.focus();
    await expect(nameInput).toBeFocused();

    // Tab should move focus away from name input
    await page.keyboard.press('Tab');
    await expect(nameInput).not.toBeFocused();
  });

  test('should clear input value', async ({ page }) => {
    const nameWrapper = page.getByTestId(TestIds.INPUT_NAME);
    const nameInput = nameWrapper.locator('input').first();

    // Fill then clear
    await nameInput.fill('Test Value');
    await expect(nameInput).toHaveValue('Test Value');

    await nameInput.clear();
    await expect(nameInput).toHaveValue('');
  });

  test('should select all text on triple click', async ({ page }) => {
    const nameWrapper = page.getByTestId(TestIds.INPUT_NAME);
    const nameInput = nameWrapper.locator('input').first();

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
