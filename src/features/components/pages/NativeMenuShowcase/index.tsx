import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import { BasicSection, NestedSection, InteractiveSection } from './sections';

const NativeMenuShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={TestIds.NATIVE_MENU_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">
          {FM('components.menuShowcase.nativeTitle')}
        </h2>
        <p className="mt-1 text-text-secondary">
          {FM('components.menuShowcase.nativeDescription')}
        </p>
      </div>

      <BasicSection />
      <NestedSection />
      <InteractiveSection />
    </div>
  </div>
);

export default NativeMenuShowcase;
