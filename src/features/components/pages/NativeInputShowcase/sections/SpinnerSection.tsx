/**
 * SpinnerSection - Demonstrates the numeric spinner input.
 */
import { memo, useState, useCallback } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { SpinnerInputNative } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

const DEFAULT_SPINNER_VALUE = 5;

export const SpinnerSection = memo((): JSX.Element => {
  const [value, setValue] = useState(DEFAULT_SPINNER_VALUE);

  const handleChange = useCallback((v: number) => { setValue(v); }, []);

  return (
    <section className="card space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.inputShowcase.sections.spinner')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.inputShowcase.sections.spinnerDesc')}
        </p>
      </div>
      <div className="grid max-w-lg gap-4">
        <SpinnerInputNative
          fullWidth
          helperText={FM('components.inputs.spinnerHelper')}
          label={FM('components.inputs.spinnerLabel')}
          max={100}
          min={0}
          step={1}
          testId="native-showcase-spinner"
          value={value}
          onValueChange={handleChange}
        />
        <SpinnerInputNative
          disabled
          fullWidth
          label={FM('components.inputs.disabledLabel')}
          testId="native-showcase-spinner-disabled"
          value={0}
        />
      </div>
      <CopyableCodeSnippet code='<SpinnerInputNative label="Quantity" min={0} max={100} value={value} onValueChange={setValue} />' />
    </section>
  );
});

SpinnerSection.displayName = 'SpinnerSection';
