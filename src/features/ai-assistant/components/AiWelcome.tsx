import { FM } from '@/localization/utils/helpers';

import { AiSuggestions } from './AiSuggestions';

import type { AiSuggestion } from '../types';


interface AiWelcomeProps {
  suggestions: AiSuggestion[];
  onSelectSuggestion: (label: string) => void;
}

/** Welcome screen shown when there are no messages yet. */
export const AiWelcome = ({ suggestions, onSelectSuggestion }: AiWelcomeProps): JSX.Element => (
  <div className="flex flex-1 flex-col justify-center">
    <div className="px-4 py-8 text-center">
      <svg
        aria-hidden="true"
        className="mx-auto mb-3 h-12 w-12 text-primary-400/50"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
        />
      </svg>
      <p className="text-sm font-medium text-text-primary">
        {FM('aiAssistant.welcomeTitle')}
      </p>
      <p className="mt-1 text-xs text-text-muted">
        {FM('aiAssistant.welcomeSubtitle')}
      </p>
    </div>
    <AiSuggestions
      suggestions={suggestions}
      onSelect={onSelectSuggestion}
    />
  </div>
);
