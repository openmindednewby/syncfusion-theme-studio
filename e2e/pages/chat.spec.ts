import { test, expect } from '@playwright/test';

import { injectAuth } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

test.describe('Chat / Messaging Page', () => {
  test.beforeEach(async ({ page }) => {
    // Block SignalR negotiation to prevent net::ERR_ABORTED during navigation
    await page.route('**/hub/**', (route) => route.abort());
    await page.route('**/negotiate**', (route) => route.abort());
    await injectAuth(page);
    await page.goto('/chat', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId(TestIds.CHAT_PAGE)).toBeVisible({ timeout: 15000 });
  });

  test('should render the channel list panel', async ({ page }) => {
    await expect(page.getByTestId(TestIds.CHAT_CHANNEL_LIST)).toBeVisible();
  });

  test('should display at least one channel in the list', async ({ page }) => {
    const channels = page.getByTestId(TestIds.CHAT_CHANNEL_ITEM);
    await expect(channels.first()).toBeVisible({ timeout: 10000 });
  });

  test('should display the channel header for the active channel', async ({ page }) => {
    // The default channel is pre-selected, so the header should be visible
    await expect(page.getByTestId(TestIds.CHAT_CHANNEL_HEADER)).toBeVisible({ timeout: 10000 });
  });

  test('should display messages in the message list', async ({ page }) => {
    // Wait for messages to load for the default channel
    await expect(page.getByTestId(TestIds.CHAT_MESSAGE_LIST)).toBeVisible({ timeout: 10000 });

    // At least one message bubble should render from mock data
    const bubbles = page.getByTestId(TestIds.CHAT_MESSAGE_BUBBLE);
    await expect(bubbles.first()).toBeVisible({ timeout: 10000 });
  });

  test('should display the message input area', async ({ page }) => {
    await expect(page.getByTestId(TestIds.CHAT_MESSAGE_INPUT)).toBeVisible({ timeout: 10000 });
  });

  test('should switch channels when clicking a different channel', async ({ page }) => {
    const channels = page.getByTestId(TestIds.CHAT_CHANNEL_ITEM);
    await expect(channels.first()).toBeVisible({ timeout: 10000 });

    const channelCount = await channels.count();
    if (channelCount > 1) {
      // Click the second channel
      // eslint-disable-next-line no-fragile-selectors/no-fragile-selectors -- selecting by index is intentional here
      await channels.nth(1).click();

      // The channel header should update (re-render with new channel)
      await expect(page.getByTestId(TestIds.CHAT_CHANNEL_HEADER)).toBeVisible();

      // Message list should still be present
      await expect(page.getByTestId(TestIds.CHAT_MESSAGE_LIST)).toBeVisible({ timeout: 10000 });
    }
  });
});
