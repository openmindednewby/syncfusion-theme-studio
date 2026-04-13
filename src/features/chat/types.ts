/** Data types for the chat feature. */

export interface ChatChannel {
  id: number;
  name: string;
  description: string;
  icon: string;
  createdAt: string;
}

export interface ChatMessage {
  id: number;
  channelId: number;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
}
