import { memo } from 'react';

import { MenuNative } from '@/components/ui/native';
import type { MenuItem } from '@/components/ui/native';
import { FM } from '@/localization/helpers';

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
    { text: FM('components.nativeMenu.fullScreen') },
  ],
});

const buildMenuItems = (): MenuItem[] => [
  buildFileMenu(),
  buildEditMenu(),
  buildViewMenu(),
  { text: FM('components.nativeMenu.help') },
];

export const NativeMenuSection = memo((): JSX.Element => (
  <section className="card">
    <h3 className="mb-4 text-lg font-semibold text-text-primary">
      {FM('components.sections.nativeMenu')}
    </h3>
    <MenuNative
      ariaLabel={FM('components.nativeMenu.ariaLabel')}
      items={buildMenuItems()}
      testId="native-menu"
    />
  </section>
));

NativeMenuSection.displayName = 'NativeMenuSection';
