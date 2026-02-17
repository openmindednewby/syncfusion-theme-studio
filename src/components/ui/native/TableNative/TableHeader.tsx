/**
 * TableHeader renders the thead element with sortable column headers,
 * optional checkbox select-all column, and an optional filter row.
 */
import { memo, useCallback } from 'react';

import type { ColumnType } from '@/lib/grid/types';
import { FM } from '@/localization/helpers';
import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

import ColumnMenuPopup from './columnMenu/ColumnMenuPopup';
import ColumnMenuTrigger from './columnMenu/ColumnMenuTrigger';
import FilterRow from './filters/FilterRow';
import { TextAlign } from './types';

import type { TableColumn } from './types';

const CELL_PADDING_STYLE: React.CSSProperties = { padding: 'var(--component-datagrid-cell-padding)' };
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

/** Build the style object for column width constraints */
function buildColumnStyle(column: TableColumn): React.CSSProperties | undefined {
  const style: React.CSSProperties = {};
  let hasStyle = false;

  if (isValueDefined(column.width)) {
    style.width = formatWidth(column.width);
    hasStyle = true;
  }
  if (isValueDefined(column.minWidth)) {
    style.minWidth = formatWidth(column.minWidth);
    hasStyle = true;
  }
  if (isValueDefined(column.maxWidth)) {
    style.maxWidth = formatWidth(column.maxWidth);
    hasStyle = true;
  }

  return hasStyle ? style : undefined;
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
  showColumnMenu?: boolean | undefined;
  openMenuField?: string | null | undefined;
  onMenuToggle?: ((field: string) => void) | undefined;
  onMenuClose?: (() => void) | undefined;
  allColumns?: TableColumn[] | undefined;
  hiddenFields?: Set<string> | undefined;
  onToggleColumnVisibility?: ((field: string) => void) | undefined;
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
  showColumnMenu = false,
  openMenuField = null,
  onMenuToggle,
  onMenuClose,
  allColumns,
  hiddenFields,
  onToggleColumnVisibility,
}: Props): JSX.Element => {
  const handleDragStart = useCallback(
    (e: React.DragEvent, field: string) => {
      if (!draggableHeaders) return;
      e.dataTransfer.setData('text/plain', field);
    },
    [draggableHeaders],
  );

  const renderColumnMenuPopup = (field: string): JSX.Element | null => {
    if (!showColumnMenu || openMenuField !== field) return null;
    if (!onMenuClose || !allColumns) return null;
    if (!hiddenFields || !onToggleColumnVisibility) return null;
    return (
      <ColumnMenuPopup
        allColumns={allColumns}
        field={field}
        hiddenFields={hiddenFields}
        sortDirection={sortDirection}
        sortField={sortField}
        onClose={onMenuClose}
        onSort={onSort}
        onToggleColumn={onToggleColumnVisibility}
      />
    );
  };

  return (
    <thead>
      <tr
        className="border-b"
        style={{
          backgroundColor: 'var(--component-datagrid-header-bg)',
          borderColor: 'var(--component-datagrid-header-border)',
        }}
      >
        {showCheckbox ? (
          <th className={cn(cellPadding, 'w-10 text-center')} scope="col" style={CELL_PADDING_STYLE}>
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
                'native-grid-header-cell group/th relative cursor-pointer select-none',
                'border-b transition-colors',
                'overflow-visible whitespace-nowrap',
                'border-r border-r-border/30 last:border-r-0',
                ALIGN_CLASSES[align],
              )}
              draggable={draggableHeaders}
              scope="col"
              style={{
                padding: 'var(--component-datagrid-cell-padding)',
                color: 'var(--component-datagrid-header-text)',
                borderColor: 'var(--component-datagrid-header-border)',
                textTransform: 'var(--component-datagrid-header-transform)',
                fontSize: 'var(--component-datagrid-header-font-size)',
                fontWeight: 'var(--component-datagrid-header-font-weight)',
                letterSpacing: 'var(--component-datagrid-header-letter-spacing)',
                ...buildColumnStyle(column),
              }}
              onClick={() => onSort(column.field)}
              onDragStart={(e) => handleDragStart(e, column.field)}
            >
              <span className="inline-flex w-full items-center gap-1">
                <span className="overflow-hidden text-ellipsis">
                  {column.headerText}
                </span>
                {isSorted ? (
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-xs"
                    style={{ color: 'var(--component-datagrid-sort-icon)' }}
                  >
                    {sortDirection === 'ascending'
                      ? SORT_ASCENDING_INDICATOR
                      : SORT_DESCENDING_INDICATOR}
                  </span>
                ) : null}
                {showColumnMenu && onMenuToggle ? (
                  <ColumnMenuTrigger
                    field={column.field}
                    headerText={column.headerText}
                    isOpen={openMenuField === column.field}
                    onToggle={onMenuToggle}
                  />
                ) : null}
              </span>
              {renderColumnMenuPopup(column.field)}
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
