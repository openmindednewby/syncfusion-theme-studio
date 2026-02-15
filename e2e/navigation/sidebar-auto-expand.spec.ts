import { test, expect } from '@playwright/test';

import { login } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

test.describe('Sidebar Navigation Auto-Expand', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test.describe('Threat Detection section auto-expand', () => {
    test('should auto-expand Threat Detection section when navigating directly to a native component page', async ({ page }) => {
      await page.goto('/dashboard/components/native');

      const threatExpand = page.getByTestId(TestIds.NAV_THREAT_DETECTION_EXPAND);
      await expect(threatExpand).toHaveAttribute('aria-expanded', 'true');

      await expect(page.getByTestId(TestIds.NAV_COMPONENTS_NATIVE)).toBeVisible();
    });

    test('should auto-expand Attack Surface section on direct navigation to button route', async ({ page }) => {
      await page.goto('/dashboard/components/button/syncfusion');

      const attackSurfaceExpand = page.getByTestId(TestIds.NAV_ATTACK_SURFACE_EXPAND);
      await expect(attackSurfaceExpand).toHaveAttribute('aria-expanded', 'true');

      await expect(page.getByTestId(TestIds.NAV_BUTTON_SYNCFUSION)).toBeVisible();
    });
  });

  test.describe('Products section auto-expand', () => {
    test('should auto-expand Products section when navigating directly to products/native', async ({ page }) => {
      await page.goto('/dashboard/products/native');

      const productsExpand = page.getByTestId(TestIds.NAV_PRODUCTS_EXPAND);
      await expect(productsExpand).toHaveAttribute('aria-expanded', 'true');

      await expect(page.getByTestId(TestIds.NAV_PRODUCTS_NATIVE)).toBeVisible();
    });
  });

  test.describe('Direct link navigation', () => {
    test('should highlight User Rank when navigating to forms/syncfusion', async ({ page }) => {
      await page.goto('/dashboard/forms/syncfusion');

      const userRankLink = page.getByTestId(TestIds.NAV_USER_RANK);
      await expect(userRankLink).toBeVisible();
      await expect(userRankLink).toHaveClass(/active/);
    });
  });
});
