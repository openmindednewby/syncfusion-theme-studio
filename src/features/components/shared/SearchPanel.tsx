import { memo, type CSSProperties, type ReactNode } from 'react';

import { SelectNative } from '@/components/ui/native';
import type { SelectNativeOption } from '@/components/ui/native';
import { ComponentTestIds } from '@/shared/testIds.components';
import { isValueDefined } from '@/utils/is';

import { FlexBox } from './FlexBox';
import { SearchPanelRow } from './SearchPanelRow';

interface FilterConfig {
  label: string;
  options: SelectNativeOption[];
}

interface SearchPanelProps {
  expanded?: boolean;
  onToggleFilter?: () => void;
  filters?: FilterConfig[];
  columnOptions?: SelectNativeOption[];
  onSearch?: (value: string) => void;
  testId?: string;
  onFilterChange?: (filterLabel: string, value: string) => void;
  onColumnChange?: (value: string) => void;
  startDate?: string;
  endDate?: string;
  onDateRangeChange?: (start: string, end: string) => void;
  onRefresh?: () => void;
  onDownload?: () => void;
  showColumnPicker?: boolean;
  showDateRange?: boolean;
  showRefresh?: boolean;
  showDownload?: boolean;
  showMoreActions?: boolean;
  showFilterToggle?: boolean;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  extraFilters?: ReactNode;
}

const panelStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  background: 'var(--component-search-panel-bg)',
  border: '1px solid var(--component-search-panel-border)',
  borderRadius: 'var(--component-search-panel-border-radius)',
  padding: 'var(--component-search-panel-padding)',
  gap: 'var(--component-search-panel-gap)',
};

const filterFlexOverrides: CSSProperties = {
  background: 'transparent',
  border: 'none',
  borderRadius: 0,
  padding: 0,
};

const filterWidthStyle: CSSProperties = {
  width: 'var(--component-search-panel-filter-width)',
};

interface FilterRowProps {
  filters: FilterConfig[];
  extraFilters?: ReactNode;
  onFilterChange?: (filterLabel: string, value: string) => void;
}

interface DefinedPropsResult {
  endDate?: string;
  startDate?: string;
  onColumnChange?: (value: string) => void;
  onDateRangeChange?: (start: string, end: string) => void;
  onDownload?: () => void;
  onFilterChange?: (filterLabel: string, value: string) => void;
  onRefresh?: () => void;
  onSearch?: (value: string) => void;
  onToggleFilter?: () => void;
}

interface OptionalCallbacksInput {
  endDate: string | undefined;
  startDate: string | undefined;
  onColumnChange: ((value: string) => void) | undefined;
  onDateRangeChange: ((start: string, end: string) => void) | undefined;
  onDownload: (() => void) | undefined;
  onFilterChange: ((filterLabel: string, value: string) => void) | undefined;
  onRefresh: (() => void) | undefined;
  onSearch: ((value: string) => void) | undefined;
  onToggleFilter: (() => void) | undefined;
}

function buildDefinedProps(input: OptionalCallbacksInput): DefinedPropsResult {
  return {
    ...(isValueDefined(input.endDate) && { endDate: input.endDate }),
    ...(isValueDefined(input.startDate) && { startDate: input.startDate }),
    ...(input.onColumnChange && { onColumnChange: input.onColumnChange }),
    ...(input.onDateRangeChange && { onDateRangeChange: input.onDateRangeChange }),
    ...(input.onDownload && { onDownload: input.onDownload }),
    ...(input.onFilterChange && { onFilterChange: input.onFilterChange }),
    ...(input.onRefresh && { onRefresh: input.onRefresh }),
    ...(input.onSearch && { onSearch: input.onSearch }),
    ...(input.onToggleFilter && { onToggleFilter: input.onToggleFilter }),
  };
}

const FilterRow = ({ filters, extraFilters, onFilterChange }: FilterRowProps): JSX.Element => (
  <FlexBox
    wrap
    align="center"
    gap="var(--component-search-panel-filter-row-gap)"
    style={filterFlexOverrides}
  >
    {filters.map((filter) => (
      <div key={filter.label} style={filterWidthStyle}>
        <SelectNative
          options={filter.options}
          placeholder={filter.label}
          testId={`search-panel-filter-${filter.label.toLowerCase().replace(/\s+/g, '-')}`}
          onChange={(value) => onFilterChange?.(filter.label, String(value))}
        />
      </div>
    ))}
    {isValueDefined(extraFilters) ? extraFilters : null}
  </FlexBox>
);

const SearchPanel = memo(({
  expanded = false,
  onToggleFilter,
  filters = [],
  columnOptions = [],
  onSearch,
  testId,
  onFilterChange,
  onColumnChange,
  startDate,
  endDate,
  onDateRangeChange,
  onRefresh,
  onDownload,
  showColumnPicker = true,
  showDateRange = true,
  showRefresh = true,
  showDownload = true,
  showMoreActions = true,
  showFilterToggle = true,
  leftSlot,
  rightSlot,
  extraFilters,
}: SearchPanelProps): JSX.Element => {
  const hasFilters = expanded && filters.length > 0;
  const showFilterRow = hasFilters || isValueDefined(extraFilters);
  const definedProps = buildDefinedProps({
    endDate, startDate, onColumnChange, onDateRangeChange,
    onDownload, onFilterChange, onRefresh, onSearch, onToggleFilter,
  });

  return (
    <div data-testid={testId ?? ComponentTestIds.SEARCH_PANEL} style={panelStyle}>
      <SearchPanelRow
        columnOptions={columnOptions}
        expanded={expanded}
        leftSlot={leftSlot}
        rightSlot={rightSlot}
        showColumnPicker={showColumnPicker}
        showDateRange={showDateRange}
        showDownload={showDownload}
        showFilterToggle={showFilterToggle}
        showMoreActions={showMoreActions}
        showRefresh={showRefresh}
        {...definedProps}
      />
      {showFilterRow ? (
        <FilterRow
          extraFilters={extraFilters}
          filters={hasFilters ? filters : []}
          {...definedProps}
        />
      ) : null}
    </div>
  );
});

SearchPanel.displayName = 'SearchPanel';

export { SearchPanel };
export type { FilterConfig };
