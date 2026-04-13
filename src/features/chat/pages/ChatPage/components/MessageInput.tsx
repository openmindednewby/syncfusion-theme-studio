import { memo, useCallback, useState } from 'react';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

interface MessageInputProps {
  onSend: (content: string) => void;
  disabled: boolean;
}

const MessageInput = memo(({ onSend, disabled }: MessageInputProps): JSX.Element => {
  const [value, setValue] = useState('');

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = value.trim();
      if (trimmed === '') return;
      onSend(trimmed);
      setValue('');
    },
    [value, onSend],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const trimmed = value.trim();
        if (trimmed === '') return;
        onSend(trimmed);
        setValue('');
      }
    },
    [value, onSend],
  );

  return (
    <form
      className="flex items-center gap-3 border-t border-border-primary px-6 py-4"
      onSubmit={handleSubmit}
    >
      <input
        className="flex-1 rounded-xl border border-border-primary bg-surface-primary px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-primary focus:outline-none"
        data-testid={TestIds.CHAT_MESSAGE_INPUT}
        disabled={disabled}
        placeholder={FM('chat.typePlaceholder')}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="rounded-xl bg-brand-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-primary/90 disabled:opacity-50"
        data-testid={TestIds.CHAT_SEND_BTN}
        disabled={disabled || value.trim() === ''}
        type="submit"
      >
        {FM('chat.sendMessage')}
      </button>
    </form>
  );
});

MessageInput.displayName = 'MessageInput';

export { MessageInput };
