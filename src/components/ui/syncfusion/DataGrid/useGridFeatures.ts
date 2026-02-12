/**
 * Hook that resolves which Syncfusion services to inject based on
 * component props and gridConfig. Only imports services that are needed.
 */
import { useMemo } from 'react';

import type { ColumnModel } from '@syncfusion/ej2-grids';
import {
  Page,
  Sort,
  Filter,
  Group,
  Aggregate,
  Selection,
  Edit,
  CommandColumn,
  Resize,
  Reorder,
  Freeze,
  ColumnChooser,
  ColumnMenu,
  ExcelExport,
  PdfExport,
  Toolbar,
  ContextMenu,
  DetailRow,
  RowDD,
  VirtualScroll,
  InfiniteScroll,
  Clipboard,
  Search,
  Print,
} from '@syncfusion/ej2-react-grids';
import type { PageSettingsModel } from '@syncfusion/ej2-react-grids';

import type { GridConfig } from '@/lib/grid/types';
import { isNotEmptyArray, isValueDefined } from '@/utils/is';

import { AVAILABLE_PAGE_SIZES, DEFAULT_PAGE_SIZE } from './constants';

import type { DataGridProps, ResolvedGridFeatures } from './types';

/**
 * Resolve a boolean flag: props value > config value > default.
 */
function resolveBoolean(
  propValue: boolean | undefined,
  configValue: boolean | undefined,
  defaultValue: boolean,
): boolean {
  if (isValueDefined(propValue)) return propValue;
  if (isValueDefined(configValue)) return configValue;
  return defaultValue;
}

/** Check whether any column has command buttons defined. */
function hasCommandColumns(columns: ColumnModel[]): boolean {
  return columns.some((col) => isNotEmptyArray(col.commands));
}

/** Check whether frozen columns/rows are configured via props. */
function hasFreezing<T extends object>(props: DataGridProps<T>): boolean {
  const hasFrozenCols = isValueDefined(props.frozenColumns) && props.frozenColumns > 0;
  const hasFrozenRows = isValueDefined(props.frozenRows) && props.frozenRows > 0;
  return hasFrozenCols || hasFrozenRows;
}

/** Resolve core table features: paging, sorting, filtering, grouping. */
function resolveCoreFeatures<T extends object>(
  props: DataGridProps<T>,
  config: GridConfig | undefined,
): Pick<ResolvedGridFeatures, 'paging' | 'sorting' | 'filtering' | 'grouping'> {
  return {
    paging: resolveBoolean(props.allowPaging, config?.pagination?.enabled, true),
    sorting: props.allowSorting !== false,
    filtering: resolveBoolean(props.allowFiltering, config?.filter?.enabled, false),
    grouping: resolveBoolean(props.allowGrouping, config?.group?.enabled, false),
  };
}

/** Resolve data-level features: aggregates, selection, editing, command columns. */
function resolveDataFeatures<T extends object>(
  props: DataGridProps<T>,
  config: GridConfig | undefined,
): Pick<ResolvedGridFeatures, 'hasAggregates' | 'hasSelection' | 'editing' | 'hasCommandColumn'> {
  return {
    hasAggregates: isNotEmptyArray(props.aggregates) || isNotEmptyArray(config?.aggregates),
    hasSelection: isValueDefined(props.selectionSettings) || isValueDefined(config?.selection),
    editing: isValueDefined(props.editSettings) || (config?.edit?.enabled === true),
    hasCommandColumn: hasCommandColumns(props.columns),
  };
}

/** Resolve column-level features: resize, reorder, freeze, chooser, menu, export. */
function resolveColumnFeatures<T extends object>(
  props: DataGridProps<T>,
  config: GridConfig | undefined,
): Pick<ResolvedGridFeatures, 'resizing' | 'reordering' | 'freezing' | 'columnChooser' | 'columnMenu' | 'excelExport' | 'pdfExport'> {
  return {
    resizing: resolveBoolean(props.allowResizing, undefined, false),
    reordering: resolveBoolean(props.allowReordering, undefined, false),
    freezing: hasFreezing(props),
    columnChooser: resolveBoolean(props.showColumnChooser, config?.columnChooser?.enabled, false),
    columnMenu: props.showColumnMenu === true,
    excelExport: resolveBoolean(props.allowExcelExport, config?.export?.excel, false),
    pdfExport: resolveBoolean(props.allowPdfExport, config?.export?.pdf, false),
  };
}

/** Resolve UI chrome features: toolbar, context menu, detail row, drag-and-drop. */
function resolveUiFeatures<T extends object>(
  props: DataGridProps<T>,
  config: GridConfig | undefined,
): Pick<ResolvedGridFeatures, 'hasToolbar' | 'hasContextMenu' | 'detailRow' | 'rowDragDrop'> {
  const hasDetail = isValueDefined(props.detailTemplate) || isValueDefined(props.childGrid);

  return {
    hasToolbar: isNotEmptyArray(props.toolbar) || (config?.toolbar?.enabled === true),
    hasContextMenu: isValueDefined(props.contextMenuItems) || (config?.contextMenu?.enabled === true),
    detailRow: hasDetail || (config?.detailRow?.enabled === true),
    rowDragDrop: resolveBoolean(props.allowRowDragAndDrop, config?.dragDrop?.enabled, false),
  };
}

/** Resolve performance and utility features: virtualization, clipboard, search, print. */
function resolvePerformanceFeatures<T extends object>(
  props: DataGridProps<T>,
  config: GridConfig | undefined,
): Pick<ResolvedGridFeatures, 'virtualization' | 'infiniteScroll' | 'clipboard' | 'search' | 'print'> {
  return {
    virtualization: props.enableVirtualization === true || (config?.virtualization?.enabled === true),
    infiniteScroll: props.enableInfiniteScrolling === true || (config?.infiniteScroll?.enabled === true),
    clipboard: props.enableClipboard === true || (config?.clipboard?.enabled === true),
    search: isValueDefined(props.searchSettings) || (config?.search?.enabled === true),
    print: props.allowPrint === true,
  };
}

/**
 * Resolve all feature flags by merging component props with gridConfig.
 * Props take precedence over gridConfig for direct boolean toggles.
 */
export function resolveFeatures<T extends object>(
  props: DataGridProps<T>,
): ResolvedGridFeatures {
  const config = props.gridConfig;

  return {
    ...resolveCoreFeatures(props, config),
    ...resolveDataFeatures(props, config),
    ...resolveColumnFeatures(props, config),
    ...resolveUiFeatures(props, config),
    ...resolvePerformanceFeatures(props, config),
  };
}

/**
 * Mapping from feature flag key to Syncfusion service module.
 * Used by buildServiceList to avoid repetitive if-statements.
 */
const SERVICE_MAP: ReadonlyArray<[keyof ResolvedGridFeatures, Object]> = [
  ['paging', Page],
  ['sorting', Sort],
  ['filtering', Filter],
  ['grouping', Group],
  ['hasAggregates', Aggregate],
  ['hasSelection', Selection],
  ['editing', Edit],
  ['hasCommandColumn', CommandColumn],
  ['resizing', Resize],
  ['reordering', Reorder],
  ['freezing', Freeze],
  ['columnChooser', ColumnChooser],
  ['columnMenu', ColumnMenu],
  ['excelExport', ExcelExport],
  ['pdfExport', PdfExport],
  ['hasToolbar', Toolbar],
  ['hasContextMenu', ContextMenu],
  ['detailRow', DetailRow],
  ['rowDragDrop', RowDD],
  ['virtualization', VirtualScroll],
  ['infiniteScroll', InfiniteScroll],
  ['clipboard', Clipboard],
  ['search', Search],
  ['print', Print],
];

/** Build the array of Syncfusion service modules to inject. */
function buildServiceList(features: ResolvedGridFeatures): Object[] {
  return SERVICE_MAP
    .filter(([key]) => features[key])
    .map(([, service]) => service);
}

/**
 * Hook that resolves which Syncfusion services to inject.
 * Memoized to avoid unnecessary re-renders.
 */
export function useGridFeatures<T extends object>(
  props: DataGridProps<T>,
): { features: ResolvedGridFeatures; services: Object[] } {
  const features = useMemo(() => resolveFeatures(props), [props]);

  const services = useMemo(() => buildServiceList(features), [features]);

  return { features, services };
}

/**
 * Compute effective page settings from gridConfig or fallback.
 */
export function computePageSettings(
  gridConfig: GridConfig | undefined,
  fallback: PageSettingsModel,
  pagingEnabled: boolean,
  dataLength: number,
): PageSettingsModel {
  if (!isValueDefined(gridConfig?.pagination)) return fallback;

  const pag = gridConfig.pagination;
  const threshold = pag.threshold ?? 0;
  const shouldShow = pagingEnabled && dataLength > threshold;

  if (!shouldShow) return { ...fallback, pageSize: dataLength };

  const settings: PageSettingsModel = {
    pageSize: pag.pageSize ?? DEFAULT_PAGE_SIZE,
    pageSizes: pag.pageSizes ?? AVAILABLE_PAGE_SIZES,
  };
  if (isValueDefined(pag.pageCount)) settings.pageCount = pag.pageCount;
  return settings;
}
