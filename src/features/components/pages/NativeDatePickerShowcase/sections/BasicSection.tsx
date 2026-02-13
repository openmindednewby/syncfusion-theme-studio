/**
 * BasicSection - Standard native date picker demonstrations.
 *
 * Shows basic date selection with label, helper text,
 * and a required variant with visual indicator.
 */
import { memo } from 'react';

import { DatePickerNative } from '@/components/ui/native';
import { FM } from '@/localization/helpers';

export const BasicSection = memo((): JSX.Element => (
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
      <DatePickerNative
        fullWidth
        helperText={FM('components.datepickerShowcase.labels.basicHelper')}
        label={FM('components.datepickerShowcase.labels.basicDate')}
        testId="native-datepicker-showcase-basic"
      />
      <DatePickerNative
        fullWidth
        helperText={FM('components.datepickerShowcase.labels.withHelperText')}
        label={FM('components.datepickerShowcase.labels.withHelper')}
        testId="native-datepicker-showcase-helper"
      />
      <DatePickerNative
        fullWidth
        required
        helperText={FM('validation.required')}
        label={FM('components.datepickerShowcase.labels.required')}
        testId="native-datepicker-showcase-required"
      />
    </div>
  </section>
));

BasicSection.displayName = 'BasicSection';
