import { memo, useCallback } from 'react';

import { ColumnType, FilterOperator } from '@/lib/grid/types';
import { getOperatorsForType } from '@/lib/grid/utils/filterOperatorsByType';
import { FM } from '@/localization/utils/helpers';
import { NativeTestIds } from '@/shared/testIds.native';

import BooleanFilter from '../filters/BooleanFilter';
import DateFilter from '../filters/DateFilter';
import NumberFilter from '../filters/NumberFilter';
import TextFilter from '../filters/TextFilter';

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

interface ColumnMenuFilterItemProps {
  field: string;
  columnType: ColumnType;
  filterValue: string;
  filterOperator: FilterOperator;
  onFilterChange: (field: string, value: string) => void;
  onFilterOperatorChange: (field: string, operator: FilterOperator) => void;
}

function isPresenceOperator(op: FilterOperator): boolean {
  return op === FilterOperator.Empty || op === FilterOperator.NotEmpty;
}

const FUNNEL_ICON_PATH =
  'M3.75 3.75h16.5M3.75 3.75L10.5 12v5.25l3-1.5V12l6.75-8.25';

const ColumnMenuFilterItem = memo(
  ({ field, columnType, filterValue, filterOperator, onFilterChange, onFilterOperatorChange }: ColumnMenuFilterItemProps): JSX.Element => {
    const operators = getOperatorsForType(columnType);

    const handleOperatorChange = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- select value maps to FilterOperator
        onFilterOperatorChange(field, e.target.value as FilterOperator);
      },
      [field, onFilterOperatorChange],
    );

    return (
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
        <select
          aria-label={FM('table.filter')}
          className="mb-1.5 w-full rounded border px-2 py-1 text-xs"
          data-testid={NativeTestIds.NATIVE_GRID_COLUMN_MENU_FILTER_OPERATOR}
          style={{
            backgroundColor: 'var(--component-datagrid-colmenu-bg)',
            borderColor: 'var(--component-datagrid-colmenu-border)',
            color: 'var(--component-datagrid-colmenu-text)',
          }}
          value={filterOperator}
          onChange={handleOperatorChange}
        >
          {operators.map((op) => (
            <option key={op} value={op}>
              {FM(`table.filterOperator.${op}`)}
            </option>
          ))}
        </select>
        {isPresenceOperator(filterOperator) ? null : renderFilterInput(field, columnType, filterValue, onFilterChange)}
      </div>
    );
  },
);

ColumnMenuFilterItem.displayName = 'ColumnMenuFilterItem';

export default ColumnMenuFilterItem;
