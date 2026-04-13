/**
 * ComboboxChipsVariant - Interactive multi-select combobox with chip pills.
 * Follows the active theme via CSS variables (dark/light toggle).
 */
import { useState, useCallback } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { SelectNativeCombobox } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

const COMBOBOX_WIDTH = 257;

const DEMO_OPTIONS = [
  { value: 'opt_a', label: 'Option A' },
  { value: 'opt_b', label: 'Option B' },
  { value: 'opt_c', label: 'Option C' },
  { value: 'opt_d', label: 'Option D' },
];

const INITIAL_VALUES: ReadonlyArray<string | number> = ['opt_a', 'opt_b'];

const COMBOBOX_SNIPPET = `<SelectNativeCombobox
  options={options}
  value={['opt_a', 'opt_b']}
  onChange={handleChange}
  testId="combobox-chips"
/>`;

export const ComboboxChipsVariant = (): JSX.Element => {
  const [values, setValues] = useState<ReadonlyArray<string | number>>(INITIAL_VALUES);

  const handleChange = useCallback((v: ReadonlyArray<string | number>) => setValues(v), []);

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-text-primary">
        {FM('components.selectShowcase.spec.comboboxChips')}
      </h4>
      <div style={{ width: COMBOBOX_WIDTH }}>
        <SelectNativeCombobox
          options={DEMO_OPTIONS}
          testId="combobox-chips"
          value={values}
          onChange={handleChange}
        />
      </div>
      <CopyableCodeSnippet code={COMBOBOX_SNIPPET} />
    </div>
  );
};
