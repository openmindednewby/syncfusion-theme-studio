/**
 * InteractiveSection - Controlled Syncfusion Select with live value display.
 */
import { memo, useState, useCallback, useMemo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { Select } from '@/components/ui/syncfusion';
import type { SelectOption } from '@/components/ui/syncfusion';
import { FM } from '@/localization/utils/helpers';

const COLOR_KEYS = ['colorRed', 'colorBlue', 'colorGreen', 'colorYellow', 'colorPurple'] as const;

function buildColorOptions(): SelectOption[] {
  return COLOR_KEYS.map((key) => ({
    value: key,
    label: FM(`components.selectShowcase.${key}`),
  }));
}

export const InteractiveSection = memo((): JSX.Element => {
  const [selectedValue, setSelectedValue] = useState<string | number>('');
  const colorOptions = useMemo(() => buildColorOptions(), []);

  const handleChange = useCallback((value: string | number) => {
    setSelectedValue(value);
  }, []);

  const displayValue = selectedValue !== ''
    ? FM('components.selectShowcase.selectedValue', String(selectedValue))
    : FM('components.selectShowcase.noSelection');

  return (
    <section className="card space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.selectShowcase.sections.interactive')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.selectShowcase.sections.interactiveDesc')}
        </p>
      </div>
      <div className="grid max-w-lg gap-4">
        <Select
          fullWidth
          label={FM('components.selectShowcase.basicLabel')}
          options={colorOptions}
          testId="sf-select-showcase-interactive"
          value={selectedValue}
          onChange={handleChange}
        />
        <p
          className="text-sm font-medium text-text-secondary"
          data-testid="sf-select-showcase-value"
        >
          {displayValue}
        </p>
      </div>
      <CopyableCodeSnippet code='<Select fullWidth label="Color" options={options} value={selectedValue} onChange={handleChange} />' />
    </section>
  );
});

InteractiveSection.displayName = 'InteractiveSection';
