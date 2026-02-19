import { FM } from '@/localization/helpers';
import { ComponentTestIds } from '@/shared/testIds.components';

import { DescriptionVariantsSection, InteractiveSection, StatesSection, TypographyPairingSection } from './sections';

const NativeTextDescriptionShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={ComponentTestIds.NATIVE_TEXTDESCRIPTION_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">
          {FM('components.textDescriptionShowcase.nativeTitle')}
        </h2>
        <p className="mt-1 text-text-secondary">
          {FM('components.textDescriptionShowcase.nativeDescription')}
        </p>
      </div>

      <DescriptionVariantsSection />
      <TypographyPairingSection />
      <StatesSection />
      <InteractiveSection />
    </div>
  </div>
);

export default NativeTextDescriptionShowcase;
