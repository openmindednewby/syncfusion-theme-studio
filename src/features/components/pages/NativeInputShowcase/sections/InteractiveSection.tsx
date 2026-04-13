/**
 * InteractiveSection - Controlled native input with live value echo.
 * Demonstrates useState integration, real-time value display, and clearable input.
 */
import { memo, useState, useCallback } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { InputNative } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

export const InteractiveSection = memo((): JSX.Element => {
  const [value, setValue] = useState('');

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const handleClear = useCallback(() => {
    setValue('');
  }, []);

  const displayValue = value !== '' ? value : FM('components.inputs.emptyValue');

  return (
    <section className="card space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.inputShowcase.sections.interactive')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.inputShowcase.sections.interactiveDesc')}
        </p>
      </div>
      <div className="grid max-w-lg gap-4">
        <InputNative
          clearable
          fullWidth
          label={FM('components.inputs.interactiveLabel')}
          placeholder={FM('components.inputs.interactivePlaceholder')}
          testId="native-showcase-interactive"
          value={value}
          onChange={handleChange}
          onClear={handleClear}
        />
        <p className="text-sm text-text-secondary" data-testid="native-showcase-live-value">
          {FM('components.inputs.currentValue')}
          {' '}
          <span className="font-mono font-medium text-text-primary">{displayValue}</span>
        </p>
      </div>
      <CopyableCodeSnippet code='<InputNative clearable label="Name" value={value} onChange={handleChange} onClear={handleClear} fullWidth />' />
    </section>
  );
});

InteractiveSection.displayName = 'InteractiveSection';
