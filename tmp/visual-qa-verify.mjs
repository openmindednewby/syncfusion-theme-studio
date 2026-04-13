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

async function run() {
  const browser = await chromium.launch({ headless: true });
  const results = {};

  // ===== TEST 1: File Manager dark theme =====
  console.log('\n=== TEST 1: File Manager Dark Theme ===');
  try {
    const ctx = await browser.newContext({ viewport: DESKTOP, colorScheme: 'dark' });
    const page = await ctx.newPage();
    // Set dark mode in localStorage before navigating
    await page.addInitScript(() => {
      localStorage.setItem('mode-storage', JSON.stringify({ state: { mode: 'dark' } }));
    });
    await page.goto(`${BASE_URL}/file-manager`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000); // Let Syncfusion components render
    await screenshot(page, '01-file-manager-desktop-dark');

    // Check for large white/light areas by looking at background colors
    const bgColors = await page.evaluate(() => {
      const elements = document.querySelectorAll('.e-filemanager, .e-treeview, .e-grid, .e-splitter, .e-layout-content, [class*="file-manager"], [class*="preview"]');
      const colors = [];
      elements.forEach(el => {
        const style = getComputedStyle(el);
        colors.push({
          tag: el.tagName,
          class: el.className.substring(0, 80),
          bg: style.backgroundColor,
          color: style.color
        });
      });
      return colors;
    });
    console.log('  Background colors found:', JSON.stringify(bgColors, null, 2));

    // Check if there are any elements with white/light backgrounds
    const lightBgs = await page.evaluate(() => {
      const allElements = document.querySelectorAll('*');
      const lightElements = [];
      for (const el of allElements) {
        const style = getComputedStyle(el);
        const bg = style.backgroundColor;
        // Parse rgb values
        const match = bg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (match) {
          const [, r, g, b] = match.map(Number);
          // Check if it's a light color (high luminance) and the element is visible with significant size
          if (r > 200 && g > 200 && b > 200) {
            const rect = el.getBoundingClientRect();
            if (rect.width > 100 && rect.height > 100) {
              lightElements.push({
                tag: el.tagName,
                class: el.className.toString().substring(0, 80),
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
    console.log('  Large light-colored elements:', JSON.stringify(lightBgs, null, 2));
    results['file-manager'] = lightBgs.length === 0 ? 'PASS' : `FAIL - ${lightBgs.length} large light elements found`;
    await ctx.close();
  } catch (err) {
    console.log('  ERROR:', err.message);
    results['file-manager'] = `ERROR: ${err.message}`;
  }

  // ===== TEST 2: Editor mobile layout =====
  console.log('\n=== TEST 2: Editor Mobile Layout ===');
  try {
    // Desktop first
    const ctxDesktop = await browser.newContext({ viewport: DESKTOP, colorScheme: 'dark' });
    const pageDesktop = await ctxDesktop.newPage();
    await pageDesktop.addInitScript(() => {
      localStorage.setItem('mode-storage', JSON.stringify({ state: { mode: 'dark' } }));
    });
    await pageDesktop.goto(`${BASE_URL}/editor`, { waitUntil: 'networkidle', timeout: 30000 });
    await pageDesktop.waitForTimeout(2000);
    await screenshot(pageDesktop, '02a-editor-desktop');

    // Check sidebar visibility on desktop
    const sidebarDesktop = await pageDesktop.evaluate(() => {
      const sidebar = document.querySelector('[class*="sidebar"], [class*="Sidebar"], nav, aside');
      if (!sidebar) return { found: false };
      const style = getComputedStyle(sidebar);
      const rect = sidebar.getBoundingClientRect();
      return {
        found: true,
        visible: style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0,
        width: Math.round(rect.width),
        tag: sidebar.tagName,
        class: sidebar.className.toString().substring(0, 80)
      };
    });
    console.log('  Desktop sidebar:', JSON.stringify(sidebarDesktop));
    await ctxDesktop.close();

    // Mobile
    const ctxMobile = await browser.newContext({ viewport: MOBILE, colorScheme: 'dark' });
    const pageMobile = await ctxMobile.newPage();
    await pageMobile.addInitScript(() => {
      localStorage.setItem('mode-storage', JSON.stringify({ state: { mode: 'dark' } }));
    });
    await pageMobile.goto(`${BASE_URL}/editor`, { waitUntil: 'networkidle', timeout: 30000 });
    await pageMobile.waitForTimeout(2000);
    await screenshot(pageMobile, '02b-editor-mobile');

    // Check sidebar visibility on mobile
    const sidebarMobile = await pageMobile.evaluate(() => {
      const sidebar = document.querySelector('[class*="sidebar"], [class*="Sidebar"], nav, aside');
      if (!sidebar) return { found: false };
      const style = getComputedStyle(sidebar);
      const rect = sidebar.getBoundingClientRect();
      return {
        found: true,
        visible: style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0,
        offscreen: rect.right <= 0 || rect.left >= 375,
        width: Math.round(rect.width),
        left: Math.round(rect.left),
        tag: sidebar.tagName,
        class: sidebar.className.toString().substring(0, 80)
      };
    });
    console.log('  Mobile sidebar:', JSON.stringify(sidebarMobile));

    // Check for hamburger menu button
    const hamburger = await pageMobile.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      const hamburgers = [];
      for (const btn of buttons) {
        const text = btn.textContent.trim();
        const ariaLabel = btn.getAttribute('aria-label') || '';
        const svg = btn.querySelector('svg');
        const hasMenuIcon = ariaLabel.toLowerCase().includes('menu') ||
                           ariaLabel.toLowerCase().includes('sidebar') ||
                           ariaLabel.toLowerCase().includes('toggle') ||
                           text.toLowerCase().includes('menu') ||
                           btn.className.toString().toLowerCase().includes('hamburger') ||
                           btn.className.toString().toLowerCase().includes('menu-toggle');
        if (hasMenuIcon || (svg && btn.getBoundingClientRect().width < 60)) {
          hamburgers.push({
            ariaLabel,
            text: text.substring(0, 30),
            class: btn.className.toString().substring(0, 80),
            visible: getComputedStyle(btn).display !== 'none'
          });
        }
      }
      return hamburgers;
    });
    console.log('  Hamburger buttons found:', JSON.stringify(hamburger));

    const sidebarHidden = !sidebarMobile.visible || sidebarMobile.offscreen;
    results['editor-mobile'] = sidebarHidden ? 'PASS' : 'FAIL - sidebar still visible on mobile';
    results['editor-desktop'] = sidebarDesktop.visible ? 'PASS' : 'FAIL - sidebar not visible on desktop';
    results['editor-hamburger'] = hamburger.length > 0 ? 'PASS' : 'NEEDS REVIEW - no hamburger button found';
    await ctxMobile.close();
  } catch (err) {
    console.log('  ERROR:', err.message);
    results['editor'] = `ERROR: ${err.message}`;
  }

  // ===== TEST 3: Syncfusion Tabs =====
  console.log('\n=== TEST 3: Syncfusion Tabs ===');
  try {
    const ctx = await browser.newContext({ viewport: DESKTOP, colorScheme: 'dark' });
    const page = await ctx.newPage();
    await page.addInitScript(() => {
      localStorage.setItem('mode-storage', JSON.stringify({ state: { mode: 'dark' } }));
    });
    await page.goto(`${BASE_URL}/components/tabs/syncfusion`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);
    await screenshot(page, '03-syncfusion-tabs-desktop');

    // Check for the 3 sections
    const sections = await page.evaluate(() => {
      const text = document.body.innerText;
      const hasBasicTabs = text.includes('Basic Tabs') || text.includes('basic tabs') || text.includes('Basic Tab');
      const hasIconTabs = text.includes('Icon Tabs') || text.includes('icon tabs') || text.includes('Icon Tab');
      const hasVerticalTabs = text.includes('Vertical Tabs') || text.includes('vertical tabs') || text.includes('Vertical Tab');

      // Also check for Home/Search/Profile icons/text
      const hasHome = text.includes('Home');
      const hasSearch = text.includes('Search');
      const hasProfile = text.includes('Profile');

      // Count headings or section containers
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      const headingTexts = headings.map(h => h.textContent.trim());

      return {
        hasBasicTabs,
        hasIconTabs,
        hasVerticalTabs,
        hasHome,
        hasSearch,
        hasProfile,
        headingTexts,
        bodyTextPreview: text.substring(0, 1000)
      };
    });
    console.log('  Sections found:', JSON.stringify(sections, null, 2));

    const allThree = sections.hasBasicTabs && sections.hasIconTabs && sections.hasVerticalTabs;
    const hasIcons = sections.hasHome && sections.hasSearch && sections.hasProfile;
    results['syncfusion-tabs'] = allThree && hasIcons ? 'PASS' : `FAIL - Basic:${sections.hasBasicTabs} Icon:${sections.hasIconTabs} Vertical:${sections.hasVerticalTabs} Icons(H/S/P):${sections.hasHome}/${sections.hasSearch}/${sections.hasProfile}`;
    await ctx.close();
  } catch (err) {
    console.log('  ERROR:', err.message);
    results['syncfusion-tabs'] = `ERROR: ${err.message}`;
  }

  // ===== TEST 4: Pricing - no trial banner =====
  console.log('\n=== TEST 4: Pricing - No Trial Banner ===');
  try {
    const ctx = await browser.newContext({ viewport: DESKTOP, colorScheme: 'dark' });
    const page = await ctx.newPage();
    await page.addInitScript(() => {
      localStorage.setItem('mode-storage', JSON.stringify({ state: { mode: 'dark' } }));
    });
    await page.goto(`${BASE_URL}/pricing`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);
    await screenshot(page, '04-pricing-desktop');

    // Check for trial banner
    const trialBanner = await page.evaluate(() => {
      const text = document.body.innerText.toLowerCase();
      const hasTrial = text.includes('trial') || text.includes('trial version') || text.includes('license');

      // Check for light-blue banner elements
      const allElements = document.querySelectorAll('*');
      const lightBlueBanners = [];
      for (const el of allElements) {
        const style = getComputedStyle(el);
        const bg = style.backgroundColor;
        const match = bg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (match) {
          const [, r, g, b] = match.map(Number);
          // Light blue: high blue, moderate-high red and green
          if (b > 200 && r > 150 && g > 180 && r < 250) {
            const rect = el.getBoundingClientRect();
            if (rect.width > 200 && rect.height > 20) {
              lightBlueBanners.push({
                tag: el.tagName,
                class: el.className.toString().substring(0, 80),
                bg,
                text: el.textContent.substring(0, 100),
                width: Math.round(rect.width),
                height: Math.round(rect.height)
              });
            }
          }
        }
      }

      // Also check for Syncfusion-specific trial banner classes
      const sfBanner = document.querySelector('.e-license-banner, .e-trial-banner, [class*="trial"], [class*="license-banner"]');

      return {
        hasTrialText: hasTrial,
        lightBlueBanners,
        sfBannerFound: !!sfBanner,
        sfBannerText: sfBanner ? sfBanner.textContent.substring(0, 200) : null,
        bodyTextPreview: document.body.innerText.substring(0, 500)
      };
    });
    console.log('  Trial banner check:', JSON.stringify(trialBanner, null, 2));

    const noBanner = !trialBanner.sfBannerFound && trialBanner.lightBlueBanners.length === 0;
    results['pricing-no-banner'] = noBanner ? 'PASS' : 'FAIL - trial banner detected';
    await ctx.close();
  } catch (err) {
    console.log('  ERROR:', err.message);
    results['pricing'] = `ERROR: ${err.message}`;
  }

  // ===== TEST 5: Login - Back to home link =====
  console.log('\n=== TEST 5: Login - Back to Home Link ===');
  try {
    const ctx = await browser.newContext({ viewport: DESKTOP, colorScheme: 'dark' });
    const page = await ctx.newPage();
    await page.addInitScript(() => {
      localStorage.setItem('mode-storage', JSON.stringify({ state: { mode: 'dark' } }));
    });
    await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);
    await screenshot(page, '05-login-desktop');

    // Check for "Back to home" link
    const backLink = await page.evaluate(() => {
      const links = document.querySelectorAll('a, button');
      const matches = [];
      for (const el of links) {
        const text = el.textContent.trim().toLowerCase();
        const ariaLabel = (el.getAttribute('aria-label') || '').toLowerCase();
        if (text.includes('back to home') || text.includes('back') || text.includes('home') ||
            ariaLabel.includes('back to home') || ariaLabel.includes('back')) {
          matches.push({
            tag: el.tagName,
            text: el.textContent.trim().substring(0, 60),
            href: el.getAttribute('href'),
            visible: getComputedStyle(el).display !== 'none' && getComputedStyle(el).visibility !== 'hidden'
          });
        }
      }

      // Also get all visible text to search for the arrow pattern
      const bodyText = document.body.innerText;
      const hasBackToHome = bodyText.includes('Back to home') || bodyText.includes('back to home') || bodyText.includes('Back to Home');
      const hasArrowBack = bodyText.includes('← Back') || bodyText.includes('← back') || bodyText.includes('\u2190 Back');

      return {
        matches,
        hasBackToHome,
        hasArrowBack,
        bodyTextPreview: bodyText.substring(0, 800)
      };
    });
    console.log('  Back to home link:', JSON.stringify(backLink, null, 2));

    const found = backLink.hasBackToHome || backLink.hasArrowBack || backLink.matches.some(m => m.visible && (m.text.toLowerCase().includes('back to home') || m.text.includes('\u2190')));
    results['login-back-link'] = found ? 'PASS' : 'FAIL - no "Back to home" link found';
    await ctx.close();
  } catch (err) {
    console.log('  ERROR:', err.message);
    results['login'] = `ERROR: ${err.message}`;
  }

  // ===== SUMMARY =====
  console.log('\n\n========================================');
  console.log('  VISUAL QA VERIFICATION RESULTS');
  console.log('========================================');
  for (const [test, result] of Object.entries(results)) {
    const icon = result.startsWith('PASS') ? '[PASS]' : result.startsWith('FAIL') ? '[FAIL]' : '[????]';
    console.log(`  ${icon} ${test}: ${result}`);
  }
  console.log('========================================\n');

  await browser.close();
}

run().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
