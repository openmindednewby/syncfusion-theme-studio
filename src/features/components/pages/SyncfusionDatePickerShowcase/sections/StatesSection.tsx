/**
 * StatesSection - Syncfusion DatePicker in disabled, error, and constrained states.
 *
 * Demonstrates the themed DatePicker wrapper with disabled input,
 * error messaging, and min/max date constraints.
 */
import { memo, useMemo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { DatePicker } from '@/components/ui/syncfusion';
import { FM } from '@/localization/helpers';

const DAYS_IN_MONTH = 30;
const MS_PER_DAY = 86_400_000;

export const StatesSection = memo((): JSX.Element => {
  const today = useMemo(() => new Date(), []);

  const thirtyDaysFromNow = useMemo(
    () => new Date(today.getTime() + DAYS_IN_MONTH * MS_PER_DAY),
    [today],
  );

  return (
    <section className="card space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.datepickerShowcase.sections.states')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.datepickerShowcase.sections.statesDesc')}
        </p>
      </div>
      <div className="grid max-w-lg gap-4">
        <DatePicker
          fullWidth
          enabled={false}
          label={FM('components.datepickerShowcase.labels.syncfusionDisabled')}
          placeholder={FM('components.datepickerShowcase.labels.selectDate')}
          testId="sf-datepicker-showcase-disabled"
          value={today}
        />
        <DatePicker
          fullWidth
          error={FM('validation.required')}
          label={FM('components.datepickerShowcase.labels.syncfusionError')}
          placeholder={FM('components.datepickerShowcase.labels.selectDate')}
          testId="sf-datepicker-showcase-error"
        />
        <DatePicker
          fullWidth
          helperText={FM('components.datepickerShowcase.labels.syncfusionMinMaxHelper')}
          label={FM('components.datepickerShowcase.labels.syncfusionMinMax')}
          max={thirtyDaysFromNow}
          min={today}
          placeholder={FM('components.datepickerShowcase.labels.selectDate')}
          testId="sf-datepicker-showcase-minmax"
        />
      </div>
      <CopyableCodeSnippet code='<DatePicker enabled={false} label="Disabled" error="Required" min={today} max={maxDate} />' />
    </section>
  );
});

StatesSection.displayName = 'StatesSection';
