/**
 * DataGrid - Theme-aware Syncfusion GridComponent wrapper.
 *
 * Provides a fully configurable data grid exposing ALL Syncfusion EJ2 Grid
 * features: pagination, sorting, filtering, grouping, aggregates, editing,
 * column resize/reorder/freeze, toolbar, context menu, detail rows,
 * row drag-and-drop, virtualization, clipboard, search, print, and export.
 *
 * All new props are optional; the existing API is fully backwards compatible.
 *
 * @see {@link https://ej2.syncfusion.com/react/documentation/grid/getting-started | Syncfusion Grid docs}
 */
// Module-level CSS imports ensure styles are loaded synchronously with the JS
// chunk (before first render), preventing unstyled pager/grid flash. Since
// DataGrid is always lazy-loaded, this does not affect login page performance.
// Grid CSS: columns, rows, headers, sorting, filtering, grouping, editing, etc.
import '@syncfusion/ej2-react-grids/styles/tailwind.css';
// Pager CSS: pagination layout, page-number buttons, nav-icon glyph definitions
// (e-icon-first/prev/next/last), page-size dropdown, and info bar.
// The grid CSS does NOT include pager styles — they ship in ej2-navigations.
import '@syncfusion/ej2-navigations/styles/pager/tailwind.css';

import { memo, useMemo, useRef } from 'react';

import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  AggregateColumnsDirective,
  AggregateColumnDirective,
  AggregatesDirective,
  AggregateDirective,
} from '@syncfusion/ej2-react-grids';

import { useSyncfusionDefaultSort } from '@/lib/grid/hooks/useSyncfusionDefaultSort';
import { useSyncfusionFilters } from '@/lib/grid/hooks/useSyncfusionFilters';
import { Mode } from '@/stores/mode';
import { useThemeStore } from '@/stores/useThemeStore';
import { cn } from '@/utils/cn';
import { isNotEmptyArray } from '@/utils/is';

import { DEFAULT_PAGE_SETTINGS } from './constants';
import { useGridCallbacks } from './useGridCallbacks';
import { computePageSettings, useGridFeatures } from './useGridFeatures';

import type { DataGridProps } from './types';

const DataGridComponent = <T extends object>(props: DataGridProps<T>): JSX.Element => {
  const {
    data,
    columns,
    gridConfig,
    pageSettings = DEFAULT_PAGE_SETTINGS,
    className,
    testId,
    height = 'auto',
    isLoading = false,
    emptyText = 'No data available',
    groupSettings,
    aggregates,
    selectionSettings,
    editSettings,
    frozenColumns,
    frozenRows,
    toolbar,
    contextMenuItems,
    detailTemplate,
    childGrid,
    rowDropSettings,
    searchSettings,
    rowHeight,
    gridRef: externalGridRef,
  } = props;

  const { mode } = useThemeStore();
  const internalGridRef = useRef<GridComponent | undefined>(undefined);
  const gridRef = externalGridRef ?? internalGridRef;

  const { features, services } = useGridFeatures(props);
  const callbacks = useGridCallbacks(props);

  const effectivePageSettings = useMemo(
    () => computePageSettings(gridConfig, pageSettings, features.paging, data.length),
    [gridConfig, pageSettings, features.paging, data.length],
  );

  // Non-blocking filter/sort setup via gridConfig
  useSyncfusionFilters(gridRef, gridConfig?.filter);
  useSyncfusionDefaultSort(gridRef, gridConfig?.defaultSort);

  // Resolve aggregate rows from props or gridConfig
  const effectiveAggregates = aggregates ?? gridConfig?.aggregates;

  // Syncfusion Grid internally calls classList.add(cssClass) which cannot
  // handle space-separated strings. Pass only a single class token here and
  // apply 'sf-datagrid' to the wrapper div instead.
  const gridCssClass = mode === Mode.Dark ? 'sf-dark' : 'sf-light';

  const wrapperClass = cn(
    'sf-datagrid-wrapper sf-datagrid relative',
    isLoading && 'sf-datagrid-loading',
    className,
  );

  const renderEmptyRecord = (): JSX.Element => (
    <div className="sf-datagrid-empty py-8 text-center text-text-secondary">{emptyText}</div>
  );

  return (
    <div className={wrapperClass} data-testid={testId}>
      {isLoading ? (
        <div className="sf-datagrid-loader absolute inset-0 z-10 flex items-center justify-center bg-surface/80">
          <div
            aria-label="Loading"
            className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"
            role="status"
          />
        </div>
      ) : null}
      <GridComponent
        // eslint-disable-next-line react-compiler/react-compiler -- imperative ref assignment for Syncfusion
        ref={(g: GridComponent) => { gridRef.current = g; }}
        actionBegin={callbacks.handleActionBegin}
        actionComplete={callbacks.handleActionComplete}
        allowFiltering={features.filtering}
        allowGrouping={features.grouping}
        allowPaging={features.paging}
        allowReordering={features.reordering}
        allowResizing={features.resizing}
        allowRowDragAndDrop={features.rowDragDrop}
        allowSorting={features.sorting}
        allowTextWrap={props.allowTextWrap}
        childGrid={childGrid}
        contextMenuClick={callbacks.handleContextMenuClick}
        contextMenuItems={contextMenuItems}
        cssClass={gridCssClass}
        dataSource={data}
        detailTemplate={detailTemplate}
        editSettings={editSettings}
        emptyRecordTemplate={renderEmptyRecord}
        enableInfiniteScrolling={features.infiniteScroll}
        enableVirtualization={features.virtualization}
        frozenColumns={frozenColumns}
        frozenRows={frozenRows}
        groupSettings={groupSettings}
        height={height}
        pageSettings={effectivePageSettings}
        rowDeselected={callbacks.handleRowDeselected}
        rowDrag={callbacks.handleRowDrag}
        rowDrop={callbacks.handleRowDrop}
        rowDropSettings={rowDropSettings}
        rowHeight={rowHeight}
        rowSelected={callbacks.handleRowSelected}
        searchSettings={searchSettings}
        selectionSettings={selectionSettings}
        showColumnChooser={features.columnChooser}
        showColumnMenu={features.columnMenu}
        toolbar={toolbar}
        toolbarClick={callbacks.handleToolbarClick}
      >
        <ColumnsDirective>
          {columns.map((column) => (
            <ColumnDirective key={String(column.field)} {...column} />
          ))}
        </ColumnsDirective>
        {isNotEmptyArray(effectiveAggregates) && (
          <AggregatesDirective>
            {effectiveAggregates.map((row) => (
              <AggregateDirective key={row.columns.map((c) => c.field).join('-')}>
                <AggregateColumnsDirective>
                  {row.columns.map((col) => (
                    <AggregateColumnDirective
                      key={`${col.field}-${col.type}`}
                      columnName={col.field}
                      field={col.field}
                      footerTemplate={col.footerTemplate}
                      format={col.format}
                      groupFooterTemplate={col.groupFooterTemplate}
                      type={col.type}
                    />
                  ))}
                </AggregateColumnsDirective>
              </AggregateDirective>
            ))}
          </AggregatesDirective>
        )}
        <Inject services={services} />
      </GridComponent>
    </div>
  );
};

// Memoize the component - type assertion needed for generic memo
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const DataGrid = memo(DataGridComponent) as typeof DataGridComponent;

export default DataGrid;
export type { DataGridProps };
