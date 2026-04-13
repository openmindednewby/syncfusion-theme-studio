import { useEffect } from 'react';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';
import { loadSyncfusionCss, SyncfusionCssModule } from '@/utils';

import { BasicSection, InteractiveSection, MultipleSection } from './sections';

const SyncfusionAccordionShowcase = (): JSX.Element => {
  useEffect(() => {
    loadSyncfusionCss(SyncfusionCssModule.Navigations).catch(() => {});
  }, []);

  return (
    <div className="h-full overflow-y-auto p-6" data-testid={TestIds.SYNCFUSION_ACCORDION_SHOWCASE}>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">
            {FM('components.accordionShowcase.syncfusionTitle')}
          </h2>
          <p className="mt-1 text-text-secondary">
            {FM('components.accordionShowcase.syncfusionDescription')}
          </p>
        </div>

        <BasicSection />
        <MultipleSection />
        <InteractiveSection />
      </div>
    </div>
  );
};

export default SyncfusionAccordionShowcase;
