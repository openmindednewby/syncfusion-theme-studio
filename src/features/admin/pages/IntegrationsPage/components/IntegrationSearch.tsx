import { FM } from '@/localization/utils/helpers';

import {
  ALL_CATEGORIES_VALUE,
  CATEGORY_I18N_KEYS,
  INTEGRATION_TEST_PREFIX,
} from '../constants';

interface IntegrationSearchProps {
  searchQuery: string;
  selectedCategory: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

/** Search input and category filter bar for integrations. */
export const IntegrationSearch = ({
  searchQuery,
  selectedCategory,
  onSearchChange,
  onCategoryChange,
}: IntegrationSearchProps): JSX.Element => (
  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
    <input
      className="flex-1 rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
      data-testid={`${INTEGRATION_TEST_PREFIX}-search`}
      placeholder={FM('integrations.searchPlaceholder')}
      type="text"
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
    />
    <select
      className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
      data-testid={`${INTEGRATION_TEST_PREFIX}-category-filter`}
      value={selectedCategory}
      onChange={(e) => onCategoryChange(e.target.value)}
    >
      <option value={ALL_CATEGORIES_VALUE}>
        {FM('integrations.allCategories')}
      </option>
      {Object.entries(CATEGORY_I18N_KEYS).map(([value, i18nKey]) => (
        <option key={value} value={value}>
          {FM(i18nKey)}
        </option>
      ))}
    </select>
  </div>
);
