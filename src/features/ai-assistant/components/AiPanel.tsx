import { useCallback, useEffect } from 'react';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import { AI_PANEL_WIDTH_PX } from '../constants';
import { AiInput } from './AiInput';
import { AiMessageList } from './AiMessageList';
import { AiPanelHeader } from './AiPanelHeader';
import { AiWelcome } from './AiWelcome';
import { useAiChat } from '../hooks/useAiChat';
import { useAiPanel } from '../hooks/useAiPanel';

/**
 * Slide-out AI assistant panel. Fixed to the right edge, overlays content.
 * Includes chat messages, streaming input, and suggestion chips.
 */
export const AiPanel = (): JSX.Element => {
  const { isOpen, close, toggle } = useAiPanel();
  const { messages, isStreaming, suggestions, sendMessage, clearMessages, loadSuggestions } =
    useAiChat();

  useEffect(() => {
    loadSuggestions();
  }, [loadSuggestions]);

  // Keyboard shortcut: Ctrl+K to toggle panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        toggle();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggle]);

  const handleSuggestionSelect = useCallback(
    (label: string) => {
      sendMessage(label);
    },
    [sendMessage],
  );

  const hasMessages = messages.length > 0;

  return (
    <>
      {/* Floating toggle button */}
      <button
        aria-label={FM('aiAssistant.togglePanel')}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg transition-all hover:bg-primary-700 hover:shadow-xl"
        data-testid={TestIds.AI_TOGGLE_BTN}
        type="button"
        onClick={toggle}
      >
        <svg
          aria-hidden="true"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              d="M6 18L18 6M6 6l12 12"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          ) : (
            <path
              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
            />
          )}
        </svg>
      </button>

      {/* Panel overlay + backdrop */}
      {isOpen ? (
        <>
          <div
            aria-hidden="true"
            className="fixed inset-0 z-40 bg-black/20 transition-opacity"
            data-testid={TestIds.AI_BACKDROP}
            role="presentation"
            onClick={close}
            onKeyDown={undefined}
          />

          <aside
            aria-label={FM('aiAssistant.panelLabel')}
            className="fixed inset-y-0 right-0 z-50 flex flex-col border-l border-border bg-surface shadow-2xl"
            data-testid={TestIds.AI_PANEL}
            style={{ width: `${AI_PANEL_WIDTH_PX}px` }}
          >
            <AiPanelHeader hasMessages={hasMessages} onClear={clearMessages} onClose={close} />

            {hasMessages ? (
              <AiMessageList messages={messages} />
            ) : (
              <AiWelcome suggestions={suggestions} onSelectSuggestion={handleSuggestionSelect} />
            )}

            <AiInput isStreaming={isStreaming} onSend={sendMessage} />
          </aside>
        </>
      ) : null}
    </>
  );
};
