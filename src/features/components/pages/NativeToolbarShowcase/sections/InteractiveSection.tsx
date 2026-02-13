/**
 * InteractiveSection demonstrates a toolbar with live state tracking.
 * Clicking any button updates the "last clicked" display and a counter.
 */
import { memo, useCallback, useState } from 'react';

import { ToolbarNative } from '@/components/ui/native';
import type { ToolbarItem } from '@/components/ui/native';
import { FM } from '@/localization/helpers';

/* ------------------------------------------------------------------ */
/*  Icons                                                             */
/* ------------------------------------------------------------------ */

const BoldIcon = (): JSX.Element => (
  <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6zM6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ItalicIcon = (): JSX.Element => (
  <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M19 4h-9M14 20H5M15 4L9 20" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UnderlineIcon = (): JSX.Element => (
  <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M6 3v7a6 6 0 0012 0V3M4 21h16" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AlignLeftIcon = (): JSX.Element => (
  <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M17 10H3M21 6H3M21 14H3M17 18H3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AlignCenterIcon = (): JSX.Element => (
  <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M18 10H6M21 6H3M21 14H3M18 18H6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AlignRightIcon = (): JSX.Element => (
  <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M21 10H7M21 6H3M21 14H3M21 18H7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const INITIAL_CLICK_COUNT = 0;

interface ButtonDef {
  labelKey: string;
  icon: JSX.Element;
  addSeparatorBefore?: boolean;
}

const BUTTON_DEFS: readonly ButtonDef[] = [
  { labelKey: 'components.nativeToolbar.bold', icon: <BoldIcon /> },
  { labelKey: 'components.nativeToolbar.italic', icon: <ItalicIcon /> },
  { labelKey: 'components.nativeToolbar.underline', icon: <UnderlineIcon /> },
  { labelKey: 'components.toolbarShowcase.items.alignLeft', icon: <AlignLeftIcon />, addSeparatorBefore: true },
  { labelKey: 'components.toolbarShowcase.items.alignCenter', icon: <AlignCenterIcon /> },
  { labelKey: 'components.toolbarShowcase.items.alignRight', icon: <AlignRightIcon /> },
];

/* ------------------------------------------------------------------ */
/*  Section                                                           */
/* ------------------------------------------------------------------ */

export const InteractiveSection = memo((): JSX.Element => {
  const [lastClicked, setLastClicked] = useState<string | null>(null);
  const [clickCount, setClickCount] = useState(INITIAL_CLICK_COUNT);

  const handleButtonClick = useCallback((label: string) => {
    setLastClicked(label);
    setClickCount((prev) => prev + 1);
  }, []);

  const buildInteractiveItems = useCallback((): ToolbarItem[] => {
    const items: ToolbarItem[] = [];

    BUTTON_DEFS.forEach((def, index) => {
      if (def.addSeparatorBefore === true)
        items.push({ type: 'separator' });

      const label = FM(def.labelKey);
      items.push({
        type: 'button',
        icon: def.icon,
        tooltip: label,
        text: label,
        onClick: () => handleButtonClick(label),
        testId: `toolbar-interactive-btn-${String(index)}`,
      });
    });

    return items;
  }, [handleButtonClick]);

  const displayLabel = lastClicked ?? FM('components.toolbarShowcase.sections.noneYet');

  return (
    <section className="card space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.toolbarShowcase.sections.interactive')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.toolbarShowcase.sections.interactiveDesc')}
        </p>
      </div>

      <ToolbarNative
        ariaLabel={FM('components.toolbarShowcase.sections.interactive')}
        items={buildInteractiveItems()}
        testId="toolbar-interactive"
      />

      <div className="flex gap-6 rounded-md bg-surface-hover px-4 py-3 text-sm" data-testid="toolbar-interactive-state">
        <span className="text-text-secondary" data-testid="toolbar-last-clicked">
          {FM('components.toolbarShowcase.sections.lastClicked', displayLabel)}
        </span>
        <span className="text-text-secondary" data-testid="toolbar-click-count">
          {FM('components.toolbarShowcase.sections.clickCount', String(clickCount))}
        </span>
      </div>
    </section>
  );
});

InteractiveSection.displayName = 'InteractiveSection';
