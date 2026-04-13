/**
 * RangeSection - Date range picker with presets and dual calendars.
 *
 * Demonstrates the DateRangePickerNative component matching the Figma
 * datepicker design: combined input, preset sidebar, dual calendar panels.
 */
import { memo, useState, useCallback } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { DateRangePickerNative } from '@/components/ui/native';
import { formatShortDate } from '@/components/ui/native/DateRangePickerNative/constants';
import { FM } from '@/localization/utils/helpers';

export const RangeSection = memo((): JSX.Element => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleRangeChange = useCallback((start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
  }, []);

  const rangeDisplay = startDate !== '' && endDate !== ''
    ? `${formatShortDate(startDate)} \u2192 ${formatShortDate(endDate)}`
    : FM('components.datepickerShowcase.labels.noDateSelected');

  return (
    <section className="card space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.datepickerShowcase.sections.range')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.datepickerShowcase.sections.rangeDesc')}
        </p>
      </div>
      <div className="grid max-w-sm gap-4">
        <DateRangePickerNative
          fullWidth
          endDate={endDate}
          helperText={FM('components.datepickerShowcase.labels.dateRangeHelperText')}
          label={FM('components.datepickerShowcase.labels.dateRangeLabel')}
          startDate={startDate}
          testId="native-daterange-showcase-interactive"
          onRangeChange={handleRangeChange}
        />
        <p className="text-sm font-medium text-text-secondary" data-testid="native-daterange-showcase-value">
          {rangeDisplay}
        </p>
      </div>
      <div className="grid max-w-sm gap-4">
        <DateRangePickerNative
          disabled
          fullWidth
          endDate="2025-05-21"
          label={FM('components.datepickerShowcase.labels.disabledRange')}
          startDate="2025-05-14"
          testId="native-daterange-showcase-disabled"
        />
        <DateRangePickerNative
          fullWidth
          error={FM('validation.required')}
          label={FM('components.datepickerShowcase.labels.withError')}
          testId="native-daterange-showcase-error"
        />
      </div>
      <CopyableCodeSnippet code={'<DateRangePickerNative\n  label="Date Range"\n  startDate={startDate}\n  endDate={endDate}\n  onRangeChange={handleRangeChange}\n  fullWidth\n/>'} />
    </section>
  );
});

RangeSection.displayName = 'RangeSection';
