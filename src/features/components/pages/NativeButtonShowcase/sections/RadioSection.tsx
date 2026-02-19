/**
 * RadioSection - Demonstrates RadioNative with themed CSS variables.
 */
import { memo, useState } from 'react';

import { RadioNative } from '@/components/ui/native';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

const RADIO_GROUP_NAME = 'showcase-radio-group';

export const RadioSection = memo((): JSX.Element => {
  const [selected, setSelected] = useState('option-1');

  return (
    <section className="card space-y-4" data-testid={TestIds.NATIVE_RADIO_SECTION}>
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.buttonShowcase.sections.radio')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.buttonShowcase.sections.radioDesc')}
        </p>
      </div>
      <div className="flex flex-wrap gap-6">
        <RadioNative
          checked={selected === 'option-1'}
          label={FM('components.buttonShowcase.radioOption1')}
          name={RADIO_GROUP_NAME}
          testId="radio-showcase-1"
          value="option-1"
          onChange={() => setSelected('option-1')}
        />
        <RadioNative
          checked={selected === 'option-2'}
          label={FM('components.buttonShowcase.radioOption2')}
          name={RADIO_GROUP_NAME}
          testId="radio-showcase-2"
          value="option-2"
          onChange={() => setSelected('option-2')}
        />
        <RadioNative
          checked={selected === 'option-3'}
          label={FM('components.buttonShowcase.radioOption3')}
          name={RADIO_GROUP_NAME}
          testId="radio-showcase-3"
          value="option-3"
          onChange={() => setSelected('option-3')}
        />
        <RadioNative
          disabled
          label={FM('components.buttonShowcase.radioDisabled')}
          name="showcase-radio-disabled"
          testId="radio-showcase-disabled"
        />
      </div>
    </section>
  );
});

RadioSection.displayName = 'RadioSection';
