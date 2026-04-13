/**
 * TimePickerSection - Syncfusion TimePicker and DateTimePicker demonstrations.
 *
 * Shows time-only selection and combined date-time selection
 * using raw Syncfusion components.
 */
import { memo, useMemo } from 'react';

import { DateTimePickerComponent, TimePickerComponent } from '@syncfusion/ej2-react-calendars';

import { CopyableCodeSnippet } from '@/components/common';
import { FM } from '@/localization/utils/helpers';

export const TimePickerSection = memo((): JSX.Element => {
  const now = useMemo(() => new Date(), []);

  return (
    <section className="card space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.datepickerShowcase.sections.timePicker')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.datepickerShowcase.sections.timePickerDesc')}
        </p>
      </div>
      <div className="grid max-w-lg gap-6">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-text-primary">
            {FM('components.datepickerShowcase.labels.time')}
          </label>
          <TimePickerComponent
            placeholder={FM('components.datepickerShowcase.labels.timeHelper')}
            value={now}
          />
          <span className="text-sm text-text-secondary">
            {FM('components.datepickerShowcase.labels.timeHelper')}
          </span>
        </div>

        <div>
          <h4 className="mb-2 text-base font-semibold text-text-primary">
            {FM('components.datepickerShowcase.sections.dateTimePicker')}
          </h4>
          <p className="mb-3 text-sm text-text-secondary">
            {FM('components.datepickerShowcase.sections.dateTimePickerDesc')}
          </p>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-text-primary">
              {FM('components.datepickerShowcase.labels.dateTime')}
            </label>
            <DateTimePickerComponent
              placeholder={FM('components.datepickerShowcase.labels.dateTimeHelper')}
              value={now}
            />
            <span className="text-sm text-text-secondary">
              {FM('components.datepickerShowcase.labels.dateTimeHelper')}
            </span>
          </div>
        </div>
      </div>
      <CopyableCodeSnippet code='<TimePickerComponent value={now} placeholder="Select time" />' />
    </section>
  );
});

TimePickerSection.displayName = 'TimePickerSection';
