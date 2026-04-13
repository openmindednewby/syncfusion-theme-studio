/**
 * Grid library - shared types, hooks, utilities, and adapters
 * for both Syncfusion DataGrid and native TableNative.
 */

// Types
export { DataMode, ColumnType, FilterType, SortDirection } from './types';
export type {
  GridConfig,
  FilterConfig,
  PaginationConfig,
  SortColumnConfig,
  ServerCallbacks,
  ServerQueryParams,
  TanStackQueryAdapterConfig,
} from './types';

// Utilities
export { detectColumnTypes } from './utils/detectColumnTypes';

// Hooks
export { useSyncfusionFilters } from './hooks/useSyncfusionFilters';
export { useSyncfusionDefaultSort } from './hooks/useSyncfusionDefaultSort';
export { useNativeGridState } from './hooks/useNativeGridState';

// Adapters
export { useTanStackQueryAdapter, buildQueryParams } from './adapters/useTanStackQueryAdapter';
