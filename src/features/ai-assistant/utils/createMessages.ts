import { AiMessageRole } from './ai-message-role';
import { createMessageId } from './messageHelpers';

import type { AiChatRequestMessage, AiMessage } from '../types';

interface NewMessagePair {
  userMsg: AiMessage;
  assistantMsg: AiMessage;
  assistantId: string;
}

/** Creates a user + placeholder assistant message pair for a new chat turn. */
export function createMessagePair(content: string): NewMessagePair {
  const assistantId = createMessageId();

  return {
    userMsg: {
      id: createMessageId(),
      role: AiMessageRole.User,
      content,
      timestamp: new Date(),
    },
    assistantMsg: {
      id: assistantId,
      role: AiMessageRole.Assistant,
      content: '',
      timestamp: new Date(),
      isStreaming: true,
    },
    assistantId,
  };
}

/** Builds the request payload from existing messages plus the new user input. */
export function buildRequestPayload(
  existing: AiMessage[],
  newContent: string,
): AiChatRequestMessage[] {
  return [
    ...existing.map((m) => ({ role: m.role, content: m.content })),
    { role: AiMessageRole.User, content: newContent },
  ];
}
