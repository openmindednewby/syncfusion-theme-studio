/**
 * CodeHintButton - Small code icon that shows a CopyableCodeSnippet
 * popover on hover with the section's JSX configuration.
 */
import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { IconCode } from '@/components/icons';
import { FM } from '@/localization/utils/helpers';

interface Props {
  snippet: string;
  testId: string;
}

const CodeHintButton = ({ snippet, testId }: Props): JSX.Element => (
  <div className="group relative inline-flex">
    <button
      aria-label={FM('common.copyPropSnippet')}
      className="inline-flex items-center text-text-tertiary transition-colors hover:text-text-primary"
      data-testid={testId}
      type="button"
    >
      <IconCode className="h-3 w-3" />
    </button>
    <div
      className="absolute left-0 top-full z-50 mt-1 hidden w-72 shadow-lg group-focus-within:block group-hover:block"
      data-testid={`${testId}-popover`}
    >
      <CopyableCodeSnippet code={snippet} testId={`${testId}-snippet`} />
    </div>
  </div>
);

CodeHintButton.displayName = 'CodeHintButton';

export default memo(CodeHintButton);
