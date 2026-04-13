import { describe, expect, it } from 'vitest';

import { AiMessageRole } from './ai-message-role';
import { buildRequestPayload, createMessagePair } from './createMessages';

import type { AiMessage } from '../types';

describe('createMessagePair', () => {
  it('creates a user message with the given content', () => {
    const result = createMessagePair('Hello');
    expect(result.userMsg.role).toBe(AiMessageRole.User);
    expect(result.userMsg.content).toBe('Hello');
  });

  it('creates an empty assistant message with isStreaming true', () => {
    const result = createMessagePair('Hello');
    expect(result.assistantMsg.role).toBe(AiMessageRole.Assistant);
    expect(result.assistantMsg.content).toBe('');
    expect(result.assistantMsg.isStreaming).toBe(true);
  });

  it('returns the assistant message id', () => {
    const result = createMessagePair('Hello');
    expect(result.assistantId).toBe(result.assistantMsg.id);
  });
});

describe('buildRequestPayload', () => {
  it('maps existing messages and appends the new content', () => {
    const existing: AiMessage[] = [
      {
        id: 'msg-1',
        role: AiMessageRole.User,
        content: 'first',
        timestamp: new Date(),
      },
      {
        id: 'msg-2',
        role: AiMessageRole.Assistant,
        content: 'response',
        timestamp: new Date(),
      },
    ];

    const result = buildRequestPayload(existing, 'second');

    expect(result).toHaveLength(3);
    expect(result[0]).toEqual({ role: AiMessageRole.User, content: 'first' });
    expect(result[1]).toEqual({ role: AiMessageRole.Assistant, content: 'response' });
    expect(result[2]).toEqual({ role: AiMessageRole.User, content: 'second' });
  });

  it('handles empty history', () => {
    const result = buildRequestPayload([], 'hello');
    expect(result).toHaveLength(1);
    expect(result[0]!.content).toBe('hello');
  });
});
