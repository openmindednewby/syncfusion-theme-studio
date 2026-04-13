/** API base paths and configuration for chat feature. */

export const CHAT_API_BASE = '/mockapi/api/chat';

export const CHAT_CHANNELS_URL = `${CHAT_API_BASE}/channels`;

/** SignalR hub URL for real-time chat. */
export const CHAT_HUB_URL = '/mockapi/hubs/events';

/** Query keys for TanStack Query cache management. */
export const CHAT_QUERY_KEYS = {
  channels: ['chat-channels'] as const,
  messages: (channelId: number) => ['chat-messages', channelId] as const,
} as const;

/** Default channel ID to select on page load. */
export const DEFAULT_CHANNEL_ID = 1;

/** Current user info for demo purposes. */
export const CURRENT_USER = {
  name: 'Admin User',
  avatar: 'AU',
} as const;
