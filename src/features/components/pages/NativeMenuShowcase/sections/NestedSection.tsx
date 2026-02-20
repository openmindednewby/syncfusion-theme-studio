/**
 * NestedSection - Multi-level hierarchical menus with nested sub-items.
 * Demonstrates deep nesting with Settings > Security > sub-items.
 */
import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { MenuNative } from '@/components/ui/native';
import type { MenuItem } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

const SEPARATOR: MenuItem = { separator: true, text: '' };

const buildPreferencesMenu = (): MenuItem => ({
  text: FM('components.menuShowcase.preferences'),
  items: [
    { text: FM('components.menuShowcase.general') },
    { text: FM('components.menuShowcase.appearance') },
    { text: FM('components.menuShowcase.notifications') },
  ],
});

const buildSecurityMenu = (): MenuItem => ({
  text: FM('components.menuShowcase.security'),
  items: [
    { text: FM('components.menuShowcase.privacy') },
    { text: FM('components.menuShowcase.twoFactor') },
    { text: FM('components.menuShowcase.sessions') },
  ],
});

const buildSettingsMenu = (): MenuItem => ({
  text: FM('components.menuShowcase.settings'),
  items: [
    buildPreferencesMenu(),
    buildSecurityMenu(),
    SEPARATOR,
    { text: FM('components.menuShowcase.account') },
  ],
});

const buildBillingMenu = (): MenuItem => ({
  text: FM('components.menuShowcase.billing'),
  items: [
    { text: FM('components.menuShowcase.subscription') },
    { text: FM('components.menuShowcase.invoices') },
  ],
});

const buildExportMenu = (): MenuItem => ({
  text: FM('components.menuShowcase.export'),
  items: [
    { text: FM('components.menuShowcase.exportCsv') },
    { text: FM('components.menuShowcase.exportPdf') },
    { text: FM('components.menuShowcase.exportExcel') },
  ],
});

const buildNestedItems = (): MenuItem[] => [
  { text: FM('components.menuShowcase.profile') },
  buildSettingsMenu(),
  buildBillingMenu(),
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
    <MenuNative
      ariaLabel={FM('components.menuShowcase.nestedAriaLabel')}
      items={buildNestedItems()}
      testId={TestIds.NATIVE_MENU_NESTED}
    />
    <CopyableCodeSnippet code={'<MenuNative\n  ariaLabel="Nested menu"\n  items={[\n    { text: "Settings", items: [\n      { text: "Preferences", items: [\n        { text: "General" },\n        { text: "Appearance" },\n      ] },\n      { text: "Security", items: [...] },\n    ] },\n  ]}\n/>'} />
  </section>
));

NestedSection.displayName = 'NestedSection';
