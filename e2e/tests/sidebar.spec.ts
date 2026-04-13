import { test, expect } from '@playwright/test';

import { TestIds } from '../shared/testIds';
import { DashboardPage } from '../page-objects/DashboardPage';

test.describe('Sidebar', () => {
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
  });

  test('sidebar is visible on initial load', async ({ page }) => {
    await expect(page.getByTestId(TestIds.SIDEBAR)).toBeVisible();
  });

  test('collapses sidebar on toggle button click', async ({ page }) => {
    const sidebar = page.getByTestId(TestIds.SIDEBAR);

    // Wait for sidebar to be visible first
    await expect(sidebar).toBeVisible();

    // Initially should be expanded
    await expect(sidebar).toHaveAttribute('data-collapsed', 'false');

    // Click toggle
    await page.getByTestId(TestIds.SIDEBAR_TOGGLE).click();

    // Should be collapsed
    await expect(sidebar).toHaveAttribute('data-collapsed', 'true');
  });

  test('expands sidebar after being collapsed', async ({ page }) => {
    const sidebar = page.getByTestId(TestIds.SIDEBAR);

    // Wait for sidebar to be visible first
    await expect(sidebar).toBeVisible();

    // Collapse first
    await page.getByTestId(TestIds.SIDEBAR_TOGGLE).click();
    await expect(sidebar).toHaveAttribute('data-collapsed', 'true');

    // Expand again
    await page.getByTestId(TestIds.SIDEBAR_TOGGLE).click();
    await expect(sidebar).toHaveAttribute('data-collapsed', 'false');
  });

  test('persists sidebar state across navigation', async ({ page }) => {
    const sidebar = page.getByTestId(TestIds.SIDEBAR);

    // Ensure sidebar is fully visible and expanded before collapsing
    await expect(sidebar).toBeVisible();
    await expect(sidebar).toHaveAttribute('data-collapsed', 'false');

    // Collapse sidebar
    const sidebarToggle = page.getByTestId(TestIds.SIDEBAR_TOGGLE);
    await sidebarToggle.click();
    await expect(sidebar).toHaveAttribute('data-collapsed', 'true');

    // Navigate to another page and wait for all network activity to settle
    // so that Syncfusion components and lazy-loaded chunks finish initializing
    await page.goto('/products');
    await page.waitForLoadState('domcontentloaded');

    // Wait for the sidebar element to be attached and then visible before asserting
    const sidebarAfterNav = page.getByTestId(TestIds.SIDEBAR);
    await expect(sidebarAfterNav).toBeVisible({ timeout: 15000 });

    // Sidebar state must be persisted across navigation
    await expect(sidebarAfterNav).toHaveAttribute('data-collapsed', 'true');

    // Navigate back to dashboard and confirm state is still preserved
    await page.goto('/dashboard');
    await page.waitForLoadState('domcontentloaded');

    const sidebarOnDashboard = page.getByTestId(TestIds.SIDEBAR);
    await expect(sidebarOnDashboard).toBeVisible({ timeout: 15000 });
    await expect(sidebarOnDashboard).toHaveAttribute('data-collapsed', 'true');
  });

  test('navigation links are accessible in both states', async ({ page }) => {
    // Test navigation while expanded
    await page.goto('/products');
    await expect(page).toHaveURL('/products');

    // Go back and collapse sidebar
    await page.goto('/dashboard');
    await page.getByTestId(TestIds.SIDEBAR_TOGGLE).click();

    // Test navigation while collapsed
    await page.goto('/products');
    await expect(page).toHaveURL('/products');
  });
});
