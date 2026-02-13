/**
 * BasicSelectSection - Demonstrates basic SelectNative usage
 * with standard options, placeholder, and required indicator.
 */
import { memo, useMemo } from 'react';

import { SelectNative } from '@/components/ui/native';
import type { SelectNativeOption } from '@/components/ui/native';
import { FM } from '@/localization/helpers';

const FRUIT_KEYS = ['fruitApple', 'fruitBanana', 'fruitCherry', 'fruitDragonFruit', 'fruitElderberry'] as const;

function buildFruitOptions(): SelectNativeOption[] {
  return FRUIT_KEYS.map((key) => ({
    value: key,
    label: FM(`components.selectShowcase.${key}`),
  }));
}

export const BasicSelectSection = memo((): JSX.Element => {
  const fruitOptions = useMemo(() => buildFruitOptions(), []);

  return (
    <section className="card space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.selectShowcase.sections.basic')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.selectShowcase.sections.basicDesc')}
        </p>
      </div>
      <div className="grid max-w-lg gap-4">
        <SelectNative
          fullWidth
          helperText={FM('components.selectShowcase.basicHelper')}
          label={FM('components.selectShowcase.basicLabel')}
          options={fruitOptions}
          testId="native-select-showcase-basic"
        />
        <SelectNative
          fullWidth
          label={FM('components.selectShowcase.withPlaceholder')}
          options={fruitOptions}
          placeholder={FM('components.selectShowcase.customPlaceholder')}
          testId="native-select-showcase-placeholder"
        />
        <SelectNative
          fullWidth
          required
          helperText={FM('components.selectShowcase.requiredHelper')}
          label={FM('components.selectShowcase.requiredLabel')}
          options={fruitOptions}
          testId="native-select-showcase-required"
        />
      </div>
    </section>
  );
});

BasicSelectSection.displayName = 'BasicSelectSection';
