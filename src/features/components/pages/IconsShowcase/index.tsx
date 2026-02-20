import { useCallback, useState, type ChangeEvent } from 'react';

import { IconSearch } from '@/components/icons';
import { SearchInput } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import {
  AppIconsSection,
  CustomIconsSection,
  FeatherIconsSection,
  SettingsIconsSection,
  ShowcaseIconsSection,
  UsageExamplesSection,
} from './sections';

const IconsShowcase = (): JSX.Element => {
  const [filter, setFilter] = useState('');

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  }, []);

  return (
    <div className="h-full overflow-y-auto p-6" data-testid={TestIds.ICONS_SHOWCASE}>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">
            {FM('components.iconsShowcase.title')}
          </h2>
          <p className="mt-1 text-text-secondary">
            {FM('components.iconsShowcase.description')}
          </p>
        </div>

        <SearchInput
          aria-label={FM('components.iconsShowcase.searchPlaceholder')}
          placeholder={FM('components.iconsShowcase.searchPlaceholder')}
          renderIcon={() => <IconSearch />}
          testId="icons-search-input"
          value={filter}
          onChange={handleChange}
        />

        {filter !== '' ? null : <UsageExamplesSection />}
        <AppIconsSection filter={filter} />
        <ShowcaseIconsSection filter={filter} />
        <SettingsIconsSection filter={filter} />
        <FeatherIconsSection filter={filter} />
        <CustomIconsSection filter={filter} />
      </div>
    </div>
  );
};

export default IconsShowcase;
