/**
 * DataGrid props interface - all Syncfusion EJ2 Grid features exposed
 * through clean, optional props with sensible defaults.
 */
import type {
  ColumnModel,
  ContextMenuItem,
  ContextMenuItemModel,
} from '@syncfusion/ej2-grids';
import type { ItemModel } from '@syncfusion/ej2-navigations';
import type {
  EditSettingsModel,
  FilterSettingsModel,
  GridComponent,
  GroupSettingsModel,
  PageSettingsModel,
  SelectionSettingsModel,
} from '@syncfusion/ej2-react-grids';

import type { AggregateRowConfig, GridConfig } from '@/lib/grid/types';

/** Props for the DataGrid component */
export interface DataGridProps<T extends object> {
  // --- Existing (keep all) ---
  /** Data source for the grid */
  data: T[];
  /** Column definitions */
  columns: ColumnModel[];
  /** Declarative grid configuration (filter, sort, pagination, etc.) */
  gridConfig?: GridConfig;
  /** Enable pagination (default: true) */
  allowPaging?: boolean;
  /** Enable sorting (default: true) */
  allowSorting?: boolean;
  /** Enable filtering (default: false) */
  allowFiltering?: boolean;
  /** Filter settings configuration (type, columns, etc.) */
  filterSettings?: FilterSettingsModel;
  /** Page settings configuration */
  pageSettings?: PageSettingsModel;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for E2E testing */
  testId?: string;
  /** Height of the grid */
  height?: string | number;
  /** Callback when a row is selected */
  onRowSelected?: (data: T) => void;
  /** Callback when a row is deselected */
  onRowDeselected?: (data: T) => void;
  /** Loading state */
  isLoading?: boolean;
  /** Empty state message */
  emptyText?: string;

  // --- Grouping ---
  /** Enable grouping (default: false) */
  allowGrouping?: boolean;
  /** Syncfusion group settings model */
  groupSettings?: GroupSettingsModel;

  // --- Aggregates ---
  /** Aggregate row configurations for footer/group summaries */
  aggregates?: AggregateRowConfig[];

  // --- Selection ---
  /** Syncfusion selection settings model */
  selectionSettings?: SelectionSettingsModel;

  // --- Editing ---
  /** Syncfusion edit settings model */
  editSettings?: EditSettingsModel;
  /** Callback before an action (add, edit, delete, etc.) begins */
  onActionBegin?: (args: unknown) => void;
  /** Callback after an action completes */
  onActionComplete?: (args: unknown) => void;

  // --- Column features ---
  /** Enable column resizing (default: false) */
  allowResizing?: boolean;
  /** Enable column reordering (default: false) */
  allowReordering?: boolean;
  /** Number of frozen columns from the left */
  frozenColumns?: number;
  /** Number of frozen rows from the top */
  frozenRows?: number;
  /** Show column chooser dialog (default: false) */
  showColumnChooser?: boolean;
  /** Show column-level menu (default: false) */
  showColumnMenu?: boolean;

  // --- Toolbar ---
  /** Toolbar items (built-in string names or custom item objects) */
  toolbar?: Array<string | ItemModel>;
  /** Callback when a toolbar item is clicked */
  onToolbarClick?: (args: unknown) => void;

  // --- Context menu ---
  /** Context menu items */
  contextMenuItems?: ContextMenuItem[] | ContextMenuItemModel[];
  /** Callback when a context menu item is clicked */
  onContextMenuClick?: (args: unknown) => void;

  // --- Detail row ---
  /** Template for expandable detail rows */
  detailTemplate?: (data: T) => JSX.Element;
  /** Child grid configuration for hierarchical grids */
  childGrid?: object;

  // --- Row drag and drop ---
  /** Enable row drag and drop (default: false) */
  allowRowDragAndDrop?: boolean;
  /** Settings for row drop target */
  rowDropSettings?: { targetID?: string };
  /** Callback when a row drag begins */
  onRowDrag?: (args: unknown) => void;
  /** Callback when a row is dropped */
  onRowDrop?: (args: unknown) => void;

  // --- Virtualization ---
  /** Enable row virtualization for large datasets */
  enableVirtualization?: boolean;
  /** Enable column virtualization */
  enableColumnVirtualization?: boolean;
  /** Enable infinite scrolling */
  enableInfiniteScrolling?: boolean;

  // --- Clipboard ---
  /** Enable clipboard copy/paste (default: false) */
  enableClipboard?: boolean;

  // --- Search ---
  /** Search settings for global text search */
  searchSettings?: { fields?: string[]; key?: string; ignoreCase?: boolean };

  // --- Print ---
  /** Enable print functionality (default: false) */
  allowPrint?: boolean;

  // --- Export ---
  /** Enable Excel export (default: false) */
  allowExcelExport?: boolean;
  /** Enable PDF export (default: false) */
  allowPdfExport?: boolean;

  // --- Grid ref ---
  /** Ref to access GridComponent for imperative calls (export, print, search) */
  gridRef?: React.MutableRefObject<GridComponent | undefined>;

  // --- Text wrap ---
  /** Enable text wrapping in cells */
  allowTextWrap?: boolean;

  // --- Row height ---
  /** Fixed row height in pixels */
  rowHeight?: number;
}

/**
 * Resolved boolean feature flags used internally to determine
 * which Syncfusion services to inject.
 */
export interface ResolvedGridFeatures {
  paging: boolean;
  sorting: boolean;
  filtering: boolean;
  grouping: boolean;
  hasAggregates: boolean;
  hasSelection: boolean;
  editing: boolean;
  hasCommandColumn: boolean;
  resizing: boolean;
  reordering: boolean;
  freezing: boolean;
  columnChooser: boolean;
  columnMenu: boolean;
  excelExport: boolean;
  pdfExport: boolean;
  hasToolbar: boolean;
  hasContextMenu: boolean;
  detailRow: boolean;
  rowDragDrop: boolean;
  virtualization: boolean;
  infiniteScroll: boolean;
  clipboard: boolean;
  search: boolean;
  print: boolean;
}
