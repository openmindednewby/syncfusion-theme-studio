import { test, expect } from '@playwright/test';

import { TestIds } from '../shared/testIds';
import { DashboardPage } from '../pages/DashboardPage';

test.describe('Navigation', () => {
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
  });

  test('displays dashboard on initial load', async () => {
    await dashboardPage.expectDashboardVisible();
  });

  test('navigates to pets page', async ({ page }) => {
    await page.getByTestId(TestIds.NAV_PETS).click();
    await expect(page).toHaveURL('/pets');
  });

  test('navigates to components page', async ({ page }) => {
    await page.getByTestId(TestIds.NAV_COMPONENTS).click();
    await expect(page).toHaveURL('/components');
  });

  test('opens theme settings drawer via cog icon', async ({ page }) => {
    // Click the theme settings button (cog icon)
    await page.getByTestId(TestIds.THEME_SETTINGS_BUTTON).click();

    // Verify drawer is visible
    await expect(page.getByTestId(TestIds.THEME_SETTINGS_DRAWER)).toBeVisible();
  });

  test('navigates to login page', async ({ page }) => {
    await page.getByTestId(TestIds.NAV_LOGIN).click();
    await expect(page).toHaveURL('/login');
  });
});
