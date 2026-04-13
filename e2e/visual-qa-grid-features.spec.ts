/**
 * Visual QA test for 3 recently implemented grid playground features:
 * 1. useState Import Fix (Selection + NativePagination)
 * 2. Action Button Variants (View=blue, Export=green, Archive=amber)
 * 3. Preset Configurations (Default, BasicReadOnly, SimpleCrud, AdvancedDataTable)
 */
import { expect, test, type Page } from '@playwright/test';

import { injectAuth } from './fixtures/auth';

const NATIVE_GRID_URL = '/components/grid/native';
const SYNCFUSION_PLAYGROUND_URL = '/components/grid/playground';
const SCREENSHOT_DIR = 'visual-qa-screenshots';

/* ---------- HELPERS ---------- */

/** Select an option from a custom SelectNative dropdown by testId and option label text. */
async function selectOption(page: Page, testId: string, optionLabel: string): Promise<void> {
  // Click the trigger button inside the SelectNative wrapper
  const wrapper = page.locator(`[data-testid="${testId}"]`);
  await wrapper.waitFor({ state: 'visible', timeout: 15000 });
  const trigger = wrapper.locator('button').first();
  await trigger.click();
  // Find and click the option with matching text
  const option = page.locator('[role="option"]', { hasText: optionLabel });
  await option.first().click();
}

/** Get current value displayed in a custom SelectNative by testId. */
async function getSelectValue(page: Page, testId: string): Promise<string> {
  const wrapper = page.locator(`[data-testid="${testId}"]`);
  // The hidden input contains the current value
  const hiddenInput = wrapper.locator('input[type="hidden"]');
  return (await hiddenInput.inputValue()) ?? '';
}

/** Get the displayed label text of a custom SelectNative by testId. */
async function getSelectDisplayText(page: Page, testId: string): Promise<string> {
  const wrapper = page.locator(`[data-testid="${testId}"]`);
  const trigger = wrapper.locator('button').first();
  return (await trigger.textContent()) ?? '';
}

/** Toggle a ToggleNative switch by testId. Only clicks if current state != desired state. */
async function setToggle(page: Page, testId: string, desired: boolean): Promise<void> {
  const toggle = page.locator(`[data-testid="${testId}"]`);
  await toggle.waitFor({ state: 'visible', timeout: 15000 });
  const current = (await toggle.getAttribute('aria-checked')) === 'true';
  if (current !== desired) {
    await toggle.click();
  }
}

/** Check if a toggle is checked. */
async function isToggleChecked(page: Page, testId: string): Promise<boolean> {
  const toggle = page.locator(`[data-testid="${testId}"]`);
  return (await toggle.getAttribute('aria-checked')) === 'true';
}

async function scrollToPlayground(page: Page): Promise<void> {
  // Scroll to the interactive playground section
  const heading = page.locator('h2, h3').filter({ hasText: /playground/i }).first();
  if (await heading.isVisible({ timeout: 3000 }).catch(() => false)) {
    await heading.scrollIntoViewIfNeeded();
  }
}

async function getCodeSnippetText(page: Page, testId?: string): Promise<string> {
  const selector = testId
    ? `[data-testid="${testId}"] code`
    : 'pre code, [data-testid*="code"] code, pre';
  const codeBlock = page.locator(selector).first();
  await codeBlock.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
  return (await codeBlock.textContent()) ?? '';
}

/* ================================================================
   NATIVE GRID PLAYGROUND
   ================================================================ */
test.describe('Native Grid Playground', () => {
  test.beforeEach(async ({ page }) => {
    await injectAuth(page);
    await page.goto(NATIVE_GRID_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('load');
    await scrollToPlayground(page);
  });

  /* --- Console & Network Errors --- */
  test('no console errors on Native Grid page', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.goto(NATIVE_GRID_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('load');
    const criticalErrors = errors.filter(
      (e) => !e.includes('favicon') && !e.includes('ERR_CONNECTION_REFUSED'),
    );
    expect(criticalErrors).toEqual([]);
  });

  test('no network errors (4xx/5xx) on Native Grid page', async ({ page }) => {
    const failedRequests: string[] = [];
    page.on('response', (response) => {
      if (response.status() >= 400) failedRequests.push(`${response.status()} ${response.url()}`);
    });
    await page.goto(NATIVE_GRID_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('load');
    const criticalFailures = failedRequests.filter((r) => !r.includes('favicon') && !r.includes('manifest'));
    expect(criticalFailures).toEqual([]);
  });

  /* --- Feature 3: Preset Configurations --- */
  test.describe('Feature 3: Preset Configurations', () => {
    test('preset selector exists and defaults to "default"', async ({ page }) => {
      const presetWrapper = page.locator('[data-testid="pg-native-preset"]');
      await expect(presetWrapper).toBeVisible({ timeout: 15000 });
      await page.screenshot({ path: `${SCREENSHOT_DIR}/native-preset-default.png`, fullPage: false });
      const value = await getSelectValue(page, 'pg-native-preset');
      expect(value).toBe('default');
      const displayText = await getSelectDisplayText(page, 'pg-native-preset');
      expect(displayText).toContain('Default');
    });

    test('Basic Read-Only preset enables filtering+columnMenu, disables actions', async ({ page }) => {
      await selectOption(page, 'pg-native-preset', 'Basic Read-Only');
      await page.screenshot({ path: `${SCREENSHOT_DIR}/native-preset-basic-readonly.png`, fullPage: false });

      expect(await isToggleChecked(page, 'pg-native-filter')).toBe(true);
      expect(await isToggleChecked(page, 'pg-native-col-menu')).toBe(true);
      expect(await isToggleChecked(page, 'pg-native-actions-col')).toBe(false);
    });

    test('Simple CRUD preset enables actions with edit+delete', async ({ page }) => {
      await selectOption(page, 'pg-native-preset', 'Simple CRUD');
      await page.screenshot({ path: `${SCREENSHOT_DIR}/native-preset-simple-crud.png`, fullPage: false });

      expect(await isToggleChecked(page, 'pg-native-actions-col')).toBe(true);
      expect(await isToggleChecked(page, 'pg-native-action-edit')).toBe(true);
      expect(await isToggleChecked(page, 'pg-native-action-delete')).toBe(true);
    });

    test('Advanced Data Table preset enables grouping, aggregates, selection toolbar', async ({ page }) => {
      await selectOption(page, 'pg-native-preset', 'Advanced Data Table');
      await page.screenshot({ path: `${SCREENSHOT_DIR}/native-preset-advanced.png`, fullPage: false });

      expect(await isToggleChecked(page, 'pg-native-group')).toBe(true);
      expect(await isToggleChecked(page, 'pg-native-aggregates')).toBe(true);
      expect(await isToggleChecked(page, 'pg-native-sel-toolbar-toggle')).toBe(true);

      const selValue = await getSelectValue(page, 'pg-native-sel-type');
      expect(selValue).toBe('Multiple');
    });

    test('Default preset resets all values after Advanced Data Table', async ({ page }) => {
      await selectOption(page, 'pg-native-preset', 'Advanced Data Table');
      await selectOption(page, 'pg-native-preset', 'Default');
      await page.screenshot({ path: `${SCREENSHOT_DIR}/native-preset-reset.png`, fullPage: false });

      expect(await isToggleChecked(page, 'pg-native-group')).toBe(false);
      expect(await isToggleChecked(page, 'pg-native-aggregates')).toBe(false);
    });
  });

  /* --- Feature 1: useState Import Fix --- */
  test.describe('Feature 1: useState Import Fix', () => {
    test('Selection=Single code snippet includes useState import', async ({ page }) => {
      await selectOption(page, 'pg-native-sel-type', 'Single');

      const codeText = await getCodeSnippetText(page, 'pg-native-code');
      await page.screenshot({ path: `${SCREENSHOT_DIR}/native-usestate-sel-single.png`, fullPage: false });
      expect(codeText).toContain("import { useState } from 'react'");
    });

    test('Selection=Multiple code snippet includes useState import', async ({ page }) => {
      await selectOption(page, 'pg-native-sel-type', 'Multiple');

      const codeText = await getCodeSnippetText(page, 'pg-native-code');
      await page.screenshot({ path: `${SCREENSHOT_DIR}/native-usestate-sel-multiple.png`, fullPage: false });
      expect(codeText).toContain("import { useState } from 'react'");
    });

    test('PaginationMode=NativePagination code snippet includes useState import', async ({ page }) => {
      await selectOption(page, 'pg-native-paging-mode', 'NativePagination');

      const codeText = await getCodeSnippetText(page, 'pg-native-code');
      await page.screenshot({ path: `${SCREENSHOT_DIR}/native-usestate-native-paging.png`, fullPage: false });
      expect(codeText).toContain("import { useState } from 'react'");
    });
  });

  /* --- Feature 2: Action Button Variants --- */
  test.describe('Feature 2: Action Button Variants', () => {
    test('View/Export/Archive/Delete/Edit buttons have correct variant classes and colors', async ({ page }) => {
      // Enable actions column
      await setToggle(page, 'pg-native-actions-col', true);

      // Enable View, Export, Archive
      await setToggle(page, 'pg-native-action-view', true);
      await setToggle(page, 'pg-native-action-export', true);
      await setToggle(page, 'pg-native-action-archive', true);

      await page.screenshot({ path: `${SCREENSHOT_DIR}/native-action-buttons-all.png`, fullPage: false });

      // View = blue (native-grid-btn-view class applied, color is blue-range)
      const viewBtn = page.locator('[data-testid="pg-action-view-btn"]').first();
      await expect(viewBtn).toBeVisible();
      await expect(viewBtn).toHaveClass(/native-grid-btn-view/);
      const viewColor = await viewBtn.evaluate((el) => {
        const c = getComputedStyle(el).color;
        const m = c.match(/rgb\(\s*(\d+),\s*(\d+),\s*(\d+)\s*\)/);
        if (!m) return { r: 0, g: 0, b: 0 };
        return { r: Number(m[1]), g: Number(m[2]), b: Number(m[3]) };
      });
      // Blue range: blue channel dominant (>150), red low-to-mid (<150)
      expect(viewColor.b).toBeGreaterThan(150);
      expect(viewColor.r).toBeLessThan(150);

      // Export = green (native-grid-btn-export class applied, color is green-range)
      const exportBtn = page.locator('[data-testid="pg-action-export-btn"]').first();
      await expect(exportBtn).toBeVisible();
      await expect(exportBtn).toHaveClass(/native-grid-btn-export/);
      const exportColor = await exportBtn.evaluate((el) => {
        const c = getComputedStyle(el).color;
        const m = c.match(/rgb\(\s*(\d+),\s*(\d+),\s*(\d+)\s*\)/);
        if (!m) return { r: 0, g: 0, b: 0 };
        return { r: Number(m[1]), g: Number(m[2]), b: Number(m[3]) };
      });
      // Green range: green channel dominant (>100), red low (<100)
      expect(exportColor.g).toBeGreaterThan(100);
      expect(exportColor.r).toBeLessThan(100);

      // Archive = amber (native-grid-btn-archive class applied, color is amber/orange-range)
      const archiveBtn = page.locator('[data-testid="pg-action-archive-btn"]').first();
      await expect(archiveBtn).toBeVisible();
      await expect(archiveBtn).toHaveClass(/native-grid-btn-archive/);
      const archiveColor = await archiveBtn.evaluate((el) => {
        const c = getComputedStyle(el).color;
        const m = c.match(/rgb\(\s*(\d+),\s*(\d+),\s*(\d+)\s*\)/);
        if (!m) return { r: 0, g: 0, b: 0 };
        return { r: Number(m[1]), g: Number(m[2]), b: Number(m[3]) };
      });
      // Amber range: red > green > blue, red high (>100)
      expect(archiveColor.r).toBeGreaterThan(100);
      expect(archiveColor.r).toBeGreaterThan(archiveColor.b);

      // Delete = red (native-grid-btn-delete class applied)
      const deleteBtn = page.locator('[data-testid="pg-action-delete"]').first();
      await expect(deleteBtn).toBeVisible();
      await expect(deleteBtn).toHaveClass(/native-grid-btn-delete/);

      // Edit = default (only base class, no variant)
      const editBtn = page.locator('[data-testid="pg-action-edit"]').first();
      await expect(editBtn).toBeVisible();
      await expect(editBtn).toHaveClass(/native-grid-btn/);
      const editClass = await editBtn.getAttribute('class') ?? '';
      expect(editClass).not.toContain('native-grid-btn-delete');
      expect(editClass).not.toContain('native-grid-btn-view');
      expect(editClass).not.toContain('native-grid-btn-export');
      expect(editClass).not.toContain('native-grid-btn-archive');

      // Zoomed screenshot of action buttons area
      const actionsCell = page.locator('.flex.items-center.justify-center.gap-1').first();
      if (await actionsCell.isVisible()) {
        await actionsCell.screenshot({ path: `${SCREENSHOT_DIR}/native-action-buttons-zoomed.png` });
      }
    });
  });
});

/* ================================================================
   SYNCFUSION GRID PLAYGROUND
   ================================================================ */
test.describe('Syncfusion Grid Playground', () => {
  test.beforeEach(async ({ page }) => {
    await injectAuth(page);
    await page.goto(SYNCFUSION_PLAYGROUND_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('load');
  });

  /* --- Console & Network Errors --- */
  test('no console errors on Syncfusion Playground page', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.goto(SYNCFUSION_PLAYGROUND_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('load');
    const criticalErrors = errors.filter(
      (e) => !e.includes('favicon') && !e.includes('ERR_CONNECTION_REFUSED'),
    );
    expect(criticalErrors).toEqual([]);
  });

  test('no network errors (4xx/5xx) on Syncfusion Playground page', async ({ page }) => {
    const failedRequests: string[] = [];
    page.on('response', (response) => {
      if (response.status() >= 400) failedRequests.push(`${response.status()} ${response.url()}`);
    });
    await page.goto(SYNCFUSION_PLAYGROUND_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('load');
    const criticalFailures = failedRequests.filter((r) => !r.includes('favicon') && !r.includes('manifest'));
    expect(criticalFailures).toEqual([]);
  });

  /* --- Feature 3: Preset Configurations --- */
  test.describe('Feature 3: Preset Configurations', () => {
    test('preset selector exists and defaults to "default"', async ({ page }) => {
      const presetWrapper = page.locator('[data-testid="pg-sf-preset"]');
      await expect(presetWrapper).toBeVisible();
      await page.screenshot({ path: `${SCREENSHOT_DIR}/sf-preset-default.png`, fullPage: false });
      const value = await getSelectValue(page, 'pg-sf-preset');
      expect(value).toBe('default');
      const displayText = await getSelectDisplayText(page, 'pg-sf-preset');
      expect(displayText).toContain('Default');
    });

    test('Basic Read-Only preset enables sorting+filtering, disables actions', async ({ page }) => {
      await selectOption(page, 'pg-sf-preset', 'Basic Read-Only');
      await page.screenshot({ path: `${SCREENSHOT_DIR}/sf-preset-basic-readonly.png`, fullPage: false });

      expect(await isToggleChecked(page, 'pg-sf-sorting')).toBe(true);
      expect(await isToggleChecked(page, 'pg-sf-filtering')).toBe(true);
      expect(await isToggleChecked(page, 'pg-sf-col-menu')).toBe(true);
      expect(await isToggleChecked(page, 'pg-sf-actions-col')).toBe(false);
    });

    test('Simple CRUD preset enables actions with edit+delete', async ({ page }) => {
      await selectOption(page, 'pg-sf-preset', 'Simple CRUD');
      await page.screenshot({ path: `${SCREENSHOT_DIR}/sf-preset-simple-crud.png`, fullPage: false });

      expect(await isToggleChecked(page, 'pg-sf-actions-col')).toBe(true);
      expect(await isToggleChecked(page, 'pg-sf-action-edit')).toBe(true);
      expect(await isToggleChecked(page, 'pg-sf-action-delete')).toBe(true);
    });

    test('Advanced Data Table preset enables grouping, aggregates, selection toolbar', async ({ page }) => {
      await selectOption(page, 'pg-sf-preset', 'Advanced Data Table');
      await page.screenshot({ path: `${SCREENSHOT_DIR}/sf-preset-advanced.png`, fullPage: false });

      expect(await isToggleChecked(page, 'pg-sf-grouping')).toBe(true);
      expect(await isToggleChecked(page, 'pg-sf-aggregates')).toBe(true);
      expect(await isToggleChecked(page, 'pg-sf-sel-toolbar-toggle')).toBe(true);

      const selValue = await getSelectValue(page, 'pg-sf-sel-type');
      expect(selValue).toBe('Multiple');
    });

    test('Default preset resets all values after Advanced Data Table', async ({ page }) => {
      await selectOption(page, 'pg-sf-preset', 'Advanced Data Table');
      await selectOption(page, 'pg-sf-preset', 'Default');
      await page.screenshot({ path: `${SCREENSHOT_DIR}/sf-preset-reset.png`, fullPage: false });

      expect(await isToggleChecked(page, 'pg-sf-grouping')).toBe(false);
      expect(await isToggleChecked(page, 'pg-sf-aggregates')).toBe(false);
    });
  });

  /* --- Feature 1: useState Import Fix --- */
  test.describe('Feature 1: useState Import Fix', () => {
    test('Selection=Single code snippet includes useState import', async ({ page }) => {
      await selectOption(page, 'pg-sf-sel-type', 'Single');

      const codeText = await getCodeSnippetText(page, 'pg-sf-code');
      await page.screenshot({ path: `${SCREENSHOT_DIR}/sf-usestate-sel-single.png`, fullPage: false });
      expect(codeText).toContain("import { useState } from 'react'");
    });

    test('Selection=Multiple code snippet includes useState import', async ({ page }) => {
      await selectOption(page, 'pg-sf-sel-type', 'Multiple');

      const codeText = await getCodeSnippetText(page, 'pg-sf-code');
      await page.screenshot({ path: `${SCREENSHOT_DIR}/sf-usestate-sel-multiple.png`, fullPage: false });
      expect(codeText).toContain("import { useState } from 'react'");
    });

    test('PaginationMode=NativePagination code snippet includes useState import', async ({ page }) => {
      await selectOption(page, 'pg-sf-paging-mode', 'NativePagination');

      const codeText = await getCodeSnippetText(page, 'pg-sf-code');
      await page.screenshot({ path: `${SCREENSHOT_DIR}/sf-usestate-native-paging.png`, fullPage: false });
      expect(codeText).toContain("import { useState } from 'react'");
    });
  });

  /* --- Feature 2: Action Button Variants --- */
  test.describe('Feature 2: Action Button Variants', () => {
    test('View/Export/Archive/Delete/Edit buttons have correct variant classes and colors', async ({ page }) => {
      // Enable actions column
      await setToggle(page, 'pg-sf-actions-col', true);

      // Enable View, Export, Archive
      await setToggle(page, 'pg-sf-action-view', true);
      await setToggle(page, 'pg-sf-action-export', true);
      await setToggle(page, 'pg-sf-action-archive', true);

      await page.screenshot({ path: `${SCREENSHOT_DIR}/sf-action-buttons-all.png`, fullPage: false });

      // View = blue (native-grid-btn-view class applied, color is blue-range)
      const viewBtn = page.locator('[data-testid="pg-action-view-btn"]').first();
      await expect(viewBtn).toBeVisible();
      await expect(viewBtn).toHaveClass(/native-grid-btn-view/);
      const viewColor = await viewBtn.evaluate((el) => {
        const c = getComputedStyle(el).color;
        const m = c.match(/rgb\(\s*(\d+),\s*(\d+),\s*(\d+)\s*\)/);
        if (!m) return { r: 0, g: 0, b: 0 };
        return { r: Number(m[1]), g: Number(m[2]), b: Number(m[3]) };
      });
      expect(viewColor.b).toBeGreaterThan(150);
      expect(viewColor.r).toBeLessThan(150);

      // Export = green (native-grid-btn-export class applied, color is green-range)
      const exportBtn = page.locator('[data-testid="pg-action-export-btn"]').first();
      await expect(exportBtn).toBeVisible();
      await expect(exportBtn).toHaveClass(/native-grid-btn-export/);
      const exportColor = await exportBtn.evaluate((el) => {
        const c = getComputedStyle(el).color;
        const m = c.match(/rgb\(\s*(\d+),\s*(\d+),\s*(\d+)\s*\)/);
        if (!m) return { r: 0, g: 0, b: 0 };
        return { r: Number(m[1]), g: Number(m[2]), b: Number(m[3]) };
      });
      expect(exportColor.g).toBeGreaterThan(100);
      expect(exportColor.r).toBeLessThan(100);

      // Archive = amber (native-grid-btn-archive class applied, color is amber-range)
      const archiveBtn = page.locator('[data-testid="pg-action-archive-btn"]').first();
      await expect(archiveBtn).toBeVisible();
      await expect(archiveBtn).toHaveClass(/native-grid-btn-archive/);
      const archiveColor = await archiveBtn.evaluate((el) => {
        const c = getComputedStyle(el).color;
        const m = c.match(/rgb\(\s*(\d+),\s*(\d+),\s*(\d+)\s*\)/);
        if (!m) return { r: 0, g: 0, b: 0 };
        return { r: Number(m[1]), g: Number(m[2]), b: Number(m[3]) };
      });
      expect(archiveColor.r).toBeGreaterThan(100);
      expect(archiveColor.r).toBeGreaterThan(archiveColor.b);

      // Delete = red (native-grid-btn-delete class applied)
      const deleteBtn = page.locator('[data-testid="pg-action-delete"]').first();
      await expect(deleteBtn).toBeVisible();
      await expect(deleteBtn).toHaveClass(/native-grid-btn-delete/);

      // Edit = default (only base class, no variant)
      const editBtn = page.locator('[data-testid="pg-action-edit"]').first();
      await expect(editBtn).toBeVisible();
      await expect(editBtn).toHaveClass(/native-grid-btn/);
      const editClass = await editBtn.getAttribute('class') ?? '';
      expect(editClass).not.toContain('native-grid-btn-delete');
      expect(editClass).not.toContain('native-grid-btn-view');
      expect(editClass).not.toContain('native-grid-btn-export');
      expect(editClass).not.toContain('native-grid-btn-archive');

      // Zoomed screenshot
      const actionsCell = page.locator('.flex.items-center.justify-center.gap-1').first();
      if (await actionsCell.isVisible()) {
        await actionsCell.screenshot({ path: `${SCREENSHOT_DIR}/sf-action-buttons-zoomed.png` });
      }
    });
  });
});
