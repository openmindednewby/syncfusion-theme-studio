/**
 * AccordionNative - Zero-dependency themed accordion using native HTML.
 *
 * Uses semantic `<details>` and `<summary>` elements for built-in
 * expand/collapse behavior. Supports single or multiple expand mode,
 * smooth CSS transitions, and theming via Tailwind CSS utility classes.
 * No Syncfusion dependency for minimal bundle size.
 */
import { memo, useCallback, useState, type ReactNode } from 'react';

import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

interface AccordionItem {
  /** Header text displayed in the summary */
  header: string;
  /** Content shown when expanded */
  content: string | ReactNode;
}

interface Props {
  /** Array of accordion items */
  items: AccordionItem[];
  /** Test ID for E2E testing */
  testId?: string;
  /** Allow multiple items open simultaneously */
  allowMultiple?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const CHEVRON_ROTATION_OPEN = 'rotate-90';
const CHEVRON_ICON_PATH = 'M9 5l7 7-7 7';

const AccordionItemComponent = memo(
  ({
    item,
    index,
    isOpen,
    onToggle,
    testId,
  }: {
    item: AccordionItem;
    index: number;
    isOpen: boolean;
    onToggle: (index: number) => void;
    testId?: string;
  }): JSX.Element => {
    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        onToggle(index);
      },
      [index, onToggle],
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        const isActivationKey = e.key === 'Enter' || e.key === ' ';
        if (isActivationKey) {
          e.preventDefault();
          onToggle(index);
        }
      },
      [index, onToggle],
    );

    const itemTestId = isValueDefined(testId) ? `${testId}-item-${index}` : undefined;

    return (
      <div
        className="border-b border-border last:border-b-0"
        data-testid={itemTestId}
      >
        <button
          aria-expanded={isOpen}
          className={cn(
            'flex w-full items-center gap-3 px-4 py-3 text-left',
            'text-text-primary font-medium transition-colors',
            'hover:bg-surface-hover focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500',
          )}
          data-testid={isValueDefined(itemTestId) ? `${itemTestId}-header` : undefined}
          type="button"
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        >
          <svg
            aria-hidden="true"
            className={cn(
              'h-4 w-4 shrink-0 text-text-secondary transition-transform duration-200',
              isOpen && CHEVRON_ROTATION_OPEN,
            )}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d={CHEVRON_ICON_PATH} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>{item.header}</span>
        </button>
        <div
          className={cn(
            'overflow-hidden transition-all duration-200',
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
          )}
        >
          <div className="px-4 pb-4 pl-11 text-sm text-text-secondary">
            {item.content}
          </div>
        </div>
      </div>
    );
  },
);

AccordionItemComponent.displayName = 'AccordionItemComponent';

const AccordionNative = ({
  items,
  testId,
  allowMultiple = false,
  className,
}: Props): JSX.Element => {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());

  const handleToggle = useCallback(
    (index: number) => {
      setOpenIndexes((prev) => {
        const next = new Set(allowMultiple ? prev : []);
        if (prev.has(index)) next.delete(index);
        else next.add(index);
        return next;
      });
    },
    [allowMultiple],
  );

  return (
    <div
      className={cn('rounded-md border border-border bg-surface', className)}
      data-testid={testId}
      role="region"
    >
      {items.map((item, index) => (
        <AccordionItemComponent
          key={item.header}
          index={index}
          isOpen={openIndexes.has(index)}
          item={item}
          onToggle={handleToggle}
          {...(isValueDefined(testId) ? { testId } : {})}
        />
      ))}
    </div>
  );
};

AccordionNative.displayName = 'AccordionNative';

export default memo(AccordionNative);
export type { Props as AccordionNativeProps, AccordionItem };
