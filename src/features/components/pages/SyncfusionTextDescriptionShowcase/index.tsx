import { FM } from '@/localization/helpers';
import { ComponentTestIds } from '@/shared/testIds.components';

import { CssDescriptionSection, DescriptionVariantsSection, StatesSection, TypographyPairingSection } from './sections';

const SyncfusionTextDescriptionShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={ComponentTestIds.SYNCFUSION_TEXTDESCRIPTION_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">
          {FM('components.textDescriptionShowcase.syncfusionTitle')}
        </h2>
        <p className="mt-1 text-text-secondary">
          {FM('components.textDescriptionShowcase.syncfusionDescription')}
        </p>
      </div>

      <DescriptionVariantsSection />
      <TypographyPairingSection />
      <StatesSection />
      <CssDescriptionSection />
    </div>
  </div>
);

export default SyncfusionTextDescriptionShowcase;
