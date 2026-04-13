import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import type { AiSuggestion } from '../types';

interface AiSuggestionsProps {
  suggestions: AiSuggestion[];
  onSelect: (label: string) => void;
}

/** Quick-action suggestion chips displayed when the chat is empty. */
export const AiSuggestions = ({ suggestions, onSelect }: AiSuggestionsProps): JSX.Element => (
  <div className="space-y-3 p-4" data-testid={TestIds.AI_SUGGESTIONS}>
    <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
      {FM('aiAssistant.suggestionsTitle')}
    </p>
    <div className="flex flex-wrap gap-2">
      {suggestions.map((suggestion) => (
        <button
          key={suggestion.id}
          aria-label={suggestion.label}
          className="rounded-full border border-border bg-surface-elevated px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:border-primary-500 hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-primary-950"
          data-testid={TestIds.AI_SUGGESTION_CHIP}
          type="button"
          onClick={() => onSelect(suggestion.label)}
        >
          {suggestion.label}
        </button>
      ))}
    </div>
  </div>
);
