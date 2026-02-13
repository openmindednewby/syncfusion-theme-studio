/**
 * BasicSelectSection - Demonstrates the Syncfusion Select (DropDownList)
 * with standard options, placeholder, and required indicator.
 */
import { memo, useMemo, useCallback, useState } from 'react';

import { Select } from '@/components/ui/syncfusion';
import type { SelectOption } from '@/components/ui/syncfusion';
import { FM } from '@/localization/helpers';

const FRUIT_KEYS = ['fruitApple', 'fruitBanana', 'fruitCherry', 'fruitDragonFruit', 'fruitElderberry'] as const;

function buildFruitOptions(): SelectOption[] {
  return FRUIT_KEYS.map((key) => ({
    value: key,
    label: FM(`components.selectShowcase.${key}`),
  }));
}

export const BasicSelectSection = memo((): JSX.Element => {
  const [basicValue, setBasicValue] = useState<string | number>('');
  const fruitOptions = useMemo(() => buildFruitOptions(), []);

  const handleBasicChange = useCallback((value: string | number) => {
    setBasicValue(value);
  }, []);

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
        <Select
          fullWidth
          helperText={FM('components.selectShowcase.basicHelper')}
          label={FM('components.selectShowcase.basicLabel')}
          options={fruitOptions}
          testId="sf-select-showcase-basic"
          value={basicValue}
          onChange={handleBasicChange}
        />
        <Select
          fullWidth
          label={FM('components.selectShowcase.withPlaceholder')}
          options={fruitOptions}
          placeholder={FM('components.selectShowcase.customPlaceholder')}
          testId="sf-select-showcase-placeholder"
        />
        <Select
          fullWidth
          required
          helperText={FM('components.selectShowcase.requiredHelper')}
          label={FM('components.selectShowcase.requiredLabel')}
          options={fruitOptions}
          testId="sf-select-showcase-required"
        />
      </div>
    </section>
  );
});

BasicSelectSection.displayName = 'BasicSelectSection';
