import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

import { InteractiveSection, VariantsSection } from './sections';

const NativeThemeToggleShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={TestIds.NATIVE_THEMETOGGLE_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">
          {FM('components.themeToggleShowcase.nativeTitle')}
        </h2>
        <p className="mt-1 text-text-secondary">
          {FM('components.themeToggleShowcase.nativeDescription')}
        </p>
      </div>

      <VariantsSection />
      <InteractiveSection />
    </div>
  </div>
);

export default NativeThemeToggleShowcase;
