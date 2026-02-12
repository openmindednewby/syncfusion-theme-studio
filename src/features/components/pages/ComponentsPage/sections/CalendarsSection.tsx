import { useEffect } from 'react';

import {
  DatePickerComponent,
  TimePickerComponent,
  DateRangePickerComponent,
  DateTimePickerComponent,
} from '@syncfusion/ej2-react-calendars';

import { FM } from '@/localization/helpers';
import { loadSyncfusionCss, SyncfusionCssModule } from '@/utils';

const DAYS_IN_WEEK = 7;
const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;
const SECONDS_IN_MINUTE = 60;
const MS_IN_SECOND = 1000;
const ONE_WEEK_MS = DAYS_IN_WEEK * HOURS_IN_DAY * MINUTES_IN_HOUR * SECONDS_IN_MINUTE * MS_IN_SECOND;

export const CalendarsSection = (): JSX.Element => {
  // Load calendars CSS on mount
  useEffect(() => {
    loadSyncfusionCss(SyncfusionCssModule.Calendars).catch(() => {});
  }, []);

  const today = new Date();
  const nextWeek = new Date(today.getTime() + ONE_WEEK_MS);

  return (
    <section className="space-y-6">
      <h3 className="text-xl font-semibold text-text-primary">{FM('components.calendars')}</h3>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Date Picker */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary">
            {FM('components.datePicker')}
          </label>
          <DatePickerComponent placeholder="Select date" value={today} />
        </div>

        {/* Time Picker */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary">
            {FM('components.timePicker')}
          </label>
          <TimePickerComponent placeholder="Select time" value={today} />
        </div>

        {/* DateTime Picker */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary">
            {FM('components.dateTimePicker')}
          </label>
          <DateTimePickerComponent placeholder="Select date/time" value={today} />
        </div>

        {/* Date Range Picker */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary">
            {FM('components.dateRangePicker')}
          </label>
          <DateRangePickerComponent endDate={nextWeek} placeholder="Select range" startDate={today} />
        </div>
      </div>

      {/* Error States */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary">
            {FM('components.datePickerError')}
          </label>
          <DatePickerComponent cssClass="e-error" placeholder="Invalid date" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary">
            {FM('components.datePickerDisabled')}
          </label>
          <DatePickerComponent enabled={false} placeholder="Disabled" value={today} />
        </div>
      </div>
    </section>
  );
};
