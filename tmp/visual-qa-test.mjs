/**
 * Visual QA Test Script for Native Grid and Syncfusion Grid Interactive Playgrounds.
 * Uses Playwright to automate browser testing.
 */
import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

const BASE_URL = 'http://localhost:4444';
const NATIVE_GRID_URL = `${BASE_URL}/components/grid/native`;
const SF_GRID_URL = `${BASE_URL}/components/grid/syncfusion`;
const SCREENSHOT_DIR = 'C:/desktopContents/projects/SaaS/SyncfusionThemeStudio/tmp/screenshots';

// Create screenshot directory
import { mkdirSync, existsSync } from 'fs';
if (!existsSync(SCREENSHOT_DIR)) mkdirSync(SCREENSHOT_DIR, { recursive: true });

const issues = [];
let issueCounter = 0;

function addIssue(severity, page, category, description, evidence) {
  issueCounter++;
  issues.push({ id: issueCounter, severity, page, category, description, evidence });
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();

  // Collect console errors
  const consoleErrors = [];
  const consoleWarnings = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push({ page: page.url(), text: msg.text() });
    if (msg.type() === 'warning') consoleWarnings.push({ page: page.url(), text: msg.text() });
  });

  // Collect network errors
  const networkErrors = [];
  page.on('response', (response) => {
    if (response.status() >= 400) {
      networkErrors.push({ url: response.url(), status: response.status(), page: page.url() });
    }
  });

  console.log('=== PHASE 1: Testing Native Grid Interactive Playground ===\n');
  await testNativeGridPlayground(page);

  console.log('\n=== PHASE 2: Testing Syncfusion Grid Interactive Playground ===\n');
  await testSyncfusionGridPlayground(page);

  console.log('\n=== PHASE 3: Console Errors Check ===\n');
  if (consoleErrors.length > 0) {
    console.log('Console errors found:');
    for (const err of consoleErrors) {
      console.log(`  [ERROR] ${err.text.substring(0, 200)}`);
    }
    // Filter out non-critical errors (e.g., HMR, favicon, etc.)
    const criticalErrors = consoleErrors.filter(e =>
      !e.text.includes('favicon') &&
      !e.text.includes('[HMR]') &&
      !e.text.includes('DevTools') &&
      !e.text.includes('manifest.json')
    );
    if (criticalErrors.length > 0) {
      addIssue('MEDIUM', 'Multiple', 'Console', `${criticalErrors.length} console error(s) found`, 'See console output');
    }
  } else {
    console.log('No console errors found.');
  }

  if (consoleWarnings.length > 0) {
    console.log(`\n${consoleWarnings.length} console warning(s) found (non-blocking).`);
    for (const w of consoleWarnings.slice(0, 5)) {
      console.log(`  [WARN] ${w.text.substring(0, 200)}`);
    }
  }

  console.log('\n=== PHASE 4: Network Errors Check ===\n');
  if (networkErrors.length > 0) {
    const realErrors = networkErrors.filter(e =>
      !e.url.includes('favicon') &&
      !e.url.includes('manifest') &&
      !e.url.includes('.map')
    );
    if (realErrors.length > 0) {
      console.log('Network errors found:');
      for (const err of realErrors) {
        console.log(`  [${err.status}] ${err.url}`);
      }
      addIssue('MEDIUM', 'Multiple', 'Network', `${realErrors.length} network error(s) found`, 'See network output');
    } else {
      console.log('No significant network errors found.');
    }
  } else {
    console.log('No network errors found.');
  }

  console.log('\n=== PHASE 5: Issue Summary ===\n');
  if (issues.length === 0) {
    console.log('No issues found! QA_PASSED');
  } else {
    console.log(`Total issues: ${issues.length}`);
    for (const issue of issues) {
      console.log(`  #${issue.id} [${issue.severity}] ${issue.page} - ${issue.category}: ${issue.description}`);
    }
    const critical = issues.filter(i => i.severity === 'CRITICAL').length;
    const high = issues.filter(i => i.severity === 'HIGH').length;
    const medium = issues.filter(i => i.severity === 'MEDIUM').length;
    const low = issues.filter(i => i.severity === 'LOW').length;
    console.log(`\nCRITICAL: ${critical}, HIGH: ${high}, MEDIUM: ${medium}, LOW: ${low}`);
    if (critical > 0 || high > 0 || medium >= 3) {
      console.log('\nOverall: QA_FAILED');
    } else {
      console.log('\nOverall: QA_PASSED');
    }
  }

  await browser.close();
}

async function testNativeGridPlayground(page) {
  // Navigate to Native Grid page
  await page.goto(NATIVE_GRID_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Take initial screenshot
  await page.screenshot({ path: `${SCREENSHOT_DIR}/01-native-grid-full-page.png`, fullPage: true });
  console.log('Screenshot: 01-native-grid-full-page.png');

  // Scroll to the Interactive Playground section
  const playgroundSection = page.locator('[data-testid="native-grid-playground"]');
  const playgroundExists = await playgroundSection.count() > 0;
  console.log(`Native Grid Playground section exists: ${playgroundExists}`);

  if (!playgroundExists) {
    addIssue('CRITICAL', '/components/grid/native', 'Functional', 'Interactive Playground section not found on page', '01-native-grid-full-page.png');
    return;
  }

  await playgroundSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${SCREENSHOT_DIR}/02-native-playground-visible.png`, fullPage: false });
  console.log('Screenshot: 02-native-playground-visible.png');

  // TEST 1: Check Configuration Preset dropdown exists
  console.log('\n--- Test 1: Configuration Preset Dropdown ---');
  const presetDropdown = page.locator('[data-testid*="preset"]').first();
  const presetExists = await presetDropdown.count() > 0;
  console.log(`Preset dropdown found by testId: ${presetExists}`);

  // Also try to find preset by label text
  const presetLabel = page.getByText('Configuration Preset', { exact: false });
  const presetLabelExists = await presetLabel.count() > 0;
  console.log(`Preset label found: ${presetLabelExists}`);

  if (!presetLabelExists && !presetExists) {
    // Try to find any select/dropdown near "Preset" text
    const anyPreset = page.locator('select, [role="listbox"], [role="combobox"]');
    const presetCount = await anyPreset.count();
    console.log(`Any dropdown controls found: ${presetCount}`);
  }

  // TEST 2: Check preset options
  console.log('\n--- Test 2: Preset Options ---');
  // Look for the preset select element
  const selects = page.locator('select');
  const selectCount = await selects.count();
  console.log(`Total select elements on page: ${selectCount}`);

  // Find the preset select specifically
  let presetSelect = null;
  for (let i = 0; i < selectCount; i++) {
    const select = selects.nth(i);
    const options = await select.locator('option').allTextContents();
    const hasDefault = options.some(o => o.toLowerCase().includes('default'));
    const hasBasic = options.some(o => o.toLowerCase().includes('basic'));
    if (hasDefault && hasBasic) {
      presetSelect = select;
      console.log(`Found preset select at index ${i} with options:`, options);
      break;
    }
  }

  if (!presetSelect) {
    // Check for custom dropdown instead of native select
    console.log('No native select with preset options found, checking for custom dropdown...');
    const customPreset = page.locator('[data-testid*="preset"]');
    const customCount = await customPreset.count();
    console.log(`Custom preset elements found: ${customCount}`);
    for (let i = 0; i < Math.min(customCount, 5); i++) {
      const text = await customPreset.nth(i).textContent();
      console.log(`  Preset element ${i}: ${text?.substring(0, 100)}`);
    }
  }

  // Check for required preset options
  const expectedPresets = ['Default', 'Basic Read-Only', 'Simple CRUD', 'Advanced Data Table'];
  if (presetSelect) {
    const options = await presetSelect.locator('option').allTextContents();
    for (const preset of expectedPresets) {
      const found = options.some(o => o.includes(preset));
      console.log(`  Preset "${preset}": ${found ? 'FOUND' : 'MISSING'}`);
      if (!found) {
        addIssue('HIGH', '/components/grid/native', 'Functional', `Preset option "${preset}" missing from dropdown`, '02-native-playground-visible.png');
      }
    }
  }

  // TEST 3: Select each preset and verify controls change
  console.log('\n--- Test 3: Preset Selection Changes Controls ---');
  if (presetSelect) {
    for (const preset of ['basicReadOnly', 'simpleCrud', 'advancedDataTable', 'default']) {
      try {
        await presetSelect.selectOption(preset);
        await page.waitForTimeout(300);
        console.log(`  Selected preset: ${preset} - OK`);
      } catch (e) {
        console.log(`  Failed to select preset: ${preset} - ${e.message.substring(0, 100)}`);
      }
    }
  }

  // TEST 4: Select "Simple CRUD" preset and check action buttons
  console.log('\n--- Test 4: Action Button Colors (View, Export, Archive) ---');
  // First, we need to enable View, Export, Archive buttons
  // Select "Advanced Data Table" or configure manually

  // Enable actions column with all buttons
  // Find and check the Actions Column toggle
  const actionsColumnToggle = page.locator('[data-testid*="actions-column"], [data-testid*="actionsColumn"]');
  const actionsToggleCount = await actionsColumnToggle.count();
  console.log(`Actions column toggle elements: ${actionsToggleCount}`);

  // Enable view, export, archive toggles
  const viewToggle = page.locator('[data-testid*="action-view"], [data-testid*="actionView"]');
  const exportToggle = page.locator('[data-testid*="action-export"], [data-testid*="actionExport"]');
  const archiveToggle = page.locator('[data-testid*="action-archive"], [data-testid*="actionArchive"]');

  console.log(`View toggle count: ${await viewToggle.count()}`);
  console.log(`Export toggle count: ${await exportToggle.count()}`);
  console.log(`Archive toggle count: ${await archiveToggle.count()}`);

  // Try to enable actions and all button types
  // First enable actions column
  if (actionsToggleCount > 0) {
    const toggle = actionsColumnToggle.first();
    const isChecked = await toggle.isChecked().catch(() => null);
    console.log(`Actions column is checked: ${isChecked}`);
    if (isChecked === false) {
      await toggle.click();
      await page.waitForTimeout(300);
    }
  }

  // Enable view, export, archive
  for (const [name, locator] of [['view', viewToggle], ['export', exportToggle], ['archive', archiveToggle]]) {
    const count = await locator.count();
    if (count > 0) {
      const el = locator.first();
      const isChecked = await el.isChecked().catch(() => null);
      if (isChecked === false) {
        await el.click();
        await page.waitForTimeout(200);
        console.log(`  Enabled ${name} action`);
      } else {
        console.log(`  ${name} action already enabled or not checkable`);
      }
    }
  }

  await page.waitForTimeout(500);

  // Take screenshot of actions
  await playgroundSection.scrollIntoViewIfNeeded();
  await page.screenshot({ path: `${SCREENSHOT_DIR}/03-native-grid-actions.png`, fullPage: false });
  console.log('Screenshot: 03-native-grid-actions.png');

  // Check action button colors
  const viewBtn = page.locator('[data-testid="pg-action-view-btn"]').first();
  const exportBtn = page.locator('[data-testid="pg-action-export-btn"]').first();
  const archiveBtn = page.locator('[data-testid="pg-action-archive-btn"]').first();

  const viewBtnCount = await viewBtn.count();
  const exportBtnCount = await exportBtn.count();
  const archiveBtnCount = await archiveBtn.count();

  console.log(`  View buttons: ${viewBtnCount}, Export buttons: ${exportBtnCount}, Archive buttons: ${archiveBtnCount}`);

  if (viewBtnCount > 0) {
    const viewClass = await viewBtn.getAttribute('class');
    console.log(`  View button class: ${viewClass}`);
    const hasViewVariant = viewClass?.includes('native-grid-btn-view');
    console.log(`  View has distinct variant class: ${hasViewVariant}`);
    if (!hasViewVariant) {
      addIssue('HIGH', '/components/grid/native', 'Visual', 'View button missing native-grid-btn-view variant class', '03-native-grid-actions.png');
    }

    // Check computed color
    const viewColor = await viewBtn.evaluate(el => {
      const style = window.getComputedStyle(el);
      return { color: style.color, bg: style.backgroundColor, border: style.borderColor };
    });
    console.log(`  View button computed style: color=${viewColor.color}, bg=${viewColor.bg}, border=${viewColor.border}`);
  }

  if (exportBtnCount > 0) {
    const exportClass = await exportBtn.getAttribute('class');
    console.log(`  Export button class: ${exportClass}`);
    const hasExportVariant = exportClass?.includes('native-grid-btn-export');
    console.log(`  Export has distinct variant class: ${hasExportVariant}`);
    if (!hasExportVariant) {
      addIssue('HIGH', '/components/grid/native', 'Visual', 'Export button missing native-grid-btn-export variant class', '03-native-grid-actions.png');
    }

    const exportColor = await exportBtn.evaluate(el => {
      const style = window.getComputedStyle(el);
      return { color: style.color, bg: style.backgroundColor, border: style.borderColor };
    });
    console.log(`  Export button computed style: color=${exportColor.color}, bg=${exportColor.bg}, border=${exportColor.border}`);
  }

  if (archiveBtnCount > 0) {
    const archiveClass = await archiveBtn.getAttribute('class');
    console.log(`  Archive button class: ${archiveClass}`);
    const hasArchiveVariant = archiveClass?.includes('native-grid-btn-archive');
    console.log(`  Archive has distinct variant class: ${hasArchiveVariant}`);
    if (!hasArchiveVariant) {
      addIssue('HIGH', '/components/grid/native', 'Visual', 'Archive button missing native-grid-btn-archive variant class', '03-native-grid-actions.png');
    }

    const archiveColor = await archiveBtn.evaluate(el => {
      const style = window.getComputedStyle(el);
      return { color: style.color, bg: style.backgroundColor, border: style.borderColor };
    });
    console.log(`  Archive button computed style: color=${archiveColor.color}, bg=${archiveColor.bg}, border=${archiveColor.border}`);
  }

  // Check that all three buttons have DIFFERENT colors
  if (viewBtnCount > 0 && exportBtnCount > 0 && archiveBtnCount > 0) {
    const viewColor = await viewBtn.evaluate(el => window.getComputedStyle(el).color);
    const exportColor = await exportBtn.evaluate(el => window.getComputedStyle(el).color);
    const archiveColor = await archiveBtn.evaluate(el => window.getComputedStyle(el).color);

    const allSame = viewColor === exportColor && exportColor === archiveColor;
    console.log(`  All three buttons same color? ${allSame}`);
    if (allSame) {
      addIssue('HIGH', '/components/grid/native', 'Visual', `View, Export, Archive buttons all have same color (${viewColor}) - should be distinct`, '03-native-grid-actions.png');
    } else {
      console.log('  PASS: Action buttons have distinct colors');
    }
  }

  // TEST 5: Code snippet includes useState when selection or native pagination enabled
  console.log('\n--- Test 5: Code Snippet useState Import ---');

  // Enable selection
  if (presetSelect) {
    await presetSelect.selectOption('default');
    await page.waitForTimeout(300);
  }

  // Find selection type control
  const selectionTypeSelect = page.locator('[data-testid*="selection-type"], [data-testid*="selectionType"]');
  const selTypeCount = await selectionTypeSelect.count();
  console.log(`Selection type controls: ${selTypeCount}`);

  // Check code snippet before enabling selection
  const codeSnippet = page.locator('[data-testid="pg-native-code"]');
  const codeExists = await codeSnippet.count() > 0;
  console.log(`Code snippet element exists: ${codeExists}`);

  if (codeExists) {
    let codeText = await codeSnippet.textContent();
    const hasUseStateBefore = codeText.includes("import { useState } from 'react'");
    console.log(`  Code has useState before selection enabled: ${hasUseStateBefore}`);

    // Enable selection (set to Single or Multiple)
    if (selTypeCount > 0) {
      try {
        const selTypeEl = selectionTypeSelect.first();
        const tagName = await selTypeEl.evaluate(el => el.tagName);
        if (tagName === 'SELECT') {
          await selTypeEl.selectOption('Single');
          await page.waitForTimeout(500);
          console.log('  Selected "Single" selection type');
        }
      } catch (e) {
        console.log(`  Could not select selection type: ${e.message.substring(0, 100)}`);
      }
    }

    codeText = await codeSnippet.textContent();
    const hasUseStateAfterSelection = codeText.includes("import { useState } from 'react'");
    console.log(`  Code has useState after selection enabled: ${hasUseStateAfterSelection}`);

    if (!hasUseStateAfterSelection) {
      addIssue('MEDIUM', '/components/grid/native', 'Functional', 'Code snippet missing useState import when selection is enabled', 'Code snippet area');
    }

    // Reset selection and test NativePagination
    if (selTypeCount > 0) {
      try {
        const selTypeEl = selectionTypeSelect.first();
        const tagName = await selTypeEl.evaluate(el => el.tagName);
        if (tagName === 'SELECT') {
          await selTypeEl.selectOption('None');
          await page.waitForTimeout(300);
        }
      } catch (e) { /* ignore */ }
    }

    // Find pagination mode control
    const paginationModeSelect = page.locator('[data-testid*="pagination-mode"], [data-testid*="paginationMode"]');
    const pagModeCount = await paginationModeSelect.count();
    console.log(`Pagination mode controls: ${pagModeCount}`);

    if (pagModeCount > 0) {
      try {
        const pagEl = paginationModeSelect.first();
        const tagName = await pagEl.evaluate(el => el.tagName);
        if (tagName === 'SELECT') {
          await pagEl.selectOption('NativePagination');
          await page.waitForTimeout(500);
          console.log('  Selected "NativePagination" pagination mode');

          codeText = await codeSnippet.textContent();
          const hasUseStateAfterPag = codeText.includes("import { useState } from 'react'");
          console.log(`  Code has useState after NativePagination enabled: ${hasUseStateAfterPag}`);

          if (!hasUseStateAfterPag) {
            addIssue('MEDIUM', '/components/grid/native', 'Functional', 'Code snippet missing useState import when NativePagination is enabled', 'Code snippet area');
          }
        }
      } catch (e) {
        console.log(`  Could not test pagination mode: ${e.message.substring(0, 100)}`);
      }
    }
  }

  // Take final screenshot of native grid
  await page.screenshot({ path: `${SCREENSHOT_DIR}/04-native-grid-final.png`, fullPage: false });
  console.log('Screenshot: 04-native-grid-final.png');
}

async function testSyncfusionGridPlayground(page) {
  // Navigate to Syncfusion Grid page
  await page.goto(SF_GRID_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Take initial screenshot
  await page.screenshot({ path: `${SCREENSHOT_DIR}/05-sf-grid-full-page.png`, fullPage: true });
  console.log('Screenshot: 05-sf-grid-full-page.png');

  // Find the Interactive Playground section
  const playgroundSection = page.locator('[data-testid="sf-grid-playground"]');
  const playgroundExists = await playgroundSection.count() > 0;
  console.log(`Syncfusion Grid Playground section exists: ${playgroundExists}`);

  if (!playgroundExists) {
    addIssue('CRITICAL', '/components/grid/syncfusion', 'Functional', 'Interactive Playground section not found on page', '05-sf-grid-full-page.png');
    return;
  }

  await playgroundSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${SCREENSHOT_DIR}/06-sf-playground-visible.png`, fullPage: false });
  console.log('Screenshot: 06-sf-playground-visible.png');

  // TEST 1: Check Configuration Preset dropdown
  console.log('\n--- Test 1: Configuration Preset Dropdown ---');
  const selects = await playgroundSection.locator('select').count();
  console.log(`Select elements in playground: ${selects}`);

  let presetSelect = null;
  const allSelects = playgroundSection.locator('select');
  for (let i = 0; i < selects; i++) {
    const select = allSelects.nth(i);
    const options = await select.locator('option').allTextContents();
    const hasDefault = options.some(o => o.toLowerCase().includes('default'));
    const hasBasic = options.some(o => o.toLowerCase().includes('basic'));
    if (hasDefault && hasBasic) {
      presetSelect = select;
      console.log(`Found preset select with options:`, options);
      break;
    }
  }

  const expectedPresets = ['Default', 'Basic Read-Only', 'Simple CRUD', 'Advanced Data Table'];
  if (presetSelect) {
    const options = await presetSelect.locator('option').allTextContents();
    for (const preset of expectedPresets) {
      const found = options.some(o => o.includes(preset));
      console.log(`  Preset "${preset}": ${found ? 'FOUND' : 'MISSING'}`);
      if (!found) {
        addIssue('HIGH', '/components/grid/syncfusion', 'Functional', `Preset option "${preset}" missing from dropdown`, '06-sf-playground-visible.png');
      }
    }
  } else {
    console.log('  Preset select not found as native select, checking custom elements...');
    // Check all data-testid attributes in playground
    const testIds = await playgroundSection.evaluate(el => {
      const elements = el.querySelectorAll('[data-testid]');
      return Array.from(elements).map(e => e.getAttribute('data-testid')).filter(t => t.includes('preset') || t.includes('Preset'));
    });
    console.log('  Preset-related testIds:', testIds);
  }

  // TEST 2: Preset selection changes controls
  console.log('\n--- Test 2: Preset Selection Changes Controls ---');
  if (presetSelect) {
    for (const presetValue of ['basicReadOnly', 'simpleCrud', 'advancedDataTable', 'default']) {
      try {
        await presetSelect.selectOption(presetValue);
        await page.waitForTimeout(500);
        console.log(`  Selected preset: ${presetValue} - OK`);

        // Take screenshot for each preset
        await page.screenshot({
          path: `${SCREENSHOT_DIR}/07-sf-preset-${presetValue}.png`,
          fullPage: false
        });
      } catch (e) {
        console.log(`  Failed to select preset: ${presetValue} - ${e.message.substring(0, 100)}`);
      }
    }
  }

  // TEST 3: Action button colors
  console.log('\n--- Test 3: Action Button Colors ---');

  // Enable actions column and view/export/archive
  const actionsColumnToggle = playgroundSection.locator('[data-testid*="actions-column"], [data-testid*="actionsColumn"]');
  if (await actionsColumnToggle.count() > 0) {
    const isChecked = await actionsColumnToggle.first().isChecked().catch(() => null);
    if (isChecked === false) {
      await actionsColumnToggle.first().click();
      await page.waitForTimeout(300);
    }
  }

  // Enable view, export, archive
  for (const testIdPart of ['action-view', 'actionView', 'action-export', 'actionExport', 'action-archive', 'actionArchive']) {
    const toggle = playgroundSection.locator(`[data-testid*="${testIdPart}"]`);
    const count = await toggle.count();
    if (count > 0) {
      const el = toggle.first();
      const tagName = await el.evaluate(e => e.tagName);
      if (tagName === 'INPUT') {
        const isChecked = await el.isChecked().catch(() => null);
        if (isChecked === false) {
          await el.click();
          await page.waitForTimeout(200);
        }
      }
    }
  }

  await page.waitForTimeout(500);

  // Check action buttons
  const viewBtn = page.locator('[data-testid="pg-action-view-btn"]').first();
  const exportBtn = page.locator('[data-testid="pg-action-export-btn"]').first();
  const archiveBtn = page.locator('[data-testid="pg-action-archive-btn"]').first();

  const vCount = await viewBtn.count();
  const eCount = await exportBtn.count();
  const aCount = await archiveBtn.count();

  console.log(`  View: ${vCount}, Export: ${eCount}, Archive: ${aCount} buttons found`);

  if (vCount > 0 && eCount > 0 && aCount > 0) {
    const viewStyles = await viewBtn.evaluate(el => {
      const s = window.getComputedStyle(el);
      return { color: s.color, bg: s.backgroundColor, border: s.borderColor, class: el.className };
    });
    const exportStyles = await exportBtn.evaluate(el => {
      const s = window.getComputedStyle(el);
      return { color: s.color, bg: s.backgroundColor, border: s.borderColor, class: el.className };
    });
    const archiveStyles = await archiveBtn.evaluate(el => {
      const s = window.getComputedStyle(el);
      return { color: s.color, bg: s.backgroundColor, border: s.borderColor, class: el.className };
    });

    console.log(`  View: class="${viewStyles.class}", color=${viewStyles.color}, bg=${viewStyles.bg}`);
    console.log(`  Export: class="${exportStyles.class}", color=${exportStyles.color}, bg=${exportStyles.bg}`);
    console.log(`  Archive: class="${archiveStyles.class}", color=${archiveStyles.color}, bg=${archiveStyles.bg}`);

    // Check that they have distinct variant classes
    const hasViewClass = viewStyles.class.includes('native-grid-btn-view');
    const hasExportClass = exportStyles.class.includes('native-grid-btn-export');
    const hasArchiveClass = archiveStyles.class.includes('native-grid-btn-archive');

    console.log(`  Has view class: ${hasViewClass}, export class: ${hasExportClass}, archive class: ${hasArchiveClass}`);

    if (!hasViewClass) addIssue('HIGH', '/components/grid/syncfusion', 'Visual', 'View button missing variant class', '08-sf-grid-actions.png');
    if (!hasExportClass) addIssue('HIGH', '/components/grid/syncfusion', 'Visual', 'Export button missing variant class', '08-sf-grid-actions.png');
    if (!hasArchiveClass) addIssue('HIGH', '/components/grid/syncfusion', 'Visual', 'Archive button missing variant class', '08-sf-grid-actions.png');

    // Check distinct colors
    const allSameColor = viewStyles.color === exportStyles.color && exportStyles.color === archiveStyles.color;
    console.log(`  All same text color? ${allSameColor} (view=${viewStyles.color}, export=${exportStyles.color}, archive=${archiveStyles.color})`);
    if (allSameColor) {
      addIssue('HIGH', '/components/grid/syncfusion', 'Visual', 'View, Export, Archive buttons all have same color - should be distinct', '08-sf-grid-actions.png');
    } else {
      console.log('  PASS: Action buttons have distinct colors');
    }

    // Take screenshot of action buttons
    await page.screenshot({ path: `${SCREENSHOT_DIR}/08-sf-grid-actions.png`, fullPage: false });
    console.log('Screenshot: 08-sf-grid-actions.png');
  }

  // TEST 4: Code snippet useState
  console.log('\n--- Test 4: Code Snippet useState Import ---');

  // Reset to default preset
  if (presetSelect) {
    await presetSelect.selectOption('default');
    await page.waitForTimeout(300);
  }

  const codeSnippet = page.locator('[data-testid="pg-sf-code"]');
  const codeExists = await codeSnippet.count() > 0;
  console.log(`Code snippet element exists: ${codeExists}`);

  if (codeExists) {
    let codeText = await codeSnippet.textContent();
    const hasUseStateBefore = codeText.includes("import { useState } from 'react'");
    console.log(`  Code has useState in default state: ${hasUseStateBefore}`);

    // Find and set selection type
    const selectionControls = playgroundSection.locator('select');
    const selCount = await selectionControls.count();
    let selectionSelect = null;

    for (let i = 0; i < selCount; i++) {
      const sel = selectionControls.nth(i);
      const opts = await sel.locator('option').allTextContents();
      if (opts.some(o => o === 'Single' || o === 'Multiple')) {
        selectionSelect = sel;
        break;
      }
    }

    if (selectionSelect) {
      await selectionSelect.selectOption('Single');
      await page.waitForTimeout(500);

      codeText = await codeSnippet.textContent();
      const hasUseStateAfterSel = codeText.includes("import { useState } from 'react'");
      console.log(`  Code has useState after selection enabled: ${hasUseStateAfterSel}`);

      if (!hasUseStateAfterSel) {
        addIssue('MEDIUM', '/components/grid/syncfusion', 'Functional', 'Code snippet missing useState import when selection enabled', 'Code snippet area');
      }

      // Reset selection
      await selectionSelect.selectOption('None');
      await page.waitForTimeout(300);
    }

    // Test NativePagination mode
    let paginationSelect = null;
    for (let i = 0; i < selCount; i++) {
      const sel = selectionControls.nth(i);
      const opts = await sel.locator('option').allTextContents();
      if (opts.some(o => o.includes('NativePagination') || o.includes('Native Pagination'))) {
        paginationSelect = sel;
        break;
      }
    }

    if (paginationSelect) {
      await paginationSelect.selectOption('NativePagination');
      await page.waitForTimeout(500);

      codeText = await codeSnippet.textContent();
      const hasUseStateAfterPag = codeText.includes("import { useState } from 'react'");
      console.log(`  Code has useState after NativePagination enabled: ${hasUseStateAfterPag}`);

      if (!hasUseStateAfterPag) {
        addIssue('MEDIUM', '/components/grid/syncfusion', 'Functional', 'Code snippet missing useState import when NativePagination enabled', 'Code snippet area');
      }
    }
  }

  // Take final screenshot
  await page.screenshot({ path: `${SCREENSHOT_DIR}/09-sf-grid-final.png`, fullPage: false });
  console.log('Screenshot: 09-sf-grid-final.png');
}

main().catch(console.error);
