import { memo, useEffect, useRef } from 'react';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import { MessageBubble } from './MessageBubble';

import type { ChatMessage } from '../../../types';

interface MessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

const MessageList = memo(({ messages, isLoading }: MessageListProps): JSX.Element => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  if (isLoading) 
    return (
      <div className="flex flex-1 items-center justify-center text-text-muted">
        {FM('common.loading')}
      </div>
    );
  

  if (messages.length === 0) 
    return (
      <div className="flex flex-1 items-center justify-center text-text-muted">
        {FM('chat.noMessages')}
      </div>
    );
  

  return (
    <div
      className="flex-1 overflow-y-auto py-4"
      data-testid={TestIds.CHAT_MESSAGE_LIST}
    >
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
});

MessageList.displayName = 'MessageList';

export { MessageList };
