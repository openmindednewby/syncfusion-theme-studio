/**
 * Quick focused check: action button visual distinctness
 * Checks background, text, and border colors for all 5 action buttons.
 */
import { chromium } from 'playwright';
import { mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const BASE_URL = 'http://localhost:4444';
const NATIVE_GRID_URL = `${BASE_URL}/components/grid/native`;
const SCREENSHOT_DIR = 'C:/desktopContents/projects/SaaS/SyncfusionThemeStudio/tmp/qa-screenshots';

if (!existsSync(SCREENSHOT_DIR)) mkdirSync(SCREENSHOT_DIR, { recursive: true });

async function selectDropdownValue(page, testId, targetLabel) {
  const container = page.locator(`[data-testid="${testId}"]`);
  const trigger = container.locator('button[role="combobox"]');
  await trigger.click();
  await page.waitForTimeout(200);
  const popup = container.locator('.native-select-popup[data-open="true"]');
  const option = popup.locator(`div[role="option"]`).filter({ hasText: targetLabel });
  if (await option.count() > 0) {
    await option.first().click();
    await page.waitForTimeout(300);
    return true;
  }
  await trigger.click();
  return false;
}

async function setToggle(page, testId, desired) {
  const toggle = page.locator(`[data-testid="${testId}"]`);
  if (await toggle.count() === 0) return;
  const ariaChecked = await toggle.getAttribute('aria-checked');
  if ((ariaChecked === 'true') !== desired) {
    await toggle.click();
    await page.waitForTimeout(300);
  }
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();

  await page.goto(NATIVE_GRID_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Scroll to playground
  await page.locator('[data-testid="native-grid-playground"]').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  // Enable all actions
  await setToggle(page, 'pg-native-actions-col', true);
  await page.waitForTimeout(300);
  await setToggle(page, 'pg-native-action-edit', true);
  await setToggle(page, 'pg-native-action-delete', true);
  await setToggle(page, 'pg-native-action-view', true);
  await setToggle(page, 'pg-native-action-export', true);
  await setToggle(page, 'pg-native-action-archive', true);
  await page.waitForTimeout(500);

  // Scroll to table
  await page.locator('[data-testid="pg-native-table"]').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  // Get detailed color info for all buttons
  const colorInfo = await page.evaluate(() => {
    const selectors = {
      edit: '[data-testid="pg-action-edit"]',
      delete: '[data-testid="pg-action-delete"]',
      view: '[data-testid="pg-action-view-btn"]',
      export: '[data-testid="pg-action-export-btn"]',
      archive: '[data-testid="pg-action-archive-btn"]',
    };
    const result = {};
    for (const [name, sel] of Object.entries(selectors)) {
      const el = document.querySelector(sel);
      if (el) {
        const style = window.getComputedStyle(el);
        result[name] = {
          backgroundColor: style.backgroundColor,
          color: style.color,
          borderColor: style.borderColor,
          borderWidth: style.borderWidth,
          borderStyle: style.borderStyle,
          classes: el.className,
          text: el.textContent.trim(),
        };
      }
    }
    return result;
  });

  console.log('\n=== ACTION BUTTON COLOR ANALYSIS ===\n');
  for (const [name, info] of Object.entries(colorInfo)) {
    console.log(`  ${name.toUpperCase()} ("${info.text}"):`);
    console.log(`    Background: ${info.backgroundColor}`);
    console.log(`    Text color: ${info.color}`);
    console.log(`    Border: ${info.borderWidth} ${info.borderStyle} ${info.borderColor}`);
    console.log(`    Classes: ${info.classes}`);
    console.log('');
  }

  // Analyze distinctness
  const textColors = Object.entries(colorInfo).map(([name, info]) => ({ name, color: info.color }));
  const bgColors = Object.entries(colorInfo).map(([name, info]) => ({ name, color: info.backgroundColor }));
  const borderColors = Object.entries(colorInfo).map(([name, info]) => ({ name, color: info.borderColor }));

  const uniqueTextColors = new Set(textColors.map(c => c.color));
  const uniqueBgColors = new Set(bgColors.map(c => c.color));
  const uniqueBorderColors = new Set(borderColors.map(c => c.color));

  console.log(`  Text colors: ${uniqueTextColors.size} unique out of ${textColors.length}`);
  console.log(`  Background colors: ${uniqueBgColors.size} unique out of ${bgColors.length}`);
  console.log(`  Border colors: ${uniqueBorderColors.size} unique out of ${borderColors.length}`);

  // The buttons are "ghost" style in dark mode - they use text color and border for distinction
  const isDistinct = uniqueTextColors.size >= 5 || uniqueBorderColors.size >= 5;
  console.log(`\n  Buttons visually distinct (by text/border color): ${isDistinct}`);

  // Take a zoomed screenshot of the actions column
  const firstActionsCell = page.locator('[data-testid="pg-action-edit"]').first();
  if (await firstActionsCell.count() > 0) {
    const parentRow = firstActionsCell.locator('xpath=ancestor::tr[1]');
    if (await parentRow.count() > 0) {
      await parentRow.scrollIntoViewIfNeeded();
      const box = await parentRow.boundingBox();
      if (box) {
        await page.screenshot({
          path: join(SCREENSHOT_DIR, 'actions-zoomed.png'),
          clip: { x: Math.max(0, box.x - 10), y: Math.max(0, box.y - 5), width: Math.min(box.width + 20, 1900), height: box.height + 10 },
        });
        console.log('  Saved zoomed screenshot: actions-zoomed.png');
      }
    }
  }

  // Full screenshot
  await page.screenshot({ path: join(SCREENSHOT_DIR, 'actions-full.png') });
  console.log('  Saved full screenshot: actions-full.png');

  await browser.close();
}

main().catch(e => { console.error(e); process.exit(1); });
