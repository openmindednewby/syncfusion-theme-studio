/**
 * BusinessTableShell wraps a business page table with horizontal scroll,
 * a right-edge gradient fade indicator, and a result count footer.
 */
import { memo } from 'react';

import { FM } from '@/localization/utils/helpers';
import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

interface Props {
  /** Test ID for E2E testing */
  testId?: string;
  /** Total number of rows being displayed */
  resultCount: number;
  /** Total records (if paginated, pass the full count) */
  totalCount?: number;
  /** Additional CSS classes on the outer wrapper */
  className?: string;
  /** Table content */
  children: React.ReactNode;
}

const BusinessTableShell = ({
  testId,
  resultCount,
  totalCount,
  className,
  children,
}: Props): JSX.Element => {
  const footerText = isValueDefined(totalCount) && totalCount !== resultCount
    ? FM('common.showingResultsOf', String(resultCount), String(totalCount))
    : FM('common.showingResults', String(resultCount));

  return (
    <div className={cn('rounded-md border border-border', className)} data-testid={testId}>
      <div className="relative">
        <div className="overflow-x-auto">
          {children}
        </div>
        {/* Right-edge gradient fade to indicate horizontal scroll */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-surface to-transparent md:hidden"
        />
      </div>
      <div className="border-t border-border px-4 py-2 text-xs text-text-muted">
        {footerText}
      </div>
    </div>
  );
};

export default memo(BusinessTableShell);
export type { Props as BusinessTableShellProps };
