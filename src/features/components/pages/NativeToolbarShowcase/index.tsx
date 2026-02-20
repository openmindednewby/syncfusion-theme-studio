import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import { BasicSection, InteractiveSection, VariantsSection } from './sections';

const NativeToolbarShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={TestIds.NATIVE_TOOLBAR_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">
          {FM('components.toolbarShowcase.nativeTitle')}
        </h2>
        <p className="mt-1 text-text-secondary">
          {FM('components.toolbarShowcase.nativeDescription')}
        </p>
      </div>

      <BasicSection />
      <VariantsSection />
      <InteractiveSection />
    </div>
  </div>
);

export default NativeToolbarShowcase;
