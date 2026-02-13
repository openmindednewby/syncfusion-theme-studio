import { useEffect } from 'react';

import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';
import { loadSyncfusionCss, SyncfusionCssModule } from '@/utils';

import { DatePickerSection, DateRangeSection, StatesSection, TimePickerSection } from './sections';

const SyncfusionDatePickerShowcase = (): JSX.Element => {
  useEffect(() => {
    loadSyncfusionCss(SyncfusionCssModule.Calendars).catch(() => {});
  }, []);

  return (
    <div className="h-full overflow-y-auto p-6" data-testid={TestIds.SYNCFUSION_DATEPICKER_SHOWCASE}>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">
            {FM('components.datepickerShowcase.syncfusionTitle')}
          </h2>
          <p className="mt-1 text-text-secondary">
            {FM('components.datepickerShowcase.syncfusionDescription')}
          </p>
        </div>

        <DatePickerSection />
        <DateRangeSection />
        <TimePickerSection />
        <StatesSection />
      </div>
    </div>
  );
};

export default SyncfusionDatePickerShowcase;
