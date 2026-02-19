/**
 * StatesSection - Disabled, error, and min/max date constraint states.
 *
 * Demonstrates the native date picker in various non-default states
 * including disabled, error display, and date range constraints.
 */
import { memo, useMemo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { DatePickerNative } from '@/components/ui/native';
import { FM } from '@/localization/helpers';

const DAYS_IN_MONTH = 30;
const MS_PER_DAY = 86_400_000;

export const StatesSection = memo((): JSX.Element => {
  const today = useMemo(() => new Date().toISOString().split('T')[0] ?? '', []);

  const thirtyDaysFromNow = useMemo(() => {
    const future = new Date(Date.now() + DAYS_IN_MONTH * MS_PER_DAY);
    return future.toISOString().split('T')[0] ?? '';
  }, []);

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
        <DatePickerNative
          disabled
          fullWidth
          label={FM('components.datepickerShowcase.labels.disabled')}
          testId="native-datepicker-showcase-disabled"
          value="2025-06-15"
        />
        <DatePickerNative
          fullWidth
          error={FM('validation.required')}
          label={FM('components.datepickerShowcase.labels.withError')}
          testId="native-datepicker-showcase-error"
        />
        <DatePickerNative
          fullWidth
          helperText={FM('components.datepickerShowcase.labels.minMaxHelper')}
          label={FM('components.datepickerShowcase.labels.minMax')}
          maxDate={thirtyDaysFromNow}
          minDate={today}
          testId="native-datepicker-showcase-minmax"
        />
        <DatePickerNative
          fullWidth
          helperText={FM('components.datepickerShowcase.labels.pastDatesHelper')}
          label={FM('components.datepickerShowcase.labels.pastDatesOnly')}
          maxDate={today}
          testId="native-datepicker-showcase-past"
        />
      </div>
      <CopyableCodeSnippet code='<DatePickerNative disabled label="Disabled" value="2025-06-15" fullWidth />' />
    </section>
  );
});

StatesSection.displayName = 'StatesSection';
