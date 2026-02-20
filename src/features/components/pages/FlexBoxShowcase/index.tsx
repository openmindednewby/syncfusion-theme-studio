import { FM } from '@/localization/utils/helpers';
import { ComponentTestIds } from '@/shared/testIds.components';

import {
  AlignSection,
  BasicSection,
  CombinedSection,
  CustomElementSection,
  FlexPropertySection,
  GapSection,
  JustifySection,
  VerticalSection,
  WrapSection,
} from './sections';

const FlexBoxShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={ComponentTestIds.FLEXBOX_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">
          {FM('components.flexBoxShowcase.title')}
        </h2>
        <p className="mt-1 text-text-secondary">
          {FM('components.flexBoxShowcase.description')}
        </p>
      </div>

      <BasicSection />
      <VerticalSection />
      <JustifySection />
      <AlignSection />
      <GapSection />
      <WrapSection />
      <FlexPropertySection />
      <CustomElementSection />
      <CombinedSection />
    </div>
  </div>
);

export default FlexBoxShowcase;
