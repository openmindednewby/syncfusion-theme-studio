import { FM } from '@/localization/utils/helpers';
import { ComponentTestIds } from '@/shared/testIds.components';

import {
  TypescaleBoldSection,
  TypescaleItalicSection,
  TypescaleMediumSection,
  TypescaleRegularSection,
  UsageExamplesSection,
} from './sections';

const NativeTypographyShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={ComponentTestIds.NATIVE_TYPOGRAPHY_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">
          {FM('components.typographyShowcase.nativeTitle')}
        </h2>
        <p className="mt-1 text-text-secondary">
          {FM('components.typographyShowcase.nativeDescription')}
        </p>
      </div>

      <UsageExamplesSection />
      <TypescaleRegularSection />
      <TypescaleMediumSection />
      <TypescaleItalicSection />
      <TypescaleBoldSection />
    </div>
  </div>
);

export default NativeTypographyShowcase;
