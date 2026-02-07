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

  test('navigates to theme editor page', async ({ page }) => {
    await page.getByTestId(TestIds.NAV_THEME_EDITOR).click();
    await expect(page).toHaveURL('/theme-editor');
  });
});
