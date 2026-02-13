/**
 * InteractiveSection - Controlled date picker with live value display.
 *
 * Demonstrates a fully controlled native date picker where the
 * selected value is displayed in real time below the input.
 */
import { memo, useState, useCallback } from 'react';

import { DatePickerNative } from '@/components/ui/native';
import { FM } from '@/localization/helpers';

export const InteractiveSection = memo((): JSX.Element => {
  const [dateValue, setDateValue] = useState('');

  const handleDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setDateValue(e.target.value);
  }, []);

  const displayValue =
    dateValue !== ''
      ? FM('components.datepickerShowcase.labels.selectedValue', dateValue)
      : FM('components.datepickerShowcase.labels.noDateSelected');

  return (
    <section className="card space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.datepickerShowcase.sections.interactive')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.datepickerShowcase.sections.interactiveDesc')}
        </p>
      </div>
      <div className="grid max-w-lg gap-4">
        <DatePickerNative
          fullWidth
          helperText={FM('components.datepickerShowcase.labels.basicHelper')}
          label={FM('components.datepickerShowcase.labels.selectDate')}
          testId="native-datepicker-showcase-interactive"
          value={dateValue}
          onChange={handleDateChange}
        />
        <p className="text-sm font-medium text-text-secondary" data-testid="native-datepicker-showcase-value">
          {displayValue}
        </p>
      </div>
    </section>
  );
});

InteractiveSection.displayName = 'InteractiveSection';
