import { useEffect } from 'react';

import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';
import { loadSyncfusionCss, SyncfusionCssModule } from '@/utils';

import { BasicSection, CustomSection, InteractiveSection } from './sections';

const SyncfusionBreadcrumbShowcase = (): JSX.Element => {
  useEffect(() => {
    loadSyncfusionCss(SyncfusionCssModule.Navigations).catch(() => {});
  }, []);

  return (
    <div className="h-full overflow-y-auto p-6" data-testid={TestIds.SYNCFUSION_BREADCRUMB_SHOWCASE}>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">
            {FM('components.breadcrumbShowcase.syncfusionTitle')}
          </h2>
          <p className="mt-1 text-text-secondary">
            {FM('components.breadcrumbShowcase.syncfusionDescription')}
          </p>
        </div>

        <BasicSection />
        <CustomSection />
        <InteractiveSection />
      </div>
    </div>
  );
};

export default SyncfusionBreadcrumbShowcase;
