/**
 * DropdownVariantsSection - Interactive previews of each dropdown variant.
 * All components follow the active theme via CSS variables.
 */
import { memo, useCallback, useState } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { SelectNative, DatePickerNative } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

import { ComboboxChipsVariant } from './ComboboxChipsVariant';

const VariantBlock = ({ label, children }: { label: string; children: React.ReactNode }): JSX.Element => (
  <div className="space-y-2">
    <h4 className="text-sm font-medium text-text-primary">{label}</h4>
    {children}
  </div>
);

const STANDARD_WIDTH = 257;
const SEARCH_WIDTH = 165;

const DEMO_OPTIONS = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
  { value: 'd', label: 'Option D' },
];

const STANDARD_SNIPPET = `<SelectNative
  options={options}
  placeholder="Select..."
  testId="standard-dropdown"
/>`;

const SEARCH_SNIPPET = `<SelectNative
  searchable
  options={options}
  placeholder="Search..."
  testId="search-dropdown"
/>`;

const DATE_SNIPPET = `<DatePickerNative
  placeholder="dd/mm/yyyy"
  testId="date-picker"
/>`;

const EXPANDED_SNIPPET = `<SelectNative
  options={options}
  value={selected}
  onChange={handleChange}
  testId="expanded-dropdown"
/>`;

export const DropdownVariantsSection = memo((): JSX.Element => {
  const [expandedValue, setExpandedValue] = useState<string | number>('b');

  const handleExpandedChange = useCallback((v: string | number) => setExpandedValue(v), []);

  return (
    <section className="card space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.selectShowcase.sections.designVariants')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.selectShowcase.sections.designVariantsDesc')}
        </p>
      </div>

      {/* Row 1: Trigger variants */}
      <div className="flex flex-wrap gap-6">
        <VariantBlock label={FM('components.selectShowcase.spec.standardDropdown')}>
          <div style={{ width: STANDARD_WIDTH }}>
            <SelectNative
              options={DEMO_OPTIONS}
              placeholder={FM('components.selectShowcase.spec.selectPlaceholder')}
              testId="standard-dropdown"
            />
          </div>
          <CopyableCodeSnippet code={STANDARD_SNIPPET} />
        </VariantBlock>

        <VariantBlock label={FM('components.selectShowcase.spec.advancedSearch')}>
          <div style={{ width: SEARCH_WIDTH }}>
            <SelectNative
              searchable
              options={DEMO_OPTIONS}
              placeholder={FM('components.selectShowcase.spec.searchPlaceholder')}
              testId="search-dropdown"
            />
          </div>
          <CopyableCodeSnippet code={SEARCH_SNIPPET} />
        </VariantBlock>

        <VariantBlock label={FM('components.selectShowcase.spec.dateTimePicker')}>
          <div style={{ width: STANDARD_WIDTH }}>
            <DatePickerNative
              placeholder={FM('components.selectShowcase.spec.datePlaceholder')}
              testId="date-picker"
            />
          </div>
          <CopyableCodeSnippet code={DATE_SNIPPET} />
        </VariantBlock>

        <ComboboxChipsVariant />
      </div>

      {/* Row 2: Expanded dropdown */}
      <div className="flex flex-wrap gap-6">
        <VariantBlock label={FM('components.selectShowcase.spec.expandedList')}>
          <div style={{ width: STANDARD_WIDTH }}>
            <SelectNative
              options={DEMO_OPTIONS}
              testId="expanded-dropdown"
              value={expandedValue}
              onChange={handleExpandedChange}
            />
          </div>
          <CopyableCodeSnippet code={EXPANDED_SNIPPET} />
        </VariantBlock>
      </div>
    </section>
  );
});

DropdownVariantsSection.displayName = 'DropdownVariantsSection';
