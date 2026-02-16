import { test, expect } from '@playwright/test';

import { login, openThemeDrawer, getThemeMode, getCSSVariable, clearThemeStorage } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

test.describe('Light/Dark Mode Toggle', () => {
  test.beforeEach(async ({ page }) => {
    // Clear storage for test isolation
    await page.goto('/');
    await clearThemeStorage(page);
    await login(page);
  });

  test('should toggle between light and dark mode via header button', async ({ page }) => {
    const htmlElement = page.locator('html');
    const toggleBtn = page.getByTestId(TestIds.THEME_TOGGLE);

    // Get initial mode
    const wasDark = await page.evaluate(() =>
      document.documentElement.classList.contains('dark')
    );

    // Toggle mode via header button
    await toggleBtn.click();
    await page.waitForTimeout(100);

    // Verify mode changed
    if (wasDark) {
      await expect(htmlElement).not.toHaveClass(/dark/);
    } else {
      await expect(htmlElement).toHaveClass(/dark/);
    }
  });

  test('should toggle mode multiple times correctly', async ({ page }) => {
    const toggleBtn = page.getByTestId(TestIds.THEME_TOGGLE);
    const htmlElement = page.locator('html');

    // Get initial state
    const wasDark = await page.evaluate(() =>
      document.documentElement.classList.contains('dark')
    );

    // Toggle to opposite
    await toggleBtn.click();
    await page.waitForTimeout(100);
    if (wasDark) {
      await expect(htmlElement).not.toHaveClass(/dark/);
    } else {
      await expect(htmlElement).toHaveClass(/dark/);
    }

    // Toggle back
    await toggleBtn.click();
    await page.waitForTimeout(100);
    if (wasDark) {
      await expect(htmlElement).toHaveClass(/dark/);
    } else {
      await expect(htmlElement).not.toHaveClass(/dark/);
    }
  });

  test('should persist mode after page reload', async ({ page }) => {
    const toggleBtn = page.getByTestId(TestIds.THEME_TOGGLE);
    const htmlElement = page.locator('html');

    // Switch to dark mode if not already
    if (await getThemeMode(page) !== 'dark') {
      await toggleBtn.click();
      await page.waitForTimeout(100);
    }

    // Verify dark mode
    await expect(htmlElement).toHaveClass(/dark/);

    // Reload page
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    // Verify still dark
    await expect(htmlElement).toHaveClass(/dark/);
  });

  test('should apply correct background colors for each mode', async ({ page }) => {
    // Get light mode background
    if (await getThemeMode(page) === 'dark') {
      await page.getByTestId(TestIds.THEME_TOGGLE).click();
    }
    const lightBg = await getCSSVariable(page, '--color-background');

    // Switch to dark mode
    await page.getByTestId(TestIds.THEME_TOGGLE).click();
    const darkBg = await getCSSVariable(page, '--color-background');

    // Background should be different in each mode
    expect(lightBg).not.toBe(darkBg);
  });

  test('should apply correct text colors for each mode', async ({ page }) => {
    // Ensure light mode
    if (await getThemeMode(page) === 'dark') {
      await page.getByTestId(TestIds.THEME_TOGGLE).click();
    }
    const lightText = await getCSSVariable(page, '--color-text-primary');

    // Switch to dark mode
    await page.getByTestId(TestIds.THEME_TOGGLE).click();
    const darkText = await getCSSVariable(page, '--color-text-primary');

    // Text colors should be different
    expect(lightText).not.toBe(darkText);
  });

  test('should update toggle button aria attributes based on mode', async ({ page }) => {
    const toggleBtn = page.getByTestId(TestIds.THEME_TOGGLE);

    // Default is dark mode — aria-checked should be true
    await expect(toggleBtn).toHaveAttribute('aria-checked', 'true');
    await expect(toggleBtn).toHaveAttribute('aria-label', /light/i);

    // Switch to light mode
    await toggleBtn.click();

    // In light mode — aria-checked should be false
    await expect(toggleBtn).toHaveAttribute('aria-checked', 'false');
    await expect(toggleBtn).toHaveAttribute('aria-label', /dark/i);
  });

  test('should maintain mode when navigating between pages', async ({ page }) => {
    // Default is dark mode — use web-first assertion
    await expect(page.locator('html')).toHaveClass(/dark/);

    // Navigate to products page using URL directly
    await page.goto('/dashboard/products');
    await page.waitForLoadState('domcontentloaded');

    // Verify dark mode is preserved (auto-retries)
    await expect(page.locator('html')).toHaveClass(/dark/);

    // Navigate back to dashboard using URL
    await page.goto('/dashboard');
    await page.waitForLoadState('domcontentloaded');

    // Verify dark mode is still preserved
    await expect(page.locator('html')).toHaveClass(/dark/);
  });

  test('should apply dark mode class to document element', async ({ page }) => {
    const htmlElement = page.locator('html');
    const toggleBtn = page.getByTestId(TestIds.THEME_TOGGLE);

    // Switch to dark mode
    if (await getThemeMode(page) !== 'dark') {
      await toggleBtn.click();
      await page.waitForTimeout(100);
    }

    // Verify dark class is on html element
    await expect(htmlElement).toHaveClass(/dark/);

    // Switch to light mode
    await toggleBtn.click();
    await page.waitForTimeout(100);

    // Verify dark class is removed
    await expect(htmlElement).not.toHaveClass(/dark/);
  });

  test('should have accessible toggle button', async ({ page }) => {
    const toggleBtn = page.getByTestId(TestIds.THEME_TOGGLE);

    // Should have aria-label
    await expect(toggleBtn).toHaveAttribute('aria-label');
  });

  test('should work correctly in theme drawer Light Theme tab', async ({ page }) => {
    await openThemeDrawer(page);

    // Click Light Theme tab
    await page.getByTestId(TestIds.THEME_TAB_LIGHT).click();

    // Verify tab is active
    await expect(page.getByTestId(TestIds.THEME_TAB_LIGHT)).toHaveAttribute('aria-current', 'page');

    // The Light Theme section should be visible
    // This tab contains light theme color customization
  });

  test('should work correctly in theme drawer Dark Theme tab', async ({ page }) => {
    await openThemeDrawer(page);

    // Click Dark Theme tab
    await page.getByTestId(TestIds.THEME_TAB_DARK).click();

    // Verify tab is active
    await expect(page.getByTestId(TestIds.THEME_TAB_DARK)).toHaveAttribute('aria-current', 'page');
  });
});
