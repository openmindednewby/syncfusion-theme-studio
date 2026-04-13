/**
 * DatePickerSection - Demonstrates the native custom calendar date picker.
 */
import { memo, useState, useCallback } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { DatePickerMode, DatePickerNative } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

export const DatePickerSection = memo((): JSX.Element => {
  const [date, setDate] = useState('');
  const [rangeStart, setRangeStart] = useState('');
  const [rangeEnd, setRangeEnd] = useState('');

  const handleChange = useCallback((value: string) => {
    setDate(value);
  }, []);

  const handleRangeChange = useCallback((start: string, end: string) => {
    setRangeStart(start);
    setRangeEnd(end);
  }, []);

  const displayValue = date !== '' ? date : FM('components.inputs.emptyValue');
  const hasRange = rangeStart !== '' && rangeEnd !== '';
  const rangeDisplay = hasRange ? `${rangeStart} → ${rangeEnd}` : FM('components.inputs.emptyValue');

  return (
    <section className="card space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.inputShowcase.sections.datePicker')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.inputShowcase.sections.datePickerDesc')}
        </p>
      </div>
      <div className="grid max-w-lg gap-4">
        <DatePickerNative
          fullWidth
          helperText={FM('components.inputs.datePickerHelper')}
          label={FM('components.inputs.datePickerLabel')}
          testId="native-showcase-datepicker"
          value={date}
          onChange={handleChange}
        />
        <p className="text-sm text-text-secondary" data-testid="native-showcase-datepicker-value">
          {FM('components.inputs.currentValue')}
          {' '}
          <span className="font-mono font-medium text-text-primary">{displayValue}</span>
        </p>
        <DatePickerNative
          fullWidth
          endDate={rangeEnd}
          label={FM('components.inputShowcase.sections.dateRangePicker')}
          mode={DatePickerMode.Range}
          startDate={rangeStart}
          testId="native-showcase-datepicker-range"
          onRangeChange={handleRangeChange}
        />
        <p className="text-sm text-text-secondary" data-testid="native-showcase-datepicker-range-value">
          {FM('components.inputs.currentValue')}
          {' '}
          <span className="font-mono font-medium text-text-primary">{rangeDisplay}</span>
        </p>
        <DatePickerNative
          disabled
          fullWidth
          label={FM('components.inputs.disabledLabel')}
          testId="native-showcase-datepicker-disabled"
        />
        <DatePickerNative
          fullWidth
          error={FM('validation.required')}
          label={FM('components.inputs.errorLabel')}
          testId="native-showcase-datepicker-error"
        />
      </div>
      <CopyableCodeSnippet code='<DatePickerNative label="Select Date" value={date} onChange={handleChange} fullWidth />' />
    </section>
  );
});

DatePickerSection.displayName = 'DatePickerSection';
