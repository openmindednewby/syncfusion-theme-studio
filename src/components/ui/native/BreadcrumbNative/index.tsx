/**
 * BreadcrumbNative - Zero-dependency themed breadcrumb using native HTML.
 *
 * Uses semantic `<nav aria-label="breadcrumb">` with an `<ol>` list.
 * The last item is rendered as non-clickable (current page).
 * Supports custom separators, icons, and theming via Tailwind CSS.
 * No Syncfusion dependency for minimal bundle size.
 */
import { memo, type ReactNode } from 'react';

import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

interface BreadcrumbItem {
  /** Display text */
  text: string;
  /** Optional URL (makes item clickable) */
  url?: string;
  /** Optional icon element */
  icon?: ReactNode;
}

interface Props {
  /** Array of breadcrumb items */
  items: BreadcrumbItem[];
  /** Separator character between items */
  separator?: string;
  /** Accessible label for the nav */
  ariaLabel?: string;
  /** Test ID for E2E testing */
  testId?: string;
  /** Additional CSS classes */
  className?: string;
  /** Callback when a non-current breadcrumb item is clicked */
  onItemClick?: (item: BreadcrumbItem, event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const DEFAULT_SEPARATOR = '/';

const BreadcrumbNative = ({
  items,
  separator = DEFAULT_SEPARATOR,
  ariaLabel = 'Breadcrumb',
  testId,
  className,
  onItemClick,
}: Props): JSX.Element => {
  const lastIndex = items.length - 1;

  return (
    <nav
      aria-label={ariaLabel}
      className={cn('rounded-md border border-border bg-surface px-4 py-2.5', className)}
      data-testid={testId}
    >
      <ol className="flex items-center gap-2 text-sm">
        {items.map((item, index) => {
          const isLast = index === lastIndex;

          return (
            <li key={item.text} className="flex items-center gap-2">
              {index > 0 ? (
                <span aria-hidden="true" className="text-text-secondary">
                  {separator}
                </span>
              ) : null}
              {isLast ? (
                <span
                  aria-current="page"
                  className="flex items-center gap-1.5 font-medium text-text-primary"
                >
                  {isValueDefined(item.icon) ? (
                    <span aria-hidden="true" className="h-4 w-4">
                      {item.icon}
                    </span>
                  ) : null}
                  {item.text}
                </span>
              ) : (
                <a
                  className={cn(
                    'flex items-center gap-1.5 text-text-secondary transition-colors',
                    'hover:text-primary-500 focus:outline-none focus:text-primary-500',
                  )}
                  href={item.url ?? '#'}
                  onClick={(e) => {
                    e.preventDefault();
                    onItemClick?.(item, e);
                  }}
                >
                  {isValueDefined(item.icon) ? (
                    <span aria-hidden="true" className="h-4 w-4">
                      {item.icon}
                    </span>
                  ) : null}
                  {item.text}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

BreadcrumbNative.displayName = 'BreadcrumbNative';

export default memo(BreadcrumbNative);
export type { Props as BreadcrumbNativeProps, BreadcrumbItem };
