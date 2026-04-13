import { useEffect } from 'react';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';
import { loadSyncfusionCss, SyncfusionCssModule } from '@/utils';

import { BasicSection, InteractiveSection, StatesSection } from './sections';

const SyncfusionToggleShowcase = (): JSX.Element => {
  useEffect(() => {
    loadSyncfusionCss(SyncfusionCssModule.Buttons).catch(() => {});
  }, []);

  return (
    <div className="h-full overflow-y-auto p-6" data-testid={TestIds.SYNCFUSION_TOGGLE_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">
          {FM('components.toggleShowcase.syncfusionTitle')}
        </h2>
        <p className="mt-1 text-text-secondary">
          {FM('components.toggleShowcase.syncfusionDescription')}
        </p>
      </div>

      <BasicSection />
      <StatesSection />
      <InteractiveSection />
    </div>
  </div>
  );
};

export default SyncfusionToggleShowcase;
