/**
 * BasicSection demonstrates a Syncfusion TabComponent with default
 * horizontal tabs, including a disabled tab.
 */
import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import SyncfusionTabs from '@/components/ui/syncfusion/Tabs';
import { FM } from '@/localization/utils/helpers';

const DEMO_TABS = [
  { id: 'tab1', label: 'Overview', content: <p className="text-text-secondary">{FM('showcase.content.sfOverviewPanel')}</p> },
  { id: 'tab2', label: 'Analytics', content: <p className="text-text-secondary">{FM('showcase.content.sfAnalyticsPanel')}</p> },
  { id: 'tab3', label: 'Reports', content: <p className="text-text-secondary">{FM('showcase.content.sfReportsPanel')}</p> },
  { id: 'tab4', label: 'Disabled', content: <p>{FM('showcase.labels.disabled')}</p>, disabled: true },
];

const CODE_SNIPPET = '<SyncfusionTabs items={[{ id: "tab1", label: "Overview", content: <p>Panel</p> }]} />';

export const BasicSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <h3 className="text-lg font-semibold text-text-primary">{FM('showcase.sections.basicTabs')}</h3>
    <SyncfusionTabs items={DEMO_TABS} testId="sf-tabs-basic" />
    <CopyableCodeSnippet code={CODE_SNIPPET} />
  </section>
));

BasicSection.displayName = 'BasicSection';
