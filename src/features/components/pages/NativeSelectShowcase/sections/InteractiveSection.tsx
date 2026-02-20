/**
 * InteractiveSection - Controlled SelectNative with live value display.
 */
import { memo, useState, useCallback, useMemo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { SelectNative } from '@/components/ui/native';
import type { SelectNativeOption } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

const COLOR_KEYS = ['colorRed', 'colorBlue', 'colorGreen', 'colorYellow', 'colorPurple'] as const;

function buildColorOptions(): SelectNativeOption[] {
  return COLOR_KEYS.map((key) => ({
    value: key,
    label: FM(`components.selectShowcase.${key}`),
  }));
}

export const InteractiveSection = memo((): JSX.Element => {
  const [selectedValue, setSelectedValue] = useState('');
  const colorOptions = useMemo(() => buildColorOptions(), []);

  const handleChange = useCallback((value: string | number) => {
    setSelectedValue(String(value));
  }, []);

  const displayValue = selectedValue !== ''
    ? FM('components.selectShowcase.selectedValue', selectedValue)
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
        <SelectNative
          fullWidth
          label={FM('components.selectShowcase.basicLabel')}
          options={colorOptions}
          testId="native-select-showcase-interactive"
          value={selectedValue}
          onChange={handleChange}
        />
        <p
          className="text-sm font-medium text-text-secondary"
          data-testid="native-select-showcase-value"
        >
          {displayValue}
        </p>
      </div>
      <CopyableCodeSnippet code={'<SelectNative\n  fullWidth\n  label="Pick a color"\n  options={colorOptions}\n  value={selectedValue}\n  onChange={handleChange}\n/>'} />
    </section>
  );
});

InteractiveSection.displayName = 'InteractiveSection';
