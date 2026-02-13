import { useEffect } from 'react';

import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';
import { loadSyncfusionCss, SyncfusionCssModule } from '@/utils';

import { BasicDialogSection, ModalSection, TooltipSection } from './sections';

const SyncfusionDialogShowcase = (): JSX.Element => {
  useEffect(() => {
    loadSyncfusionCss(SyncfusionCssModule.Popups).catch(() => {});
  }, []);

  return (
    <div className="h-full overflow-y-auto p-6" data-testid={TestIds.SYNCFUSION_DIALOG_SHOWCASE}>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">
            {FM('components.dialogShowcase.syncfusionTitle')}
          </h2>
          <p className="mt-1 text-text-secondary">
            {FM('components.dialogShowcase.syncfusionDescription')}
          </p>
        </div>

        <BasicDialogSection />
        <ModalSection />
        <TooltipSection />
      </div>
    </div>
  );
};

export default SyncfusionDialogShowcase;
