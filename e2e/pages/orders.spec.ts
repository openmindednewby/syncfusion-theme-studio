import { test, expect } from '@playwright/test';

import { injectAuth } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

/** Mock order data returned by the intercepted API. */
const MOCK_ORDERS = {
  items: [
    { id: 1, userId: 'user-1', status: 'Pending', items: [{ name: 'Item A' }], totalAmount: 49.99, createdAt: '2025-12-01T10:00:00Z' },
    { id: 2, userId: 'user-2', status: 'Delivered', items: [{ name: 'Item B' }], totalAmount: 120.0, createdAt: '2025-12-02T14:30:00Z' },
    { id: 3, userId: 'user-3', status: 'Shipped', items: [{ name: 'Item C' }, { name: 'Item D' }], totalAmount: 89.50, createdAt: '2025-12-03T09:15:00Z' },
  ],
  totalCount: 3,
};

/**
 * Orders Page E2E tests.
 * Uses route interception to provide mock order data so the page renders fully.
 */
test.describe('Orders Page', () => {
  test.beforeEach(async ({ page }) => {
    // Intercept the orders API to return mock data
    await page.route('**/mockapi/api/orders**', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(MOCK_ORDERS),
      }),
    );

    await injectAuth(page);
    await page.goto('/orders', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId(TestIds.ORDERS_PAGE)).toBeVisible({ timeout: 15000 });
  });

  test('should display the orders page heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /orders/i })).toBeVisible();
  });

  test('should display the orders table with data', async ({ page }) => {
    await expect(page.getByTestId(TestIds.ORDERS_TABLE)).toBeVisible({ timeout: 15000 });

    // Verify rows are rendered
    const rows = page.getByTestId(TestIds.ORDERS_TABLE).locator('tbody tr');
    const rowCount = await rows.count();
    expect(rowCount).toBe(3);
  });

  test('should display order status badges', async ({ page }) => {
    const table = page.getByTestId(TestIds.ORDERS_TABLE);
    await expect(table).toBeVisible({ timeout: 15000 });

    // Status badges are rendered as <span> elements with rounded-full class
    const statusBadges = table.locator('span.rounded-full');
    await expect(statusBadges.first()).toBeVisible();

    const count = await statusBadges.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display the add order button', async ({ page }) => {
    await expect(page.getByTestId(TestIds.ORDERS_ADD_BTN)).toBeVisible();
  });

  test('should display the status filter dropdown', async ({ page }) => {
    const statusSelect = page.locator('select');
    await expect(statusSelect).toBeVisible();
  });

  test('should navigate directly to orders page via URL', async ({ page }) => {
    // Verify direct navigation works (already done in beforeEach, but explicit test)
    await page.goto('/orders', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId(TestIds.ORDERS_PAGE)).toBeVisible({ timeout: 15000 });
    await expect(page).toHaveURL('/orders');
  });
});
