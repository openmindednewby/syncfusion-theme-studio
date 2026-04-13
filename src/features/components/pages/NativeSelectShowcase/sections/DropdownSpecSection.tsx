/**
 * DropdownSpecSection - Interactive design spec with live SelectNative
 * and SelectNativeCombobox demos. All components follow the active theme.
 */
import { memo, useCallback, useMemo, useState } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { SelectNative, SelectNativeCombobox } from '@/components/ui/native';
import type { SelectNativeOption } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

const SPEC_OPTIONS: SelectNativeOption[] = [
  { value: 'a', label: FM('components.selectShowcase.spec.optionA') },
  { value: 'b', label: FM('components.selectShowcase.spec.optionB') },
  { value: 'c', label: FM('components.selectShowcase.spec.optionC') },
  { value: 'd', label: FM('components.selectShowcase.spec.optionD') },
];

const INITIAL_MULTI: ReadonlyArray<string | number> = ['a', 'b'];

const TRIGGER_SNIPPET = `<SelectNative
  options={options}
  placeholder="Select an option"
  testId="spec-trigger"
/>`;

const MULTI_SNIPPET = `<SelectNativeCombobox
  options={options}
  value={selected}
  onChange={handleChange}
  testId="spec-multi-select"
/>`;

const OPEN_SNIPPET = `<SelectNative
  options={options}
  value={selected}
  onChange={handleChange}
  testId="spec-open"
/>`;

export const DropdownSpecSection = memo((): JSX.Element => {
  const options = useMemo(() => SPEC_OPTIONS, []);

  const [openValue, setOpenValue] = useState<string | number>('');
  const [multiValues, setMultiValues] = useState<ReadonlyArray<string | number>>(INITIAL_MULTI);

  const handleOpenChange = useCallback((v: string | number) => setOpenValue(v), []);
  const handleMultiChange = useCallback((v: ReadonlyArray<string | number>) => setMultiValues(v), []);

  return (
    <section className="card space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.selectShowcase.sections.designSpec')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.selectShowcase.sections.designSpecDesc')}
        </p>
      </div>

      {/* 1. Single-Select Trigger */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-text-primary">
          {FM('components.selectShowcase.spec.singleSelectTrigger')}
        </h4>
        <div className="w-64">
          <SelectNative options={options} testId="spec-trigger" />
        </div>
        <CopyableCodeSnippet code={TRIGGER_SNIPPET} />
      </div>

      {/* 2. Multi-Select (Combobox) */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-text-primary">
          {FM('components.selectShowcase.spec.multiSelectItems')}
        </h4>
        <div className="w-64">
          <SelectNativeCombobox
            options={options}
            testId="spec-multi-select"
            value={multiValues}
            onChange={handleMultiChange}
          />
        </div>
        <CopyableCodeSnippet code={MULTI_SNIPPET} />
      </div>

      {/* 3. Open Dropdown */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-text-primary">
          {FM('components.selectShowcase.spec.openDark')}
        </h4>
        <div className="w-64">
          <SelectNative
            options={options}
            testId="spec-open"
            value={openValue}
            onChange={handleOpenChange}
          />
        </div>
        <CopyableCodeSnippet code={OPEN_SNIPPET} />
      </div>
    </section>
  );
});

DropdownSpecSection.displayName = 'DropdownSpecSection';
