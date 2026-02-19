/**
 * StatesSection - Demonstrates disabled, error, and indeterminate checkbox states.
 */
import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { CheckboxNative } from '@/components/ui/native';
import { FM } from '@/localization/helpers';

export const StatesSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.checkboxShowcase.sections.states')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.checkboxShowcase.sections.statesDesc')}
      </p>
    </div>
    <div className="flex flex-col gap-3">
      {/* Disabled states */}
      <CheckboxNative
        disabled
        label={FM('components.checkboxShowcase.labels.disabledUnchecked')}
        testId="native-cb-showcase-disabled-unchecked"
      />
      <CheckboxNative
        checked
        disabled
        readOnly
        label={FM('components.checkboxShowcase.labels.disabledChecked')}
        testId="native-cb-showcase-disabled-checked"
      />

      {/* Error state */}
      <CheckboxNative
        error={FM('components.checkboxShowcase.labels.errorMessage')}
        label={FM('components.checkboxShowcase.labels.errorField')}
        testId="native-cb-showcase-error"
      />

      {/* Indeterminate state */}
      <CheckboxNative
        checked
        indeterminate
        readOnly
        label={FM('components.checkboxShowcase.labels.indeterminate')}
        testId="native-cb-showcase-indeterminate"
      />
    </div>
    <CopyableCodeSnippet code='<CheckboxNative disabled checked readOnly label="Disabled" />' />
  </section>
));

StatesSection.displayName = 'StatesSection';
