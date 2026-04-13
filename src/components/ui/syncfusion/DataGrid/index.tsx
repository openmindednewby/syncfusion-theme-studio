/** DataGrid - Theme-aware Syncfusion GridComponent wrapper. */
import '@syncfusion/ej2-react-grids/styles/tailwind.css';
import '@syncfusion/ej2-navigations/styles/pager/tailwind.css';

import { memo, useCallback, useLayoutEffect, useMemo, useRef } from 'react';

import {
  GridComponent, ColumnsDirective, ColumnDirective, Inject,
  AggregateColumnsDirective, AggregateColumnDirective,
  AggregatesDirective, AggregateDirective,
} from '@syncfusion/ej2-react-grids';

import { useSyncfusionDefaultSort } from '@/lib/grid/hooks/useSyncfusionDefaultSort';
import { useSyncfusionFilters } from '@/lib/grid/hooks/useSyncfusionFilters';
import { FM } from '@/localization/utils/helpers';
import { Mode } from '@/stores/mode';
import { useThemeStore } from '@/stores/useThemeStore';
import { cn } from '@/utils/cn';
import { isNotEmptyArray, isValueDefined } from '@/utils/is';


import { DEFAULT_FILTER_SETTINGS, DEFAULT_PAGE_SETTINGS } from './constants';
import { useGridCallbacks } from './hooks/useGridCallbacks';
import { useGridFeatures } from './hooks/useGridFeatures';
import { useGridPageSettings } from './hooks/useGridPageSettings';
import { useGridPopupEffects } from './hooks/useGridPopupEffects';
// Side-effect: patches HTMLElement.prototype.focus to add preventScroll
// for elements inside Syncfusion grids, preventing focus-induced page jumps.
import './hooks/usePreventFocusScroll';
import { GRID_DENSITY_ROW_HEIGHT } from '../../shared/gridDensityMap';
import { useGridStyleOverrides } from '../../shared/useGridStyleOverrides';

import type { DataGridProps } from './types';

function resolveGridCssClass(mode: Mode): string {
  return mode === Mode.Dark ? 'sf-dark' : 'sf-light';
}

function handleColumnMenuAction(
  grid: GridComponent | undefined,
  id: string,
  field: string | undefined,
): void {
  if (!isValueDefined(grid)) return;
  if (id.endsWith('_colmenu_AutoFitAll')) grid.autoFitColumns();
  else if (id.endsWith('_colmenu_AutoFit') && isValueDefined(field))
    grid.autoFitColumns([field]);
  else if (id.endsWith('_colmenu_SortAscending') && isValueDefined(field))
    grid.sortColumn(field, 'Ascending');
  else if (id.endsWith('_colmenu_SortDescending') && isValueDefined(field))
    grid.sortColumn(field, 'Descending');
}

const LoadingOverlay = (): JSX.Element => (
  <div className="sf-datagrid-loader absolute inset-0 z-10 flex items-center justify-center bg-surface/80">
    <div
      aria-label={FM('accessibility.loading')}
      className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"
      role="status"
    />
  </div>
);

const DataGridComponent = <T extends object>(
  props: DataGridProps<T>,
): JSX.Element => {
  const {
    data, columns, gridConfig,
    pageSettings = DEFAULT_PAGE_SETTINGS,
    filterSettings = DEFAULT_FILTER_SETTINGS,
    className, testId,
    height = 'auto', isLoading = false,
    emptyText,
    groupSettings, aggregates, selectionSettings, editSettings,
    frozenColumns, frozenRows, toolbar, contextMenuItems,
    detailTemplate, childGrid, rowDropSettings, searchSettings,
    rowHeight, gridRef: externalGridRef,
    density, themeOverrides,
  } = props;

  const { mode, theme } = useThemeStore();
  const internalGridRef = useRef<GridComponent | undefined>(undefined);
  const gridRef = externalGridRef ?? internalGridRef;

  const { features, services } = useGridFeatures(props);
  const callbacks = useGridCallbacks(props);
  const { wrapperRef, responsivePageCount } = useGridPopupEffects(features);

  // Prevent FocusStrategy.restoreFocus crash when the grid is re-keyed.
  // When a React key change unmounts the grid, a pending click event can
  // still reach Syncfusion's document-level MenuBase.clickHandler, which
  // calls ColumnMenu.columnMenuOnClose → FocusStrategy.restoreFocus on
  // a grid whose focusModule is already undefined.
  // Fix: destroy the columnMenuModule synchronously (useLayoutEffect) so
  // its document handlers are removed before the click event bubbles.
  // Guard: only destroy on real unmounts (element disconnected from DOM),
  // NOT during React StrictMode's simulated unmount/remount cycle where
  // the DOM stays connected but cleanup functions still fire.
  useLayoutEffect(() => () => {
    const grid = gridRef.current;
    if (!isValueDefined(grid)) return;
    if (isValueDefined(grid.element) && grid.element.isConnected) return;
    try { grid.columnMenuModule.destroy(); } catch { /* already destroyed */ }
  }, [gridRef]);

  const styleOverridesInput = useMemo(() => ({
    ...(isValueDefined(density) ? { density } : {}),
    ...(isValueDefined(themeOverrides) ? { themeOverrides } : {}),
  }), [density, themeOverrides]);
  const styleOverrides = useGridStyleOverrides(styleOverridesInput);
  const effectiveRowHeight = isValueDefined(density) ? GRID_DENSITY_ROW_HEIGHT[density] : rowHeight;

  const handleColumnMenuClick = useCallback(
    (args: { item?: { id?: string }; column?: { field?: string } }) => {
      handleColumnMenuAction(gridRef.current, args.item?.id ?? '', args.column?.field);
    },
    [gridRef],
  );

  const dataGridTheme = theme.components[mode].dataGrid;
  const pageSettingsInput = useMemo(() => ({
    gridConfig, pageSettings, pagingEnabled: features.paging,
    dataLength: data.length, responsivePageCount, dataGridTheme,
  }), [gridConfig, pageSettings, features.paging, data.length, responsivePageCount, dataGridTheme]);
  const effectivePageSettings = useGridPageSettings(pageSettingsInput);

  useSyncfusionFilters(gridRef, gridConfig?.filter);
  useSyncfusionDefaultSort(gridRef, gridConfig?.defaultSort);

  const effectiveAggregates = aggregates ?? gridConfig?.aggregates;
  const gridCssClass = resolveGridCssClass(mode);
  const wrapperClass = cn(
    'sf-datagrid-wrapper sf-datagrid relative',
    isLoading && 'sf-datagrid-loading',
    className,
  );
  const effectiveEmptyText = emptyText ?? FM('components.dataGrid.noDataAvailable');
  const renderEmptyRecord = (): JSX.Element => (
    <div className="sf-datagrid-empty py-8 text-center text-text-secondary">
      {effectiveEmptyText}
    </div>
  );

  return (
    <div ref={wrapperRef} className={wrapperClass} data-testid={testId} style={styleOverrides}>
      {isLoading ? <LoadingOverlay /> : null}
      <GridComponent
        // eslint-disable-next-line react-compiler/react-compiler -- imperative ref for Syncfusion
        ref={(g: GridComponent) => { gridRef.current = g; }}
        actionBegin={callbacks.handleActionBegin}
        actionComplete={callbacks.handleActionComplete}
        allowExcelExport={features.excelExport}
        allowFiltering={features.filtering}
        allowGrouping={features.grouping}
        allowPaging={features.paging}
        allowPdfExport={features.pdfExport}
        allowReordering={features.reordering}
        allowResizing={features.resizing}
        allowRowDragAndDrop={features.rowDragDrop}
        allowSorting={features.sorting}
        allowTextWrap={props.allowTextWrap}
        childGrid={childGrid}
        columnMenuClick={handleColumnMenuClick}
        contextMenuClick={callbacks.handleContextMenuClick}
        contextMenuItems={contextMenuItems}
        cssClass={gridCssClass}
        dataSource={data}
        detailTemplate={detailTemplate}
        editSettings={editSettings}
        emptyRecordTemplate={renderEmptyRecord}
        enableInfiniteScrolling={features.infiniteScroll}
        enableVirtualization={features.virtualization}
        filterSettings={filterSettings}
        frozenColumns={frozenColumns}
        frozenRows={frozenRows}
        groupSettings={groupSettings}
        height={height}
        pageSettings={effectivePageSettings}
        rowDeselected={callbacks.handleRowDeselected}
        rowDrag={callbacks.handleRowDrag}
        rowDrop={callbacks.handleRowDrop}
        rowDropSettings={rowDropSettings}
        rowHeight={effectiveRowHeight}
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

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- generic memo requires type assertion
const DataGrid = memo(DataGridComponent) as typeof DataGridComponent;

export default DataGrid;
export type { DataGridProps };
