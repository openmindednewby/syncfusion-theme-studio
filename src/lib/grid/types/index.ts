/**
 * Shared grid types for both Syncfusion DataGrid and native TableNative.
 *
 * Defines configuration for filtering, sorting, pagination, and data modes.
 * Feature configs (grouping, editing, etc.) are in features.ts.
 * Column types are in columns.ts.
 */

import type {
  AggregateRowConfig,
  ClipboardConfig,
  ColumnChooserConfig,
  ColumnMenuConfig,
  ContextMenuConfig,
  DetailRowConfig,
  DragDropConfig,
  EditConfig,
  ExportConfig,
  GridToolbarConfig,
  GroupConfig,
  InfiniteScrollConfig,
  SearchConfig,
  SelectionConfig,
  VirtualizationConfig,
} from './features';

/** How data is fetched and processed */
const enum DataMode {
  /** All data loaded up-front; filter/sort/paginate in-memory */
  Client = 'client',
  /** Delegate filter/sort/paginate to server via callbacks */
  Server = 'server',
}

/** Auto-detected or manually specified column data type */
const enum ColumnType {
  String = 'string',
  Number = 'number',
  Date = 'date',
  Boolean = 'boolean',
}

/** Syncfusion filter UI type (native table always uses inline inputs) */
const enum FilterType {
  Menu = 'Menu',
  FilterBar = 'FilterBar',
  Excel = 'Excel',
}

/** Sort direction for default sort configuration */
const enum SortDirection {
  Ascending = 'Ascending',
  Descending = 'Descending',
}

/** A single column's default sort */
interface SortColumnConfig {
  field: string;
  direction: SortDirection;
}

/** Filter configuration */
interface FilterConfig {
  enabled: boolean;
  type?: FilterType;
  autoCreate?: boolean;
  idleDelay?: number;
  columnTypeOverrides?: Record<string, ColumnType>;
}

/** Pagination configuration */
interface PaginationConfig {
  enabled: boolean;
  threshold?: number;
  pageSize?: number;
  pageSizes?: number[];
  /** Maximum number of visible page buttons before ellipsis (default: 5) */
  pageCount?: number;
  /** Show first/last page jump buttons (default: true) */
  showFirstLastButtons?: boolean;
  /** Show "Page X of Y" info text (default: true) */
  showPageInfo?: boolean;
}

/** Server-mode callback signatures */
interface ServerCallbacks {
  onStateChange: (params: ServerQueryParams) => void;
}

/** Parameters sent to the server on state change */
interface ServerQueryParams {
  filters: Record<string, string | number | boolean>;
  sortField?: string | undefined;
  sortDirection?: SortDirection | undefined;
  page: number;
  pageSize: number;
}

/** TanStack Query adapter configuration */
interface TanStackQueryAdapterConfig<TParams = unknown> {
  queryHook: (params: TParams, options?: unknown) => unknown;
  paramsBuilder?: (params: ServerQueryParams) => TParams;
  staticParams?: Partial<TParams>;
}

/** Top-level grid configuration consumed by both DataGrid and TableNative */
interface GridConfig {
  mode?: DataMode;
  /** Table layout mode. Default: 'fixed'. Use 'auto' for content-driven column sizing. */
  tableLayout?: 'auto' | 'fixed';
  filter?: FilterConfig;
  defaultSort?: SortColumnConfig[];
  pagination?: PaginationConfig;
  serverCallbacks?: ServerCallbacks;
  group?: GroupConfig;
  aggregates?: AggregateRowConfig[];
  edit?: EditConfig;
  selection?: SelectionConfig;
  detailRow?: DetailRowConfig;
  toolbar?: GridToolbarConfig;
  contextMenu?: ContextMenuConfig;
  export?: ExportConfig;
  dragDrop?: DragDropConfig;
  virtualization?: VirtualizationConfig;
  infiniteScroll?: InfiniteScrollConfig;
  clipboard?: ClipboardConfig;
  columnChooser?: ColumnChooserConfig;
  columnMenu?: ColumnMenuConfig;
  search?: SearchConfig;
}

export { DataMode, ColumnType, FilterType, SortDirection };
export type {
  GridConfig,
  FilterConfig,
  PaginationConfig,
  SortColumnConfig,
  ServerCallbacks,
  ServerQueryParams,
  TanStackQueryAdapterConfig,
};

// Re-export feature types
export { EditMode, SelectionType, SelectionMode, CheckboxMode, AggregateType, ToolbarItemType, ContextMenuItemType } from './features';
export type {
  GroupConfig,
  AggregateColumnConfig,
  AggregateRowConfig,
  EditConfig,
  SelectionConfig,
  DetailRowConfig,
  ToolbarItemConfig,
  GridToolbarConfig,
  ContextMenuItemConfig,
  ContextMenuConfig,
  ExportConfig,
  DragDropConfig,
  VirtualizationConfig,
  InfiniteScrollConfig,
  ClipboardConfig,
  ColumnChooserConfig,
  ColumnMenuConfig,
  SearchConfig,
} from './features';

// Re-export column types
export { GridColumnType, GridEditType, FreezeDirection, ClipMode, TextAlign, gridColumnToNative, gridColumnToSyncfusion } from './columns';
export type { GridColumn, GridColumnCommand } from './columns';
