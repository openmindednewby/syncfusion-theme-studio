import { describe, expect, it } from 'vitest';

import { AiMessageRole } from './ai-message-role';
import { appendToken, createMessageId, markStreamComplete, processChunk } from './messageHelpers';

import type { AiMessage } from '../types';

function makeMessage(overrides: Partial<AiMessage> = {}): AiMessage {
  return {
    id: 'msg-1',
    role: AiMessageRole.User,
    content: 'hello',
    timestamp: new Date(),
    ...overrides,
  };
}

describe('createMessageId', () => {
  it('returns a string starting with msg-', () => {
    const id = createMessageId();
    expect(id.startsWith('msg-')).toBe(true);
  });

  it('generates unique IDs', () => {
    const id1 = createMessageId();
    const id2 = createMessageId();
    expect(id1).not.toBe(id2);
  });
});

describe('markStreamComplete', () => {
  it('sets isStreaming to false for the matching message', () => {
    const messages: AiMessage[] = [
      makeMessage({ id: 'msg-1', isStreaming: true }),
      makeMessage({ id: 'msg-2', isStreaming: true }),
    ];

    const result = markStreamComplete(messages, 'msg-1');

    expect(result[0]!.isStreaming).toBe(false);
    expect(result[1]!.isStreaming).toBe(true);
  });

  it('does not modify messages that do not match', () => {
    const messages: AiMessage[] = [makeMessage({ id: 'msg-1', content: 'test' })];
    const result = markStreamComplete(messages, 'msg-999');
    expect(result[0]!.content).toBe('test');
  });
});

describe('appendToken', () => {
  it('appends token to the matching message content', () => {
    const messages: AiMessage[] = [
      makeMessage({ id: 'msg-1', content: 'Hello ' }),
    ];

    const result = appendToken(messages, 'msg-1', 'world');
    expect(result[0]!.content).toBe('Hello world');
  });

  it('leaves non-matching messages unchanged', () => {
    const messages: AiMessage[] = [
      makeMessage({ id: 'msg-1', content: 'a' }),
      makeMessage({ id: 'msg-2', content: 'b' }),
    ];

    const result = appendToken(messages, 'msg-1', 'x');
    expect(result[0]!.content).toBe('ax');
    expect(result[1]!.content).toBe('b');
  });
});

describe('processChunk', () => {
  it('parses SSE data lines and appends tokens', () => {
    const messages: AiMessage[] = [
      makeMessage({ id: 'assistant-1', role: AiMessageRole.Assistant, content: '' }),
    ];

    const chunk = 'data: {"token":"Hello "}\n\ndata: {"token":"world"}\n\n';
    const result = processChunk(chunk, 'assistant-1', messages);

    expect(result.isDone).toBe(false);
    expect(result.updatedMessages[0]!.content).toBe('Hello world');
  });

  it('detects [DONE] signal', () => {
    const messages: AiMessage[] = [
      makeMessage({ id: 'assistant-1', role: AiMessageRole.Assistant, content: 'Hi' }),
    ];

    const chunk = 'data: [DONE]\n\n';
    const result = processChunk(chunk, 'assistant-1', messages);

    expect(result.isDone).toBe(true);
  });

  it('skips malformed data lines', () => {
    const messages: AiMessage[] = [
      makeMessage({ id: 'assistant-1', role: AiMessageRole.Assistant, content: '' }),
    ];

    const chunk = 'data: {invalid json}\n\ndata: {"token":"ok "}\n\n';
    const result = processChunk(chunk, 'assistant-1', messages);

    expect(result.updatedMessages[0]!.content).toBe('ok ');
  });

  it('ignores lines without data: prefix', () => {
    const messages: AiMessage[] = [
      makeMessage({ id: 'assistant-1', role: AiMessageRole.Assistant, content: '' }),
    ];

    const chunk = 'event: message\ndata: {"token":"hi "}\n\n';
    const result = processChunk(chunk, 'assistant-1', messages);

    expect(result.updatedMessages[0]!.content).toBe('hi ');
  });
});
