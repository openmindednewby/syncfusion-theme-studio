import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

interface AiPanelHeaderProps {
  hasMessages: boolean;
  onClear: () => void;
  onClose: () => void;
}

/** Header bar for the AI panel with title, clear, and close controls. */
export const AiPanelHeader = ({ hasMessages, onClear, onClose }: AiPanelHeaderProps): JSX.Element => (
  <header className="flex items-center justify-between border-b border-border px-4 py-3">
    <div className="flex items-center gap-2">
      <svg
        aria-hidden="true"
        className="h-5 w-5 text-primary-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        />
      </svg>
      <h2 className="text-sm font-semibold text-text-primary">
        {FM('aiAssistant.title')}
      </h2>
    </div>
    <div className="flex items-center gap-1">
      {hasMessages ? (
        <button
          aria-label={FM('aiAssistant.clearChat')}
          className="rounded-md p-1.5 text-text-muted transition-colors hover:bg-surface-elevated hover:text-text-primary"
          data-testid={TestIds.AI_CLEAR_BTN}
          type="button"
          onClick={onClear}
        >
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </button>
      ) : null}
      <button
        aria-label={FM('common.close')}
        className="rounded-md p-1.5 text-text-muted transition-colors hover:bg-surface-elevated hover:text-text-primary"
        data-testid={TestIds.AI_CLOSE_BTN}
        type="button"
        onClick={onClose}
      >
        <svg
          aria-hidden="true"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M6 18L18 6M6 6l12 12"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      </button>
    </div>
  </header>
);
