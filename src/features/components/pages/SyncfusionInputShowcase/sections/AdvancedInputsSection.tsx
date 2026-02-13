/**
 * AdvancedInputsSection - Demonstrates Syncfusion advanced input types:
 * NumericTextBox with different formats.
 */
import { memo, useId } from 'react';

import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';

import { FM } from '@/localization/helpers';

const NUMERIC_DEFAULT = 42;
const NUMERIC_MIN = 0;
const NUMERIC_MAX = 1000;
const PERCENTAGE_MIN = 0;
const PERCENTAGE_MAX = 1;
const PERCENTAGE_STEP = 0.01;
const PERCENTAGE_VALUE = 0.42;

export const AdvancedInputsSection = memo((): JSX.Element => {
  const numericDefaultId = useId();
  const numericCurrencyId = useId();
  const numericPercentageId = useId();

  return (
    <section className="card space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.inputShowcase.sections.advanced')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.inputShowcase.sections.advancedDesc')}
        </p>
      </div>
      <div className="grid max-w-lg gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary" htmlFor={numericDefaultId}>
            {FM('components.numericDefault')}
          </label>
          <NumericTextBoxComponent
            format="n0"
            id={numericDefaultId}
            max={NUMERIC_MAX}
            min={NUMERIC_MIN}
            value={NUMERIC_DEFAULT}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary" htmlFor={numericCurrencyId}>
            {FM('components.numericCurrency')}
          </label>
          <NumericTextBoxComponent
            currency="USD"
            format="c2"
            id={numericCurrencyId}
            max={NUMERIC_MAX}
            min={NUMERIC_MIN}
            value={NUMERIC_DEFAULT}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary" htmlFor={numericPercentageId}>
            {FM('components.numericPercentage')}
          </label>
          <NumericTextBoxComponent
            format="p2"
            id={numericPercentageId}
            max={PERCENTAGE_MAX}
            min={PERCENTAGE_MIN}
            step={PERCENTAGE_STEP}
            value={PERCENTAGE_VALUE}
          />
        </div>
      </div>
    </section>
  );
});

AdvancedInputsSection.displayName = 'AdvancedInputsSection';
