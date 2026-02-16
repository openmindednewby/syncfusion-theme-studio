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

import { memo, useEffect, useMemo, useRef, useState } from 'react';

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
import { isNotEmptyArray, isValueDefined } from '@/utils/is';

import { AVAILABLE_PAGE_SIZES, DEFAULT_PAGE_SETTINGS } from './constants';
import { useGridCallbacks } from './useGridCallbacks';
import { computePageSettings, useGridFeatures } from './useGridFeatures';

import type { DataGridProps } from './types';

const PAGER_BUTTON_APPROX_WIDTH = 40;
const PAGER_SIDE_CONTENT_APPROX_WIDTH = 260;
const MIN_RESPONSIVE_PAGE_COUNT = 3;
const PAGE_SIZE_OPTIONS_SEPARATOR = ',';
const POPUP_REPOSITION_DELAY_MS = 0;
const POPUP_VERTICAL_GAP_PX = 4;

function parsePageSizeOptions(input: string): number[] {
  const parsed = input
    .split(PAGE_SIZE_OPTIONS_SEPARATOR)
    .map((part) => Number.parseInt(part.trim(), 10))
    .filter((n) => Number.isFinite(n) && n > 0);
  return parsed.length > 0 ? Array.from(new Set(parsed)) : AVAILABLE_PAGE_SIZES;
}

function parsePageSizesFromSettings(input: boolean | (number | string)[] | undefined): number[] | undefined {
  if (!Array.isArray(input)) return undefined;
  const parsed = input
    .map((value) => Number.parseInt(String(value), 10))
    .filter((n) => Number.isFinite(n) && n > 0);
  return parsed.length > 0 ? Array.from(new Set(parsed)) : undefined;
}

function normalizeResponsivePageCount(count: number): number {
  const bounded = Math.max(MIN_RESPONSIVE_PAGE_COUNT, count);
  return bounded % 2 === 0 ? bounded - 1 : bounded;
}

function repositionPagerDropdownPopup(root: HTMLDivElement): void {
  const input = root.querySelector<HTMLInputElement>('.e-pager .e-pagerdropdown input.e-input[aria-controls]');
  const wrapper = root.querySelector<HTMLElement>('.e-pager .e-pagerdropdown .e-ddl.e-control-wrapper');
  const popupId = input?.getAttribute('aria-controls');
  if (!isValueDefined(input) || !isValueDefined(wrapper) || !isValueDefined(popupId) || popupId === '') return;
  const popup = document.getElementById(popupId);
  if (!isValueDefined(popup) || !popup.classList.contains('e-popup-open')) return;

  if (popup.parentElement !== document.body) {
    document.body.appendChild(popup);
  }

  const rect = wrapper.getBoundingClientRect();
  popup.style.position = 'fixed';
  popup.style.left = `${Math.round(rect.left)}px`;
  popup.style.top = `${Math.round(rect.bottom + POPUP_VERTICAL_GAP_PX)}px`;
  popup.style.minWidth = `${Math.round(rect.width)}px`;
  popup.style.zIndex = '10000';
}

function getVisibleColumnMenuPopup(): HTMLElement | undefined {
  const candidates = Array.from(
    document.querySelectorAll<HTMLElement>('.e-grid-menu.e-contextmenu-wrapper, .e-grid-menu.e-popup, .e-grid-menu'),
  );
  return candidates.find((element) => {
    const hasMenuItems = isValueDefined(element.querySelector('.e-menu-item'));
    const isVisible = element.classList.contains('e-popup-open')
      || element.style.visibility === 'visible'
      || getComputedStyle(element).visibility === 'visible';
    return hasMenuItems && isVisible;
  });
}

function repositionColumnMenuPopup(trigger: HTMLElement): void {
  const popup = getVisibleColumnMenuPopup();
  if (!isValueDefined(popup)) return;

  if (popup.parentElement !== document.body) {
    document.body.appendChild(popup);
  }

  const triggerRect = trigger.getBoundingClientRect();
  const popupRect = popup.getBoundingClientRect();
  const maxLeft = Math.max(0, window.innerWidth - popupRect.width - POPUP_VERTICAL_GAP_PX);
  const targetLeft = Math.min(Math.max(POPUP_VERTICAL_GAP_PX, triggerRect.right - popupRect.width), maxLeft);

  popup.style.position = 'fixed';
  popup.style.left = `${Math.round(targetLeft)}px`;
  popup.style.top = `${Math.round(triggerRect.bottom + POPUP_VERTICAL_GAP_PX)}px`;
  popup.style.zIndex = '10000';
}

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

  const { mode, theme } = useThemeStore();
  const internalGridRef = useRef<GridComponent | undefined>(undefined);
  const gridRef = externalGridRef ?? internalGridRef;
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [responsivePageCount, setResponsivePageCount] = useState<number | undefined>(undefined);

  const { features, services } = useGridFeatures(props);
  const callbacks = useGridCallbacks(props);

  useEffect(() => {
    if (!features.paging || !isValueDefined(wrapperRef.current) || !isValueDefined(globalThis.ResizeObserver)) return;
    const element = wrapperRef.current;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 0;
      const rawCount = Math.floor((width - PAGER_SIDE_CONTENT_APPROX_WIDTH) / PAGER_BUTTON_APPROX_WIDTH);
      setResponsivePageCount(normalizeResponsivePageCount(rawCount));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [features.paging]);

  useEffect(() => {
    if (!features.columnMenu || !isValueDefined(wrapperRef.current)) return;
    const root = wrapperRef.current;
    const onPointerDown = (event: Event): void => {
      const target = event.target as Element | null;
      if (!isValueDefined(target)) return;
      const trigger = target.closest('.e-columnmenu') as HTMLElement | null;
      if (!isValueDefined(trigger)) return;
      setTimeout(() => repositionColumnMenuPopup(trigger), POPUP_REPOSITION_DELAY_MS);
      requestAnimationFrame(() => repositionColumnMenuPopup(trigger));
    };

    root.addEventListener('pointerdown', onPointerDown, true);
    return () => {
      root.removeEventListener('pointerdown', onPointerDown, true);
    };
  }, [features.columnMenu]);

  useEffect(() => {
    if (!features.paging || !isValueDefined(wrapperRef.current)) return;
    const root = wrapperRef.current;
    const onPointerDown = (event: Event): void => {
      const target = event.target as Element | null;
      if (!isValueDefined(target)) return;
      if (!target.closest('.e-pager .e-pagerdropdown')) return;
      setTimeout(() => repositionPagerDropdownPopup(root), POPUP_REPOSITION_DELAY_MS);
      requestAnimationFrame(() => repositionPagerDropdownPopup(root));
    };

    const onWindowMove = (): void => {
      repositionPagerDropdownPopup(root);
    };

    root.addEventListener('pointerdown', onPointerDown, true);
    window.addEventListener('resize', onWindowMove);
    window.addEventListener('scroll', onWindowMove, true);
    return () => {
      root.removeEventListener('pointerdown', onPointerDown, true);
      window.removeEventListener('resize', onWindowMove);
      window.removeEventListener('scroll', onWindowMove, true);
    };
  }, [features.paging]);

  const themePageSettings = useMemo<{ pageSize: number; pageCount: number; pageSizes: number[] }>(() => {
    const dataGridTheme = theme.components[mode].dataGrid;
    const defaultPageSize = dataGridTheme.paginationDefaultPageSize;
    const parsedSizes = parsePageSizeOptions(dataGridTheme.paginationPageSizeOptions);
    const normalizedSizes = parsedSizes.includes(defaultPageSize)
      ? parsedSizes
      : [defaultPageSize, ...parsedSizes];
    return {
      pageSize: defaultPageSize,
      pageCount: DEFAULT_PAGE_SETTINGS.pageCount ?? 5,
      pageSizes: normalizedSizes,
    };
  }, [theme, mode]);

  const fallbackPageSettings = useMemo(() => {
    const merged = { ...themePageSettings };
    if (isValueDefined(pageSettings.pageSize)) merged.pageSize = pageSettings.pageSize;
    if (isValueDefined(pageSettings.pageCount)) merged.pageCount = pageSettings.pageCount;
    const parsedPageSizes = parsePageSizesFromSettings(pageSettings.pageSizes);
    if (isValueDefined(parsedPageSizes)) merged.pageSizes = parsedPageSizes;
    return merged;
  }, [themePageSettings, pageSettings.pageSize, pageSettings.pageCount, pageSettings.pageSizes]);

  const effectivePageSettings = useMemo(() => {
    const base = computePageSettings(gridConfig, fallbackPageSettings, features.paging, data.length);
    const hasExplicitPageCount = isValueDefined(pageSettings.pageCount) || isValueDefined(gridConfig?.pagination?.pageCount);
    if (!isValueDefined(responsivePageCount) || hasExplicitPageCount || !features.paging) return base;
    const pageSize = base.pageSize ?? fallbackPageSettings.pageSize ?? DEFAULT_PAGE_SETTINGS.pageSize ?? 10;
    const totalPages = Math.max(1, Math.ceil(data.length / pageSize));
    const nextPageCount = Math.min(totalPages, responsivePageCount);
    if (base.pageCount === nextPageCount) return base;
    return { ...base, pageCount: nextPageCount };
  }, [gridConfig, pageSettings.pageCount, fallbackPageSettings, features.paging, data.length, responsivePageCount]);

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
    <div ref={wrapperRef} className={wrapperClass} data-testid={testId}>
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
        filterSettings={props.filterSettings}
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
