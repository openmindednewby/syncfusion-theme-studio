import { test, expect } from '@playwright/test';

import { login } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

// ---------------------------------------------------------------------------
// Native Toast Notifications - rendered on the Native Components page
// Toasts are rendered via React portal as direct children of <body>,
// with fixed positioning at top-right. They auto-dismiss after 5 seconds
// with a progress bar and slide-out animation.
// ---------------------------------------------------------------------------
test.describe('Native Toast Notifications', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    // Navigate directly to avoid strict-mode violations from duplicate sidebar testIds
    await page.goto('/dashboard/components/native');
    await expect(page.getByTestId(TestIds.NATIVE_COMPONENTS_PAGE)).toBeVisible({ timeout: 15000 });
  });

  test('should display native notifications section on the page', async ({ page }) => {
    const section = page.getByTestId(TestIds.NATIVE_NOTIFICATIONS_SECTION);
    await section.scrollIntoViewIfNeeded();

    await expect(section).toBeVisible();
  });

  test('should show toast container when clicking success button', async ({ page }) => {
    const section = page.getByTestId(TestIds.NATIVE_NOTIFICATIONS_SECTION);
    await section.scrollIntoViewIfNeeded();

    // Click the native success toast button
    const successBtn = page.getByTestId('native-toast-success-btn');
    await successBtn.click();

    // Toast container should appear as a portal in the DOM
    const container = page.getByTestId('native-toast-container');
    await expect(container).toBeVisible();
  });

  test('should render success toast with correct severity class', async ({ page }) => {
    const section = page.getByTestId(TestIds.NATIVE_NOTIFICATIONS_SECTION);
    await section.scrollIntoViewIfNeeded();

    await page.getByTestId('native-toast-success-btn').click();

    const container = page.getByTestId('native-toast-container');
    await expect(container).toBeVisible();

    const toast = container.locator('.native-toast-success');
    await expect(toast).toBeVisible();
  });

  test('should render warning toast with correct severity class', async ({ page }) => {
    const section = page.getByTestId(TestIds.NATIVE_NOTIFICATIONS_SECTION);
    await section.scrollIntoViewIfNeeded();

    await page.getByTestId('native-toast-warning-btn').click();

    const container = page.getByTestId('native-toast-container');
    await expect(container).toBeVisible();

    const toast = container.locator('.native-toast-warning');
    await expect(toast).toBeVisible();
  });

  test('should render error toast with correct severity class', async ({ page }) => {
    const section = page.getByTestId(TestIds.NATIVE_NOTIFICATIONS_SECTION);
    await section.scrollIntoViewIfNeeded();

    await page.getByTestId('native-toast-error-btn').click();

    const container = page.getByTestId('native-toast-container');
    await expect(container).toBeVisible();

    const toast = container.locator('.native-toast-error');
    await expect(toast).toBeVisible();
  });

  test('should render info toast with correct severity class', async ({ page }) => {
    const section = page.getByTestId(TestIds.NATIVE_NOTIFICATIONS_SECTION);
    await section.scrollIntoViewIfNeeded();

    await page.getByTestId('native-toast-info-btn').click();

    const container = page.getByTestId('native-toast-container');
    await expect(container).toBeVisible();

    const toast = container.locator('.native-toast-info');
    await expect(toast).toBeVisible();
  });

  test('should render toast with role="alert" for accessibility', async ({ page }) => {
    const section = page.getByTestId(TestIds.NATIVE_NOTIFICATIONS_SECTION);
    await section.scrollIntoViewIfNeeded();

    await page.getByTestId('native-toast-success-btn').click();

    const container = page.getByTestId('native-toast-container');
    await expect(container).toBeVisible();

    // Each toast item should have role="alert"
    const toast = container.locator('.native-toast').first();
    await expect(toast).toHaveAttribute('role', 'alert');
  });

  test('should render toast with a close button that dismisses it', async ({ page }) => {
    const section = page.getByTestId(TestIds.NATIVE_NOTIFICATIONS_SECTION);
    await section.scrollIntoViewIfNeeded();

    await page.getByTestId('native-toast-success-btn').click();

    const container = page.getByTestId('native-toast-container');
    await expect(container).toBeVisible();

    // Close button should be present with accessible label
    const closeButton = container.locator('.native-toast-close').first();
    await expect(closeButton).toBeVisible();
    await expect(closeButton).toHaveAttribute('aria-label', 'Dismiss notification');

    // Click the close button to dismiss
    await closeButton.click();

    // Toast should enter dismissing state and then disappear
    // The container disappears entirely once all toasts are removed
    await expect(container).not.toBeVisible({ timeout: 5000 });
  });

  test('should render toast with a progress bar', async ({ page }) => {
    const section = page.getByTestId(TestIds.NATIVE_NOTIFICATIONS_SECTION);
    await section.scrollIntoViewIfNeeded();

    await page.getByTestId('native-toast-success-btn').click();

    const container = page.getByTestId('native-toast-container');
    await expect(container).toBeVisible();

    // Progress bar should exist in the DOM on non-dismissing toasts
    // (uses toBeAttached since the 3px-tall element may not pass Playwright's visibility heuristics)
    const progressBar = container.locator('.native-toast-progress').first();
    await expect(progressBar).toBeAttached();
  });

  test('should render toast container as a direct child of body (portal)', async ({ page }) => {
    const section = page.getByTestId(TestIds.NATIVE_NOTIFICATIONS_SECTION);
    await section.scrollIntoViewIfNeeded();

    await page.getByTestId('native-toast-success-btn').click();

    const container = page.getByTestId('native-toast-container');
    await expect(container).toBeVisible();

    // Verify the toast container is a direct child of <body> (rendered via portal)
    const isDirectChildOfBody = await container.evaluate((el) =>
      el.parentElement?.tagName === 'BODY'
    );
    expect(isDirectChildOfBody).toBe(true);
  });

  test('should stack multiple toasts when triggering different types', async ({ page }) => {
    const section = page.getByTestId(TestIds.NATIVE_NOTIFICATIONS_SECTION);
    await section.scrollIntoViewIfNeeded();

    // Trigger multiple toasts of different severities
    await page.getByTestId('native-toast-success-btn').click();
    await page.getByTestId('native-toast-warning-btn').click();
    await page.getByTestId('native-toast-error-btn').click();

    const container = page.getByTestId('native-toast-container');
    await expect(container).toBeVisible();

    // All three toasts should be visible and stacked
    const EXPECTED_TOAST_COUNT = 3;
    const toasts = container.locator('.native-toast');
    await expect(toasts).toHaveCount(EXPECTED_TOAST_COUNT);
  });

  test('should add dismissing class when toast is being dismissed', async ({ page }) => {
    const section = page.getByTestId(TestIds.NATIVE_NOTIFICATIONS_SECTION);
    await section.scrollIntoViewIfNeeded();

    await page.getByTestId('native-toast-success-btn').click();

    const container = page.getByTestId('native-toast-container');
    await expect(container).toBeVisible();

    // Click the close button to trigger dismissal animation
    const closeButton = container.locator('.native-toast-close').first();
    await closeButton.click();

    // The toast should briefly get the dismissing class before being removed
    const dismissingToast = container.locator('.native-toast-dismissing');
    await expect(dismissingToast).toBeVisible();
  });

  test('should display toast title and message content', async ({ page }) => {
    const section = page.getByTestId(TestIds.NATIVE_NOTIFICATIONS_SECTION);
    await section.scrollIntoViewIfNeeded();

    await page.getByTestId('native-toast-success-btn').click();

    const container = page.getByTestId('native-toast-container');
    await expect(container).toBeVisible();

    // Toast should have title and message elements
    const title = container.locator('.native-toast-title').first();
    await expect(title).toBeVisible();

    const message = container.locator('.native-toast-message').first();
    await expect(message).toBeVisible();
  });

  test('should display toast icon for each severity', async ({ page }) => {
    const section = page.getByTestId(TestIds.NATIVE_NOTIFICATIONS_SECTION);
    await section.scrollIntoViewIfNeeded();

    await page.getByTestId('native-toast-info-btn').click();

    const container = page.getByTestId('native-toast-container');
    await expect(container).toBeVisible();

    const icon = container.locator('.native-toast-icon').first();
    await expect(icon).toBeVisible();
  });

  test('should remove progress bar when toast enters dismissing state', async ({ page }) => {
    const section = page.getByTestId(TestIds.NATIVE_NOTIFICATIONS_SECTION);
    await section.scrollIntoViewIfNeeded();

    await page.getByTestId('native-toast-success-btn').click();

    const container = page.getByTestId('native-toast-container');
    await expect(container).toBeVisible();

    // Before dismissing, progress bar should exist in the DOM
    await expect(container.locator('.native-toast-progress').first()).toBeAttached();

    // Dismiss the toast
    const closeButton = container.locator('.native-toast-close').first();
    await closeButton.click();

    // During dismissing state, progress bar should be removed
    // (toast.dismissing !== true check in the component)
    const dismissingToast = container.locator('.native-toast-dismissing');
    await expect(dismissingToast).toBeVisible();

    const progressInDismissing = dismissingToast.locator('.native-toast-progress');
    await expect(progressInDismissing).toHaveCount(0);
  });
});
