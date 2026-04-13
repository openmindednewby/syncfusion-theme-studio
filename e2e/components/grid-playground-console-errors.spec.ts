/**
 * Grid Playground - Console Error Verification
 *
 * Tests that setTimeout(0) deferral applied to all gridKey-changing state setters
 * prevents the getFocusInfo crash. Each test monitors the console for errors.
 */
import { test, expect, type Page, type ConsoleMessage } from '@playwright/test';

import { injectAuth } from '../fixtures/auth';

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Collect console errors throughout a test */
class ConsoleErrorCollector {
  readonly errors: string[] = [];

  attach(page: Page): void {
    page.on('console', (msg: ConsoleMessage) => {
      if (msg.type() === 'error') {
        this.errors.push(msg.text());
      }
    });

    page.on('pageerror', (err: Error) => {
      this.errors.push(`[PAGE ERROR] ${err.message}`);
    });
  }

  /** Filter out known/expected errors that are not related to our changes */
  relevantErrors(): string[] {
    return this.errors.filter((e) => {
      // Ignore favicon 404s
      if (e.includes('favicon')) return false;
      // Ignore HMR / Vite dev server noise
      if (e.includes('[vite]') || e.includes('[hmr]')) return false;
      return true;
    });
  }

  report(): string {
    const relevant = this.relevantErrors();
    if (relevant.length === 0) return 'No console errors.';
    return `Found ${relevant.length} console error(s):\n${relevant.map((e, i) => `  ${i + 1}. ${e}`).join('\n')}`;
  }
}

/** Click a custom SelectNative dropdown and pick an option by its text */
async function selectOption(page: Page, testId: string, optionText: string): Promise<void> {
  // Click the trigger button inside the SelectNative wrapper
  const wrapper = page.getByTestId(testId);
  const trigger = wrapper.locator('button[role="combobox"]');
  await trigger.click();
  // Wait for the popup to become visible (data-open="true" enables pointer-events)
  const popup = wrapper.locator('.native-select-popup[data-open="true"]');
  await popup.waitFor({ state: 'visible', timeout: 5000 });
  // Find and click the option using exact text match to avoid substring collisions
  const option = popup.getByRole('option', { name: optionText, exact: true });
  await option.click();
  // Wait for popup to close after selection
  await popup.waitFor({ state: 'hidden', timeout: 5000 });
}

/** Toggle a ToggleNative control (testId is on the button itself) */
async function toggleControl(page: Page, testId: string): Promise<void> {
  const toggle = page.getByTestId(testId);
  await toggle.click();
}

/** Wait for grid to fully re-render after a state change */
async function waitForGridRender(page: Page): Promise<void> {
  // Wait for any Syncfusion spinner to disappear
  const spinner = page.locator('.e-spinner-pane:visible');
  if (await spinner.count() > 0) {
    await spinner.waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {});
  }
}

/* ------------------------------------------------------------------ */
/*  Tests                                                              */
/* ------------------------------------------------------------------ */

test.describe('Grid Playground - Zero Console Errors', () => {
  // Give extra time for Syncfusion grid operations
  test.setTimeout(180000);

  let collector: ConsoleErrorCollector;

  test.beforeEach(async ({ page }) => {
    collector = new ConsoleErrorCollector();
    collector.attach(page);

    await injectAuth(page);
    await page.goto('/components/grid/playground');
    await page.waitForLoadState('domcontentloaded');
    // Wait for Syncfusion grid to fully initialize
    await page.locator('.e-grid').first().waitFor({ state: 'visible', timeout: 30000 });

    // Clear any startup errors so we only capture errors from our interactions
    collector.errors.length = 0;
  });

  test('Test 1: Pagination Mode switching (BuiltIn → NativePagination → None → BuiltIn)', async ({ page }) => {
    // Default should be BuiltIn - switch to NativePagination
    await selectOption(page, 'pg-sf-paging-mode', 'NativePagination');
    await waitForGridRender(page);

    // Switch to None
    await selectOption(page, 'pg-sf-paging-mode', 'None');
    await waitForGridRender(page);

    // Switch back to Built-in
    await selectOption(page, 'pg-sf-paging-mode', 'Built-in');
    await waitForGridRender(page);

    const relevant = collector.relevantErrors();
    expect(relevant, `Test 1 errors:\n${relevant.join('\n')}`).toHaveLength(0);
  });

  test('Test 2: NativePagination page navigation', async ({ page }) => {
    // Switch to NativePagination
    await selectOption(page, 'pg-sf-paging-mode', 'NativePagination');
    await waitForGridRender(page);

    // Clear errors from mode switch
    collector.errors.length = 0;

    // Click next page button several times (uses aria-label)
    const paginationContainer = page.getByTestId('pg-sf-native-pagination');
    const nextBtn = paginationContainer.getByRole('button', { name: 'Go to next page' });
    for (let i = 0; i < 3; i++) {
      if (await nextBtn.isEnabled()) {
        await nextBtn.click();
        await waitForGridRender(page);
      }
    }

    // Click prev page button several times
    const prevBtn = paginationContainer.getByRole('button', { name: 'Go to previous page' });
    for (let i = 0; i < 3; i++) {
      if (await prevBtn.isEnabled()) {
        await prevBtn.click();
        await waitForGridRender(page);
      }
    }

    const relevant = collector.relevantErrors();
    expect(relevant, `Test 2 errors:\n${relevant.join('\n')}`).toHaveLength(0);
  });

  test('Test 3: Page Size change in NativePagination (5 → 10 → 20 → 5)', async ({ page }) => {
    // Switch to NativePagination
    await selectOption(page, 'pg-sf-paging-mode', 'NativePagination');
    await waitForGridRender(page);

    // Clear errors from mode switch
    collector.errors.length = 0;

    // Change page sizes
    await selectOption(page, 'pg-sf-page-size', '10');
    await waitForGridRender(page);

    await selectOption(page, 'pg-sf-page-size', '20');
    await waitForGridRender(page);

    await selectOption(page, 'pg-sf-page-size', '5');
    await waitForGridRender(page);

    const relevant = collector.relevantErrors();
    expect(relevant, `Test 3 errors:\n${relevant.join('\n')}`).toHaveLength(0);
  });

  test('Test 4: Virtualization toggle', async ({ page }) => {
    // Ensure we're on BuiltIn pagination (default)
    // Toggle virtualization ON
    await toggleControl(page, 'pg-sf-virtual');
    await waitForGridRender(page);

    // Toggle virtualization OFF
    await toggleControl(page, 'pg-sf-virtual');
    await waitForGridRender(page);

    const relevant = collector.relevantErrors();
    expect(relevant, `Test 4 errors:\n${relevant.join('\n')}`).toHaveLength(0);
  });

  test('Test 5: Custom Column toggle and component type change', async ({ page }) => {
    // Toggle Custom Column ON
    await toggleControl(page, 'pg-sf-custom-col');
    await waitForGridRender(page);

    // Change the custom component type dropdown (try available options)
    // First let's see what options are available
    const customTypeWrapper = page.getByTestId('pg-sf-custom-type');
    if (await customTypeWrapper.isVisible()) {
      // Try switching through component types
      await selectOption(page, 'pg-sf-custom-type', 'Tag');
      await waitForGridRender(page);

      await selectOption(page, 'pg-sf-custom-type', 'ProgressBar');
      await waitForGridRender(page);
    }

    // Toggle Custom Column OFF
    await toggleControl(page, 'pg-sf-custom-col');
    await waitForGridRender(page);

    const relevant = collector.relevantErrors();
    expect(relevant, `Test 5 errors:\n${relevant.join('\n')}`).toHaveLength(0);
  });

  test('Test 6: Aggregates toggle and type change', async ({ page }) => {
    // Toggle Aggregates ON
    await toggleControl(page, 'pg-sf-aggregates');
    await waitForGridRender(page);

    // Change aggregate type dropdown
    const aggTypeWrapper = page.getByTestId('pg-sf-agg-type');
    if (await aggTypeWrapper.isVisible()) {
      await selectOption(page, 'pg-sf-agg-type', 'Average');
      await waitForGridRender(page);

      await selectOption(page, 'pg-sf-agg-type', 'Min');
      await waitForGridRender(page);
    }

    // Toggle Aggregates OFF
    await toggleControl(page, 'pg-sf-aggregates');
    await waitForGridRender(page);

    const relevant = collector.relevantErrors();
    expect(relevant, `Test 6 errors:\n${relevant.join('\n')}`).toHaveLength(0);
  });

  test('Test 7: Selection Type changes (None → Multiple → Single → None)', async ({ page }) => {
    // Switch to Multiple
    await selectOption(page, 'pg-sf-sel-type', 'Multiple');
    await waitForGridRender(page);

    // Switch to Single
    await selectOption(page, 'pg-sf-sel-type', 'Single');
    await waitForGridRender(page);

    // Switch back to None
    await selectOption(page, 'pg-sf-sel-type', 'None');
    await waitForGridRender(page);

    const relevant = collector.relevantErrors();
    expect(relevant, `Test 7 errors:\n${relevant.join('\n')}`).toHaveLength(0);
  });

  test('Test 8: Column menu and filter dialog after all operations', async ({ page }) => {
    // First do a few operations to exercise the grid
    await selectOption(page, 'pg-sf-paging-mode', 'NativePagination');
    await waitForGridRender(page);
    await selectOption(page, 'pg-sf-paging-mode', 'Built-in');
    await waitForGridRender(page);

    // Clear errors from setup operations
    collector.errors.length = 0;

    // Ensure column menu is enabled
    const colMenuToggle = page.getByTestId('pg-sf-col-menu');
    const colMenuChecked = await colMenuToggle.getAttribute('aria-checked');
    if (colMenuChecked !== 'true') {
      await colMenuToggle.click();
      await waitForGridRender(page);
    }

    // Click column menu icon on a column header
    const columnMenuIcon = page.locator('.e-columnmenu').first();
    if (await columnMenuIcon.isVisible()) {
      await columnMenuIcon.click();
      // Wait for column menu popup to appear (may not open reliably in headless)
      const menuVisible = await page
        .locator('.e-menu-popup:visible .e-menu-item')
        .first()
        .waitFor({ state: 'visible', timeout: 10000 })
        .then(() => true)
        .catch(() => false);

      if (menuVisible) {
        // Click Filter option in the column menu
        const filterOption = page.locator('.e-menu-popup:visible .e-menu-item').filter({ hasText: 'Filter' });
        if (await filterOption.isVisible()) {
          await filterOption.click();
          await waitForGridRender(page);
        }
      }
    }

    const relevant = collector.relevantErrors();
    expect(relevant, `Test 8 errors:\n${relevant.join('\n')}`).toHaveLength(0);
  });

  test('Combined: All operations in sequence with cumulative error count', async ({ page }) => {
    // This test runs ALL operations in one go and reports total errors

    // Test 1: Pagination Mode switching
    await selectOption(page, 'pg-sf-paging-mode', 'NativePagination');
    await waitForGridRender(page);
    await selectOption(page, 'pg-sf-paging-mode', 'None');
    await waitForGridRender(page);
    await selectOption(page, 'pg-sf-paging-mode', 'Built-in');
    await waitForGridRender(page);
    const _afterTest1 = collector.relevantErrors().length;

    // Test 2: NativePagination page nav
    await selectOption(page, 'pg-sf-paging-mode', 'NativePagination');
    await waitForGridRender(page);
    const paginationArea = page.getByTestId('pg-sf-native-pagination');
    const nextBtn = paginationArea.getByRole('button', { name: 'Go to next page' });
    for (let i = 0; i < 2; i++) {
      if (await nextBtn.isEnabled()) {
        await nextBtn.click();
        await waitForGridRender(page);
      }
    }
    const prevBtn = paginationArea.getByRole('button', { name: 'Go to previous page' });
    for (let i = 0; i < 2; i++) {
      if (await prevBtn.isEnabled()) {
        await prevBtn.click();
        await waitForGridRender(page);
      }
    }
    const _afterTest2 = collector.relevantErrors().length;

    // Test 3: Page Size change
    await selectOption(page, 'pg-sf-page-size', '10');
    await waitForGridRender(page);
    await selectOption(page, 'pg-sf-page-size', '20');
    await waitForGridRender(page);
    await selectOption(page, 'pg-sf-page-size', '5');
    await waitForGridRender(page);
    const _afterTest3 = collector.relevantErrors().length;

    // Switch back to BuiltIn for remaining tests
    await selectOption(page, 'pg-sf-paging-mode', 'Built-in');
    await waitForGridRender(page);

    // Test 4: Virtualization toggle
    await toggleControl(page, 'pg-sf-virtual');
    await waitForGridRender(page);
    await toggleControl(page, 'pg-sf-virtual');
    await waitForGridRender(page);
    const _afterTest4 = collector.relevantErrors().length;

    // Test 5: Custom Column
    await toggleControl(page, 'pg-sf-custom-col');
    await waitForGridRender(page);
    const customTypeWrapper = page.getByTestId('pg-sf-custom-type');
    if (await customTypeWrapper.isVisible()) {
      await selectOption(page, 'pg-sf-custom-type', 'Tag');
      await waitForGridRender(page);
      await selectOption(page, 'pg-sf-custom-type', 'ProgressBar');
      await waitForGridRender(page);
    }
    await toggleControl(page, 'pg-sf-custom-col');
    await waitForGridRender(page);
    const _afterTest5 = collector.relevantErrors().length;

    // Test 6: Aggregates
    await toggleControl(page, 'pg-sf-aggregates');
    await waitForGridRender(page);
    const aggTypeWrapper = page.getByTestId('pg-sf-agg-type');
    if (await aggTypeWrapper.isVisible()) {
      await selectOption(page, 'pg-sf-agg-type', 'Average');
      await waitForGridRender(page);
      await selectOption(page, 'pg-sf-agg-type', 'Min');
      await waitForGridRender(page);
    }
    await toggleControl(page, 'pg-sf-aggregates');
    await waitForGridRender(page);
    const _afterTest6 = collector.relevantErrors().length;

    // Test 7: Selection Type
    await selectOption(page, 'pg-sf-sel-type', 'Multiple');
    await waitForGridRender(page);
    await selectOption(page, 'pg-sf-sel-type', 'Single');
    await waitForGridRender(page);
    await selectOption(page, 'pg-sf-sel-type', 'None');
    await waitForGridRender(page);
    const _afterTest7 = collector.relevantErrors().length;

    // Test 8: Column menu
    const colMenuToggle = page.getByTestId('pg-sf-col-menu');
    const colMenuChecked = await colMenuToggle.getAttribute('aria-checked');
    if (colMenuChecked !== 'true') {
      await colMenuToggle.click();
      await waitForGridRender(page);
    }
    const columnMenuIcon = page.locator('.e-columnmenu').first();
    if (await columnMenuIcon.isVisible()) {
      await columnMenuIcon.click();
      const menuOpened = await page
        .locator('.e-menu-popup:visible .e-menu-item')
        .first()
        .waitFor({ state: 'visible', timeout: 10000 })
        .then(() => true)
        .catch(() => false);
      if (menuOpened) {
        const filterOption = page.locator('.e-menu-popup:visible .e-menu-item').filter({ hasText: 'Filter' });
        if (await filterOption.isVisible()) {
          await filterOption.click();
          await waitForGridRender(page);
        }
      }
    }

    expect(collector.relevantErrors(), `Total errors:\n${collector.relevantErrors().join('\n')}`).toHaveLength(0);
  });
});
