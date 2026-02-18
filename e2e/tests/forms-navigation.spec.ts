import { test, expect } from '@playwright/test';

import { TestIds } from '../shared/testIds';
import { DashboardPage } from '../page-objects/DashboardPage';

test.describe('Forms Navigation', () => {
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
  });

  test.describe('Forms expandable section', () => {
    test('displays Forms section in the sidebar', async ({ page }) => {
      await expect(page.getByTestId(TestIds.NAV_FORMS_EXPAND)).toBeVisible();
    });

    test('expands sub-menu when Forms section is clicked', async ({ page }) => {
      // Forms section should initially be collapsed (not on a forms page)
      await dashboardPage.expectFormsCollapsed();

      // Click to expand
      await dashboardPage.expandFormsSection();

      // Sub-menu should now be expanded
      await dashboardPage.expectFormsExpanded();

      // Sub-items should be visible (scoped to Forms section to avoid duplicate testId matches)
      const formsChildren = page.locator('#nav-children-nav-forms-expand');
      await expect(formsChildren.getByTestId(TestIds.NAV_FORMS_SYNCFUSION)).toBeVisible();
      await expect(formsChildren.getByTestId(TestIds.NAV_FORMS_NATIVE)).toBeVisible();
    });

    test('collapses sub-menu when Forms section is clicked again', async ({ page }) => {
      // Expand first
      await dashboardPage.expandFormsSection();
      await dashboardPage.expectFormsExpanded();

      // Click again to collapse
      await dashboardPage.expandFormsSection();

      // Sub-menu should be collapsed (aria-expanded = false)
      await dashboardPage.expectFormsCollapsed();

      // The expandable container should have the 'collapsed' CSS class
      // (children remain in the DOM but are hidden via grid-template-rows: 0fr + opacity: 0)
      const expandableContainer = page.locator('#nav-children-nav-forms-expand').locator('..');
      await expect(expandableContainer).toHaveClass(/collapsed/);
    });
  });

  test.describe('Syncfusion Forms navigation', () => {
    test('navigates to Syncfusion Forms page via sidebar', async ({ page }) => {
      await dashboardPage.navigateToSyncfusionForms();

      await expect(page).toHaveURL('/dashboard/forms/syncfusion');
      await expect(page.getByTestId(TestIds.FORMS_SHOWCASE_PAGE)).toBeVisible();
    });

    test('displays Syncfusion Forms page content', async ({ page }) => {
      await dashboardPage.navigateToSyncfusionForms();

      // Page should have a heading
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    });
  });

  test.describe('Native Forms navigation', () => {
    test('navigates to Native Forms page via sidebar', async ({ page }) => {
      await dashboardPage.navigateToNativeForms();

      await expect(page).toHaveURL('/dashboard/forms/native');
      await expect(page.getByTestId(TestIds.NATIVE_FORMS_PAGE)).toBeVisible();
    });

    test('displays Native Forms page content', async ({ page }) => {
      await dashboardPage.navigateToNativeForms();

      // Page should have a heading
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    });
  });

  test.describe('Forms section active state', () => {
    test('shows active state on Forms expand button when on Syncfusion Forms page', async ({ page }) => {
      await dashboardPage.navigateToSyncfusionForms();

      // The expand button should have the active class
      const expandBtn = page.getByTestId(TestIds.NAV_FORMS_EXPAND);
      await expect(expandBtn).toHaveClass(/active/);
    });

    test('shows active state on Forms expand button when on Native Forms page', async ({ page }) => {
      await dashboardPage.navigateToNativeForms();

      // The expand button should have the active class
      const expandBtn = page.getByTestId(TestIds.NAV_FORMS_EXPAND);
      await expect(expandBtn).toHaveClass(/active/);
    });

    test('Forms section is auto-expanded when navigating directly to a forms URL', async ({ page }) => {
      // Navigate directly to a forms page via URL
      await page.goto('/dashboard/forms/syncfusion');

      // The Forms section should be auto-expanded since the current path is under /dashboard/forms
      await dashboardPage.expectFormsExpanded();

      // Sub-items should be visible (scoped to Forms section)
      const formsChildren = page.locator('#nav-children-nav-forms-expand');
      await expect(formsChildren.getByTestId(TestIds.NAV_FORMS_SYNCFUSION)).toBeVisible();
      await expect(formsChildren.getByTestId(TestIds.NAV_FORMS_NATIVE)).toBeVisible();
    });
  });

  test.describe('Forms redirect', () => {
    test('redirects /dashboard/forms to /dashboard/forms/syncfusion', async ({ page }) => {
      await page.goto('/dashboard/forms');

      await expect(page).toHaveURL('/dashboard/forms/syncfusion');
      await expect(page.getByTestId(TestIds.FORMS_SHOWCASE_PAGE)).toBeVisible();
    });
  });

  test.describe('Old routes removed', () => {
    test('Components sub-menu does not contain a Forms entry', async ({ page }) => {
      // Expand the Components sub-menu
      await page.getByTestId(TestIds.NAV_COMPONENTS_EXPAND).click();

      // Verify Components section has sub-groups (scoped to avoid duplicate testId matches)
      const componentsChildren = page.locator('#nav-children-nav-components-expand');
      await expect(componentsChildren.getByTestId(TestIds.NAV_OVERVIEW_GROUP_EXPAND)).toBeVisible();

      // There should be no "forms" link inside the Components sub-menu
      const formsLinkInComponents = componentsChildren.locator('a[href*="/showcase/forms"]');
      await expect(formsLinkInComponents).toHaveCount(0);
    });
  });
});
