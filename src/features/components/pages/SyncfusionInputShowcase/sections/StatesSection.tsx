/**
 * StatesSection - Demonstrates Syncfusion input states:
 * disabled, error with validation, helper text, and required indicator.
 */
import { memo } from 'react';

import { Input } from '@/components/ui/syncfusion';
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
      <Input
        fullWidth
        enabled={false}
        label={FM('components.inputs.disabledLabel')}
        placeholder={FM('components.inputs.disabledPlaceholder')}
        testId="sf-showcase-disabled"
      />
      <Input
        fullWidth
        error={FM('validation.required')}
        label={FM('components.inputs.errorLabel')}
        placeholder={FM('components.inputs.errorPlaceholder')}
        testId="sf-showcase-error"
      />
      <Input
        fullWidth
        helperText={FM('components.inputs.helperText')}
        label={FM('components.inputs.helperLabel')}
        placeholder={FM('components.inputs.helperPlaceholder')}
        testId="sf-showcase-helper"
      />
      <Input
        fullWidth
        required
        label={FM('components.inputs.requiredLabel')}
        placeholder={FM('components.inputs.requiredPlaceholder')}
        testId="sf-showcase-required"
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label={FM('components.inputs.fixedWidthLabel')}
          placeholder={FM('components.inputs.fixedWidthPlaceholder')}
          testId="sf-showcase-fixed"
        />
        <Input
          fullWidth
          label={FM('components.inputs.fullWidthLabel')}
          placeholder={FM('components.inputs.fullWidthPlaceholder')}
          testId="sf-showcase-fullwidth"
        />
      </div>
    </div>
  </section>
));

StatesSection.displayName = 'StatesSection';
