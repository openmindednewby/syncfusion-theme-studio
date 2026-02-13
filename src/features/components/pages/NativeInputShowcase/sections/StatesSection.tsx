/**
 * StatesSection - Demonstrates native input states:
 * disabled, error with validation, helper text, and required indicator.
 */
import { memo } from 'react';

import { InputNative } from '@/components/ui/native';
import { FM } from '@/localization/helpers';

export const StatesSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.inputShowcase.sections.states')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.inputShowcase.sections.statesDesc')}
      </p>
    </div>
    <div className="grid max-w-lg gap-4">
      <InputNative
        disabled
        fullWidth
        label={FM('components.inputs.disabledLabel')}
        placeholder={FM('components.inputs.disabledPlaceholder')}
        testId="native-showcase-disabled"
      />
      <InputNative
        fullWidth
        error={FM('validation.required')}
        label={FM('components.inputs.errorLabel')}
        placeholder={FM('components.inputs.errorPlaceholder')}
        testId="native-showcase-error"
      />
      <InputNative
        fullWidth
        helperText={FM('components.inputs.helperText')}
        label={FM('components.inputs.helperLabel')}
        placeholder={FM('components.inputs.helperPlaceholder')}
        testId="native-showcase-helper"
      />
      <InputNative
        fullWidth
        required
        label={FM('components.inputs.requiredLabel')}
        placeholder={FM('components.inputs.requiredPlaceholder')}
        testId="native-showcase-required"
      />
      <div className="grid grid-cols-2 gap-4">
        <InputNative
          label={FM('components.inputs.fixedWidthLabel')}
          placeholder={FM('components.inputs.fixedWidthPlaceholder')}
          testId="native-showcase-fixed"
        />
        <InputNative
          fullWidth
          label={FM('components.inputs.fullWidthLabel')}
          placeholder={FM('components.inputs.fullWidthPlaceholder')}
          testId="native-showcase-fullwidth"
        />
      </div>
    </div>
  </section>
));

StatesSection.displayName = 'StatesSection';
