import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

import {
  BasicInputSection,
  StatesSection,
  AdvancedInputsSection,
  InteractiveSection,
} from './sections';

const SyncfusionInputShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={TestIds.SYNCFUSION_INPUT_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">
          {FM('components.inputShowcase.syncfusionTitle')}
        </h2>
        <p className="mt-1 text-text-secondary">
          {FM('components.inputShowcase.syncfusionDescription')}
        </p>
      </div>

      <BasicInputSection />
      <StatesSection />
      <AdvancedInputsSection />
      <InteractiveSection />
    </div>
  </div>
);

export default SyncfusionInputShowcase;
