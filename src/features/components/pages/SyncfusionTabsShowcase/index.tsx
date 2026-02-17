import SyncfusionTabs from '@/components/ui/syncfusion/Tabs';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

const DEMO_TABS = [
  { id: 'tab1', label: 'Overview', content: <p className="text-text-secondary">{FM('showcase.content.sfOverviewPanel')}</p> },
  { id: 'tab2', label: 'Analytics', content: <p className="text-text-secondary">{FM('showcase.content.sfAnalyticsPanel')}</p> },
  { id: 'tab3', label: 'Reports', content: <p className="text-text-secondary">{FM('showcase.content.sfReportsPanel')}</p> },
  { id: 'tab4', label: 'Disabled', content: <p>{FM('showcase.labels.disabled')}</p>, disabled: true },
];

const SyncfusionTabsShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={TestIds.SYNCFUSION_TABS_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">{FM('components.tabsShowcase.syncfusionTitle')}</h2>
        <p className="mt-1 text-text-secondary">{FM('components.tabsShowcase.syncfusionDescription')}</p>
      </div>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('showcase.sections.basicTabs')}</h3>
        <SyncfusionTabs items={DEMO_TABS} testId="sf-tabs-basic" />
      </section>
    </div>
  </div>
);

export default SyncfusionTabsShowcase;
