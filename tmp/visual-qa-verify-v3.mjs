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
  console.log(`  Screenshot: ${name}.png`);
  return path;
}

async function login(page) {
  console.log('  Logging in...');
  await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1000);

  // Click Admin quick login button (fills the form)
  const adminBtn = page.locator('[data-testid="login-demo-admin"]');
  if (await adminBtn.isVisible({ timeout: 3000 })) {
    await adminBtn.click();
    console.log('  Clicked Admin demo button (fills form)');
    await page.waitForTimeout(500);
  }

  // Now click the LOGIN button to submit
  const loginBtn = page.locator('button:has-text("LOGIN")');
  if (await loginBtn.isVisible({ timeout: 3000 })) {
    await loginBtn.click();
    console.log('  Clicked LOGIN button');
  }

  // Wait for redirect
  await page.waitForTimeout(3000);
  const url = page.url();
  console.log(`  After login URL: ${url}`);

  // If still on login, try direct localStorage injection approach
  if (url.includes('/login')) {
    console.log('  Login via UI didn\'t redirect. Injecting auth state directly...');
    await page.evaluate(() => {
      const authState = {
        state: {
          token: 'mock-jwt-injected',
          user: { email: 'admin@example.com', name: 'Admin User', role: 'Admin' }
        },
        version: 2
      };
      localStorage.setItem('auth-storage', JSON.stringify(authState));
    });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);
    console.log(`  After injection URL: ${page.url()}`);
  }

  return !page.url().includes('/login');
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const results = {};

  const ctx = await browser.newContext({ viewport: DESKTOP, colorScheme: 'dark' });
  const page = await ctx.newPage();

  // Set dark mode before any page load
  await page.addInitScript(() => {
    localStorage.setItem('mode-storage', JSON.stringify({ state: { mode: 'dark' } }));
  });

  // Login
  const loggedIn = await login(page);
  console.log(`  Login successful: ${loggedIn}`);
  await screenshot(page, '00-after-login');

  // ===== TEST 1: File Manager dark theme =====
  console.log('\n=== TEST 1: File Manager Dark Theme (Desktop 1280x800) ===');
  try {
    await page.goto(`${BASE_URL}/file-manager`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(4000); // Syncfusion components need extra render time
    const url = page.url();
    console.log(`  URL: ${url}`);

    if (url.includes('/login')) {
      results['1-file-manager-dark'] = 'BLOCKED - auth redirect';
    } else {
      await screenshot(page, '01-file-manager-desktop-dark');

      // Check for large white/light rectangular areas (the original bug)
      const analysis = await page.evaluate(() => {
        const allElements = document.querySelectorAll('*');
        const lightAreas = [];
        for (const el of allElements) {
          const style = getComputedStyle(el);
          const bg = style.backgroundColor;
          const match = bg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
          if (match) {
            const [, r, g, b] = match.map(Number);
            // White or near-white backgrounds
            if (r > 220 && g > 220 && b > 220) {
              const rect = el.getBoundingClientRect();
              // Only flag large areas (panel-sized)
              if (rect.width > 150 && rect.height > 150) {
                lightAreas.push({
                  tag: el.tagName,
                  cls: el.className.toString().substring(0, 120),
                  bg, w: Math.round(rect.width), h: Math.round(rect.height)
                });
              }
            }
          }
        }
        return { lightAreas, pageTitle: document.title };
      });

      if (analysis.lightAreas.length > 0) {
        console.log('  FAIL: Large light areas found:');
        analysis.lightAreas.forEach(a => console.log(`    ${a.tag} (${a.w}x${a.h}) bg=${a.bg} class="${a.cls}"`));
        results['1-file-manager-dark'] = 'FAIL - white/light areas in dark mode';
      } else {
        console.log('  No large light areas detected - dark theme looks correct');
        results['1-file-manager-dark'] = 'PASS';
      }
    }
  } catch (err) {
    console.log('  ERROR:', err.message);
    results['1-file-manager-dark'] = `ERROR: ${err.message}`;
  }

  // ===== TEST 2: Editor Layout =====
  console.log('\n=== TEST 2: Editor Layout ===');
  try {
    // Desktop viewport
    await page.setViewportSize(DESKTOP);
    await page.goto(`${BASE_URL}/editor`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);
    const url = page.url();
    console.log(`  URL: ${url}`);

    if (url.includes('/login')) {
      results['2a-editor-desktop'] = 'BLOCKED - auth redirect';
      results['2b-editor-mobile'] = 'BLOCKED - auth redirect';
    } else {
      await screenshot(page, '02a-editor-desktop');

      // Desktop: check sidebar visible
      const desktopCheck = await page.evaluate(() => {
        const sidebar = document.querySelector('aside, [class*="sidebar" i], [class*="side-panel" i], [data-testid*="sidebar" i]');
        if (!sidebar) {
          // Maybe it's part of the layout, check for the main nav pattern
          const nav = document.querySelector('.e-sidebar, [class*="richtexteditor"] aside, .e-rte-toolbar');
          return { found: !!nav, type: 'nav-toolbar', visible: !!nav };
        }
        const style = getComputedStyle(sidebar);
        const rect = sidebar.getBoundingClientRect();
        return {
          found: true,
          type: 'sidebar',
          visible: style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0,
          width: Math.round(rect.width),
          cls: sidebar.className.toString().substring(0, 100)
        };
      });
      console.log('  Desktop sidebar:', JSON.stringify(desktopCheck));
      results['2a-editor-desktop'] = desktopCheck.found && desktopCheck.visible ? 'PASS' : 'NEEDS VISUAL REVIEW';

      // Mobile viewport
      await page.setViewportSize(MOBILE);
      await page.waitForTimeout(2000);
      await screenshot(page, '02b-editor-mobile');

      const mobileCheck = await page.evaluate(() => {
        const sidebar = document.querySelector('aside, [class*="sidebar" i], [class*="side-panel" i]');
        const hamburger = document.querySelector(
          'button[aria-label*="menu" i], button[aria-label*="sidebar" i], button[aria-label*="toggle" i], ' +
          'button[data-testid*="menu" i], button[data-testid*="sidebar" i], ' +
          '[class*="hamburger" i], [class*="menu-toggle" i]'
        );

        let sidebarVisible = false;
        if (sidebar) {
          const style = getComputedStyle(sidebar);
          const rect = sidebar.getBoundingClientRect();
          sidebarVisible = style.display !== 'none' && style.visibility !== 'hidden' &&
                          rect.width > 0 && rect.left >= 0 && rect.left < window.innerWidth;
        }

        return {
          sidebarFound: !!sidebar,
          sidebarVisible,
          hamburgerFound: !!hamburger,
          hamburgerVisible: hamburger ? getComputedStyle(hamburger).display !== 'none' : false,
          contentReadable: document.querySelector('main, [class*="content" i], [class*="editor" i]') !== null
        };
      });
      console.log('  Mobile check:', JSON.stringify(mobileCheck));

      results['2b-editor-mobile'] = (!mobileCheck.sidebarVisible || !mobileCheck.sidebarFound) ? 'PASS' : 'FAIL - sidebar visible on mobile';
      results['2c-editor-hamburger'] = mobileCheck.hamburgerFound ? 'PASS' : 'NEEDS VISUAL REVIEW';

      // Reset viewport
      await page.setViewportSize(DESKTOP);
    }
  } catch (err) {
    console.log('  ERROR:', err.message);
    results['2-editor'] = `ERROR: ${err.message}`;
  }

  // ===== TEST 3: Syncfusion Tabs =====
  console.log('\n=== TEST 3: Syncfusion Tabs ===');
  try {
    await page.setViewportSize(DESKTOP);
    await page.goto(`${BASE_URL}/components/tabs/syncfusion`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(4000);
    const url = page.url();
    console.log(`  URL: ${url}`);

    if (url.includes('/login')) {
      results['3-syncfusion-tabs'] = 'BLOCKED - auth redirect';
    } else {
      await screenshot(page, '03-syncfusion-tabs-desktop');

      const tabsCheck = await page.evaluate(() => {
        const text = document.body.innerText;
        const headings = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).map(h => h.textContent.trim());

        return {
          basicTabs: /basic\s*tabs?/i.test(text),
          iconTabs: /icon\s*tabs?/i.test(text),
          verticalTabs: /vertical\s*tabs?/i.test(text),
          home: /\bhome\b/i.test(text),
          search: /\bsearch\b/i.test(text),
          profile: /\bprofile\b/i.test(text),
          headings,
          tablistCount: document.querySelectorAll('[role="tablist"]').length,
          eTabCount: document.querySelectorAll('.e-tab').length,
          textSample: text.substring(0, 2000)
        };
      });
      console.log('  Tabs check:', JSON.stringify(tabsCheck, null, 2));

      const has3Sections = tabsCheck.basicTabs && tabsCheck.iconTabs && tabsCheck.verticalTabs;
      const hasIcons = tabsCheck.home && tabsCheck.search && tabsCheck.profile;

      if (has3Sections && hasIcons) {
        results['3-syncfusion-tabs'] = 'PASS';
      } else {
        results['3-syncfusion-tabs'] = `FAIL - Basic:${tabsCheck.basicTabs} Icon:${tabsCheck.iconTabs} Vertical:${tabsCheck.verticalTabs} Home:${tabsCheck.home} Search:${tabsCheck.search} Profile:${tabsCheck.profile}`;
      }
    }
  } catch (err) {
    console.log('  ERROR:', err.message);
    results['3-syncfusion-tabs'] = `ERROR: ${err.message}`;
  }

  // ===== TEST 4: Pricing - no trial banner =====
  // (Already verified via screenshot, but run again in this session for completeness)
  console.log('\n=== TEST 4: Pricing - No Trial Banner ===');
  try {
    await page.goto(`${BASE_URL}/pricing`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);
    await screenshot(page, '04-pricing-desktop');

    const pricingCheck = await page.evaluate(() => {
      // Look for Syncfusion trial banner (specific class or light-blue banner)
      const sfBanner = document.querySelector('.e-license-banner, [class*="trial-banner"], [class*="license-banner"]');

      // Also scan for light-blue banners at top
      const topElements = [];
      const allElements = document.querySelectorAll('*');
      for (const el of allElements) {
        const rect = el.getBoundingClientRect();
        if (rect.top < 60 && rect.width > 200 && rect.height > 20 && rect.height < 80) {
          const style = getComputedStyle(el);
          const bg = style.backgroundColor;
          const match = bg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
          if (match) {
            const [, r, g, b] = match.map(Number);
            // Light blue detection
            if (b > 180 && r > 140 && g > 170 && (b - r > 20 || b - g > 10)) {
              topElements.push({
                tag: el.tagName,
                cls: el.className.toString().substring(0, 80),
                bg, text: el.textContent.substring(0, 100)
              });
            }
          }
        }
      }

      return {
        sfBanner: !!sfBanner,
        sfBannerText: sfBanner ? sfBanner.textContent.substring(0, 200) : null,
        lightBlueBanners: topElements
      };
    });
    console.log('  Pricing check:', JSON.stringify(pricingCheck, null, 2));

    results['4-pricing-no-banner'] = (!pricingCheck.sfBanner && pricingCheck.lightBlueBanners.length === 0) ? 'PASS' : 'FAIL';
  } catch (err) {
    console.log('  ERROR:', err.message);
    results['4-pricing'] = `ERROR: ${err.message}`;
  }

  // ===== TEST 5: Login - Back to home =====
  console.log('\n=== TEST 5: Login - Back to Home Link ===');
  try {
    // Logout first if needed, or just navigate
    await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);
    await screenshot(page, '05-login-desktop');

    const loginCheck = await page.evaluate(() => {
      const text = document.body.innerText;
      const hasBackToHome = text.includes('Back to home') || text.includes('Back to Home');
      const hasArrow = text.includes('\u2190') || text.includes('←');

      // Find the actual link
      const links = Array.from(document.querySelectorAll('a'));
      const backLink = links.find(a =>
        a.textContent.includes('Back to home') || a.textContent.includes('Back to Home')
      );

      return {
        hasBackToHome,
        hasArrow,
        linkFound: !!backLink,
        linkHref: backLink ? backLink.getAttribute('href') : null,
        linkText: backLink ? backLink.textContent.trim() : null,
        linkVisible: backLink ? getComputedStyle(backLink).display !== 'none' : false
      };
    });
    console.log('  Login check:', JSON.stringify(loginCheck));

    results['5-login-back-link'] = (loginCheck.linkFound && loginCheck.linkVisible) ? 'PASS' : 'FAIL';
  } catch (err) {
    console.log('  ERROR:', err.message);
    results['5-login'] = `ERROR: ${err.message}`;
  }

  // ===== FINAL SUMMARY =====
  console.log('\n\n========================================');
  console.log('  VISUAL QA VERIFICATION SUMMARY');
  console.log('========================================');
  for (const [test, result] of Object.entries(results)) {
    const icon = result.startsWith('PASS') ? '[PASS]' :
                 result.startsWith('FAIL') ? '[FAIL]' :
                 result.startsWith('BLOCKED') ? '[SKIP]' :
                 result.startsWith('NEEDS') ? '[????]' : '[ERR ]';
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
