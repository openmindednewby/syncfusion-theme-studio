/**
 * DateRangeSection - Syncfusion DateRangePickerComponent demonstration.
 *
 * Shows a date range picker for selecting a start and end date,
 * using the raw Syncfusion component with CSS loaded on mount.
 */
import { memo, useMemo } from 'react';

import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';

import { CopyableCodeSnippet } from '@/components/common';
import { FM } from '@/localization/helpers';

const DAYS_IN_WEEK = 7;
const MS_PER_DAY = 86_400_000;

export const DateRangeSection = memo((): JSX.Element => {
  const today = useMemo(() => new Date(), []);
  const nextWeek = useMemo(() => new Date(today.getTime() + DAYS_IN_WEEK * MS_PER_DAY), [today]);

  return (
    <section className="card space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.datepickerShowcase.sections.dateRange')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.datepickerShowcase.sections.dateRangeDesc')}
        </p>
      </div>
      <div className="grid max-w-lg gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-text-primary">
            {FM('components.datepickerShowcase.labels.dateRange')}
          </label>
          <DateRangePickerComponent
            endDate={nextWeek}
            placeholder={FM('components.datepickerShowcase.labels.dateRangeHelper')}
            startDate={today}
          />
          <span className="text-sm text-text-secondary">
            {FM('components.datepickerShowcase.labels.dateRangeHelper')}
          </span>
        </div>
      </div>
      <CopyableCodeSnippet code='<DateRangePickerComponent startDate={start} endDate={end} placeholder="Select range" />' />
    </section>
  );
});

DateRangeSection.displayName = 'DateRangeSection';
