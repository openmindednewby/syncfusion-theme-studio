import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

/** Animated typing indicator shown while the AI is streaming a response. */
export const AiTypingIndicator = (): JSX.Element => (
  <div
    aria-label={FM('aiAssistant.typing')}
    className="flex items-center gap-1.5 px-1 py-0.5"
    data-testid={TestIds.AI_TYPING_INDICATOR}
    role="status"
  >
    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary-400 [animation-delay:0ms]" />
    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary-400 [animation-delay:150ms]" />
    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary-400 [animation-delay:300ms]" />
  </div>
);
