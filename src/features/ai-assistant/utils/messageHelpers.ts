import { isValueDefined } from '@/utils/is';

import { SSE_DATA_PREFIX, SSE_DATA_PREFIX_LENGTH, SSE_DONE_SIGNAL } from '../constants';

import type { AiMessage } from '../types';

interface SseToken {
  token: string;
}

interface ProcessChunkResult {
  isDone: boolean;
  updatedMessages: AiMessage[];
}

/** Creates a unique message ID using timestamp and random suffix. */
export function createMessageId(): string {
  const ID_RADIX = 36;
  const ID_SLICE_START = 2;
  const ID_SLICE_END = 9;
  return `msg-${Date.now()}-${Math.random().toString(ID_RADIX).slice(ID_SLICE_START, ID_SLICE_END)}`;
}

/** Marks a streaming message as finalized in the message list. */
export function markStreamComplete(messages: AiMessage[], assistantId: string): AiMessage[] {
  return messages.map((m) =>
    m.id === assistantId ? { ...m, isStreaming: false } : m,
  );
}

/** Appends a token to the assistant message content. */
export function appendToken(messages: AiMessage[], assistantId: string, token: string): AiMessage[] {
  return messages.map((m) =>
    m.id === assistantId ? { ...m, content: m.content + token } : m,
  );
}

/** Checks whether a parsed value has the shape of an SseToken. */
function isSseTokenShape(value: unknown): value is SseToken {
  return typeof value === 'object' && isValueDefined(value) && 'token' in value;
}

/** Safely parses an SSE data line into an SseToken. Returns null if invalid. */
function parseSseToken(data: string): SseToken | null {
  try {
    const parsed: unknown = JSON.parse(data);
    if (isSseTokenShape(parsed)) return parsed;
    return null;
  } catch {
    return null;
  }
}

/** Parses an SSE chunk and returns updated messages plus done status. */
export function processChunk(
  chunk: string,
  assistantId: string,
  currentMessages: AiMessage[],
): ProcessChunkResult {
  const lines = chunk.split('\n');
  let updated = currentMessages;
  let isDone = false;

  for (const line of lines) {
    if (!line.startsWith(SSE_DATA_PREFIX)) continue;

    const data = line.slice(SSE_DATA_PREFIX_LENGTH).trim();
    if (data === SSE_DONE_SIGNAL) {
      isDone = true;
      break;
    }

    const token = parseSseToken(data);
    if (isValueDefined(token))
      updated = appendToken(updated, assistantId, token.token);
  }

  return { isDone, updatedMessages: updated };
}
