/**
 * WidthConfigSection - Demonstrates width, minWidth, maxWidth props on SelectNative.
 */
import { memo, useState, useCallback, useMemo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { SelectNative, SpinnerInputNative } from '@/components/ui/native';
import type { SelectNativeOption } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

const FRUIT_KEYS = ['fruitApple', 'fruitBanana', 'fruitCherry', 'fruitDragonFruit'] as const;

const NARROW_WIDTH = 150;
const DEFAULT_WIDTH = 257;
const WIDE_WIDTH = 400;
const MIN_SIZE = 50;
const MAX_SIZE = 600;
const SIZE_STEP = 10;

function buildFruitOptions(): SelectNativeOption[] {
  return FRUIT_KEYS.map((key) => ({
    value: key,
    label: FM(`components.selectShowcase.${key}`),
  }));
}

export const WidthConfigSection = memo((): JSX.Element => {
  const fruitOptions = useMemo(() => buildFruitOptions(), []);
  const [selected, setSelected] = useState('fruitApple');
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [minWidth, setMinWidth] = useState(MIN_SIZE);
  const [maxWidth, setMaxWidth] = useState(MAX_SIZE);

  const handleChange = useCallback((v: string | number) => {
    setSelected(String(v));
  }, []);

  const codeSnippet = useMemo(
    () =>
      `<SelectNative\n  width={${width}}\n  minWidth={${minWidth}}\n  maxWidth={${maxWidth}}\n  options={options}\n  value={selected}\n  onChange={handleChange}\n/>`,
    [width, minWidth, maxWidth],
  );

  return (
    <section className="card space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.selectShowcase.sections.widthConfig')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.selectShowcase.sections.widthConfigDesc')}
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <SpinnerInputNative
          label={FM('components.selectShowcase.widthLabel')}
          max={MAX_SIZE}
          min={MIN_SIZE}
          step={SIZE_STEP}
          testId="width-config-width"
          value={width}
          onValueChange={setWidth}
        />
        <SpinnerInputNative
          label={FM('components.selectShowcase.minWidthLabel')}
          max={MAX_SIZE}
          min={MIN_SIZE}
          step={SIZE_STEP}
          testId="width-config-min"
          value={minWidth}
          onValueChange={setMinWidth}
        />
        <SpinnerInputNative
          label={FM('components.selectShowcase.maxWidthLabel')}
          max={MAX_SIZE}
          min={MIN_SIZE}
          step={SIZE_STEP}
          testId="width-config-max"
          value={maxWidth}
          onValueChange={setMaxWidth}
        />
      </div>

      <SelectNative
        label={FM('components.selectShowcase.configuredWidthLabel')}
        maxWidth={maxWidth}
        minWidth={minWidth}
        options={fruitOptions}
        testId="width-config-select"
        value={selected}
        width={width}
        onChange={handleChange}
      />

      <div className="mt-6">
        <h4 className="mb-2 text-sm font-semibold text-text-primary">
          {FM('components.selectShowcase.presetExamples')}
        </h4>
        <div className="flex flex-wrap items-start gap-6">
          <SelectNative
            label={FM('components.selectShowcase.narrowPreset', String(NARROW_WIDTH))}
            options={fruitOptions}
            testId="width-preset-narrow"
            value="fruitApple"
            width={NARROW_WIDTH}
          />
          <SelectNative
            label={FM('components.selectShowcase.defaultPreset', String(DEFAULT_WIDTH))}
            options={fruitOptions}
            testId="width-preset-default"
            value="fruitBanana"
            width={DEFAULT_WIDTH}
          />
          <SelectNative
            label={FM('components.selectShowcase.widePreset', String(WIDE_WIDTH))}
            options={fruitOptions}
            testId="width-preset-wide"
            value="fruitCherry"
            width={WIDE_WIDTH}
          />
        </div>
      </div>

      <div className="mt-6">
        <h4 className="mb-2 text-sm font-semibold text-text-primary">
          {FM('components.selectShowcase.percentageWidths')}
        </h4>
        <div className="space-y-4">
          <SelectNative
            label={FM('components.selectShowcase.fullWidthPreset')}
            options={fruitOptions}
            testId="width-preset-full"
            value="fruitApple"
            width="100%"
          />
          <SelectNative
            label={FM('components.selectShowcase.halfWidthPreset')}
            options={fruitOptions}
            testId="width-preset-half"
            value="fruitBanana"
            width="50%"
          />
        </div>
      </div>

      <CopyableCodeSnippet code={codeSnippet} />
    </section>
  );
});

WidthConfigSection.displayName = 'WidthConfigSection';
