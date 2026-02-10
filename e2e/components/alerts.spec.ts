import { test, expect } from '@playwright/test';

import { login, openThemeDrawer } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

// ---------------------------------------------------------------------------
// Native Alerts - rendered on the Native Components page
// These are zero-dependency HTML alerts, so no Syncfusion load-time concerns.
// ---------------------------------------------------------------------------
test.describe('Native Alert Components', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/dashboard/components/native');
    await page.waitForLoadState('domcontentloaded');
    // Wait for the lazy-loaded page container to be visible (longer timeout for parallel runs)
    await expect(page.getByTestId(TestIds.NATIVE_COMPONENTS_PAGE)).toBeVisible({ timeout: 15000 });
  });

  test('should render all four alert variants', async ({ page }) => {
    const successAlert = page.getByTestId(TestIds.NATIVE_ALERT_SUCCESS);
    await successAlert.scrollIntoViewIfNeeded();

    await expect(successAlert).toBeVisible();
    await expect(page.getByTestId(TestIds.NATIVE_ALERT_WARNING)).toBeVisible();
    await expect(page.getByTestId(TestIds.NATIVE_ALERT_ERROR)).toBeVisible();
    await expect(page.getByTestId(TestIds.NATIVE_ALERT_INFO)).toBeVisible();
  });

  test('should display alert with role="alert" for accessibility', async ({ page }) => {
    const successAlert = page.getByTestId(TestIds.NATIVE_ALERT_SUCCESS);
    await successAlert.scrollIntoViewIfNeeded();

    await expect(successAlert).toHaveAttribute('role', 'alert');
    await expect(page.getByTestId(TestIds.NATIVE_ALERT_WARNING)).toHaveAttribute('role', 'alert');
    await expect(page.getByTestId(TestIds.NATIVE_ALERT_ERROR)).toHaveAttribute('role', 'alert');
    await expect(page.getByTestId(TestIds.NATIVE_ALERT_INFO)).toHaveAttribute('role', 'alert');
  });

  test('should display success alert with correct variant class', async ({ page }) => {
    const successAlert = page.getByTestId(TestIds.NATIVE_ALERT_SUCCESS);
    await successAlert.scrollIntoViewIfNeeded();

    const hasSuccessClass = await successAlert.evaluate((el) =>
      el.classList.contains('alert-success')
    );
    expect(hasSuccessClass).toBe(true);
  });

  test('should display warning alert with correct variant class', async ({ page }) => {
    const warningAlert = page.getByTestId(TestIds.NATIVE_ALERT_WARNING);
    await warningAlert.scrollIntoViewIfNeeded();

    const hasWarningClass = await warningAlert.evaluate((el) =>
      el.classList.contains('alert-warning')
    );
    expect(hasWarningClass).toBe(true);
  });

  test('should display error alert with correct variant class', async ({ page }) => {
    const errorAlert = page.getByTestId(TestIds.NATIVE_ALERT_ERROR);
    await errorAlert.scrollIntoViewIfNeeded();

    const hasErrorClass = await errorAlert.evaluate((el) =>
      el.classList.contains('alert-error')
    );
    expect(hasErrorClass).toBe(true);
  });

  test('should display info alert with correct variant class', async ({ page }) => {
    const infoAlert = page.getByTestId(TestIds.NATIVE_ALERT_INFO);
    await infoAlert.scrollIntoViewIfNeeded();

    const hasInfoClass = await infoAlert.evaluate((el) =>
      el.classList.contains('alert-info')
    );
    expect(hasInfoClass).toBe(true);
  });

  test('should display alert titles when provided', async ({ page }) => {
    const successAlert = page.getByTestId(TestIds.NATIVE_ALERT_SUCCESS);
    await successAlert.scrollIntoViewIfNeeded();

    // Success alert has title="Success"
    const title = successAlert.locator('.alert-title');
    await expect(title).toBeVisible();
    await expect(title).toHaveText('Success');
  });

  test('should display alert description content', async ({ page }) => {
    const successAlert = page.getByTestId(TestIds.NATIVE_ALERT_SUCCESS);
    await successAlert.scrollIntoViewIfNeeded();

    const description = successAlert.locator('.alert-description');
    await expect(description).toBeVisible();
    await expect(description).toContainText('saved successfully');
  });

  test('should display icons on alerts by default', async ({ page }) => {
    const successAlert = page.getByTestId(TestIds.NATIVE_ALERT_SUCCESS);
    await successAlert.scrollIntoViewIfNeeded();

    // Alerts with showIcon=true (default) should have an SVG icon
    const icon = successAlert.locator('.alert-icon');
    await expect(icon).toBeVisible();
  });

  test('should render alert without icon when showIcon is false', async ({ page }) => {
    const noIconAlert = page.getByTestId(TestIds.NATIVE_ALERT_NO_ICON);
    await noIconAlert.scrollIntoViewIfNeeded();

    await expect(noIconAlert).toBeVisible();

    // This alert has showIcon={false}, so no .alert-icon should exist
    const icon = noIconAlert.locator('.alert-icon');
    await expect(icon).toHaveCount(0);
  });

  test('should render dismissible alert with close button', async ({ page }) => {
    const dismissibleAlert = page.getByTestId(TestIds.NATIVE_ALERT_DISMISSIBLE);
    await dismissibleAlert.scrollIntoViewIfNeeded();

    await expect(dismissibleAlert).toBeVisible();

    // Dismiss button should be present with correct test ID
    const dismissButton = page.getByTestId(`${TestIds.NATIVE_ALERT_DISMISSIBLE}-dismiss`);
    await expect(dismissButton).toBeVisible();

    // Dismiss button should have accessible label
    await expect(dismissButton).toHaveAttribute('aria-label', 'Dismiss alert');
  });

  test('should dismiss alert when close button is clicked', async ({ page }) => {
    const dismissibleAlert = page.getByTestId(TestIds.NATIVE_ALERT_DISMISSIBLE);
    await dismissibleAlert.scrollIntoViewIfNeeded();

    // Confirm the alert is visible before dismissing
    await expect(dismissibleAlert).toBeVisible();

    // Click the dismiss button
    const dismissButton = page.getByTestId(`${TestIds.NATIVE_ALERT_DISMISSIBLE}-dismiss`);
    await dismissButton.click();

    // Alert should disappear (the component returns null when dismissed)
    await expect(dismissibleAlert).not.toBeVisible();
  });

  test('should not show close button on non-dismissible alerts', async ({ page }) => {
    const successAlert = page.getByTestId(TestIds.NATIVE_ALERT_SUCCESS);
    await successAlert.scrollIntoViewIfNeeded();

    // Non-dismissible alerts should not have a close button
    const closeButton = successAlert.locator('.alert-close');
    await expect(closeButton).toHaveCount(0);
  });
});

// ---------------------------------------------------------------------------
// Theme Editor - Alerts section in the Components tab
// ---------------------------------------------------------------------------
test.describe('Theme Editor - Alerts Configuration', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await openThemeDrawer(page);

    // Navigate to the Components tab
    await page.getByTestId(TestIds.THEME_TAB_COMPONENTS).click();
    await expect(page.getByTestId(TestIds.THEME_TAB_COMPONENTS)).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  test('should display Alerts collapsible section in Components tab', async ({ page }) => {
    // The AlertsEditor is rendered inside a CollapsibleSection with title "Alerts"
    // Find the collapsible section button that contains "alerts" text (case-insensitive)
    const alertsSectionButton = page.locator('.collapsible-section').filter({
      has: page.locator('button', { hasText: /alerts/i }),
    });

    await alertsSectionButton.scrollIntoViewIfNeeded();
    await expect(alertsSectionButton).toBeVisible();
  });

  test('should expand Alerts section to reveal color pickers', async ({ page }) => {
    // Find and click the Alerts collapsible header to expand it
    const alertsHeader = page.locator('.collapsible-header', { hasText: /alerts/i });
    await alertsHeader.scrollIntoViewIfNeeded();
    await alertsHeader.click();

    // After expanding, the collapsible content region should be visible
    const alertsSection = page.locator('.collapsible-section').filter({
      has: page.locator('button', { hasText: /alerts/i }),
    });
    const content = alertsSection.locator('.collapsible-content');
    await expect(content).toBeVisible();

    // Should show variant labels for each alert type
    await expect(alertsSection.getByText('success')).toBeVisible();
    await expect(alertsSection.getByText('warning')).toBeVisible();
    await expect(alertsSection.getByText('error')).toBeVisible();
    await expect(alertsSection.getByText('info')).toBeVisible();
  });

  test('should display color pickers for each alert variant', async ({ page }) => {
    // Expand the Alerts section
    const alertsHeader = page.locator('.collapsible-header', { hasText: /alerts/i });
    await alertsHeader.scrollIntoViewIfNeeded();
    await alertsHeader.click();

    const alertsSection = page.locator('.collapsible-section').filter({
      has: page.locator('button', { hasText: /alerts/i }),
    });

    // Each variant (success, warning, error, info) has 4 color pickers:
    // background, textColor, borderColor, iconColor
    // That means 16 color picker inputs total
    const colorInputs = alertsSection.locator('input[type="color"]');
    const colorInputCount = await colorInputs.count();

    // 4 variants x 4 properties = 16 color pickers minimum
    const EXPECTED_MIN_COLOR_PICKERS = 16;
    expect(colorInputCount).toBeGreaterThanOrEqual(EXPECTED_MIN_COLOR_PICKERS);
  });

  test('should toggle Alerts section open and closed', async ({ page }) => {
    const alertsSection = page.locator('.collapsible-section').filter({
      has: page.locator('button', { hasText: /alerts/i }),
    });
    const alertsHeader = alertsSection.locator('.collapsible-header');
    await alertsHeader.scrollIntoViewIfNeeded();

    // Initially collapsed (defaultOpen=false)
    const expandButton = alertsSection.locator('button[aria-expanded]');
    await expect(expandButton).toHaveAttribute('aria-expanded', 'false');

    // Click to expand
    await alertsHeader.click();
    await expect(expandButton).toHaveAttribute('aria-expanded', 'true');

    // Click to collapse again
    await alertsHeader.click();
    await expect(expandButton).toHaveAttribute('aria-expanded', 'false');
  });
});
