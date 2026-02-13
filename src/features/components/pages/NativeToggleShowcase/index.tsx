import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

import { BasicSection, InteractiveSection, StatesSection } from './sections';

const NativeToggleShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={TestIds.NATIVE_TOGGLE_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">
          {FM('components.toggleShowcase.nativeTitle')}
        </h2>
        <p className="mt-1 text-text-secondary">
          {FM('components.toggleShowcase.nativeDescription')}
        </p>
      </div>

      <BasicSection />
      <StatesSection />
      <InteractiveSection />
    </div>
  </div>
);

export default NativeToggleShowcase;
