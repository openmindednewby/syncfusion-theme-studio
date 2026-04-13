/**
 * VerticalTabsSection demonstrates Syncfusion tabs with vertical
 * orientation using the `orientation="vertical"` prop.
 */
import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import SyncfusionTabs from '@/components/ui/syncfusion/Tabs';
import { FM } from '@/localization/utils/helpers';

const VERTICAL_TABS = [
  { id: 'general', label: 'General', content: <p className="text-text-secondary">{FM('showcase.content.sfGeneralPanel')}</p> },
  { id: 'security', label: 'Security', content: <p className="text-text-secondary">{FM('showcase.content.sfSecurityPanel')}</p> },
  { id: 'notifications', label: 'Notifications', content: <p className="text-text-secondary">{FM('showcase.content.sfNotificationsPanel')}</p> },
];

const CODE_SNIPPET = `<SyncfusionTabs
  orientation="vertical"
  items={[
    { id: "general", label: "General", content: <p>General settings</p> },
    { id: "security", label: "Security", content: <p>Security settings</p> },
  ]}
/>`;

export const VerticalTabsSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <h3 className="text-lg font-semibold text-text-primary">{FM('showcase.sections.verticalTabs')}</h3>
    <SyncfusionTabs items={VERTICAL_TABS} orientation="vertical" testId="sf-tabs-vertical" />
    <CopyableCodeSnippet code={CODE_SNIPPET} />
  </section>
));

VerticalTabsSection.displayName = 'VerticalTabsSection';
