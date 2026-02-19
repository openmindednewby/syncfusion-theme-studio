/**
 * CopyableCodeSnippet - Clickable code snippet that copies to clipboard.
 * Shows brief "Copied!" feedback after copying.
 */
import { memo, useCallback, useState } from 'react';

import { IconCopy } from '@/components/icons';
import { FM } from '@/localization/helpers';

const COPIED_FEEDBACK_MS = 1500;

interface CopyableCodeSnippetProps {
  /** The code string to display and copy */
  code: string;
  /** Optional test ID for E2E testing */
  testId?: string;
}

const CopyableCodeSnippetComponent = ({
  code,
  testId,
}: CopyableCodeSnippetProps): JSX.Element => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, COPIED_FEEDBACK_MS);
  }, [code]);

  return (
    <button
      aria-label={FM('common.clickToCopyCode')}
      className="group inline-flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1 transition-colors hover:bg-surface-sunken"
      data-testid={testId}
      title={FM('common.clickToCopyCode')}
      type="button"
      onClick={handleCopy}
    >
      <code
        className={`text-center text-xs ${copied ? 'text-status-success' : 'text-text-secondary'}`}
      >
        {copied ? FM('common.copied') : code}
      </code>
      {!copied && (
        <IconCopy className="h-3 w-3 text-text-secondary opacity-0 transition-opacity group-hover:opacity-100" />
      )}
    </button>
  );
};

export const CopyableCodeSnippet = memo(CopyableCodeSnippetComponent);
