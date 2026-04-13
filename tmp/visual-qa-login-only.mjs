import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { join } from 'path';

const SCREENSHOT_DIR = join(import.meta.dirname, '..', 'qa-verify-screenshots');
mkdirSync(SCREENSHOT_DIR, { recursive: true });

const BASE_URL = 'http://localhost:4444';

async function run() {
  const browser = await chromium.launch({ headless: true });

  // Fresh context (no auth state)
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    colorScheme: 'dark'
  });
  const page = await ctx.newPage();

  // Set dark mode but NOT auth
  await page.addInitScript(() => {
    localStorage.setItem('mode-storage', JSON.stringify({ state: { mode: 'dark' } }));
    localStorage.removeItem('auth-storage');
  });

  await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  const url = page.url();
  console.log(`URL: ${url}`);

  await page.screenshot({
    path: join(SCREENSHOT_DIR, '05-login-desktop-unauthenticated.png'),
    fullPage: true
  });
  console.log('Screenshot saved: 05-login-desktop-unauthenticated.png');

  // Check for back link
  const check = await page.evaluate(() => {
    const text = document.body.innerText;
    const links = Array.from(document.querySelectorAll('a'));
    const backLink = links.find(a =>
      a.textContent.toLowerCase().includes('back to home')
    );
    return {
      hasBackToHome: /back to home/i.test(text),
      hasArrow: text.includes('\u2190') || text.includes('←'),
      linkFound: !!backLink,
      linkHref: backLink?.getAttribute('href'),
      linkText: backLink?.textContent.trim(),
      linkVisible: backLink ? getComputedStyle(backLink).display !== 'none' : false
    };
  });
  console.log('Back link check:', JSON.stringify(check, null, 2));

  if (check.linkFound && check.linkVisible) {
    console.log('[PASS] Login back-to-home link is present and visible');
  } else {
    console.log('[FAIL] Login back-to-home link NOT found');
  }

  await ctx.close();
  await browser.close();
}

run().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
