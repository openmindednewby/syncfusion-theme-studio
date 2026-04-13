import { useEffect } from 'react';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';
import { loadSyncfusionCss, SyncfusionCssModule } from '@/utils';

import { BasicSection, InteractiveSection, VariantsSection } from './sections';

const SyncfusionToolbarShowcase = (): JSX.Element => {
  useEffect(() => {
    loadSyncfusionCss(SyncfusionCssModule.Navigations).catch(() => {});
  }, []);

  return (
    <div className="h-full overflow-y-auto p-6" data-testid={TestIds.SYNCFUSION_TOOLBAR_SHOWCASE}>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">
            {FM('components.toolbarShowcase.syncfusionTitle')}
          </h2>
          <p className="mt-1 text-text-secondary">
            {FM('components.toolbarShowcase.syncfusionDescription')}
          </p>
        </div>

        <BasicSection />
        <VariantsSection />
        <InteractiveSection />
      </div>
    </div>
  );
};

export default SyncfusionToolbarShowcase;
