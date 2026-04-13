import { test, expect } from '@playwright/test';

import { injectAuth } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

/**
 * Dark Mode Role Badge Visual Regression E2E tests.
 *
 * Verifies that role badges on the User Management page do not retain
 * light-only background colors when dark mode is active.
 *
 * The UserRoleBadge component uses Tailwind classes like "bg-purple-100",
 * "bg-blue-100", etc. which can appear jarring in dark mode if they
 * don't adapt properly.
 *
 * The table structure places role badges in column 4 (td:nth-child(4))
 * and status badges in column 5 (td:nth-child(5)).
 */

/** Mock user data with multiple roles. */
const MOCK_USERS = {
  items: [
    { id: 1, username: 'admin@example.com', email: 'admin@example.com', firstName: 'Admin', lastName: 'User', role: 'Admin', isActive: true },
    { id: 2, username: 'manager@example.com', email: 'manager@example.com', firstName: 'Manager', lastName: 'User', role: 'Manager', isActive: true },
    { id: 3, username: 'viewer@example.com', email: 'viewer@example.com', firstName: 'Viewer', lastName: 'User', role: 'Viewer', isActive: true },
    { id: 4, username: 'analyst@example.com', email: 'analyst@example.com', firstName: 'Analyst', lastName: 'User', role: 'Analyst', isActive: true },
  ],
  totalCount: 4,
};

/** Average brightness above this threshold indicates a light-only color. */
const LIGHT_ONLY_THRESHOLD = 200;

function getColorBrightness(colorStr: string): number {
  const rgbMatch = colorStr.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (rgbMatch) {
    return (Number(rgbMatch[1]) + Number(rgbMatch[2]) + Number(rgbMatch[3])) / 3;
  }
  return -1;
}

test.describe('Dark Mode: User Role Badges', () => {
  test.beforeEach(async ({ page }) => {
    // Intercept users API
    await page.route('**/mockapi/api/users**', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(MOCK_USERS),
      }),
    );

    await injectAuth(page, 'Admin');
    // Navigate to user management page first, then toggle dark mode
    await page.goto('/admin/user-management', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId(TestIds.ADMIN_USERS_PAGE)).toBeVisible({ timeout: 15000 });

    // Switch to dark mode
    const themeToggle = page.getByTestId(TestIds.THEME_TOGGLE);
    const isDark = await page.evaluate(() =>
      document.documentElement.classList.contains('dark'),
    );
    if (!isDark) {
      await themeToggle.click();
      await expect(page.locator('html.dark')).toBeVisible({ timeout: 5000 });
    }
  });

  test('should be in dark mode', async ({ page }) => {
    const isDark = await page.evaluate(() =>
      document.documentElement.classList.contains('dark'),
    );
    expect(isDark, 'Page should be in dark mode').toBe(true);
  });

  test('should have a users table with role badges', async ({ page }) => {
    const usersTable = page.getByTestId(TestIds.ADMIN_USERS_TABLE);
    await expect(usersTable).toBeVisible({ timeout: 15000 });

    // Target role badge column specifically (4th column)
    const roleBadges = usersTable.locator('td:nth-child(4) .rounded-full');
    const badgeCount = await roleBadges.count();
    expect(badgeCount, 'Users table should contain role badges').toBeGreaterThan(0);
  });

  test('should not have light-only background colors on role badges', async ({ page }) => {
    const usersTable = page.getByTestId(TestIds.ADMIN_USERS_TABLE);
    await expect(usersTable).toBeVisible({ timeout: 15000 });

    // Target role badge column specifically (4th column)
    const roleBadges = usersTable.locator('td:nth-child(4) .rounded-full');
    const badgeCount = await roleBadges.count();

    const lightOnlyBadges: string[] = [];

    for (let i = 0; i < badgeCount; i++) {
      const badge = roleBadges.nth(i);
      const isVisible = await badge.isVisible();
      if (!isVisible) continue;

      const bgColor = await badge.evaluate(
        (el) => window.getComputedStyle(el).backgroundColor,
      );

      const brightness = getColorBrightness(bgColor);

      if (brightness > LIGHT_ONLY_THRESHOLD) {
        const text = await badge.textContent();
        lightOnlyBadges.push(
          `"${String(text?.trim())}" bg=${bgColor} (brightness=${String(Math.round(brightness))})`,
        );
      }
    }

    expect(
      lightOnlyBadges.length,
      `Role badges should not have light-only backgrounds in dark mode. Found: ${lightOnlyBadges.join('; ')}`,
    ).toBe(0);
  });

  test('should have sufficient text-background contrast on role badges', async ({ page }) => {
    const usersTable = page.getByTestId(TestIds.ADMIN_USERS_TABLE);
    await expect(usersTable).toBeVisible({ timeout: 15000 });

    // Target role badge column specifically (4th column)
    const roleBadges = usersTable.locator('td:nth-child(4) .rounded-full');
    const badgeCount = await roleBadges.count();

    for (let i = 0; i < Math.min(badgeCount, 5); i++) {
      const badge = roleBadges.nth(i);
      const isVisible = await badge.isVisible();
      if (!isVisible) continue;

      const textColor = await badge.evaluate(
        (el) => window.getComputedStyle(el).color,
      );
      const bgColor = await badge.evaluate(
        (el) => window.getComputedStyle(el).backgroundColor,
      );

      const textBrightness = getColorBrightness(textColor);
      const bgBrightness = getColorBrightness(bgColor);

      if (textBrightness >= 0 && bgBrightness >= 0) {
        const contrast = Math.abs(textBrightness - bgBrightness);
        expect(
          contrast,
          `Badge ${String(i)} should have contrast between text and bg. ` +
          `text=${String(Math.round(textBrightness))}, bg=${String(Math.round(bgBrightness))}`,
        ).toBeGreaterThan(30);
      }
    }
  });
});
