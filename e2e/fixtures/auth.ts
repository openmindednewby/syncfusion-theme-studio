import { type Page, expect } from '@playwright/test';

import { TestIds } from '../shared/testIds';

/**
 * Helper to get the actual input element inside a testId wrapper.
 */
function _getInput(page: Page, testId: string) {
  return page.getByTestId(testId).locator('input');
}

/**
 * Builds the zustand persist storage payload for the auth store.
 * The store persists { token, user } at version 2.
 */
function buildAuthPayload(email: string, name: string, role: string): string {
  return JSON.stringify({
    state: {
      token: 'e2e-test-token',
      user: { email, name, role },
    },
    version: 2,
  });
}

/** Preset credentials for each demo role. Role values must match the Role enum (capitalized). */
const ROLE_CREDENTIALS: Record<string, { email: string; name: string; role: string }> = {
  demo: { email: 'demo@example.com', name: 'Demo User', role: 'Admin' },
  admin: { email: 'admin@example.com', name: 'Admin User', role: 'Admin' },
  manager: { email: 'manager@example.com', name: 'Manager User', role: 'Manager' },
  viewer: { email: 'viewer@example.com', name: 'Viewer User', role: 'Viewer' },
};

/**
 * Inject auth state into localStorage via addInitScript — no navigation needed.
 * The script runs before every page load, so the auth state is already present
 * when the test navigates to the target page. This eliminates one full page load
 * per test compared to the old goto('/login') approach.
 */
export async function injectAuth(page: Page, role = 'Admin'): Promise<void> {
  const creds = Object.values(ROLE_CREDENTIALS).find((c) => c.role === role) ?? ROLE_CREDENTIALS['demo'];
  const payload = buildAuthPayload(creds.email, creds.name, creds.role);
  await page.addInitScript((p) => localStorage.setItem('auth-storage', p), payload);
}

/**
 * Log in to the application by injecting auth state into localStorage.
 * Navigates to the dashboard after injecting state.
 * Use `injectAuth()` instead when the test navigates away immediately.
 */
export async function login(page: Page): Promise<void> {
  const payload = buildAuthPayload('demo@example.com', 'Demo User', 'Admin');

  // Navigate to a page first so we can set localStorage (same origin required)
  await page.goto('/login', { waitUntil: 'domcontentloaded' });
  await page.evaluate((p) => localStorage.setItem('auth-storage', p), payload);

  // Navigate to dashboard — ProtectedRoute will see isAuthenticated = true
  await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
  await expect(page.getByTestId(TestIds.DASHBOARD_HEADING)).toBeVisible({ timeout: 30000 });
}

/**
 * Log in as a specific role by injecting auth state into localStorage.
 * Supports: 'admin', 'manager', 'viewer', or custom credentials.
 */
export async function loginAs(
  page: Page,
  email: string,
  _password: string,
): Promise<void> {
  // Determine role from known credentials
  const knownRole = Object.values(ROLE_CREDENTIALS).find((c) => c.email === email);
  const role = knownRole?.role ?? 'Viewer';
  const name = knownRole?.name ?? 'Test User';
  const payload = buildAuthPayload(email, name, role);

  // Navigate to a page first so we can set localStorage
  await page.goto('/login', { waitUntil: 'domcontentloaded' });
  await page.evaluate((p) => localStorage.setItem('auth-storage', p), payload);

  // Navigate to dashboard
  await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
  await expect(page.getByTestId(TestIds.DASHBOARD_HEADING)).toBeVisible({ timeout: 30000 });
}

/**
 * Clear auth state from localStorage.
 */
export async function logout(page: Page): Promise<void> {
  await page.evaluate(() => localStorage.removeItem('auth-storage'));
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
