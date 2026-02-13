/**
 * InteractiveSection - Controlled Syncfusion input with live value echo.
 * Demonstrates useState integration and real-time value display.
 */
import { memo, useState, useCallback } from 'react';

import { Input } from '@/components/ui/syncfusion';
import { FM } from '@/localization/helpers';

export const InteractiveSection = memo((): JSX.Element => {
  const [value, setValue] = useState('');

  const handleInput = useCallback((args: { value?: string }) => {
    setValue(args.value ?? '');
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
        <Input
          fullWidth
          input={handleInput}
          label={FM('components.inputs.interactiveLabel')}
          placeholder={FM('components.inputs.interactivePlaceholder')}
          testId="sf-showcase-interactive"
          value={value}
        />
        <p className="text-sm text-text-secondary" data-testid="sf-showcase-live-value">
          {FM('components.inputs.currentValue')}
          {' '}
          <span className="font-mono font-medium text-text-primary">{displayValue}</span>
        </p>
      </div>
    </section>
  );
});

InteractiveSection.displayName = 'InteractiveSection';
