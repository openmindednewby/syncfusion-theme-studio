/**
 * TableHeader renders the thead element with sortable column headers,
 * optional checkbox select-all column, and an optional filter row.
 */
import { memo, useCallback } from 'react';

import type { ColumnType } from '@/lib/grid/types';
import { FM } from '@/localization/helpers';
import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

import FilterRow from './filters/FilterRow';
import { TextAlign } from './types';

import type { TableColumn } from './types';

const SORT_ASCENDING_INDICATOR = '\u25B2';
const SORT_DESCENDING_INDICATOR = '\u25BC';

const ALIGN_CLASSES: Record<TextAlign, string> = {
  [TextAlign.Left]: 'text-left',
  [TextAlign.Center]: 'text-center',
  [TextAlign.Right]: 'text-right',
};

/** Format a column width value to a CSS-compatible string */
function formatWidth(width: number | string): string {
  if (typeof width === 'number') return `${String(width)}px`;
  return width;
}

interface Props {
  columns: TableColumn[];
  fields: string[];
  cellPadding: string;
  sortField: string | undefined;
  sortDirection: 'ascending' | 'descending' | undefined;
  onSort: (field: string) => void;
  isFilterEnabled: boolean;
  filterValues: Record<string, string>;
  columnTypes: Record<string, ColumnType>;
  onFilterChange: (field: string, value: string) => void;
  showCheckbox?: boolean | undefined;
  isAllSelected?: boolean | undefined;
  onSelectAll?: (() => void) | undefined;
  draggableHeaders?: boolean | undefined;
}

const TableHeader = ({
  columns,
  fields,
  cellPadding,
  sortField,
  sortDirection,
  onSort,
  isFilterEnabled,
  filterValues,
  columnTypes,
  onFilterChange,
  showCheckbox = false,
  isAllSelected = false,
  onSelectAll,
  draggableHeaders = false,
}: Props): JSX.Element => {
  const handleDragStart = useCallback(
    (e: React.DragEvent, field: string) => {
      if (!draggableHeaders) return;
      e.dataTransfer.setData('text/plain', field);
    },
    [draggableHeaders],
  );

  return (
    <thead>
      <tr className="bg-surface-elevated border-b border-border">
        {showCheckbox ? (
          <th className={cn(cellPadding, 'w-10 text-center')} scope="col">
            <input
              aria-label={FM('table.selectAll')}
              checked={isAllSelected}
              className="h-4 w-4"
              data-testid="select-all-checkbox"
              type="checkbox"
              onChange={onSelectAll}
            />
          </th>
        ) : null}
        {columns.map((column) => {
          const isSorted = sortField === column.field;
          const align = column.textAlign ?? TextAlign.Left;
          return (
            <th
              key={column.field}
              aria-sort={isSorted ? sortDirection : undefined}
              className={cn(
                cellPadding,
                'cursor-pointer select-none font-semibold text-text-primary',
                'border-b border-border transition-colors hover:bg-surface-hover',
                ALIGN_CLASSES[align],
              )}
              draggable={draggableHeaders}
              scope="col"
              style={isValueDefined(column.width) ? { width: formatWidth(column.width) } : undefined}
              onClick={() => onSort(column.field)}
              onDragStart={(e) => handleDragStart(e, column.field)}
            >
              <span className="inline-flex items-center gap-1">
                {column.headerText}
                {isSorted ? (
                  <span aria-hidden="true" className="text-xs text-text-secondary">
                    {sortDirection === 'ascending'
                      ? SORT_ASCENDING_INDICATOR
                      : SORT_DESCENDING_INDICATOR}
                  </span>
                ) : null}
              </span>
            </th>
          );
        })}
      </tr>
      {isFilterEnabled ? (
        <FilterRow
          cellPadding={cellPadding}
          columnTypes={columnTypes}
          fields={fields}
          filterValues={filterValues}
          onFilterChange={onFilterChange}
        />
      ) : null}
    </thead>
  );
};

export default memo(TableHeader);
