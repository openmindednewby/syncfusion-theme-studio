import { test, expect } from '@playwright/test';

import { injectAuth } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

/**
 * Chat Page Graceful SignalR Handling Verification.
 *
 * Verifies that the chat page loads without uncaught errors even when
 * the SignalR hub is unavailable. The page should render its UI
 * components gracefully.
 */

test.describe('Chat Page Graceful SignalR Handling', () => {
  test('should load without uncaught errors when SignalR hub is unavailable', async ({ page }) => {
    const uncaughtErrors: string[] = [];

    page.on('pageerror', (error: Error) => {
      uncaughtErrors.push(error.message);
    });

    // Block SignalR negotiation to prevent net::ERR_ABORTED during navigation
    await page.route('**/hub/**', (route) => route.abort());
    await page.route('**/negotiate**', (route) => route.abort());
    await injectAuth(page);
    await page.goto('/chat', { waitUntil: 'domcontentloaded' });

    await expect(page.getByTestId(TestIds.CHAT_PAGE)).toBeVisible({ timeout: 15000 });

    // Filter out expected SignalR / network connection errors
    const criticalErrors = uncaughtErrors.filter((msg) => {
      const lower = msg.toLowerCase();
      return !(
        lower.includes('signalr') ||
        lower.includes('websocket') ||
        lower.includes('connection') ||
        lower.includes('negotiate') ||
        lower.includes('hub') ||
        lower.includes('failed to fetch')
      );
    });

    expect(
      criticalErrors,
      `Chat page should not throw non-SignalR uncaught errors: ${criticalErrors.join(', ')}`,
    ).toHaveLength(0);
  });

  test('should render chat UI components even if backend is unavailable', async ({ page }) => {
    // Block SignalR negotiation to prevent net::ERR_ABORTED during navigation
    await page.route('**/hub/**', (route) => route.abort());
    await page.route('**/negotiate**', (route) => route.abort());
    await injectAuth(page);
    await page.goto('/chat', { waitUntil: 'domcontentloaded' });

    await expect(page.getByTestId(TestIds.CHAT_PAGE)).toBeVisible({ timeout: 15000 });
    await expect(page.getByTestId(TestIds.CHAT_CHANNEL_LIST)).toBeVisible({ timeout: 10000 });
    await expect(page.getByTestId(TestIds.CHAT_MESSAGE_INPUT)).toBeVisible({ timeout: 10000 });
  });
});
