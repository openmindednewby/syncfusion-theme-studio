import { memo } from 'react';

import { ColumnType } from '@/lib/grid/types';
import { FM } from '@/localization/helpers';
import { NativeTestIds } from '@/shared/testIds.native';

import BooleanFilter from '../filters/BooleanFilter';
import DateFilter from '../filters/DateFilter';
import NumberFilter from '../filters/NumberFilter';
import TextFilter from '../filters/TextFilter';

const FUNNEL_ICON_PATH =
  'M3.75 3.75h16.5M3.75 3.75L10.5 12v5.25l3-1.5V12l6.75-8.25';

interface ColumnMenuFilterItemProps {
  field: string;
  columnType: ColumnType;
  filterValue: string;
  onFilterChange: (field: string, value: string) => void;
}

function renderFilterInput(
  field: string,
  columnType: ColumnType,
  filterValue: string,
  onFilterChange: (field: string, value: string) => void,
): JSX.Element {
  switch (columnType) {
    case ColumnType.String:
      return <TextFilter field={field} value={filterValue} onChange={onFilterChange} />;
    case ColumnType.Number:
      return <NumberFilter field={field} value={filterValue} onChange={onFilterChange} />;
    case ColumnType.Date:
      return <DateFilter field={field} value={filterValue} onChange={onFilterChange} />;
    case ColumnType.Boolean:
      return <BooleanFilter field={field} value={filterValue} onChange={onFilterChange} />;
    default:
      return <TextFilter field={field} value={filterValue} onChange={onFilterChange} />;
  }
}

const ColumnMenuFilterItem = memo(
  ({ field, columnType, filterValue, onFilterChange }: ColumnMenuFilterItemProps): JSX.Element => (
    <div
      className="px-3 py-2"
      data-testid={NativeTestIds.NATIVE_GRID_COLUMN_MENU_FILTER}
      role="presentation"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="mb-1.5 flex items-center gap-2 text-sm">
        <svg
          aria-hidden="true"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path d={FUNNEL_ICON_PATH} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {FM('table.filter')}
      </div>
      {renderFilterInput(field, columnType, filterValue, onFilterChange)}
    </div>
  ),
);

ColumnMenuFilterItem.displayName = 'ColumnMenuFilterItem';

export default ColumnMenuFilterItem;
