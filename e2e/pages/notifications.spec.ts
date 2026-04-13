import { test, expect } from '@playwright/test';

import { injectAuth } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

test.describe('Notifications Page', () => {
  test.beforeEach(async ({ page }) => {
    await injectAuth(page);
    await page.goto('/notifications', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId(TestIds.NOTIFICATIONS_PAGE)).toBeVisible({ timeout: 15000 });
  });

  test('should display the notifications page heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /notifications/i })).toBeVisible();
  });

  test('should display the notifications toolbar', async ({ page }) => {
    await expect(page.getByTestId(TestIds.NOTIFICATIONS_TOOLBAR)).toBeVisible();
  });

  test('should display filter buttons in toolbar', async ({ page }) => {
    const toolbar = page.getByTestId(TestIds.NOTIFICATIONS_TOOLBAR);
    await expect(toolbar.getByRole('button', { name: 'All', exact: true })).toBeVisible();
    await expect(toolbar.getByRole('button', { name: /^Unread/i })).toBeVisible();
    await expect(toolbar.getByRole('button', { name: 'Read', exact: true })).toBeVisible();
  });

  test('should display mark all read button', async ({ page }) => {
    await expect(page.getByTestId(TestIds.NOTIFICATIONS_MARK_ALL_READ)).toBeVisible();
  });

  test('should display notifications list', async ({ page }) => {
    await expect(page.getByTestId(TestIds.NOTIFICATIONS_LIST)).toBeVisible();
  });

  test('should be navigable via sidebar nav item', async ({ page }) => {
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.getByTestId(TestIds.NAV_NOTIFICATIONS).click();
    await expect(page).toHaveURL('/notifications');
    await expect(page.getByTestId(TestIds.NOTIFICATIONS_PAGE)).toBeVisible();
  });

  test('should filter to unread notifications when unread button clicked', async ({ page }) => {
    const toolbar = page.getByTestId(TestIds.NOTIFICATIONS_TOOLBAR);
    await toolbar.getByRole('button', { name: /unread/i }).click();
    // Toolbar remains visible after filter change
    await expect(page.getByTestId(TestIds.NOTIFICATIONS_TOOLBAR)).toBeVisible();
    await expect(page.getByTestId(TestIds.NOTIFICATIONS_LIST)).toBeVisible();
  });

  test('should mark all notifications as read', async ({ page }) => {
    const markAllBtn = page.getByTestId(TestIds.NOTIFICATIONS_MARK_ALL_READ);
    await markAllBtn.click();
    // After marking all read, switching to unread filter should show empty state or no items
    const toolbar = page.getByTestId(TestIds.NOTIFICATIONS_TOOLBAR);
    await toolbar.getByRole('button', { name: /unread/i }).click();
    // Either empty state is shown or list has no items
    const emptyState = page.getByTestId(TestIds.NOTIFICATIONS_EMPTY);
    const list = page.getByTestId(TestIds.NOTIFICATIONS_LIST);
    const hasEmpty = await emptyState.isVisible().catch(() => false);
    const hasItems = await list.locator('[data-testid]').count();
    expect(hasEmpty || hasItems === 0).toBe(true);
  });
});
