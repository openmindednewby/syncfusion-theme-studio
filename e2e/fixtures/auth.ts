import { type Page, expect } from '@playwright/test';

import { TestIds } from '../shared/testIds';

/**
 * Log in to the application using demo credentials.
 * Navigates from the login page to the dashboard.
 */
export async function login(page: Page): Promise<void> {
  await page.goto('/');

  // Fill in demo credentials (input is inside the wrapper div)
  // The credentials are pre-filled, so we just need to click submit
  await page.getByTestId(TestIds.LOGIN_SUBMIT).click();

  // Wait for dashboard to load
  await page.waitForURL('/dashboard');
  await page.getByTestId(TestIds.DASHBOARD_HEADING).waitFor({ state: 'visible' });
}

/**
 * Open the theme settings drawer panel.
 * Uses the Theme Editor button from sidebar or header cog icon.
 */
export async function openThemeDrawer(page: Page): Promise<void> {
  const toggleBtn = page.getByTestId(TestIds.THEME_CLOSE_BTN);

  // Check if drawer is already open by checking aria-expanded attribute
  const isExpanded = await toggleBtn.getAttribute('aria-expanded');

  if (isExpanded !== 'true') {
    // Click the toggle button to expand the drawer
    await toggleBtn.click();
  }

  // Wait for drawer to be fully expanded using aria-expanded attribute
  await expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');
  // Verify drawer is visible
  const drawer = page.getByTestId(TestIds.THEME_SETTINGS_DRAWER);
  await expect(drawer).toBeVisible();
}

/**
 * Close the theme settings drawer panel.
 */
export async function closeThemeDrawer(page: Page): Promise<void> {
  const toggleBtn = page.getByTestId(TestIds.THEME_CLOSE_BTN);

  // Check if drawer is open by checking aria-expanded attribute
  const isExpanded = await toggleBtn.getAttribute('aria-expanded');

  if (isExpanded === 'true') {
    // Click the toggle button to collapse
    await toggleBtn.click();
  }

  // Wait for drawer to be fully collapsed using aria-expanded attribute
  await expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
}

/**
 * Get the current theme mode (light or dark).
 */
export async function getThemeMode(page: Page): Promise<'light' | 'dark'> {
  const isDark = await page.evaluate(() =>
    document.documentElement.classList.contains('dark')
  );
  return isDark ? 'dark' : 'light';
}

/**
 * Get a CSS custom property value from the root element.
 */
export async function getCSSVariable(page: Page, variableName: string): Promise<string> {
  return page.evaluate((name) => {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }, variableName);
}

/**
 * Clear localStorage to reset theme state.
 */
export async function clearThemeStorage(page: Page): Promise<void> {
  await page.evaluate(() => {
    localStorage.removeItem('mode-storage');
    localStorage.removeItem('theme-storage');
  });
}
