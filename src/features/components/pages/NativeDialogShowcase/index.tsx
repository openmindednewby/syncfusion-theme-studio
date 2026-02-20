import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import { BasicDialogSection, ConfirmDialogSection, CustomContentSection } from './sections';

const NativeDialogShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={TestIds.NATIVE_DIALOG_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">
          {FM('components.dialogShowcase.nativeTitle')}
        </h2>
        <p className="mt-1 text-text-secondary">
          {FM('components.dialogShowcase.nativeDescription')}
        </p>
      </div>

      <BasicDialogSection />
      <ConfirmDialogSection />
      <CustomContentSection />
    </div>
  </div>
);

export default NativeDialogShowcase;
