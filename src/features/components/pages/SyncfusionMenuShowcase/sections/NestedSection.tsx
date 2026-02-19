/**
 * NestedSection - Multi-level nested Syncfusion MenuComponent (3 levels deep).
 * Demonstrates deep hierarchy with Settings > Security > sub-items.
 */
import { memo } from 'react';

import { MenuComponent, type MenuItemModel } from '@syncfusion/ej2-react-navigations';

import { CopyableCodeSnippet } from '@/components/common';
import { FM } from '@/localization/helpers';

const buildSecurityMenu = (): MenuItemModel => ({
  text: FM('components.menuShowcase.security'),
  items: [
    { text: FM('components.menuShowcase.privacy') },
    { text: FM('components.menuShowcase.twoFactor') },
    { text: FM('components.menuShowcase.sessions') },
  ],
});

const buildPreferencesMenu = (): MenuItemModel => ({
  text: FM('components.menuShowcase.preferences'),
  items: [
    { text: FM('components.menuShowcase.general') },
    { text: FM('components.menuShowcase.appearance') },
    { text: FM('components.menuShowcase.notifications') },
  ],
});

const buildSettingsMenu = (): MenuItemModel => ({
  text: FM('components.menuShowcase.settings'),
  items: [
    buildPreferencesMenu(),
    buildSecurityMenu(),
    { separator: true },
    { text: FM('components.menuShowcase.account') },
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

const buildNestedItems = (): MenuItemModel[] => [
  { text: FM('components.menuShowcase.profile') },
  buildSettingsMenu(),
  buildExportMenu(),
];

export const NestedSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.menuShowcase.sections.nested')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.menuShowcase.sections.nestedDesc')}
      </p>
    </div>
    <MenuComponent items={buildNestedItems()} />
    <CopyableCodeSnippet code='<MenuComponent items={[{ text: "Settings", items: [{ text: "Security", items: [...] }] }]} />' />
  </section>
));

NestedSection.displayName = 'NestedSection';
