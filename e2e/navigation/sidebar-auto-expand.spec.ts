import { test, expect } from '@playwright/test';

import { login } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

test.describe('Sidebar Navigation Auto-Expand', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test.describe('Components section auto-expand', () => {
    test('should auto-expand Components section when navigating directly to a native component page', async ({ page }) => {
      await page.goto('/dashboard/components/native');

      const componentsExpand = page.getByTestId(TestIds.NAV_COMPONENTS_EXPAND);
      await expect(componentsExpand).toHaveAttribute('aria-expanded', 'true');

      // The Overview sub-group auto-expands when its child is active
      const overviewGroup = page.locator('#subgroup-nav-overview-group');
      await expect(overviewGroup.getByTestId(TestIds.NAV_COMPONENTS_NATIVE)).toBeVisible();
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

      // Scope to Products section children to avoid duplicate testId matches
      const productsChildren = page.locator('#nav-children-nav-products-expand');
      await expect(productsChildren.getByTestId(TestIds.NAV_PRODUCTS_NATIVE)).toBeVisible();
    });
  });

  test.describe('Forms section auto-expand', () => {
    test('should auto-expand Forms section when navigating to forms/syncfusion', async ({ page }) => {
      await page.goto('/dashboard/forms/syncfusion');

      const formsExpand = page.getByTestId(TestIds.NAV_FORMS_EXPAND);
      await expect(formsExpand).toHaveAttribute('aria-expanded', 'true');
      // The expand button should have the active class
      await expect(formsExpand).toHaveClass(/active/);
    });
  });
});
