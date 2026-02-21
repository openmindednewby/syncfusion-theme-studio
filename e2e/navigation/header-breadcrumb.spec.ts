import { test, expect } from '@playwright/test';

import { login } from '../fixtures/auth';
import { HeaderBreadcrumbPage } from '../page-objects/HeaderBreadcrumbPage';

/**
 * E2E Tests for Header Breadcrumb Navigation
 *
 * The header breadcrumb replaces the static title with a navigable trail.
 * For example, navigating to `/dashboard/components/button/native` shows:
 *   [Home icon] > Components > Button > Native
 *
 * Tests verify:
 * - Dashboard page shows only the home icon (no extra segments)
 * - Deep navigation routes display the correct breadcrumb segments
 * - Clicking breadcrumb segments navigates to the correct route
 * - Clicking the home icon navigates to /dashboard
 * - The last segment is not clickable and has aria-current="page"
 * - Different top-level routes (products, forms, components) work correctly
 *
 * NOTE: Parent routes like /dashboard/components auto-redirect to their
 * default child (e.g., /dashboard/components/native). Breadcrumb click
 * tests account for these redirects.
 */

// =============================================================================
// Dashboard Root - Home Icon Only
// =============================================================================

test.describe('Breadcrumb on Dashboard Root', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('should display the breadcrumb nav on the dashboard page', async ({ page }) => {
    const breadcrumb = new HeaderBreadcrumbPage(page);
    await breadcrumb.expectVisible();
  });

  test('should display only the home icon on the dashboard root', async ({ page }) => {
    const breadcrumb = new HeaderBreadcrumbPage(page);
    await breadcrumb.expectOnlyHomeIcon();
  });

  test('should display the home button with an accessible label', async ({ page }) => {
    const breadcrumb = new HeaderBreadcrumbPage(page);
    await breadcrumb.expectHomeButtonVisible();
    await expect(breadcrumb.homeButton).toHaveAttribute('aria-label', /home/i);
  });
});

// =============================================================================
// Deep Navigation - Components Route
// =============================================================================

test.describe('Breadcrumb Deep Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/dashboard/components/button/native');
    await page.getByTestId('header-breadcrumb-nav').waitFor({ state: 'visible' });
  });

  test('should display breadcrumb segments for a deep route', async ({ page }) => {
    const breadcrumb = new HeaderBreadcrumbPage(page);
    // /dashboard/components/button/native -> Components > Button > Native
    await breadcrumb.expectSegmentLabels(['Components', 'Button', 'Native']);
  });

  test('should mark the last segment as current page with aria-current', async ({ page }) => {
    const breadcrumb = new HeaderBreadcrumbPage(page);
    await breadcrumb.expectCurrentPage('Native');
  });

  test('should have two clickable intermediate segments', async ({ page }) => {
    const breadcrumb = new HeaderBreadcrumbPage(page);
    // "Components" and "Button" should be clickable; "Native" is the current page
    await breadcrumb.expectClickableSegmentCount(2);
  });

  test('should always display the home button', async ({ page }) => {
    const breadcrumb = new HeaderBreadcrumbPage(page);
    await breadcrumb.expectHomeButtonVisible();
  });
});

// =============================================================================
// Breadcrumb Click Navigation
// =============================================================================

test.describe('Breadcrumb Click Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('should navigate to /dashboard when clicking the home button', async ({ page }) => {
    await page.goto('/dashboard/components/button/native');
    const breadcrumb = new HeaderBreadcrumbPage(page);
    await breadcrumb.expectVisible();

    await breadcrumb.clickHome();
    await breadcrumb.expectNavigatedToDashboard();
  });

  test('should show only home icon after navigating to dashboard via home button', async ({ page }) => {
    await page.goto('/dashboard/components/button/native');
    const breadcrumb = new HeaderBreadcrumbPage(page);
    await breadcrumb.expectVisible();

    await breadcrumb.clickHome();
    await breadcrumb.expectNavigatedToDashboard();
    await breadcrumb.expectOnlyHomeIcon();
  });

  test('should navigate and redirect when clicking Components segment', async ({ page }) => {
    // /dashboard/components auto-redirects to /dashboard/components/native
    await page.goto('/dashboard/components/button/native');
    const breadcrumb = new HeaderBreadcrumbPage(page);
    await breadcrumb.expectVisible();

    await breadcrumb.clickSegment('Components');

    // Wait for the redirect to complete and breadcrumb to update
    await breadcrumb.expectNavigatedTo(/\/dashboard\/components\/native/);
    await breadcrumb.expectSegmentLabels(['Components', 'Native']);
    await breadcrumb.expectCurrentPage('Native');
  });

  test('should navigate and redirect when clicking Button segment', async ({ page }) => {
    // /dashboard/components/button auto-redirects to /dashboard/components/button/native
    await page.goto('/dashboard/components/button/native');
    const breadcrumb = new HeaderBreadcrumbPage(page);
    await breadcrumb.expectVisible();

    await breadcrumb.clickSegment('Button');

    // The route auto-redirects, so breadcrumb stays the same
    await breadcrumb.expectNavigatedTo(/\/dashboard\/components\/button\/native/);
    await breadcrumb.expectSegmentLabels(['Components', 'Button', 'Native']);
  });
});

// =============================================================================
// Different Routes (Products, Forms)
// =============================================================================

test.describe('Breadcrumb Different Routes', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('should display correct breadcrumb for products native route', async ({ page }) => {
    await page.goto('/dashboard/products/native');
    const breadcrumb = new HeaderBreadcrumbPage(page);
    await breadcrumb.expectVisible();

    // /dashboard/products/native -> Products > Native
    await breadcrumb.expectSegmentLabels(['Products', 'Native']);
    await breadcrumb.expectCurrentPage('Native');
  });

  test('should have one clickable segment for products route', async ({ page }) => {
    await page.goto('/dashboard/products/native');
    const breadcrumb = new HeaderBreadcrumbPage(page);
    await breadcrumb.expectVisible();

    // "Products" is clickable, "Native" is current page
    await breadcrumb.expectClickableSegmentCount(1);
  });

  test('should display correct breadcrumb for forms syncfusion route', async ({ page }) => {
    await page.goto('/dashboard/forms/syncfusion');
    const breadcrumb = new HeaderBreadcrumbPage(page);
    await breadcrumb.expectVisible();

    // /dashboard/forms/syncfusion -> Forms > Syncfusion
    await breadcrumb.expectSegmentLabels(['Forms', 'Syncfusion']);
    await breadcrumb.expectCurrentPage('Syncfusion');
  });

  test('should have one clickable segment for forms route', async ({ page }) => {
    await page.goto('/dashboard/forms/syncfusion');
    const breadcrumb = new HeaderBreadcrumbPage(page);
    await breadcrumb.expectVisible();

    // "Forms" is clickable, "Syncfusion" is current page
    await breadcrumb.expectClickableSegmentCount(1);
  });

  test('should display correct breadcrumb for components syncfusion route', async ({ page }) => {
    await page.goto('/dashboard/components/syncfusion');
    const breadcrumb = new HeaderBreadcrumbPage(page);
    await breadcrumb.expectVisible();

    // /dashboard/components/syncfusion -> Components > Syncfusion
    await breadcrumb.expectSegmentLabels(['Components', 'Syncfusion']);
    await breadcrumb.expectCurrentPage('Syncfusion');
  });

  test('should navigate and redirect when clicking Products segment', async ({ page }) => {
    // /dashboard/products auto-redirects to /dashboard/products/native
    await page.goto('/dashboard/products/native');
    const breadcrumb = new HeaderBreadcrumbPage(page);
    await breadcrumb.expectVisible();

    await breadcrumb.clickSegment('Products');

    // Wait for the redirect to complete
    await breadcrumb.expectNavigatedTo(/\/dashboard\/products\/native/);
    await breadcrumb.expectSegmentLabels(['Products', 'Native']);
  });

  test('should navigate and redirect when clicking Forms segment', async ({ page }) => {
    // /dashboard/forms auto-redirects to /dashboard/forms/syncfusion
    await page.goto('/dashboard/forms/syncfusion');
    const breadcrumb = new HeaderBreadcrumbPage(page);
    await breadcrumb.expectVisible();

    await breadcrumb.clickSegment('Forms');

    // Wait for the redirect to complete
    await breadcrumb.expectNavigatedTo(/\/dashboard\/forms\/syncfusion/);
    await breadcrumb.expectSegmentLabels(['Forms', 'Syncfusion']);
  });
});
