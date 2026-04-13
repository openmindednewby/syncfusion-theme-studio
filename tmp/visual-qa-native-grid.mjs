/**
 * Visual QA Test: Native Grid Interactive Playground
 * Tests all preset configurations, action button colors, selection code snippets,
 * and monitors console errors throughout all interactions.
 */
import { chromium } from 'playwright';
import { mkdirSync, existsSync, writeFileSync } from 'fs';
import { join } from 'path';

const BASE_URL = 'http://localhost:4444';
const NATIVE_GRID_URL = `${BASE_URL}/components/grid/native`;
const SCREENSHOT_DIR = 'C:/desktopContents/projects/SaaS/SyncfusionThemeStudio/tmp/qa-screenshots';

if (!existsSync(SCREENSHOT_DIR)) mkdirSync(SCREENSHOT_DIR, { recursive: true });

const issues = [];
let issueCounter = 0;
const consoleErrors = [];
const consoleWarnings = [];
const networkErrors = [];

function addIssue(severity, page, category, description, evidence = '') {
  issueCounter++;
  issues.push({ id: issueCounter, severity, page, category, description, evidence });
  console.log(`  [ISSUE #${issueCounter}] [${severity}] ${category}: ${description}`);
}

async function screenshot(page, name) {
  const path = join(SCREENSHOT_DIR, `${name}.png`);
  await page.screenshot({ path, fullPage: false });
  console.log(`  Screenshot: ${name}.png`);
  return path;
}

async function scrollToPlayground(page) {
  const playgroundSection = page.locator('[data-testid="native-grid-playground"]');
  if (await playgroundSection.count() > 0) {
    await playgroundSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
  }
}

/**
 * Select a value from a custom SelectNative dropdown.
 * The dropdown uses button[role="combobox"] as trigger and div[role="option"] items.
 */
async function selectDropdownValue(page, testId, targetLabel) {
  // Click the trigger button inside the testId container
  const container = page.locator(`[data-testid="${testId}"]`);
  const trigger = container.locator('button[role="combobox"]');

  if (await trigger.count() === 0) {
    console.log(`  WARNING: Select trigger not found for ${testId}`);
    return false;
  }

  await trigger.click();
  await page.waitForTimeout(200);

  // Find and click the option with matching text
  const popup = container.locator('.native-select-popup[data-open="true"]');
  if (await popup.count() === 0) {
    console.log(`  WARNING: Popup not opened for ${testId}`);
    return false;
  }

  const option = popup.locator(`div[role="option"]`).filter({ hasText: targetLabel });
  if (await option.count() === 0) {
    // Try exact match
    const allOptions = popup.locator('div[role="option"]');
    const count = await allOptions.count();
    console.log(`  WARNING: Option "${targetLabel}" not found in ${testId}. Available options (${count}):`);
    for (let i = 0; i < count; i++) {
      const text = await allOptions.nth(i).textContent();
      console.log(`    - "${text}"`);
    }
    // Close the popup by clicking trigger again
    await trigger.click();
    await page.waitForTimeout(100);
    return false;
  }

  await option.first().click();
  await page.waitForTimeout(300);
  return true;
}

/**
 * Get the current selected text from a SelectNative dropdown.
 */
async function getSelectedText(page, testId) {
  const container = page.locator(`[data-testid="${testId}"]`);
  const trigger = container.locator('button[role="combobox"]');
  if (await trigger.count() === 0) return null;
  // The trigger has a span.truncate child with the selected text
  const text = await trigger.locator('span.truncate').textContent();
  return text?.trim() || null;
}

/**
 * Check if a toggle switch is checked.
 * ToggleNative renders as button[role="switch"][aria-checked].
 */
async function isToggleChecked(page, testId) {
  const toggle = page.locator(`[data-testid="${testId}"]`);
  if (await toggle.count() === 0) return null;
  const ariaChecked = await toggle.getAttribute('aria-checked');
  return ariaChecked === 'true';
}

/**
 * Set a toggle to a desired state.
 */
async function setToggle(page, testId, desired) {
  const current = await isToggleChecked(page, testId);
  if (current === null) {
    console.log(`  Warning: Toggle ${testId} not found`);
    return;
  }
  if (current !== desired) {
    await page.locator(`[data-testid="${testId}"]`).click();
    await page.waitForTimeout(300);
  }
}

async function getCodeSnippetText(page) {
  const codeEl = page.locator('[data-testid="pg-native-code"]');
  if (await codeEl.count() === 0) return '';
  return await codeEl.textContent();
}

async function main() {
  console.log('=== Native Grid Interactive Playground - Visual QA ===\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();

  // Collect console messages
  page.on('console', (msg) => {
    const text = msg.text();
    if (msg.type() === 'error') {
      consoleErrors.push({ url: page.url(), text, timestamp: new Date().toISOString() });
    }
    if (msg.type() === 'warning' || text.includes('Warning') || text.includes('deprecated') || text.includes('Deprecated')) {
      consoleWarnings.push({ url: page.url(), text, timestamp: new Date().toISOString() });
    }
  });

  // Collect network errors
  page.on('response', (response) => {
    if (response.status() >= 400) {
      networkErrors.push({ url: response.url(), status: response.status(), pageUrl: page.url() });
    }
  });

  // ==========================================
  // TEST 1: Navigate to page and verify load
  // ==========================================
  console.log('--- Test 1: Navigate to Native Grid page ---');
  try {
    await page.goto(NATIVE_GRID_URL, { waitUntil: 'networkidle', timeout: 30000 });
    console.log('  Page loaded successfully');
    await screenshot(page, '01-page-loaded');
  } catch (e) {
    addIssue('CRITICAL', '/components/grid/native', 'Functional', `Page failed to load: ${e.message}`);
    await browser.close();
    return printReport();
  }

  // Wait for content to render
  await page.waitForTimeout(2000);

  // Check if playground section exists
  const playgroundExists = await page.locator('[data-testid="native-grid-playground"]').count() > 0;
  if (!playgroundExists) {
    addIssue('CRITICAL', '/components/grid/native', 'Functional', 'Interactive Playground section not found on page');
    await screenshot(page, '01b-playground-missing');
    await browser.close();
    return printReport();
  }
  console.log('  Interactive Playground section found');

  // Scroll to playground
  await scrollToPlayground(page);
  await page.waitForTimeout(500);
  await screenshot(page, '02-playground-initial');

  // ==========================================
  // TEST 2: Test all preset configurations
  // ==========================================
  console.log('\n--- Test 2: Test Preset Configurations ---');

  // 2a: Verify Default preset is selected initially
  console.log('\n  2a: Testing Default preset (initial state)');
  let presetText = await getSelectedText(page, 'pg-native-preset');
  console.log(`  Current preset: "${presetText}"`);

  // Verify Default state controls
  let striped = await isToggleChecked(page, 'pg-native-striped');
  let hoverable = await isToggleChecked(page, 'pg-native-hoverable');
  let compact = await isToggleChecked(page, 'pg-native-compact');
  let filterEnabled = await isToggleChecked(page, 'pg-native-filter');
  let actionsColumn = await isToggleChecked(page, 'pg-native-actions-col');
  let groupEnabled = await isToggleChecked(page, 'pg-native-group');
  let columnMenu = await isToggleChecked(page, 'pg-native-col-menu');
  let selTypeText = await getSelectedText(page, 'pg-native-sel-type');

  console.log(`  Default state: striped=${striped}, hoverable=${hoverable}, compact=${compact}, filter=${filterEnabled}, actions=${actionsColumn}, group=${groupEnabled}, colMenu=${columnMenu}, selType="${selTypeText}"`);

  if (striped !== true) addIssue('MEDIUM', '/components/grid/native', 'Functional', `Default preset: striped should be true, got ${striped}`);
  if (hoverable !== true) addIssue('MEDIUM', '/components/grid/native', 'Functional', `Default preset: hoverable should be true, got ${hoverable}`);
  if (compact !== false) addIssue('MEDIUM', '/components/grid/native', 'Functional', `Default preset: compact should be false, got ${compact}`);
  if (filterEnabled !== false) addIssue('MEDIUM', '/components/grid/native', 'Functional', `Default preset: filterEnabled should be false, got ${filterEnabled}`);
  if (actionsColumn !== false) addIssue('MEDIUM', '/components/grid/native', 'Functional', `Default preset: actionsColumn should be false, got ${actionsColumn}`);
  if (groupEnabled !== false) addIssue('MEDIUM', '/components/grid/native', 'Functional', `Default preset: groupEnabled should be false, got ${groupEnabled}`);

  await screenshot(page, '03-preset-default');

  // 2b: Basic Read-Only preset
  console.log('\n  2b: Testing Basic Read-Only preset');
  await scrollToPlayground(page);
  const presetSelected = await selectDropdownValue(page, 'pg-native-preset', 'Basic Read-Only');
  if (!presetSelected) {
    // Try alternate label
    await selectDropdownValue(page, 'pg-native-preset', 'basicReadOnly');
  }
  await page.waitForTimeout(500);
  await scrollToPlayground(page);

  filterEnabled = await isToggleChecked(page, 'pg-native-filter');
  columnMenu = await isToggleChecked(page, 'pg-native-col-menu');
  actionsColumn = await isToggleChecked(page, 'pg-native-actions-col');
  selTypeText = await getSelectedText(page, 'pg-native-sel-type');
  striped = await isToggleChecked(page, 'pg-native-striped');
  hoverable = await isToggleChecked(page, 'pg-native-hoverable');

  console.log(`  BasicReadOnly state: filter=${filterEnabled}, colMenu=${columnMenu}, actions=${actionsColumn}, selType="${selTypeText}", striped=${striped}, hoverable=${hoverable}`);

  if (filterEnabled !== true) addIssue('MEDIUM', '/components/grid/native', 'Functional', `BasicReadOnly preset: filterEnabled should be true, got ${filterEnabled}`);
  if (columnMenu !== true) addIssue('MEDIUM', '/components/grid/native', 'Functional', `BasicReadOnly preset: columnMenu should be true, got ${columnMenu}`);
  if (actionsColumn !== false) addIssue('MEDIUM', '/components/grid/native', 'Functional', `BasicReadOnly preset: actionsColumn should be false, got ${actionsColumn}`);

  await screenshot(page, '04-preset-basic-readonly');

  // 2c: Simple CRUD preset
  console.log('\n  2c: Testing Simple CRUD preset');
  await scrollToPlayground(page);
  await selectDropdownValue(page, 'pg-native-preset', 'Simple CRUD');
  await page.waitForTimeout(500);
  await scrollToPlayground(page);

  filterEnabled = await isToggleChecked(page, 'pg-native-filter');
  actionsColumn = await isToggleChecked(page, 'pg-native-actions-col');

  console.log(`  SimpleCrud initial state: filter=${filterEnabled}, actions=${actionsColumn}`);

  if (filterEnabled !== true) addIssue('MEDIUM', '/components/grid/native', 'Functional', `SimpleCrud preset: filterEnabled should be true, got ${filterEnabled}`);
  if (actionsColumn !== true) addIssue('HIGH', '/components/grid/native', 'Functional', `SimpleCrud preset: actionsColumn should be true, got ${actionsColumn}`);

  // If actions column is enabled, check action toggles
  if (actionsColumn === true) {
    let actionEdit = await isToggleChecked(page, 'pg-native-action-edit');
    let actionDelete = await isToggleChecked(page, 'pg-native-action-delete');
    let actionKebab = await isToggleChecked(page, 'pg-native-action-kebab');
    let actionView = await isToggleChecked(page, 'pg-native-action-view');
    let actionExport = await isToggleChecked(page, 'pg-native-action-export');
    let actionArchive = await isToggleChecked(page, 'pg-native-action-archive');

    console.log(`  SimpleCrud actions: edit=${actionEdit}, delete=${actionDelete}, kebab=${actionKebab}, view=${actionView}, export=${actionExport}, archive=${actionArchive}`);

    if (actionEdit !== true) addIssue('MEDIUM', '/components/grid/native', 'Functional', `SimpleCrud preset: actionEdit should be true, got ${actionEdit}`);
    if (actionDelete !== true) addIssue('MEDIUM', '/components/grid/native', 'Functional', `SimpleCrud preset: actionDelete should be true, got ${actionDelete}`);
    if (actionKebab !== false) addIssue('MEDIUM', '/components/grid/native', 'Functional', `SimpleCrud preset: actionKebab should be false, got ${actionKebab}`);
    if (actionView !== false) addIssue('MEDIUM', '/components/grid/native', 'Functional', `SimpleCrud preset: actionView should be false, got ${actionView}`);
    if (actionExport !== false) addIssue('MEDIUM', '/components/grid/native', 'Functional', `SimpleCrud preset: actionExport should be false, got ${actionExport}`);
    if (actionArchive !== false) addIssue('MEDIUM', '/components/grid/native', 'Functional', `SimpleCrud preset: actionArchive should be false, got ${actionArchive}`);
  }

  await screenshot(page, '05-preset-simple-crud');

  // 2d: Advanced Data Table preset
  console.log('\n  2d: Testing Advanced Data Table preset');
  await scrollToPlayground(page);
  await selectDropdownValue(page, 'pg-native-preset', 'Advanced Data Table');
  await page.waitForTimeout(500);
  await scrollToPlayground(page);

  groupEnabled = await isToggleChecked(page, 'pg-native-group');
  let aggregatesEnabled = await isToggleChecked(page, 'pg-native-aggregates');
  columnMenu = await isToggleChecked(page, 'pg-native-col-menu');
  selTypeText = await getSelectedText(page, 'pg-native-sel-type');
  filterEnabled = await isToggleChecked(page, 'pg-native-filter');

  console.log(`  AdvancedDataTable state: group=${groupEnabled}, aggregates=${aggregatesEnabled}, colMenu=${columnMenu}, selType="${selTypeText}", filter=${filterEnabled}`);

  if (groupEnabled !== true) addIssue('MEDIUM', '/components/grid/native', 'Functional', `AdvancedDataTable preset: groupEnabled should be true, got ${groupEnabled}`);
  if (aggregatesEnabled !== true) addIssue('MEDIUM', '/components/grid/native', 'Functional', `AdvancedDataTable preset: aggregatesEnabled should be true, got ${aggregatesEnabled}`);
  if (columnMenu !== true) addIssue('MEDIUM', '/components/grid/native', 'Functional', `AdvancedDataTable preset: columnMenu should be true, got ${columnMenu}`);
  if (filterEnabled !== true) addIssue('MEDIUM', '/components/grid/native', 'Functional', `AdvancedDataTable preset: filterEnabled should be true, got ${filterEnabled}`);

  // Check selection toolbar toggle (should appear when selection is not None)
  let selToolbar = await isToggleChecked(page, 'pg-native-sel-toolbar-toggle');
  console.log(`  AdvancedDataTable: selToolbar=${selToolbar}`);
  if (selToolbar !== true) addIssue('MEDIUM', '/components/grid/native', 'Functional', `AdvancedDataTable preset: selectionToolbar should be true, got ${selToolbar}`);

  await screenshot(page, '06-preset-advanced-data-table');

  // 2e: Switch back to Default and verify reset
  console.log('\n  2e: Switching back to Default preset');
  await scrollToPlayground(page);
  await selectDropdownValue(page, 'pg-native-preset', 'Default');
  await page.waitForTimeout(500);
  await scrollToPlayground(page);

  striped = await isToggleChecked(page, 'pg-native-striped');
  hoverable = await isToggleChecked(page, 'pg-native-hoverable');
  compact = await isToggleChecked(page, 'pg-native-compact');
  filterEnabled = await isToggleChecked(page, 'pg-native-filter');
  actionsColumn = await isToggleChecked(page, 'pg-native-actions-col');
  groupEnabled = await isToggleChecked(page, 'pg-native-group');
  columnMenu = await isToggleChecked(page, 'pg-native-col-menu');
  selTypeText = await getSelectedText(page, 'pg-native-sel-type');
  aggregatesEnabled = await isToggleChecked(page, 'pg-native-aggregates');

  console.log(`  Reset to Default: striped=${striped}, hoverable=${hoverable}, compact=${compact}, filter=${filterEnabled}, actions=${actionsColumn}, group=${groupEnabled}, colMenu=${columnMenu}, selType="${selTypeText}", aggregates=${aggregatesEnabled}`);

  if (striped !== true) addIssue('HIGH', '/components/grid/native', 'Functional', `Reset to Default: striped should be true, got ${striped}`);
  if (hoverable !== true) addIssue('HIGH', '/components/grid/native', 'Functional', `Reset to Default: hoverable should be true, got ${hoverable}`);
  if (compact !== false) addIssue('HIGH', '/components/grid/native', 'Functional', `Reset to Default: compact should be false, got ${compact}`);
  if (filterEnabled !== false) addIssue('HIGH', '/components/grid/native', 'Functional', `Reset to Default: filterEnabled should be false, got ${filterEnabled}`);
  if (actionsColumn !== false) addIssue('HIGH', '/components/grid/native', 'Functional', `Reset to Default: actionsColumn should be false, got ${actionsColumn}`);
  if (groupEnabled !== false) addIssue('HIGH', '/components/grid/native', 'Functional', `Reset to Default: groupEnabled should be false, got ${groupEnabled}`);
  if (columnMenu !== false) addIssue('HIGH', '/components/grid/native', 'Functional', `Reset to Default: columnMenu should be false, got ${columnMenu}`);
  if (aggregatesEnabled !== false) addIssue('HIGH', '/components/grid/native', 'Functional', `Reset to Default: aggregatesEnabled should be false, got ${aggregatesEnabled}`);

  await screenshot(page, '07-preset-default-reset');

  // ==========================================
  // TEST 3: Action button colors
  // ==========================================
  console.log('\n--- Test 3: Action Button Colors ---');

  // Enable actions column with all action types
  await setToggle(page, 'pg-native-actions-col', true);
  await page.waitForTimeout(300);

  // Now action sub-toggles should be visible
  await setToggle(page, 'pg-native-action-edit', true);
  await page.waitForTimeout(200);
  await setToggle(page, 'pg-native-action-delete', true);
  await page.waitForTimeout(200);
  await setToggle(page, 'pg-native-action-view', true);
  await page.waitForTimeout(200);
  await setToggle(page, 'pg-native-action-export', true);
  await page.waitForTimeout(200);
  await setToggle(page, 'pg-native-action-archive', true);
  await page.waitForTimeout(500);

  // Scroll to see the table with action buttons
  const tableEl = page.locator('[data-testid="pg-native-table"]');
  if (await tableEl.count() > 0) {
    await tableEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
  }

  await screenshot(page, '08-actions-all-enabled');

  // Check action button existence
  const editBtn = page.locator('[data-testid="pg-action-edit"]').first();
  const deleteBtn = page.locator('[data-testid="pg-action-delete"]').first();
  const viewBtn = page.locator('[data-testid="pg-action-view-btn"]').first();
  const exportBtn = page.locator('[data-testid="pg-action-export-btn"]').first();
  const archiveBtn = page.locator('[data-testid="pg-action-archive-btn"]').first();

  const editExists = await editBtn.count() > 0;
  const deleteExists = await deleteBtn.count() > 0;
  const viewExists = await viewBtn.count() > 0;
  const exportExists = await exportBtn.count() > 0;
  const archiveExists = await archiveBtn.count() > 0;

  console.log(`  Button existence: Edit=${editExists}, Delete=${deleteExists}, View=${viewExists}, Export=${exportExists}, Archive=${archiveExists}`);

  if (!editExists) addIssue('HIGH', '/components/grid/native', 'Visual', 'Edit action button not visible in the grid');
  if (!deleteExists) addIssue('HIGH', '/components/grid/native', 'Visual', 'Delete action button not visible in the grid');
  if (!viewExists) addIssue('HIGH', '/components/grid/native', 'Visual', 'View action button not visible in the grid');
  if (!exportExists) addIssue('HIGH', '/components/grid/native', 'Visual', 'Export action button not visible in the grid');
  if (!archiveExists) addIssue('HIGH', '/components/grid/native', 'Visual', 'Archive action button not visible in the grid');

  // Check CSS classes and colors for each button
  const buttonChecks = [
    { name: 'Edit', selector: '[data-testid="pg-action-edit"]', expectedClass: null, expectedColor: 'default' },
    { name: 'Delete', selector: '[data-testid="pg-action-delete"]', expectedClass: 'native-grid-btn-delete', expectedColor: 'red' },
    { name: 'View', selector: '[data-testid="pg-action-view-btn"]', expectedClass: 'native-grid-btn-view', expectedColor: 'blue' },
    { name: 'Export', selector: '[data-testid="pg-action-export-btn"]', expectedClass: 'native-grid-btn-export', expectedColor: 'green' },
    { name: 'Archive', selector: '[data-testid="pg-action-archive-btn"]', expectedClass: 'native-grid-btn-archive', expectedColor: 'amber' },
  ];

  for (const check of buttonChecks) {
    const btn = page.locator(check.selector).first();
    if (await btn.count() > 0) {
      const info = await btn.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return { bg: style.backgroundColor, color: style.color, classes: el.className };
      });
      console.log(`  ${check.name} button: bg=${info.bg}, color=${info.color}, classes="${info.classes}"`);

      if (check.expectedClass && !info.classes.includes(check.expectedClass)) {
        addIssue('HIGH', '/components/grid/native', 'Visual',
          `${check.name} button missing expected class "${check.expectedClass}". Actual classes: "${info.classes}"`);
      }

      // Verify it has the base class
      if (!info.classes.includes('native-grid-btn')) {
        addIssue('HIGH', '/components/grid/native', 'Visual',
          `${check.name} button missing base class "native-grid-btn". Actual classes: "${info.classes}"`);
      }
    }
  }

  // Check that all five buttons have DISTINCT background colors
  if (editExists && deleteExists && viewExists && exportExists && archiveExists) {
    const allColors = await page.evaluate(() => {
      const btns = {
        edit: document.querySelector('[data-testid="pg-action-edit"]'),
        delete: document.querySelector('[data-testid="pg-action-delete"]'),
        view: document.querySelector('[data-testid="pg-action-view-btn"]'),
        export: document.querySelector('[data-testid="pg-action-export-btn"]'),
        archive: document.querySelector('[data-testid="pg-action-archive-btn"]'),
      };
      const result = {};
      for (const [name, el] of Object.entries(btns)) {
        if (el) result[name] = window.getComputedStyle(el).backgroundColor;
      }
      return result;
    });

    console.log(`  All button colors: ${JSON.stringify(allColors)}`);

    const colorValues = Object.values(allColors);
    const uniqueColors = new Set(colorValues);
    if (uniqueColors.size < colorValues.length) {
      const dupes = colorValues.filter((c, i) => colorValues.indexOf(c) !== i);
      addIssue('HIGH', '/components/grid/native', 'Visual',
        `Action buttons do not all have distinct colors. Found ${uniqueColors.size} unique colors out of ${colorValues.length}. Duplicated: ${[...new Set(dupes)].join(', ')}. Full: ${JSON.stringify(allColors)}`);
    } else {
      console.log(`  PASS: All ${uniqueColors.size} action buttons have distinct colors`);
    }
  }

  await screenshot(page, '09-actions-button-colors-zoomed');

  // ==========================================
  // TEST 4: Selection enables useState import in code snippet
  // ==========================================
  console.log('\n--- Test 4: Selection Code Snippet ---');

  // Reset to default first
  await scrollToPlayground(page);
  await selectDropdownValue(page, 'pg-native-preset', 'Default');
  await page.waitForTimeout(500);

  // First check code WITHOUT selection
  let codeSnippet = await getCodeSnippetText(page);
  const hasUseStateWithoutSelection = codeSnippet.includes("import { useState } from 'react'");
  console.log(`  Code without selection includes useState: ${hasUseStateWithoutSelection}`);

  if (hasUseStateWithoutSelection) {
    console.log(`  INFO: useState present even without selection (may be due to NativePagination)`);
  }

  // Now enable Single selection
  console.log('  Enabling Single selection...');
  await scrollToPlayground(page);
  await selectDropdownValue(page, 'pg-native-sel-type', 'Single');
  await page.waitForTimeout(500);

  codeSnippet = await getCodeSnippetText(page);
  const hasUseStateWithSingle = codeSnippet.includes("import { useState } from 'react'");
  console.log(`  Code with Single selection includes useState: ${hasUseStateWithSingle}`);
  console.log(`  Code snippet preview (first 500 chars): ${codeSnippet.substring(0, 500)}`);

  if (!hasUseStateWithSingle) {
    addIssue('HIGH', '/components/grid/native', 'Functional',
      "Code snippet does not include \"import { useState } from 'react'\" when Single selection is enabled");
  } else {
    console.log('  PASS: Single selection code snippet includes useState import');
  }

  await screenshot(page, '10-selection-single-code');

  // Also test with Multiple selection
  console.log('  Enabling Multiple selection...');
  await scrollToPlayground(page);
  await selectDropdownValue(page, 'pg-native-sel-type', 'Multiple');
  await page.waitForTimeout(500);

  codeSnippet = await getCodeSnippetText(page);
  const hasUseStateWithMultiple = codeSnippet.includes("import { useState } from 'react'");
  console.log(`  Code with Multiple selection includes useState: ${hasUseStateWithMultiple}`);

  if (!hasUseStateWithMultiple) {
    addIssue('HIGH', '/components/grid/native', 'Functional',
      "Code snippet does not include \"import { useState } from 'react'\" when Multiple selection is enabled");
  } else {
    console.log('  PASS: Multiple selection code snippet includes useState import');
  }

  await screenshot(page, '11-selection-multiple-code');

  // ==========================================
  // TEST 5: Console Errors Review
  // ==========================================
  console.log('\n--- Test 5: Console Errors Review ---');

  if (consoleErrors.length === 0) {
    console.log('  PASS: No console errors detected throughout testing');
  } else {
    console.log(`  Found ${consoleErrors.length} console error(s):`);
    for (const err of consoleErrors) {
      const truncated = err.text.substring(0, 300);
      console.log(`    [ERROR] ${truncated}`);
      // Filter out known non-critical errors
      const isKnown = err.text.includes('favicon') || (err.text.includes('404') && err.text.includes('.ico'));
      if (!isKnown) {
        addIssue('HIGH', '/components/grid/native', 'Console',
          `Console error: ${truncated}`);
      }
    }
  }

  if (consoleWarnings.length > 0) {
    console.log(`\n  Found ${consoleWarnings.length} console warning(s):`);
    const uniqueWarnings = [...new Set(consoleWarnings.map(w => w.text.substring(0, 200)))];
    for (const text of uniqueWarnings) {
      console.log(`    [WARN] ${text}`);
      if (text.includes('React') || text.includes('deprecated') || text.includes('Deprecated')) {
        addIssue('LOW', '/components/grid/native', 'Console',
          `Console warning: ${text}`);
      }
    }
  } else {
    console.log('  No console warnings detected');
  }

  // ==========================================
  // TEST 6: Network Errors Review
  // ==========================================
  console.log('\n--- Test 6: Network Errors Review ---');

  if (networkErrors.length === 0) {
    console.log('  PASS: No network errors detected');
  } else {
    console.log(`  Found ${networkErrors.length} network error(s):`);
    for (const err of networkErrors) {
      console.log(`    [${err.status}] ${err.url}`);
      if (!err.url.includes('favicon')) {
        addIssue('MEDIUM', '/components/grid/native', 'Network',
          `HTTP ${err.status} on ${err.url}`);
      }
    }
  }

  // ==========================================
  // TEST 7: Final state screenshot
  // ==========================================
  console.log('\n--- Test 7: Final State ---');
  await scrollToPlayground(page);
  await screenshot(page, '12-final-state');

  // ==========================================
  // Summary
  // ==========================================
  await browser.close();
  printReport();
}

function printReport() {
  console.log('\n' + '='.repeat(80));
  console.log('=== VISUAL QA REPORT ===');
  console.log('='.repeat(80));

  const criticalCount = issues.filter(i => i.severity === 'CRITICAL').length;
  const highCount = issues.filter(i => i.severity === 'HIGH').length;
  const mediumCount = issues.filter(i => i.severity === 'MEDIUM').length;
  const lowCount = issues.filter(i => i.severity === 'LOW').length;

  let overallStatus;
  if (criticalCount > 0) overallStatus = 'QA_FAILED';
  else if (highCount > 0) overallStatus = 'QA_FAILED';
  else if (mediumCount >= 3) overallStatus = 'QA_FAILED';
  else overallStatus = 'QA_PASSED';

  console.log(`\nOverall Status: ${overallStatus}`);
  console.log(`Pages Tested: /components/grid/native`);
  console.log(`\nIssue Counts:`);
  console.log(`  CRITICAL: ${criticalCount}`);
  console.log(`  HIGH:     ${highCount}`);
  console.log(`  MEDIUM:   ${mediumCount}`);
  console.log(`  LOW:      ${lowCount}`);
  console.log(`  TOTAL:    ${issues.length}`);

  if (issues.length > 0) {
    console.log(`\nIssues Found:`);
    for (const issue of issues) {
      console.log(`\n  Issue #${issue.id} [${issue.severity}]`);
      console.log(`    Page: ${issue.page}`);
      console.log(`    Category: ${issue.category}`);
      console.log(`    Description: ${issue.description}`);
      if (issue.evidence) console.log(`    Evidence: ${issue.evidence}`);
    }
  } else {
    console.log('\n  No issues found.');
  }

  console.log(`\nConsole Errors Total: ${consoleErrors.length}`);
  console.log(`Console Warnings Total: ${consoleWarnings.length}`);
  console.log(`Network Errors Total: ${networkErrors.length}`);

  console.log(`\nScreenshots saved to: ${SCREENSHOT_DIR}`);
  console.log('='.repeat(80));

  // Write report to file
  const report = {
    overallStatus,
    pagesTested: ['/components/grid/native'],
    issues,
    consoleErrors,
    consoleWarnings,
    networkErrors,
    issueCounts: { critical: criticalCount, high: highCount, medium: mediumCount, low: lowCount },
  };
  writeFileSync(join(SCREENSHOT_DIR, 'report.json'), JSON.stringify(report, null, 2));
  console.log(`Report JSON saved to: ${join(SCREENSHOT_DIR, 'report.json')}`);
}

main().catch((e) => {
  console.error('Test execution failed:', e);
  addIssue('CRITICAL', '/components/grid/native', 'Functional', `Test execution failed: ${e.message}`);
  printReport();
  process.exit(1);
});
