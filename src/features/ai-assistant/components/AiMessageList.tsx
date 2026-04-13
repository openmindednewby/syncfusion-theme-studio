import { useEffect, useRef } from 'react';

import { TestIds } from '@/shared/testIds';

import { AiMessageBubble } from './AiMessageBubble';

import type { AiMessage } from '../types';


interface AiMessageListProps {
  messages: AiMessage[];
}

/** Scrollable list of chat messages. Auto-scrolls to latest message. */
export const AiMessageList = ({ messages }: AiMessageListProps): JSX.Element => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div
      className="flex-1 space-y-3 overflow-y-auto p-4"
      data-testid={TestIds.AI_MESSAGE_LIST}
    >
      {messages.map((message) => (
        <AiMessageBubble key={message.id} message={message} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};
