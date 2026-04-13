import { useCallback, useState } from 'react';
import type { KeyboardEvent } from 'react';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

interface AiInputProps {
  isStreaming: boolean;
  onSend: (content: string) => void;
}

/** Text input with send button for composing AI chat messages. */
export const AiInput = ({ isStreaming, onSend }: AiInputProps): JSX.Element => {
  const [value, setValue] = useState('');

  const handleSend = useCallback(() => {
    if (value.trim() === '' || isStreaming) return;
    onSend(value);
    setValue('');
  }, [value, isStreaming, onSend]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  return (
    <div className="flex items-end gap-2 border-t border-border bg-surface p-3">
      <textarea
        aria-label={FM('aiAssistant.inputPlaceholder')}
        className="max-h-24 min-h-[40px] flex-1 resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        data-testid={TestIds.AI_INPUT}
        disabled={isStreaming}
        placeholder={FM('aiAssistant.inputPlaceholder')}
        rows={1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        aria-label={FM('aiAssistant.send')}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-600 text-white transition-colors hover:bg-primary-700 disabled:opacity-50"
        data-testid={TestIds.AI_SEND_BTN}
        disabled={isStreaming || value.trim() === ''}
        type="button"
        onClick={handleSend}
      >
        <svg
          aria-hidden="true"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M5 12h14M12 5l7 7-7 7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      </button>
    </div>
  );
};
