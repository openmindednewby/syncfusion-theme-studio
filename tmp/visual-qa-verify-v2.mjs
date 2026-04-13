import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { join } from 'path';

const SCREENSHOT_DIR = join(import.meta.dirname, '..', 'qa-verify-screenshots');
mkdirSync(SCREENSHOT_DIR, { recursive: true });

const BASE_URL = 'http://localhost:4444';
const DESKTOP = { width: 1280, height: 800 };
const MOBILE = { width: 375, height: 812 };

async function screenshot(page, name) {
  const path = join(SCREENSHOT_DIR, `${name}.png`);
  await page.screenshot({ path, fullPage: true });
  console.log(`  Screenshot saved: ${name}.png`);
  return path;
}

async function login(page) {
  console.log('  Logging in with Admin demo account...');
  await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1000);

  // Click the "Admin" quick login button
  const adminBtn = page.locator('button:has-text("Admin"), [class*="quick"] >> text=Admin').first();
  if (await adminBtn.isVisible()) {
    await adminBtn.click();
    console.log('  Clicked Admin quick login button');
  } else {
    // Try filling the form manually
    const usernameInput = page.locator('input[type="text"], input[type="email"], input[name*="user"], input[name*="email"]').first();
    const passwordInput = page.locator('input[type="password"]').first();
    await usernameInput.fill('admin@example.com');
    await passwordInput.fill('password');
    await page.locator('button:has-text("LOGIN")').click();
    console.log('  Filled login form manually');
  }

  // Wait for navigation away from login
  await page.waitForTimeout(3000);
  const url = page.url();
  console.log(`  Current URL after login: ${url}`);
  return !url.includes('/login');
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const results = {};

  // Create a persistent context with dark mode
  const ctx = await browser.newContext({
    viewport: DESKTOP,
    colorScheme: 'dark'
  });
  const page = await ctx.newPage();

  // Set dark mode
  await page.addInitScript(() => {
    localStorage.setItem('mode-storage', JSON.stringify({ state: { mode: 'dark' } }));
  });

  // Login first
  const loggedIn = await login(page);
  if (!loggedIn) {
    console.log('  WARNING: Login may not have succeeded. Continuing anyway...');
  }
  await screenshot(page, '00-after-login');

  // Read current URL and page state
  const afterLoginUrl = page.url();
  const afterLoginText = await page.evaluate(() => document.body.innerText.substring(0, 300));
  console.log(`  After login URL: ${afterLoginUrl}`);
  console.log(`  After login text: ${afterLoginText.substring(0, 200)}`);

  // ===== TEST 1: File Manager dark theme =====
  console.log('\n=== TEST 1: File Manager Dark Theme ===');
  try {
    await page.goto(`${BASE_URL}/file-manager`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000); // Syncfusion components need time to render
    const currentUrl = page.url();
    console.log(`  Current URL: ${currentUrl}`);

    if (currentUrl.includes('/login')) {
      console.log('  REDIRECT to login detected - need auth');
      results['file-manager'] = 'BLOCKED - redirected to login';
    } else {
      await screenshot(page, '01-file-manager-desktop-dark');

      // Check for large white/light rectangular areas
      const lightAreas = await page.evaluate(() => {
        const allElements = document.querySelectorAll('*');
        const lightElements = [];
        for (const el of allElements) {
          const style = getComputedStyle(el);
          const bg = style.backgroundColor;
          const match = bg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
          if (match) {
            const [, r, g, b] = match.map(Number);
            if (r > 200 && g > 200 && b > 200) {
              const rect = el.getBoundingClientRect();
              if (rect.width > 100 && rect.height > 100) {
                lightElements.push({
                  tag: el.tagName,
                  class: el.className.toString().substring(0, 100),
                  bg,
                  width: Math.round(rect.width),
                  height: Math.round(rect.height)
                });
              }
            }
          }
        }
        return lightElements;
      });
      console.log(`  Large light elements found: ${lightAreas.length}`);
      if (lightAreas.length > 0) {
        console.log('  Details:', JSON.stringify(lightAreas, null, 2));
      }
      results['file-manager'] = lightAreas.length === 0 ? 'PASS' : `FAIL - ${lightAreas.length} large light areas`;
    }
  } catch (err) {
    console.log('  ERROR:', err.message);
    results['file-manager'] = `ERROR: ${err.message}`;
  }

  // ===== TEST 2: Editor mobile layout =====
  console.log('\n=== TEST 2: Editor Layout ===');
  try {
    // Desktop first
    await page.setViewportSize(DESKTOP);
    await page.goto(`${BASE_URL}/editor`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);
    const editorUrl = page.url();
    console.log(`  Current URL: ${editorUrl}`);

    if (editorUrl.includes('/login')) {
      results['editor'] = 'BLOCKED - redirected to login';
    } else {
      await screenshot(page, '02a-editor-desktop');

      // Check sidebar on desktop
      const desktopInfo = await page.evaluate(() => {
        // Look for sidebar by common patterns
        const candidates = document.querySelectorAll(
          'aside, nav:not(header nav), [class*="sidebar"], [class*="Sidebar"], [class*="side-bar"], [class*="drawer"], [data-testid*="sidebar"]'
        );
        const sidebarInfo = [];
        for (const el of candidates) {
          const style = getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          sidebarInfo.push({
            tag: el.tagName,
            class: el.className.toString().substring(0, 100),
            display: style.display,
            visibility: style.visibility,
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            left: Math.round(rect.left)
          });
        }
        return { sidebars: sidebarInfo, bodyWidth: document.body.clientWidth };
      });
      console.log('  Desktop sidebar info:', JSON.stringify(desktopInfo, null, 2));

      const desktopSidebarVisible = desktopInfo.sidebars.some(
        s => s.display !== 'none' && s.visibility !== 'hidden' && s.width > 50 && s.height > 100
      );
      results['editor-desktop-sidebar'] = desktopSidebarVisible ? 'PASS' : 'NEEDS REVIEW';

      // Now test mobile
      await page.setViewportSize(MOBILE);
      await page.waitForTimeout(1500);
      await screenshot(page, '02b-editor-mobile');

      const mobileInfo = await page.evaluate(() => {
        const candidates = document.querySelectorAll(
          'aside, nav:not(header nav), [class*="sidebar"], [class*="Sidebar"], [class*="side-bar"], [class*="drawer"], [data-testid*="sidebar"]'
        );
        const sidebarInfo = [];
        for (const el of candidates) {
          const style = getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          sidebarInfo.push({
            tag: el.tagName,
            class: el.className.toString().substring(0, 100),
            display: style.display,
            visibility: style.visibility,
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            left: Math.round(rect.left),
            transform: style.transform
          });
        }

        // Find hamburger/menu toggle button
        const buttons = document.querySelectorAll('button, [role="button"]');
        const menuButtons = [];
        for (const btn of buttons) {
          const text = (btn.textContent || '').trim().toLowerCase();
          const label = (btn.getAttribute('aria-label') || '').toLowerCase();
          const cls = btn.className.toString().toLowerCase();
          const testId = (btn.getAttribute('data-testid') || '').toLowerCase();
          if (label.includes('menu') || label.includes('sidebar') || label.includes('toggle') ||
              label.includes('hamburger') || label.includes('navigation') ||
              cls.includes('hamburger') || cls.includes('menu-toggle') || cls.includes('sidebar-toggle') ||
              testId.includes('menu') || testId.includes('sidebar') || testId.includes('toggle')) {
            const rect = btn.getBoundingClientRect();
            menuButtons.push({
              tag: btn.tagName,
              label: btn.getAttribute('aria-label'),
              testId: btn.getAttribute('data-testid'),
              class: btn.className.toString().substring(0, 80),
              visible: getComputedStyle(btn).display !== 'none',
              width: Math.round(rect.width),
              height: Math.round(rect.height)
            });
          }
        }

        return { sidebars: sidebarInfo, menuButtons, viewportWidth: window.innerWidth };
      });
      console.log('  Mobile sidebar info:', JSON.stringify(mobileInfo, null, 2));

      const mobileSidebarHidden = mobileInfo.sidebars.every(
        s => s.display === 'none' || s.visibility === 'hidden' || s.width === 0 || s.left < -50 || s.left >= 375
      ) || mobileInfo.sidebars.length === 0;

      results['editor-mobile-sidebar-hidden'] = mobileSidebarHidden ? 'PASS' : 'FAIL';
      results['editor-mobile-hamburger'] = mobileInfo.menuButtons.length > 0 ? 'PASS' : 'NEEDS REVIEW';

      // Reset viewport
      await page.setViewportSize(DESKTOP);
    }
  } catch (err) {
    console.log('  ERROR:', err.message);
    results['editor'] = `ERROR: ${err.message}`;
  }

  // ===== TEST 3: Syncfusion Tabs =====
  console.log('\n=== TEST 3: Syncfusion Tabs ===');
  try {
    await page.setViewportSize(DESKTOP);
    await page.goto(`${BASE_URL}/components/tabs/syncfusion`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);
    const tabsUrl = page.url();
    console.log(`  Current URL: ${tabsUrl}`);

    if (tabsUrl.includes('/login')) {
      results['syncfusion-tabs'] = 'BLOCKED - redirected to login';
    } else {
      await screenshot(page, '03-syncfusion-tabs-desktop');

      const tabsInfo = await page.evaluate(() => {
        const text = document.body.innerText;
        return {
          hasBasicTabs: /basic\s*tabs?/i.test(text),
          hasIconTabs: /icon\s*tabs?/i.test(text),
          hasVerticalTabs: /vertical\s*tabs?/i.test(text),
          hasHome: text.includes('Home'),
          hasSearch: text.includes('Search'),
          hasProfile: text.includes('Profile'),
          headings: Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).map(h => h.textContent.trim()),
          tabComponents: document.querySelectorAll('.e-tab, [class*="e-tab"], [role="tablist"]').length,
          bodyPreview: text.substring(0, 1500)
        };
      });
      console.log('  Tabs page info:', JSON.stringify(tabsInfo, null, 2));

      const hasAllSections = tabsInfo.hasBasicTabs && tabsInfo.hasIconTabs && tabsInfo.hasVerticalTabs;
      const hasIcons = tabsInfo.hasHome && tabsInfo.hasSearch && tabsInfo.hasProfile;
      results['syncfusion-tabs'] = hasAllSections && hasIcons
        ? 'PASS'
        : `FAIL - Sections: Basic=${tabsInfo.hasBasicTabs} Icon=${tabsInfo.hasIconTabs} Vertical=${tabsInfo.hasVerticalTabs} | Icons: Home=${tabsInfo.hasHome} Search=${tabsInfo.hasSearch} Profile=${tabsInfo.hasProfile}`;
    }
  } catch (err) {
    console.log('  ERROR:', err.message);
    results['syncfusion-tabs'] = `ERROR: ${err.message}`;
  }

  // ===== SUMMARY =====
  console.log('\n\n========================================');
  console.log('  VISUAL QA VERIFICATION RESULTS');
  console.log('========================================');
  for (const [test, result] of Object.entries(results)) {
    const icon = result.startsWith('PASS') ? '[PASS]' :
                 result.startsWith('FAIL') ? '[FAIL]' :
                 result.startsWith('BLOCKED') ? '[SKIP]' : '[????]';
    console.log(`  ${icon} ${test}: ${result}`);
  }
  console.log('========================================\n');

  await ctx.close();
  await browser.close();
}

run().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
