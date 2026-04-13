import { useCallback, useRef, useState } from 'react';

import { AI_CHAT_URL } from '../constants';
import { buildRequestPayload, createMessagePair } from '../utils/createMessages';
import { fetchSuggestions } from '../utils/fetchSuggestions';
import { startSseStream } from '../utils/sseStreamReader';

import type { AiMessage, AiSuggestion } from '../types';

interface UseAiChatReturn {
  messages: AiMessage[];
  isStreaming: boolean;
  suggestions: AiSuggestion[];
  sendMessage: (content: string) => void;
  clearMessages: () => void;
  loadSuggestions: () => void;
}

interface DispatchContext {
  currentMessages: AiMessage[];
  abortRef: React.MutableRefObject<AbortController | null>;
  setMessages: React.Dispatch<React.SetStateAction<AiMessage[]>>;
  setIsStreaming: React.Dispatch<React.SetStateAction<boolean>>;
}

/** Initiates an SSE chat stream for the given content. */
function dispatchStream(content: string, ctx: DispatchContext): void {
  const pair = createMessagePair(content);
  const payload = buildRequestPayload(ctx.currentMessages, content);

  ctx.setMessages((prev) => [...prev, pair.userMsg, pair.assistantMsg]);
  ctx.setIsStreaming(true);

  ctx.abortRef.current?.abort();
  const controller = new AbortController();
  ctx.abortRef.current = controller; // eslint-disable-line no-param-reassign -- ref mutation is intentional

  const body = JSON.stringify({ messages: payload });
  startSseStream(
    { url: AI_CHAT_URL, body, assistantId: pair.assistantId, controller },
    { setMessages: ctx.setMessages, setIsStreaming: ctx.setIsStreaming },
  );
}

/** Hook managing AI chat state and SSE streaming. */
export function useAiChat(): UseAiChatReturn {
  const [messages, setMessages] = useState<AiMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [suggestions, setSuggestions] = useState<AiSuggestion[]>([]);
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    (content: string) => {
      if (isStreaming || content.trim() === '') return;
      dispatchStream(content.trim(), { currentMessages: messages, abortRef, setMessages, setIsStreaming });
    },
    [isStreaming, messages],
  );

  const clearMessages = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setIsStreaming(false);
  }, []);

  const loadSuggestions = useCallback(() => {
    fetchSuggestions().then(setSuggestions).catch(() => undefined);
  }, []);

  return { messages, isStreaming, suggestions, sendMessage, clearMessages, loadSuggestions };
}
