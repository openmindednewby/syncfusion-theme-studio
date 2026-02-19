/**
 * DatePickerSection - Syncfusion DatePickerComponent demonstrations.
 *
 * Shows the themed DatePicker wrapper with label, helper text,
 * required indicator, and custom date format.
 */
import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { DatePicker } from '@/components/ui/syncfusion';
import { FM } from '@/localization/helpers';

export const DatePickerSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.datepickerShowcase.sections.basic')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.datepickerShowcase.sections.basicDesc')}
      </p>
    </div>
    <div className="grid max-w-lg gap-4">
      <DatePicker
        fullWidth
        helperText={FM('components.datepickerShowcase.labels.syncfusionHelper')}
        label={FM('components.datepickerShowcase.labels.syncfusionBasic')}
        placeholder={FM('components.datepickerShowcase.labels.selectDate')}
        testId="sf-datepicker-showcase-basic"
        value={new Date()}
      />
      <DatePicker
        fullWidth
        required
        label={FM('components.datepickerShowcase.labels.syncfusionRequired')}
        placeholder={FM('components.datepickerShowcase.labels.selectDate')}
        testId="sf-datepicker-showcase-required"
      />
      <DatePicker
        fullWidth
        format="dd-MMM-yyyy"
        helperText={FM('components.datepickerShowcase.labels.syncfusionFormatHelper')}
        label={FM('components.datepickerShowcase.labels.syncfusionFormat')}
        placeholder={FM('components.datepickerShowcase.labels.selectDate')}
        testId="sf-datepicker-showcase-format"
        value={new Date()}
      />
    </div>
    <CopyableCodeSnippet code='<DatePicker label="Date" placeholder="Select date" value={new Date()} fullWidth />' />
  </section>
));

DatePickerSection.displayName = 'DatePickerSection';
