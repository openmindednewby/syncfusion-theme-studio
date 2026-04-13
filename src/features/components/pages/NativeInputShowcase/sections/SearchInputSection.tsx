/**
 * SearchInputSection - Demonstrates the native search input with icon.
 */
import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { SearchInputNative } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

export const SearchInputSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.inputShowcase.sections.search')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.inputShowcase.sections.searchDesc')}
      </p>
    </div>
    <div className="grid max-w-lg gap-4">
      <SearchInputNative
        fullWidth
        label={FM('components.inputs.searchLabel')}
        placeholder={FM('components.inputs.searchPlaceholder')}
        testId="native-showcase-search"
      />
      <SearchInputNative
        disabled
        fullWidth
        placeholder={FM('components.inputs.searchPlaceholder')}
        testId="native-showcase-search-disabled"
      />
    </div>
    <CopyableCodeSnippet code='<SearchInputNative placeholder="Search..." fullWidth />' />
  </section>
));

SearchInputSection.displayName = 'SearchInputSection';
