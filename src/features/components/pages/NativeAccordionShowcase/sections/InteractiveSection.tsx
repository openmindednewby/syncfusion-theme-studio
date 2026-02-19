/**
 * InteractiveSection demonstrates a controlled accordion with external
 * state tracking, Expand All / Collapse All buttons, and a live display
 * of which panels are currently open.
 */
import { memo, useCallback, useMemo, useState } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import type { AccordionItem } from '@/components/ui/native';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';
import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

const I18N_PREFIX = 'components.accordionShowcase.interactive';
const TOTAL_FAQ_ITEMS = 4;
const CHEVRON_ICON_PATH = 'M9 5l7 7-7 7';

const ACTIVE_BUTTON_STYLE = 'bg-primary-500 text-white';
const INACTIVE_BUTTON_STYLE = 'bg-surface-hover text-text-primary hover:bg-surface-active';

const buildFaqItems = (): AccordionItem[] =>
  Array.from({ length: TOTAL_FAQ_ITEMS }, (_, i) => {
    const idx = i + 1;
    return {
      header: FM(`${I18N_PREFIX}.faqHeader${idx}`),
      content: FM(`${I18N_PREFIX}.faqContent${idx}`),
    };
  });

const buildOpenPanelsLabel = (openIndexes: Set<number>): string => {
  if (openIndexes.size === 0) return FM(`${I18N_PREFIX}.noneOpenLabel`);
  const panelNumbers = Array.from(openIndexes)
    .sort()
    .map((i) => String(i + 1))
    .join(', ');
  return FM(`${I18N_PREFIX}.openPanelsLabel`, panelNumbers);
};

/* ------------------------------------------------------------------ */
/* Controlled accordion item (mirrors AccordionNative styling)        */
/* ------------------------------------------------------------------ */

const ControlledAccordionItem = memo(
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

    const itemTestId = isValueDefined(testId) ? `${testId}-item-${index}` : undefined;

    return (
      <div className="border-b border-border last:border-b-0" data-testid={itemTestId}>
        <button
          aria-expanded={isOpen}
          className={cn(
            'flex w-full items-center gap-3 px-4 py-3 text-left',
            'text-text-primary font-medium transition-colors',
            'hover:bg-surface-hover focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500',
            isOpen && ACTIVE_BUTTON_STYLE,
          )}
          data-testid={isValueDefined(itemTestId) ? `${itemTestId}-header` : undefined}
          type="button"
          onClick={handleClick}
        >
          <svg
            aria-hidden="true"
            className={cn(
              'h-4 w-4 shrink-0 text-text-secondary transition-transform duration-200',
              isOpen && 'rotate-90',
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

ControlledAccordionItem.displayName = 'ControlledAccordionItem';

/* ------------------------------------------------------------------ */
/* Interactive section                                                 */
/* ------------------------------------------------------------------ */

export const InteractiveSection = memo((): JSX.Element => {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());
  const items = useMemo(() => buildFaqItems(), []);

  const handleToggle = useCallback((index: number) => {
    setOpenIndexes((prev) => {
      const next = new Set(prev);
      if (prev.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }, []);

  const handleExpandAll = useCallback(() => {
    setOpenIndexes(new Set(Array.from({ length: TOTAL_FAQ_ITEMS }, (_, i) => i)));
  }, []);

  const handleCollapseAll = useCallback(() => {
    setOpenIndexes(new Set());
  }, []);

  const openPanelsLabel = buildOpenPanelsLabel(openIndexes);

  return (
    <section className="card space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.accordionShowcase.sections.interactive')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.accordionShowcase.sections.interactiveDesc')}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            className={cn('rounded-md px-3 py-1.5 text-sm font-medium transition-colors', INACTIVE_BUTTON_STYLE)}
            type="button"
            onClick={handleExpandAll}
          >
            {FM(`${I18N_PREFIX}.expandAllLabel`)}
          </button>
          <button
            className={cn('rounded-md px-3 py-1.5 text-sm font-medium transition-colors', INACTIVE_BUTTON_STYLE)}
            type="button"
            onClick={handleCollapseAll}
          >
            {FM(`${I18N_PREFIX}.collapseAllLabel`)}
          </button>
        </div>
        <span
          className="text-sm text-text-secondary"
          data-testid={TestIds.NATIVE_ACCORDION_OPEN_PANELS}
        >
          {openPanelsLabel}
        </span>
      </div>
      <div
        className="rounded-md border border-border bg-surface"
        data-testid={TestIds.NATIVE_ACCORDION_INTERACTIVE}
        role="region"
      >
        {items.map((item, index) => (
          <ControlledAccordionItem
            key={item.header}
            index={index}
            isOpen={openIndexes.has(index)}
            item={item}
            testId={TestIds.NATIVE_ACCORDION_INTERACTIVE}
            onToggle={handleToggle}
          />
        ))}
      </div>
      <CopyableCodeSnippet code='<AccordionNative expandMode="multiple" items={items} />' />
    </section>
  );
});

InteractiveSection.displayName = 'InteractiveSection';
