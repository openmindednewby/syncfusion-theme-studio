import { markStreamComplete, processChunk } from './messageHelpers';

import type { AiMessage } from '../types';

interface StreamCallbacks {
  setMessages: React.Dispatch<React.SetStateAction<AiMessage[]>>;
  setIsStreaming: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SseStreamConfig {
  url: string;
  body: string;
  assistantId: string;
  controller: AbortController;
}

/** Marks a streaming message as finalized. */
function finalize(callbacks: StreamCallbacks, assistantId: string): void {
  callbacks.setMessages((prev) => markStreamComplete(prev, assistantId));
  callbacks.setIsStreaming(false);
}

/** Reads an SSE response stream and updates messages token-by-token. */
function readSseStream(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  assistantId: string,
  signal: AbortSignal,
  callbacks: StreamCallbacks,
): void {
  const decoder = new TextDecoder();

  const read = (): void => {
    reader
      .read()
      .then(({ done, value }) => {
        if (done || signal.aborted) {
          finalize(callbacks, assistantId);
          return;
        }

        const chunk = decoder.decode(value, { stream: true });
        callbacks.setMessages((prev) => {
          const result = processChunk(chunk, assistantId, prev);
          if (result.isDone) {
            finalize(callbacks, assistantId);
            return markStreamComplete(result.updatedMessages, assistantId);
          }
          return result.updatedMessages;
        });

        read();
      })
      .catch(() => finalize(callbacks, assistantId));
  };

  read();
}

/** Sends a chat request and streams the SSE response. */
export function startSseStream(config: SseStreamConfig, callbacks: StreamCallbacks): void {
  const { url, body, assistantId, controller } = config;

  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    signal: controller.signal,
  })
    .then((response) => {
      if (!response.body) {
        finalize(callbacks, assistantId);
        return;
      }
      const reader = response.body.getReader();
      readSseStream(reader, assistantId, controller.signal, callbacks);
    })
    .catch(() => finalize(callbacks, assistantId));
}
