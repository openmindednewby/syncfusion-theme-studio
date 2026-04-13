import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import { BasicSection, IconTabsSection, VerticalTabsSection } from './sections';

const SyncfusionTabsShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={TestIds.SYNCFUSION_TABS_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">{FM('components.tabsShowcase.syncfusionTitle')}</h2>
        <p className="mt-1 text-text-secondary">{FM('components.tabsShowcase.syncfusionDescription')}</p>
      </div>
      <BasicSection />
      <IconTabsSection />
      <VerticalTabsSection />
    </div>
  </div>
);

export default SyncfusionTabsShowcase;
