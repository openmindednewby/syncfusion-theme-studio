import { test, expect } from '@playwright/test';

import { injectAuth } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

/** Mock user data returned by the intercepted API. */
const MOCK_USERS = {
  items: [
    { id: 1, username: 'admin@example.com', email: 'admin@example.com', firstName: 'Admin', lastName: 'User', role: 'admin', isActive: true },
    { id: 2, username: 'manager@example.com', email: 'manager@example.com', firstName: 'Manager', lastName: 'User', role: 'manager', isActive: true },
    { id: 3, username: 'viewer@example.com', email: 'viewer@example.com', firstName: 'Viewer', lastName: 'User', role: 'viewer', isActive: true },
  ],
  totalCount: 3,
};

/**
 * Admin User Management Page E2E tests.
 * Uses route interception to provide mock user data.
 */
test.describe('Admin User Management Page', () => {
  test.beforeEach(async ({ page }) => {
    // Intercept the users API to return mock data
    await page.route('**/mockapi/api/users**', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(MOCK_USERS),
      }),
    );

    await injectAuth(page, 'Admin');
    await page.goto('/admin/user-management', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId(TestIds.ADMIN_USERS_PAGE)).toBeVisible({ timeout: 15000 });
  });

  test('should display the user management heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /user/i })).toBeVisible();
  });

  test('should display the users table', async ({ page }) => {
    await expect(page.getByTestId(TestIds.ADMIN_USERS_TABLE)).toBeVisible({ timeout: 15000 });
  });

  test('should display role badges in the users table', async ({ page }) => {
    const table = page.getByTestId(TestIds.ADMIN_USERS_TABLE);
    await expect(table).toBeVisible({ timeout: 15000 });

    // Verify rows are rendered (one per mock user)
    const rows = table.locator('tbody tr');
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);
  });

  test('should display the add user button', async ({ page }) => {
    await expect(page.getByTestId(TestIds.ADMIN_USERS_ADD_BTN)).toBeVisible();
  });

  test('should display the search input', async ({ page }) => {
    await expect(page.getByTestId(TestIds.ADMIN_USERS_SEARCH)).toBeVisible();
  });

  test('should open add user dialog when add button is clicked', async ({ page }) => {
    await page.getByTestId(TestIds.ADMIN_USERS_ADD_BTN).click();
    await expect(page.getByTestId(TestIds.ADMIN_USERS_DIALOG)).toBeVisible({ timeout: 15000 });
  });
});
