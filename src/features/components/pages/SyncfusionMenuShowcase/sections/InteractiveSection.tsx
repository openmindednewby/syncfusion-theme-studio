/**
 * InteractiveSection - Syncfusion MenuComponent with select event handling.
 * Tracks the last selected item via useState and displays it.
 */
import { memo, useCallback, useState } from 'react';

import { MenuComponent, type MenuEventArgs, type MenuItemModel } from '@syncfusion/ej2-react-navigations';

import { CopyableCodeSnippet } from '@/components/common';
import { FM } from '@/localization/helpers';
import { isValueDefined } from '@/utils/is';

const buildActionsMenu = (): MenuItemModel => ({
  text: FM('components.menuShowcase.actions'),
  items: [
    { text: FM('components.nativeMenu.new') },
    { text: FM('components.nativeMenu.open') },
    { text: FM('components.nativeMenu.save') },
    { text: FM('components.menuShowcase.print') },
  ],
});

const buildExportMenu = (): MenuItemModel => ({
  text: FM('components.menuShowcase.export'),
  items: [
    { text: FM('components.menuShowcase.exportCsv') },
    { text: FM('components.menuShowcase.exportPdf') },
    { text: FM('components.menuShowcase.exportExcel') },
  ],
});

const buildInteractiveItems = (): MenuItemModel[] => [
  buildActionsMenu(),
  buildExportMenu(),
  { text: FM('components.menuShowcase.settings') },
];

export const InteractiveSection = memo((): JSX.Element => {
  const [lastSelected, setLastSelected] = useState<string | null>(null);

  const handleSelect = useCallback((args: MenuEventArgs) => {
    setLastSelected(args.item.text ?? null);
  }, []);

  const displayText = isValueDefined(lastSelected)
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
      <MenuComponent items={buildInteractiveItems()} select={handleSelect} />
      <p className="text-sm text-text-secondary">
        {displayText}
      </p>
      <CopyableCodeSnippet code='<MenuComponent items={menuItems} select={handleSelect} />' />
    </section>
  );
});

InteractiveSection.displayName = 'InteractiveSection';
