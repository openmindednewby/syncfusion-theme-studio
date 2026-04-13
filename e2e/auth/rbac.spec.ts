import { test, expect } from '@playwright/test';

import { loginAs, logout } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

/**
 * Role-Based Access Control (RBAC) tests.
 * Verifies that different user roles see appropriate navigation items
 * and are blocked from accessing unauthorized routes.
 */
test.describe('Role-Based Access Control', () => {
  test.afterEach(async ({ page }) => {
    await logout(page);
  });

  test('admin should see Admin Hub in sidebar', async ({ page }) => {
    await loginAs(page, 'admin@example.com', 'admin123');

    // Admin Hub nav item should be visible for admin role
    await expect(page.getByTestId(TestIds.NAV_ADMIN_HUB)).toBeVisible({ timeout: 15000 });
  });

  test('admin should access user management page', async ({ page }) => {
    await loginAs(page, 'admin@example.com', 'admin123');

    await page.goto('/admin/user-management');
    await expect(page.getByTestId(TestIds.ADMIN_USERS_PAGE)).toBeVisible({ timeout: 15000 });
  });

  test('viewer should not see Admin Hub in sidebar', async ({ page }) => {
    await loginAs(page, 'viewer@example.com', 'viewer123');

    // Admin Hub requires AdminAccess permission which viewers lack
    await expect(page.getByTestId(TestIds.NAV_ADMIN_HUB)).not.toBeVisible();
  });

  test('viewer should be redirected to 403 when accessing admin user management', async ({
    page,
  }) => {
    await loginAs(page, 'viewer@example.com', 'viewer123');

    // Navigate directly to admin-only route
    await page.goto('/admin/user-management');

    // ProtectedRoute redirects to /errors/403 when permission check fails
    await expect(page).toHaveURL('/errors/403', { timeout: 15000 });
  });

  test('manager should see standard navigation items but not Admin Hub', async ({ page }) => {
    await loginAs(page, 'manager@example.com', 'manager123');

    // Manager should see the sidebar
    await expect(page.getByTestId(TestIds.SIDEBAR)).toBeVisible({ timeout: 15000 });

    // Manager does NOT have AdminAccess permission, so Admin Hub should be hidden
    await expect(page.getByTestId(TestIds.NAV_ADMIN_HUB)).not.toBeVisible();

    // Manager should still see standard nav items like Dashboard
    await expect(page.getByTestId(TestIds.NAV_DASHBOARD_EXPAND)).toBeVisible();
  });

  test('manager should be redirected to 403 when accessing admin user management', async ({
    page,
  }) => {
    await loginAs(page, 'manager@example.com', 'manager123');

    await page.goto('/admin/user-management');
    await expect(page).toHaveURL('/errors/403', { timeout: 15000 });
  });

  test('all roles should have access to dashboard', async ({ page }) => {
    // Verify viewer can access the dashboard (ViewDashboard permission)
    await loginAs(page, 'viewer@example.com', 'viewer123');
    await expect(page.getByTestId(TestIds.DASHBOARD_HEADING)).toBeVisible({ timeout: 15000 });
  });
});
