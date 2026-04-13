import { TestIds } from '@/shared/testIds';

import { AiTypingIndicator } from './AiTypingIndicator';
import { AiMessageRole } from '../utils/ai-message-role';

import type { AiMessage } from '../types';

interface AiMessageBubbleProps {
  message: AiMessage;
}

/** Renders a single chat message bubble with role-based styling. */
export const AiMessageBubble = ({ message }: AiMessageBubbleProps): JSX.Element => {
  const isUser = message.role === AiMessageRole.User;

  const bubbleClasses = isUser
    ? 'ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-primary-600 px-4 py-2.5 text-white'
    : 'mr-auto max-w-[85%] rounded-2xl rounded-bl-sm bg-surface-elevated px-4 py-2.5 text-text-primary';

  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
      data-testid={TestIds.AI_MESSAGE_BUBBLE}
    >
      <div className={bubbleClasses}>
        <div className="ai-message-content whitespace-pre-wrap break-words text-sm leading-relaxed">
          {message.content}
        </div>
        {message.isStreaming === true && message.content === '' ? <AiTypingIndicator /> : null}
      </div>
    </div>
  );
};
