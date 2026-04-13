import type { AiMessageRole } from './utils/ai-message-role';

export interface AiMessage {
  id: string;
  role: AiMessageRole;
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

export interface AiSuggestion {
  id: string;
  label: string;
  icon: string;
}

export interface AiChatRequestMessage {
  role: string;
  content: string;
}
