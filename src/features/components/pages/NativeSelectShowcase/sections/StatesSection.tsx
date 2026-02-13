/**
 * StatesSection - Demonstrates SelectNative disabled, error,
 * and helper text states.
 */
import { memo, useMemo } from 'react';

import { SelectNative } from '@/components/ui/native';
import type { SelectNativeOption } from '@/components/ui/native';
import { FM } from '@/localization/helpers';

const COLOR_KEYS = ['colorRed', 'colorBlue', 'colorGreen'] as const;

function buildColorOptions(): SelectNativeOption[] {
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
        <SelectNative
          disabled
          fullWidth
          helperText={FM('components.selectShowcase.disabledHelper')}
          label={FM('components.selectShowcase.disabledLabel')}
          options={colorOptions}
          testId="native-select-showcase-disabled"
          value="colorRed"
        />
        <SelectNative
          fullWidth
          error={FM('validation.pleaseSelect')}
          label={FM('components.selectShowcase.errorLabel')}
          options={colorOptions}
          testId="native-select-showcase-error"
        />
        <SelectNative
          fullWidth
          helperText={FM('components.selectShowcase.helperTextHelper')}
          label={FM('components.selectShowcase.helperTextLabel')}
          options={colorOptions}
          testId="native-select-showcase-helper"
        />
      </div>
    </section>
  );
});

StatesSection.displayName = 'StatesSection';
