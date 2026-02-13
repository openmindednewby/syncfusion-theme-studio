import { test, expect } from '@playwright/test';

import { login } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

test.describe('Sidebar Navigation Auto-Expand', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test.describe('Components section auto-expand', () => {
    test('should auto-expand Components section when navigating directly to a native component page', async ({ page }) => {
      // Navigate directly to a nested component route
      await page.goto('/dashboard/components/native');

      // The Components expand button should be auto-expanded
      const componentsExpand = page.getByTestId(TestIds.NAV_COMPONENTS_EXPAND);
      await expect(componentsExpand).toHaveAttribute('aria-expanded', 'true');

      // Child nav items should be visible
      await expect(page.getByTestId(TestIds.NAV_COMPONENTS_NATIVE)).toBeVisible();
    });

    test('should auto-expand Components section and Syncfusion sub-group on direct navigation', async ({ page }) => {
      // Navigate directly to a Syncfusion component sub-page
      await page.goto('/dashboard/components/button/syncfusion');

      // The Components expand button should be auto-expanded
      const componentsExpand = page.getByTestId(TestIds.NAV_COMPONENTS_EXPAND);
      await expect(componentsExpand).toHaveAttribute('aria-expanded', 'true');

      // The Syncfusion sub-group expand button should also be auto-expanded
      const syncfusionExpand = page.getByTestId(TestIds.NAV_COMPONENTS_SYNCFUSION_EXPAND);
      await expect(syncfusionExpand).toHaveAttribute('aria-expanded', 'true');

      // The Syncfusion button nav link should be visible
      await expect(page.getByTestId(TestIds.NAV_BUTTON_SYNCFUSION)).toBeVisible();
    });

    test('should auto-expand Components section and Native sub-group on direct navigation', async ({ page }) => {
      // Navigate directly to a Native component sub-page
      await page.goto('/dashboard/components/accordion/native');

      // The Components expand button should be auto-expanded
      const componentsExpand = page.getByTestId(TestIds.NAV_COMPONENTS_EXPAND);
      await expect(componentsExpand).toHaveAttribute('aria-expanded', 'true');

      // The Native sub-group expand button should also be auto-expanded
      const nativeExpand = page.getByTestId(TestIds.NAV_COMPONENTS_NATIVE_EXPAND);
      await expect(nativeExpand).toHaveAttribute('aria-expanded', 'true');

      // The Native accordion nav link should be visible
      await expect(page.getByTestId(TestIds.NAV_ACCORDION_NATIVE)).toBeVisible();
    });
  });

  test.describe('Products section auto-expand', () => {
    test('should auto-expand Products section when navigating directly to products/native', async ({ page }) => {
      await page.goto('/dashboard/products/native');

      // The Products expand button should be auto-expanded
      const productsExpand = page.getByTestId(TestIds.NAV_PRODUCTS_EXPAND);
      await expect(productsExpand).toHaveAttribute('aria-expanded', 'true');

      // Child nav items should be visible
      await expect(page.getByTestId(TestIds.NAV_PRODUCTS_NATIVE)).toBeVisible();
    });
  });

  test.describe('Forms section auto-expand', () => {
    test('should auto-expand Forms section when navigating directly to forms/syncfusion', async ({ page }) => {
      await page.goto('/dashboard/forms/syncfusion');

      // The Forms expand button should be auto-expanded
      const formsExpand = page.getByTestId(TestIds.NAV_FORMS_EXPAND);
      await expect(formsExpand).toHaveAttribute('aria-expanded', 'true');

      // Child nav items should be visible
      await expect(page.getByTestId(TestIds.NAV_FORMS_SYNCFUSION)).toBeVisible();
      await expect(page.getByTestId(TestIds.NAV_FORMS_NATIVE)).toBeVisible();
    });
  });
});
