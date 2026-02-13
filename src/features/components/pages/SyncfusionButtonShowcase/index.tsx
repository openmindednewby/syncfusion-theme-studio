import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

import { CssButtonsSection, SizesSection, StatesSection, VariantsSection } from './sections';

const SyncfusionButtonShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={TestIds.SYNCFUSION_BUTTON_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">
          {FM('components.buttonShowcase.syncfusionTitle')}
        </h2>
        <p className="mt-1 text-text-secondary">
          {FM('components.buttonShowcase.syncfusionDescription')}
        </p>
      </div>

      <VariantsSection />
      <SizesSection />
      <StatesSection />
      <CssButtonsSection />
    </div>
  </div>
);

export default SyncfusionButtonShowcase;
