import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import {
  BasicSelectSection,
  AdvancedSection,
  StatesSection,
  InteractiveSection,
} from './sections';

const SyncfusionSelectShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={TestIds.SYNCFUSION_SELECT_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">
          {FM('components.selectShowcase.syncfusionTitle')}
        </h2>
        <p className="mt-1 text-text-secondary">
          {FM('components.selectShowcase.syncfusionDescription')}
        </p>
      </div>

      <BasicSelectSection />
      <AdvancedSection />
      <StatesSection />
      <InteractiveSection />
    </div>
  </div>
);

export default SyncfusionSelectShowcase;
