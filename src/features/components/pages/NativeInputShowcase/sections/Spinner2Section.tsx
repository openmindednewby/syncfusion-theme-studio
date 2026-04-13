/**
 * Spinner2Section - Demonstrates the horizontal numeric spinner input.
 */
import { memo, useState, useCallback } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { SpinnerInputNative, SpinnerVariant } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

const DEFAULT_SPINNER_VALUE = 5;

export const Spinner2Section = memo((): JSX.Element => {
  const [value, setValue] = useState(DEFAULT_SPINNER_VALUE);

  const handleChange = useCallback((v: number) => { setValue(v); }, []);

  return (
    <section className="card space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.inputShowcase.sections.spinner2')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.inputShowcase.sections.spinner2Desc')}
        </p>
      </div>
      <div className="grid max-w-lg gap-4">
        <SpinnerInputNative
          fullWidth
          helperText={FM('components.inputs.spinner2Helper')}
          label={FM('components.inputs.spinner2Label')}
          max={100}
          min={0}
          step={1}
          testId="native-showcase-spinner2"
          value={value}
          variant={SpinnerVariant.Horizontal}
          onValueChange={handleChange}
        />
        <SpinnerInputNative
          disabled
          fullWidth
          label={FM('components.inputs.disabledLabel')}
          testId="native-showcase-spinner2-disabled"
          value={0}
          variant={SpinnerVariant.Horizontal}
        />
      </div>
      <CopyableCodeSnippet code='<SpinnerInputNative variant="horizontal" label="Value" min={0} max={100} value={value} onValueChange={setValue} />' />
    </section>
  );
});

Spinner2Section.displayName = 'Spinner2Section';
