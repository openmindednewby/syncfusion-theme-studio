import { CopyableCodeSnippet } from '@/components/common';
import { TabsNative } from '@/components/ui/native';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

const VERTICAL_TAB_COUNT = 3;

const DEMO_TABS = [
  { id: 'tab1', label: 'Overview', content: <p className="text-text-secondary">{FM('showcase.content.overviewPanel')}</p> },
  { id: 'tab2', label: 'Details', content: <p className="text-text-secondary">{FM('showcase.content.detailsPanel')}</p> },
  { id: 'tab3', label: 'Settings', content: <p className="text-text-secondary">{FM('showcase.content.settingsPanel')}</p> },
  { id: 'tab4', label: 'Disabled', content: <p>{FM('showcase.labels.disabled')}</p>, disabled: true },
];

const ICON_TABS = [
  { id: 'home', label: '🏠 Home', content: <p className="text-text-secondary">{FM('showcase.content.homeTabContent')}</p> },
  { id: 'search', label: '🔍 Search', content: <p className="text-text-secondary">{FM('showcase.content.searchTabContent')}</p> },
  { id: 'profile', label: '👤 Profile', content: <p className="text-text-secondary">{FM('showcase.content.profileTabContent')}</p> },
];

const NativeTabsShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={TestIds.NATIVE_TABS_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">{FM('components.tabsShowcase.nativeTitle')}</h2>
        <p className="mt-1 text-text-secondary">{FM('components.tabsShowcase.nativeDescription')}</p>
      </div>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('showcase.sections.basicTabs')}</h3>
        <TabsNative items={DEMO_TABS} testId="native-tabs-basic" />
        <CopyableCodeSnippet code={'<TabsNative\n  items={[\n    { id: "tab1", label: "Overview", content: <p>Overview panel</p> },\n    { id: "tab2", label: "Details", content: <p>Details panel</p> },\n    { id: "tab3", label: "Disabled", content: <p>...</p>, disabled: true },\n  ]}\n/>'} />
      </section>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('showcase.sections.iconTabs')}</h3>
        <TabsNative items={ICON_TABS} testId="native-tabs-icon" />
        <CopyableCodeSnippet code={'<TabsNative\n  items={[\n    { id: "home", label: "\u{1F3E0} Home", content: <p>Home content</p> },\n    { id: "search", label: "\u{1F50D} Search", content: <p>Search content</p> },\n  ]}\n/>'} />
      </section>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('showcase.sections.verticalTabs')}</h3>
        <TabsNative items={DEMO_TABS.slice(0, VERTICAL_TAB_COUNT)} orientation="vertical" testId="native-tabs-vertical" />
        <CopyableCodeSnippet code={'<TabsNative\n  orientation="vertical"\n  items={[\n    { id: "tab1", label: "Overview", content: <p>Overview</p> },\n    { id: "tab2", label: "Details", content: <p>Details</p> },\n  ]}\n/>'} />
      </section>
    </div>
  </div>
);

export default NativeTabsShowcase;
