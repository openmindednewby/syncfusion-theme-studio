/**
 * CopyableCodeSnippet - Block code panel with line numbers,
 * TSX syntax highlighting, and a hover-to-copy button.
 */
import { memo, useCallback, useMemo, useState } from 'react';

import { IconCheck, IconCopy } from '@/components/icons';
import { FM } from '@/localization/utils/helpers';
import type { TsxToken } from '@/utils/tsxTokenizer';
import { tokenizeTsx } from '@/utils/tsxTokenizer';
import { TsxTokenType } from '@/utils/tsxTokenType';

const COPIED_FEEDBACK_MS = 1500;

const TOKEN_CLASS: Record<TsxTokenType, string> = {
  [TsxTokenType.Tag]: 'text-primary-400',
  [TsxTokenType.AttrName]: 'text-primary-300',
  [TsxTokenType.AttrValue]: 'text-success-500',
  [TsxTokenType.Expression]: 'text-warning-500',
  [TsxTokenType.Punctuation]: 'text-code-gutter',
  [TsxTokenType.Text]: 'text-white',
};

interface LineEntry {
  id: string;
  number: number;
  tokens: TsxToken[];
}

interface CopyableCodeSnippetProps {
  /** The code string to display and copy */
  code: string;
  /** Optional test ID for E2E testing */
  testId?: string;
}

function buildLineEntries(code: string): LineEntry[] {
  return code.split('\n').map((line, i) => ({
    id: `${i}:${line}`,
    number: i + 1,
    tokens: tokenizeTsx(line),
  }));
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

  const lineEntries = useMemo(() => buildLineEntries(code), [code]);
  const gutterWidth = useMemo(
    () => String(lineEntries.length).length,
    [lineEntries],
  );

  return (
    <div className="group relative" data-testid={testId}>
      <div className="overflow-hidden rounded-lg border border-code-border bg-code-bg">
        <div className="flex">
          {/* Line number gutter */}
          <div
            aria-hidden="true"
            className="flex-none select-none py-3 pl-3 pr-3 text-right font-mono text-xs leading-5 text-code-gutter"
          >
            {lineEntries.map((entry) => (
              <div key={entry.id} style={{ minWidth: `${gutterWidth}ch` }}>
                {entry.number}
              </div>
            ))}
          </div>

          {/* Code area */}
          <pre className="flex-1 overflow-x-auto py-3 pr-10 font-mono text-xs leading-5">
            <code>
              {lineEntries.map((entry) => (
                <div key={entry.id}>
                  {entry.tokens.length > 0
                    ? entry.tokens.map((token, ti) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <span key={ti} className={TOKEN_CLASS[token.type]}>
                          {token.value}
                        </span>
                      ))
                    : '\u00A0'}
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>

      {/* Copy button */}
      <button
        aria-label={FM('common.clickToCopyCode')}
        className="absolute right-2 top-2 flex min-h-0 min-w-0 items-center gap-1 rounded-md bg-code-bg/80 px-2 py-1 text-xs text-code-gutter opacity-0 backdrop-blur-sm transition-opacity hover:text-white focus-visible:opacity-100 group-hover:opacity-100"
        title={FM('common.clickToCopyCode')}
        type="button"
        onClick={handleCopy}
      >
        {copied ? (
          <>
            <IconCheck className="h-3.5 w-3.5 text-success-500" />
            <span className="text-success-500">{FM('common.copied')}</span>
          </>
        ) : (
          <>
            <IconCopy className="h-3.5 w-3.5" />
            <span>{FM('common.clickToCopyCode')}</span>
          </>
        )}
      </button>
    </div>
  );
};

export const CopyableCodeSnippet = memo(CopyableCodeSnippetComponent);
