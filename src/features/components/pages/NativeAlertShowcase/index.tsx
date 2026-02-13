import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

import { FeaturesSection, VariantsSection } from './sections';

const NativeAlertShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={TestIds.NATIVE_ALERT_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">
          {FM('components.alertShowcase.nativeTitle')}
        </h2>
        <p className="mt-1 text-text-secondary">
          {FM('components.alertShowcase.nativeDescription')}
        </p>
      </div>

      <VariantsSection />
      <FeaturesSection />
    </div>
  </div>
);

export default NativeAlertShowcase;
