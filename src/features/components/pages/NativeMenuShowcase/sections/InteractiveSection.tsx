/**
 * InteractiveSection - Menu with onClick handlers that track the last selected item.
 * Demonstrates callback integration and state display.
 */
import { memo, useCallback, useState } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { MenuNative } from '@/components/ui/native';
import type { MenuItem } from '@/components/ui/native';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';
import { isValueDefined } from '@/utils/is';

const SEPARATOR: MenuItem = { separator: true, text: '' };

const buildActionsMenu = (onSelect: (label: string) => void): MenuItem => ({
  text: FM('components.menuShowcase.actions'),
  items: [
    {
      text: FM('components.nativeMenu.new'),
      onClick: () => onSelect(FM('components.nativeMenu.new')),
    },
    {
      text: FM('components.nativeMenu.open'),
      onClick: () => onSelect(FM('components.nativeMenu.open')),
    },
    SEPARATOR,
    {
      text: FM('components.nativeMenu.save'),
      onClick: () => onSelect(FM('components.nativeMenu.save')),
    },
    {
      text: FM('components.menuShowcase.print'),
      onClick: () => onSelect(FM('components.menuShowcase.print')),
    },
  ],
});

const buildExportMenu = (onSelect: (label: string) => void): MenuItem => ({
  text: FM('components.menuShowcase.export'),
  items: [
    {
      text: FM('components.menuShowcase.exportCsv'),
      onClick: () => onSelect(FM('components.menuShowcase.exportCsv')),
    },
    {
      text: FM('components.menuShowcase.exportPdf'),
      onClick: () => onSelect(FM('components.menuShowcase.exportPdf')),
    },
    {
      text: FM('components.menuShowcase.exportExcel'),
      onClick: () => onSelect(FM('components.menuShowcase.exportExcel')),
    },
  ],
});

const buildInteractiveItems = (onSelect: (label: string) => void): MenuItem[] => [
  buildActionsMenu(onSelect),
  buildExportMenu(onSelect),
  {
    text: FM('components.menuShowcase.settings'),
    onClick: () => onSelect(FM('components.menuShowcase.settings')),
  },
];

export const InteractiveSection = memo((): JSX.Element => {
  const [lastSelected, setLastSelected] = useState<string | null>(null);

  const handleSelect = useCallback((label: string) => {
    setLastSelected(label);
  }, []);

  const items = buildInteractiveItems(handleSelect);

  const displayText =
    isValueDefined(lastSelected)
      ? FM('components.menuShowcase.lastSelected', lastSelected)
      : FM('components.menuShowcase.noneSelected');

  return (
    <section className="card space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.menuShowcase.sections.interactive')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.menuShowcase.sections.interactiveDesc')}
        </p>
      </div>
      <MenuNative
        ariaLabel={FM('components.menuShowcase.interactiveAriaLabel')}
        items={items}
        testId={TestIds.NATIVE_MENU_INTERACTIVE}
      />
      <p className="text-sm text-text-secondary" data-testid={TestIds.NATIVE_MENU_SELECTED}>
        {displayText}
      </p>
      <CopyableCodeSnippet code={'<MenuNative\n  ariaLabel="Actions menu"\n  items={[\n    { text: "New", onClick: () => handleSelect("New") },\n    { text: "Save", onClick: () => handleSelect("Save") },\n  ]}\n/>'} />
    </section>
  );
});

InteractiveSection.displayName = 'InteractiveSection';
