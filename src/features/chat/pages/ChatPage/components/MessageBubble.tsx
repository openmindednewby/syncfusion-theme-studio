import { memo, useMemo } from 'react';

import { TestIds } from '@/shared/testIds';

import { CURRENT_USER } from '../../../constants';

import type { ChatMessage } from '../../../types';

interface MessageBubbleProps {
  message: ChatMessage;
}

/** Formats a timestamp string into a short time display. */
function formatTime(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const MessageBubble = memo(({ message }: MessageBubbleProps): JSX.Element => {
  const isCurrentUser = message.senderName === CURRENT_USER.name;

  const timeDisplay = useMemo(() => formatTime(message.timestamp), [message.timestamp]);

  return (
    <div
      className={`flex gap-3 px-6 py-1.5 ${isCurrentUser ? 'flex-row-reverse' : ''}`}
      data-testid={TestIds.CHAT_MESSAGE_BUBBLE}
    >
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-primary/20 text-sm font-medium text-brand-primary"
        title={message.senderName}
      >
        {message.senderAvatar}
      </div>
      <div className={`max-w-[70%] ${isCurrentUser ? 'items-end' : 'items-start'}`}>
        <div className="mb-0.5 flex items-center gap-2">
          <span className="text-sm font-medium text-text-primary">
            {message.senderName}
          </span>
          <span className="text-xs text-text-muted">{timeDisplay}</span>
        </div>
        <div
          className={`rounded-2xl px-4 py-2 ${
            isCurrentUser
              ? 'bg-brand-primary text-white'
              : 'bg-surface-secondary text-text-primary'
          }`}
        >
          <p className="whitespace-pre-wrap break-words text-sm">{message.content}</p>
        </div>
      </div>
    </div>
  );
});

MessageBubble.displayName = 'MessageBubble';

export { MessageBubble };
