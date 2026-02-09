import { memo, useState, useCallback } from 'react';

import { DatePickerNative } from '@/components/ui/native';
import { FM } from '@/localization/helpers';

export const NativeDatePickerSection = memo((): JSX.Element => {
  const [dateValue, setDateValue] = useState('');

  const handleDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setDateValue(e.target.value);
  }, []);

  return (
    <section className="card">
      <h3 className="mb-4 text-lg font-semibold text-text-primary">
        {FM('components.sections.nativeDatePicker')}
      </h3>
      <div className="grid max-w-lg gap-4">
        <DatePickerNative
          fullWidth
          helperText="Select your preferred date"
          label={FM('components.datePicker')}
          testId="native-datepicker-basic"
          value={dateValue}
          onChange={handleDateChange}
        />
        <DatePickerNative
          fullWidth
          error={FM('validation.required')}
          label={FM('components.datePickerError')}
          testId="native-datepicker-error"
        />
        <DatePickerNative
          disabled
          fullWidth
          label={FM('components.datePickerDisabled')}
          testId="native-datepicker-disabled"
        />
      </div>
    </section>
  );
});

NativeDatePickerSection.displayName = 'NativeDatePickerSection';
