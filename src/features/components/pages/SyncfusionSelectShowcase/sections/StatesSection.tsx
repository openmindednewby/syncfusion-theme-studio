/**
 * StatesSection - Demonstrates Syncfusion Select disabled and error states.
 */
import { memo, useMemo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { Select } from '@/components/ui/syncfusion';
import type { SelectOption } from '@/components/ui/syncfusion';
import { FM } from '@/localization/helpers';

const COLOR_KEYS = ['colorRed', 'colorBlue', 'colorGreen'] as const;

function buildColorOptions(): SelectOption[] {
  return COLOR_KEYS.map((key) => ({
    value: key,
    label: FM(`components.selectShowcase.${key}`),
  }));
}

export const StatesSection = memo((): JSX.Element => {
  const colorOptions = useMemo(() => buildColorOptions(), []);

  return (
    <section className="card space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.selectShowcase.sections.states')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.selectShowcase.sections.statesDesc')}
        </p>
      </div>
      <div className="grid max-w-lg gap-4">
        <Select
          fullWidth
          enabled={false}
          helperText={FM('components.selectShowcase.disabledHelper')}
          label={FM('components.selectShowcase.disabledLabel')}
          options={colorOptions}
          testId="sf-select-showcase-disabled"
          value="colorRed"
        />
        <Select
          fullWidth
          error={FM('validation.pleaseSelect')}
          label={FM('components.selectShowcase.errorLabel')}
          options={colorOptions}
          testId="sf-select-showcase-error"
        />
        <Select
          fullWidth
          helperText={FM('components.selectShowcase.helperTextHelper')}
          label={FM('components.selectShowcase.helperTextLabel')}
          options={colorOptions}
          testId="sf-select-showcase-helper"
        />
      </div>
      <CopyableCodeSnippet code='<Select fullWidth enabled={false} label="Disabled" options={options} value="colorRed" />' />
    </section>
  );
});

StatesSection.displayName = 'StatesSection';
