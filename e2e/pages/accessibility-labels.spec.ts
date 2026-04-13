import { test, expect } from '@playwright/test';

import { injectAuth } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

/**
 * Accessibility Label Verification for Grid, Calendar, and Role Management.
 *
 * Verifies that:
 * - Grid page form inputs have aria-label attributes
 * - Calendar icon-only buttons have aria-label attributes
 * - Role Management permission toggle inputs have aria-label attributes
 */

// ===========================================================================
// Grid Page - Form Input Accessibility Labels
// ===========================================================================

test.describe('Grid Page Accessibility Labels', () => {
  test.beforeEach(async ({ page }) => {
    await injectAuth(page);
    await page.goto('/components/grid/native', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId(TestIds.NATIVE_GRID_SHOWCASE)).toBeVisible({ timeout: 15000 });
  });

  test('should have accessible labels on form inputs in the grid', async ({ page }) => {
    const gridContent = page.getByTestId(TestIds.NATIVE_GRID_SHOWCASE);
    const inputs = gridContent.locator('input:visible, select:visible, textarea:visible');
    const inputCount = await inputs.count();

    if (inputCount > 0) {
      const unlabeledInputs: string[] = [];

      for (let i = 0; i < inputCount; i++) {
        const input = inputs.nth(i);
        const hasAccessibleName = await input.evaluate((el) => {
          if (el.getAttribute('aria-label')) return true;
          if (el.getAttribute('aria-labelledby')) return true;
          if (el.closest('label')) return true;
          const id = el.getAttribute('id');
          if (id && document.querySelector(`label[for="${id}"]`)) return true;
          if (el.getAttribute('title')) return true;
          if (el.getAttribute('placeholder')) return true;
          return false;
        });

        if (!hasAccessibleName) {
          const tagName = await input.evaluate((el) => el.tagName.toLowerCase());
          const type = await input.getAttribute('type') ?? 'text';
          unlabeledInputs.push(`${tagName}[type=${type}]`);
        }
      }

      expect(
        unlabeledInputs.length,
        `All visible inputs should have accessible labels. Unlabeled: ${unlabeledInputs.join(', ')}`,
      ).toBe(0);
    }
  });
});

// ===========================================================================
// Calendar Page - Icon-Only Button Accessibility
// ===========================================================================

test.describe('Calendar Page Accessible Buttons', () => {
  test.beforeEach(async ({ page }) => {
    // Intercept calendar API to avoid real network calls
    await page.route('**/api/calendar/events**', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
      }),
    );
    // Block SignalR to prevent net::ERR_ABORTED during navigation
    await page.route('**/hub/**', (route) => route.abort());
    await page.route('**/negotiate**', (route) => route.abort());
    await injectAuth(page);
    await page.goto('/calendar', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId(TestIds.CALENDAR_PAGE)).toBeVisible({ timeout: 15000 });
  });

  test('should have aria-label on icon-only buttons', async ({ page }) => {
    // Single page.evaluate to check all buttons at once (avoids 170+ round-trips)
    const unlabeledButtons = await page.evaluate(() => {
      const results: string[] = [];
      const buttons = document.querySelectorAll('button');

      for (const el of buttons) {
        // Skip hidden buttons
        if (el.offsetParent === null && getComputedStyle(el).position !== 'fixed') continue;

        // Skip Syncfusion internal buttons
        if (el.closest('[class*="e-schedule"], [class*="e-toolbar"], [class*="e-popup"]')) continue;
        if (el.className.includes('e-')) continue;

        // Check if icon-only
        const text = el.textContent?.trim() ?? '';
        const hasSvg = el.querySelector('svg') !== null;
        const hasIcon = el.querySelector('i, [class*="icon"]') !== null;
        if (!(hasSvg || hasIcon) || text.length >= 3) continue;

        // Check for accessible name
        if (el.getAttribute('aria-label')) continue;
        if (el.getAttribute('aria-labelledby')) continue;
        if (el.getAttribute('title')) continue;
        const sr = el.querySelector('.sr-only, .visually-hidden, [class*="sr-only"]');
        if (sr?.textContent?.trim()) continue;

        results.push(`button[testid="${el.getAttribute('data-testid') ?? 'none'}"]`);
      }
      return results;
    });

    expect(
      unlabeledButtons.length,
      `All icon-only buttons should have aria-label. Unlabeled: ${unlabeledButtons.join(', ')}`,
    ).toBe(0);
  });
});

// ===========================================================================
// Role Management Page - Permission Toggle Accessibility
// ===========================================================================

test.describe('Role Management Accessible Inputs', () => {
  const MOCK_ROLES = [
    { id: 1, name: 'Admin', permissions: ['ViewDashboard', 'ManageUsers', 'ManageRoles'] },
    { id: 2, name: 'Manager', permissions: ['ViewDashboard', 'ViewProducts'] },
    { id: 3, name: 'Viewer', permissions: ['ViewDashboard'] },
  ];

  test.beforeEach(async ({ page }) => {
    await page.route('**/mockapi/api/roles**', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(MOCK_ROLES),
      }),
    );
    await injectAuth(page, 'Admin');
    await page.goto('/admin/role-management', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId(TestIds.ROLE_MANAGEMENT_PAGE)).toBeVisible({ timeout: 15000 });
  });

  test('should have aria-label on permission toggle inputs', async ({ page }) => {
    await expect(page.getByTestId(TestIds.PERMISSIONS_MATRIX_CONTAINER)).toBeVisible({
      timeout: 15000,
    });

    const toggleInputs = page.locator(
      'input[type="checkbox"]:visible, input[role="switch"]:visible, [role="switch"]:visible',
    );
    const toggleCount = await toggleInputs.count();

    if (toggleCount > 0) {
      const unlabeled: string[] = [];

      for (let i = 0; i < toggleCount; i++) {
        const toggle = toggleInputs.nth(i);
        const hasName = await toggle.evaluate((el) => {
          if (el.getAttribute('aria-label')) return true;
          if (el.getAttribute('aria-labelledby')) return true;
          if (el.closest('label')) return true;
          const id = el.getAttribute('id');
          if (id && document.querySelector(`label[for="${id}"]`)) return true;
          if (el.getAttribute('title')) return true;
          return false;
        });

        if (!hasName) {
          const testId = await toggle.getAttribute('data-testid') ?? 'none';
          unlabeled.push(`toggle[testid="${testId}"]`);
        }
      }

      expect(
        unlabeled.length,
        `All toggles should have accessible labels. Unlabeled: ${unlabeled.join(', ')}`,
      ).toBe(0);
    }
  });

  test('should have descriptive aria-labels on permission toggles', async ({ page }) => {
    await expect(page.getByTestId(TestIds.PERMISSIONS_MATRIX_CONTAINER)).toBeVisible({
      timeout: 15000,
    });

    const labeled = page.locator(
      'input[type="checkbox"][aria-label]:visible, [role="switch"][aria-label]:visible',
    );
    const count = await labeled.count();

    for (let i = 0; i < count; i++) {
      const ariaLabel = await labeled.nth(i).getAttribute('aria-label');
      if (ariaLabel) {
        expect(
          ariaLabel.length,
          `aria-label "${ariaLabel}" should be descriptive (more than 3 characters)`,
        ).toBeGreaterThan(3);
      }
    }
  });
});
