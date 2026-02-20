/**
 * BasicSection - Simple Syncfusion MenuComponent with horizontal menu items.
 * Demonstrates File/Edit/View/Help structure using MenuItemModel arrays.
 */
import { memo } from 'react';

import { MenuComponent, type MenuItemModel } from '@syncfusion/ej2-react-navigations';

import { CopyableCodeSnippet } from '@/components/common';
import { FM } from '@/localization/utils/helpers';

const buildFileMenu = (): MenuItemModel => ({
  text: FM('components.nativeMenu.file'),
  items: [
    { text: FM('components.nativeMenu.new') },
    { text: FM('components.nativeMenu.open') },
    { text: FM('components.nativeMenu.save') },
  ],
});

const buildEditMenu = (): MenuItemModel => ({
  text: FM('components.nativeMenu.edit'),
  items: [
    { text: FM('components.nativeMenu.cut') },
    { text: FM('components.nativeMenu.copy') },
    { text: FM('components.nativeMenu.paste') },
  ],
});

const buildViewMenu = (): MenuItemModel => ({
  text: FM('components.nativeMenu.view'),
  items: [
    { text: FM('components.nativeMenu.zoomIn') },
    { text: FM('components.nativeMenu.zoomOut') },
    { text: FM('components.nativeMenu.fullScreen') },
  ],
});

const buildMenuItems = (): MenuItemModel[] => [
  buildFileMenu(),
  buildEditMenu(),
  buildViewMenu(),
  { text: FM('components.nativeMenu.help') },
];

export const BasicSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.menuShowcase.sections.basic')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.menuShowcase.sections.basicDesc')}
      </p>
    </div>
    <MenuComponent items={buildMenuItems()} />
    <CopyableCodeSnippet code='<MenuComponent items={[{ text: "File", items: [{ text: "New" }, { text: "Open" }] }]} />' />
  </section>
));

BasicSection.displayName = 'BasicSection';
