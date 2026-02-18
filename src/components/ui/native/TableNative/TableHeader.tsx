import { memo, useCallback, useRef } from 'react';

import { ColumnType, type FilterOperator } from '@/lib/grid/types';
import { getDefaultOperator } from '@/lib/grid/utils/filterOperatorsByType';
import { FM } from '@/localization/helpers';
import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

import ColumnMenuPopup from './columnMenu/ColumnMenuPopup';
import ColumnMenuTrigger from './columnMenu/ColumnMenuTrigger';
import FilterRow from './filters/FilterRow';
import { TextAlign, type TableColumn } from './types';

const CHECKBOX_HEADER_STYLE: React.CSSProperties = { padding: 0, width: '50px', textAlign: 'center', verticalAlign: 'middle' };
const HEADER_LINE_HEIGHT = '1';
const SORT_ASCENDING_INDICATOR = '\u25B2';
const SORT_DESCENDING_INDICATOR = '\u25BC';

const HEADER_ALIGN_CSS: Record<TextAlign, React.CSSProperties['textAlign']> = {
  [TextAlign.Left]: 'left',
  [TextAlign.Center]: 'center',
  [TextAlign.Right]: 'right',
};

function formatWidth(width: number | string): string {
  return typeof width === 'number' ? `${String(width)}px` : width;
}

function buildColumnStyle(column: TableColumn): React.CSSProperties | undefined {
  const style: React.CSSProperties = {};
  if (isValueDefined(column.width)) style.width = formatWidth(column.width);
  if (isValueDefined(column.minWidth)) style.minWidth = formatWidth(column.minWidth);
  if (isValueDefined(column.maxWidth)) style.maxWidth = formatWidth(column.maxWidth);
  return Object.keys(style).length > 0 ? style : undefined;
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
  filterOperators?: Record<string, FilterOperator>;
  onFilterOperatorChange?: (field: string, operator: FilterOperator) => void;
  showCheckbox?: boolean;
  isAllSelected?: boolean;
  onSelectAll?: () => void;
  draggableHeaders?: boolean;
  showColumnMenu?: boolean;
  openMenuField?: string | null;
  onMenuToggle?: (field: string) => void;
  onMenuClose?: () => void;
  allColumns?: TableColumn[];
  hiddenFields?: Set<string>;
  onToggleColumnVisibility?: (field: string) => void;
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
  filterOperators,
  onFilterOperatorChange,
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
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const handleDragStart = useCallback(
    (e: React.DragEvent, field: string) => {
      if (!draggableHeaders) return;
      e.dataTransfer.setData('text/plain', field);
    },
    [draggableHeaders],
  );

  const setTriggerRef = useCallback((field: string, el: HTMLButtonElement | null) => {
    triggerRefs.current[field] = el;
  }, []);

  const renderColumnMenuPopup = (field: string): JSX.Element | null => {
    if (!showColumnMenu || openMenuField !== field) return null;
    if (!onMenuClose || !allColumns) return null;
    if (!hiddenFields || !onToggleColumnVisibility) return null;
    return (
      <ColumnMenuPopup
        allColumns={allColumns}
        columnType={columnTypes[field] ?? ColumnType.String}
        field={field}
        filterOperator={filterOperators?.[field] ?? getDefaultOperator(columnTypes[field] ?? ColumnType.String)}
        filterValue={filterValues[field] ?? ''}
        hiddenFields={hiddenFields}
        sortDirection={sortDirection}
        sortField={sortField}
        triggerRef={{ current: triggerRefs.current[field] ?? null }}
        onClose={onMenuClose}
        onFilterChange={onFilterChange}
        onFilterOperatorChange={onFilterOperatorChange ?? (() => {})}
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
          height: '32px',
        }}
      >
        {showCheckbox ? (
          <th scope="col" style={CHECKBOX_HEADER_STYLE}>
            <input
              aria-label={FM('table.selectAll')}
              checked={isAllSelected}
              className="native-grid-checkbox"
              data-testid="select-all-checkbox"
              type="checkbox"
              onChange={onSelectAll}
            />
          </th>
        ) : null}
        {columns.map((column) => {
          const isSorted = sortField === column.field;
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- CSS var() for theme-driven default
          const headerTextAlign = (isValueDefined(column.textAlign)
            ? HEADER_ALIGN_CSS[column.textAlign]
            : 'var(--component-datagrid-header-text-align)') as React.CSSProperties['textAlign'];
          return (
            <th
              key={column.field}
              aria-sort={isSorted ? sortDirection : undefined}
              className={cn(cellPadding, 'native-grid-header-cell group/th relative cursor-pointer select-none border-b transition-colors overflow-visible whitespace-nowrap border-r border-r-border/30 last:border-r-0')}
              draggable={draggableHeaders}
              scope="col"
              style={{
                padding: 'var(--component-datagrid-header-text-padding)',
                color: 'var(--component-datagrid-header-text)',
                borderColor: 'var(--component-datagrid-header-border)',
                textTransform: 'var(--component-datagrid-header-transform)',
                textAlign: headerTextAlign,
                fontSize: 'var(--component-datagrid-header-font-size)',
                fontWeight: 'var(--component-datagrid-header-font-weight)',
                letterSpacing: 'var(--component-datagrid-header-letter-spacing)',
                verticalAlign: 'var(--component-datagrid-header-vertical-align)',
                lineHeight: HEADER_LINE_HEIGHT,
                ...buildColumnStyle(column),
              }}
              onClick={() => onSort(column.field)}
              onDragStart={(e) => handleDragStart(e, column.field)}
            >
              <span className="inline-flex w-full items-center gap-1" style={{ justifyContent: headerTextAlign }}>
                <span className="overflow-hidden text-ellipsis">
                  {column.headerText}
                </span>
                {isSorted ? (
                  <span aria-hidden="true" className="shrink-0 text-xs" style={{ color: 'var(--component-datagrid-sort-icon)' }}>
                    {sortDirection === 'ascending' ? SORT_ASCENDING_INDICATOR : SORT_DESCENDING_INDICATOR}
                  </span>
                ) : null}
                {showColumnMenu && onMenuToggle ? (
                  <ColumnMenuTrigger
                    ref={(el) => setTriggerRef(column.field, el)}
                    field={column.field}
                    headerText={column.headerText}
                    isOpen={openMenuField === column.field}
                    onToggle={onMenuToggle}
                  />
                ) : null}
              </span>
            </th>
          );
        })}
      </tr>
      {isValueDefined(openMenuField) ? renderColumnMenuPopup(openMenuField) : null}
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
