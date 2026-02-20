import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import { BasicSection, InteractiveSection, MultipleSection } from './sections';

const NativeAccordionShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={TestIds.NATIVE_ACCORDION_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">
          {FM('components.accordionShowcase.nativeTitle')}
        </h2>
        <p className="mt-1 text-text-secondary">
          {FM('components.accordionShowcase.nativeDescription')}
        </p>
      </div>

      <BasicSection />
      <MultipleSection />
      <InteractiveSection />
    </div>
  </div>
);

export default NativeAccordionShowcase;
