import { describe, it, expect } from 'vitest';

import {
  CHAT_API_BASE,
  CHAT_CHANNELS_URL,
  CHAT_HUB_URL,
  CHAT_QUERY_KEYS,
  CURRENT_USER,
  DEFAULT_CHANNEL_ID,
} from './constants';

describe('Chat constants', () => {
  it('defines API base path as a non-empty string', () => {
    expect(CHAT_API_BASE).toBe('/mockapi/api/chat');
  });

  it('derives channels URL from API base', () => {
    expect(CHAT_CHANNELS_URL).toBe(`${CHAT_API_BASE}/channels`);
  });

  it('defines SignalR hub URL', () => {
    expect(CHAT_HUB_URL).toBe('/mockapi/hubs/events');
  });

  it('sets default channel ID to 1', () => {
    expect(DEFAULT_CHANNEL_ID).toBe(1);
  });

  it('provides current user with name and avatar', () => {
    expect(CURRENT_USER.name).toBe('Admin User');
    expect(CURRENT_USER.avatar).toBe('AU');
  });
});

describe('CHAT_QUERY_KEYS', () => {
  it('returns a stable channels query key', () => {
    expect(CHAT_QUERY_KEYS.channels).toEqual(['chat-channels']);
  });

  it('returns a channel-specific messages query key', () => {
    const key = CHAT_QUERY_KEYS.messages(5);
    expect(key).toEqual(['chat-messages', 5]);
  });

  it('produces different keys for different channel IDs', () => {
    const key1 = CHAT_QUERY_KEYS.messages(1);
    const key2 = CHAT_QUERY_KEYS.messages(2);
    expect(key1).not.toEqual(key2);
  });

  it('includes the channel ID as the second element', () => {
    const channelId = 42;
    const key = CHAT_QUERY_KEYS.messages(channelId);
    expect(key[1]).toBe(channelId);
  });
});
