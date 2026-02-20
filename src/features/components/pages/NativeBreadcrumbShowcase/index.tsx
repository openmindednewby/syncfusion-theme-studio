import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import { BasicSection, CustomSection, InteractiveSection } from './sections';

const NativeBreadcrumbShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={TestIds.NATIVE_BREADCRUMB_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">
          {FM('components.breadcrumbShowcase.nativeTitle')}
        </h2>
        <p className="mt-1 text-text-secondary">
          {FM('components.breadcrumbShowcase.nativeDescription')}
        </p>
      </div>

      <BasicSection />
      <CustomSection />
      <InteractiveSection />
    </div>
  </div>
);

export default NativeBreadcrumbShowcase;
