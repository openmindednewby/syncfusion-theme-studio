import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import {
  DismissibleSection,
  FilledSection,
  OutlinedSection,
  TextSection,
} from './sections';

const SyncfusionAlertShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={TestIds.SYNCFUSION_ALERT_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">
          {FM('components.alertShowcase.syncfusionTitle')}
        </h2>
        <p className="mt-1 text-text-secondary">
          {FM('components.alertShowcase.syncfusionDescription')}
        </p>
      </div>

      <FilledSection />
      <OutlinedSection />
      <TextSection />
      <DismissibleSection />
    </div>
  </div>
);

export default SyncfusionAlertShowcase;
