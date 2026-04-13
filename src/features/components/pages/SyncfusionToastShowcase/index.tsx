import { useEffect } from 'react';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';
import { loadSyncfusionCss, SyncfusionCssModule } from '@/utils';

import { InteractiveSection, VariantsSection } from './sections';

const SyncfusionToastShowcase = (): JSX.Element => {
  useEffect(() => {
    loadSyncfusionCss(SyncfusionCssModule.Notifications).catch(() => {});
  }, []);

  return (
    <div className="h-full overflow-y-auto p-6" data-testid={TestIds.SYNCFUSION_TOAST_SHOWCASE}>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">
            {FM('components.toastShowcase.syncfusionTitle')}
          </h2>
          <p className="mt-1 text-text-secondary">
            {FM('components.toastShowcase.syncfusionDescription')}
          </p>
        </div>

        <VariantsSection />
        <InteractiveSection />
      </div>
    </div>
  );
};

export default SyncfusionToastShowcase;
