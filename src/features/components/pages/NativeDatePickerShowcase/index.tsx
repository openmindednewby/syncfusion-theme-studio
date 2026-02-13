import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

import { BasicSection, InteractiveSection, StatesSection } from './sections';

const NativeDatePickerShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={TestIds.NATIVE_DATEPICKER_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">
          {FM('components.datepickerShowcase.nativeTitle')}
        </h2>
        <p className="mt-1 text-text-secondary">
          {FM('components.datepickerShowcase.nativeDescription')}
        </p>
      </div>

      <BasicSection />
      <StatesSection />
      <InteractiveSection />
    </div>
  </div>
);

export default NativeDatePickerShowcase;
