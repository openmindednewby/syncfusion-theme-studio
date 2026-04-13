import { useEffect } from 'react';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';
import { loadSyncfusionCss, SyncfusionCssModule } from '@/utils';

import { BasicSection, NestedSection, InteractiveSection } from './sections';

const SyncfusionMenuShowcase = (): JSX.Element => {
  useEffect(() => {
    loadSyncfusionCss(SyncfusionCssModule.Navigations).catch(() => {});
  }, []);

  return (
    <div className="h-full overflow-y-auto p-6" data-testid={TestIds.SYNCFUSION_MENU_SHOWCASE}>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">
            {FM('components.menuShowcase.syncfusionTitle')}
          </h2>
          <p className="mt-1 text-text-secondary">
            {FM('components.menuShowcase.syncfusionDescription')}
          </p>
        </div>

        <BasicSection />
        <NestedSection />
        <InteractiveSection />
      </div>
    </div>
  );
};

export default SyncfusionMenuShowcase;
