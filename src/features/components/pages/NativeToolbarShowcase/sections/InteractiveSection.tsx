/**
 * InteractiveSection demonstrates a toolbar with live state tracking.
 * Clicking any button updates the "last clicked" display and a counter.
 */
import { memo, useCallback, useState } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
} from '@/components/icons';
import { ToolbarNative } from '@/components/ui/native';
import type { ToolbarItem } from '@/components/ui/native';
import { FM } from '@/localization/helpers';

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
      <CopyableCodeSnippet code={'<ToolbarNative\n  ariaLabel="Format toolbar"\n  items={[\n    { type: "button", text: "Bold", icon: <BoldIcon />, onClick: () => handleClick("Bold") },\n    { type: "separator" },\n    { type: "button", text: "Align Left", icon: <AlignLeftIcon /> },\n  ]}\n/>'} />
    </section>
  );
});

InteractiveSection.displayName = 'InteractiveSection';
