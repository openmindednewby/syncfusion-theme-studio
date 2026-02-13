/**
 * BasicSection - Standard horizontal menu bar with dropdown items and separators.
 * Demonstrates the MenuNative component with File/Edit/View/Help structure.
 */
import { memo } from 'react';

import { MenuNative } from '@/components/ui/native';
import type { MenuItem } from '@/components/ui/native';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

const SEPARATOR: MenuItem = { separator: true, text: '' };

const buildFileMenu = (): MenuItem => ({
  text: FM('components.nativeMenu.file'),
  items: [
    { text: FM('components.nativeMenu.new') },
    { text: FM('components.nativeMenu.open') },
    SEPARATOR,
    { text: FM('components.nativeMenu.save') },
    { text: FM('components.nativeMenu.saveAs') },
  ],
});

const buildEditMenu = (): MenuItem => ({
  text: FM('components.nativeMenu.edit'),
  items: [
    { text: FM('components.nativeMenu.undo') },
    { text: FM('components.nativeMenu.redo') },
    SEPARATOR,
    { text: FM('components.nativeMenu.cut') },
    { text: FM('components.nativeMenu.copy') },
    { text: FM('components.nativeMenu.paste') },
  ],
});

const buildViewMenu = (): MenuItem => ({
  text: FM('components.nativeMenu.view'),
  items: [
    { text: FM('components.nativeMenu.zoomIn') },
    { text: FM('components.nativeMenu.zoomOut') },
    SEPARATOR,
    { text: FM('components.nativeMenu.fullScreen') },
  ],
});

const buildMenuItems = (): MenuItem[] => [
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
    <MenuNative
      ariaLabel={FM('components.menuShowcase.basicAriaLabel')}
      items={buildMenuItems()}
      testId={TestIds.NATIVE_MENU_BASIC}
    />
  </section>
));

BasicSection.displayName = 'BasicSection';
