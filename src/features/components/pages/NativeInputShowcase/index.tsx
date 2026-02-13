import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

import { BasicInputSection, StatesSection, InteractiveSection } from './sections';

const NativeInputShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={TestIds.NATIVE_INPUT_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">
          {FM('components.inputShowcase.nativeTitle')}
        </h2>
        <p className="mt-1 text-text-secondary">
          {FM('components.inputShowcase.nativeDescription')}
        </p>
      </div>

      <BasicInputSection />
      <StatesSection />
      <InteractiveSection />
    </div>
  </div>
);

export default NativeInputShowcase;
