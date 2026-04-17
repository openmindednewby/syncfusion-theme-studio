import { test, expect } from '@playwright/test';

/**
 * Layer 2 -- scripted playthroughs. Tests the login page interaction
 * surface without requiring valid credentials.
 *
 * Since ThemeStudio is an auth-protected app, smoke tests focus on:
 *   - Login form is interactive (inputs accept text)
 *   - Theme preset picker is accessible from the login page if exposed
 *   - Navigation to public routes (e.g., /pricing) works
 *   - No JS crashes during interaction
 *
 * These tests do NOT test authenticated flows -- that's what the
 * existing e2e/ Playwright suite covers via the local dev server.
 */

test.describe('Login page interactions', () => {
  test('TS-01: login form accepts input without errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    const pageErrors: Error[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        if (text.includes('favicon') || text.includes('service-worker')) return;
        consoleErrors.push(text);
      }
    });
    page.on('pageerror', (err) => pageErrors.push(err));

    await page.goto('/login', { waitUntil: 'networkidle' });
    await page.waitForSelector('input', { timeout: 15_000 });

    // Find all input fields and type into the first one (email/username)
    const inputs = page.locator('input');
    const inputCount = await inputs.count();
    expect(inputCount, 'login form has at least one input').toBeGreaterThan(0);

    // Type into the first input
    await inputs.first().fill('smoke-test@example.com');
    const firstValue = await inputs.first().inputValue();
    expect(firstValue, 'input accepted typed text').toBe(
      'smoke-test@example.com'
    );

    // If there's a password field, type into it too
    const passwordInput = page.locator('input[type="password"]');
    if ((await passwordInput.count()) > 0) {
      await passwordInput.first().fill('smoke-test-password');
      const pwValue = await passwordInput.first().inputValue();
      expect(pwValue, 'password input accepted text').toBe(
        'smoke-test-password'
      );
    }

    await page.screenshot({ path: 'test-results/ts-01-login-form.png' });

    expect(pageErrors, 'no page errors during form interaction').toEqual([]);
    expect(consoleErrors, 'no console errors during form interaction').toEqual(
      []
    );
  });

  test('TS-02: pricing page loads without auth', async ({ page }) => {
    const consoleErrors: string[] = [];
    const pageErrors: Error[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        if (text.includes('favicon') || text.includes('service-worker')) return;
        consoleErrors.push(text);
      }
    });
    page.on('pageerror', (err) => pageErrors.push(err));

    await page.goto('/pricing', { waitUntil: 'networkidle' });

    // Wait for content to render
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'test-results/ts-02-pricing.png' });

    // The pricing page should render some visible content
    const bodyText = await page.locator('body').innerText();
    expect(
      bodyText.length,
      'pricing page has visible text content'
    ).toBeGreaterThan(0);

    expect(pageErrors, 'no page errors on pricing page').toEqual([]);
    expect(consoleErrors, 'no console errors on pricing page').toEqual([]);
  });
});
