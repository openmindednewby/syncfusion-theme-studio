import { useEffect } from 'react';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';
import { loadSyncfusionCss, SyncfusionCssModule } from '@/utils';

import { BasicSection, InteractiveSection, StatesSection, WithLabelSection } from './sections';

const SyncfusionCheckboxShowcase = (): JSX.Element => {
  useEffect(() => {
    loadSyncfusionCss(SyncfusionCssModule.Buttons).catch(() => {});
  }, []);

  return (
    <div className="h-full overflow-y-auto p-6" data-testid={TestIds.SYNCFUSION_CHECKBOX_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">
          {FM('components.checkboxShowcase.syncfusionTitle')}
        </h2>
        <p className="mt-1 text-text-secondary">
          {FM('components.checkboxShowcase.syncfusionDescription')}
        </p>
      </div>

      <BasicSection />
      <StatesSection />
      <WithLabelSection />
      <InteractiveSection />
    </div>
  </div>
  );
};

export default SyncfusionCheckboxShowcase;
