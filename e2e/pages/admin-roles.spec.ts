import { test, expect } from '@playwright/test';

import { injectAuth } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

/** Mock role data returned by the intercepted API. */
const MOCK_ROLES = [
  { id: 1, name: 'Admin', permissions: ['ViewDashboard', 'ManageUsers', 'ManageRoles', 'AdminAccess'] },
  { id: 2, name: 'Manager', permissions: ['ViewDashboard', 'ViewProducts', 'EditProducts', 'ViewOrders'] },
  { id: 3, name: 'Viewer', permissions: ['ViewDashboard', 'ViewProducts', 'ViewOrders'] },
];

/**
 * Admin Role Management Page E2E tests.
 * Uses route interception to provide mock role data.
 */
test.describe('Admin Role Management Page', () => {
  test.beforeEach(async ({ page }) => {
    // Intercept the roles API to return mock data
    await page.route('**/mockapi/api/roles**', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(MOCK_ROLES),
      }),
    );

    await injectAuth(page, 'Admin');
    await page.goto('/admin/role-management', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId(TestIds.ROLE_MANAGEMENT_PAGE)).toBeVisible({ timeout: 15000 });
  });

  test('should display the role management heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /role/i })).toBeVisible();
  });

  test('should display the roles table with data', async ({ page }) => {
    await expect(page.getByTestId(TestIds.ROLE_MANAGEMENT_TABLE)).toBeVisible({ timeout: 15000 });

    // Verify at least one row exists
    const rows = page.getByTestId(TestIds.ROLE_MANAGEMENT_TABLE).locator('tbody tr');
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);
  });

  test('should display the permissions matrix', async ({ page }) => {
    await expect(page.getByTestId(TestIds.PERMISSIONS_MATRIX_CONTAINER)).toBeVisible({
      timeout: 15000,
    });
  });

  test('should display the create role button', async ({ page }) => {
    await expect(page.getByTestId(TestIds.ROLE_MANAGEMENT_CREATE_BTN)).toBeVisible();
  });

  test('should show role names in the table', async ({ page }) => {
    const table = page.getByTestId(TestIds.ROLE_MANAGEMENT_TABLE);
    const tableText = await table.textContent();

    // The mock roles should appear in the table
    expect(tableText).toContain('Admin');
    expect(tableText).toContain('Manager');
    expect(tableText).toContain('Viewer');
  });
});
