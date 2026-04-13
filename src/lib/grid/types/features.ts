/**
 * Grid feature configuration types for grouping, editing, selection,
 * toolbar, context menu, export, virtualization, and more.
 *
 * These are consumed by GridConfig in the main index barrel.
 */

/** Editing mode for the grid */
const enum EditMode {
  Normal = 'Normal',
  Dialog = 'Dialog',
  Batch = 'Batch',
}

/** Selection type (single or multiple rows/cells) */
const enum SelectionType {
  Single = 'Single',
  Multiple = 'Multiple',
}

/** Selection targeting mode */
const enum SelectionMode {
  Row = 'Row',
  Cell = 'Cell',
  Both = 'Both',
}

/** Checkbox behavior mode */
const enum CheckboxMode {
  Default = 'Default',
  ResetOnRowClick = 'ResetOnRowClick',
}

/** Aggregate function types for footer/group summaries */
const enum AggregateType {
  Sum = 'Sum',
  Average = 'Average',
  Count = 'Count',
  Min = 'Min',
  Max = 'Max',
  TrueCount = 'TrueCount',
  FalseCount = 'FalseCount',
  Custom = 'Custom',
}

/** Toolbar item type identifiers */
const enum ToolbarItemType {
  Search = 'Search',
  Add = 'Add',
  Delete = 'Delete',
  Update = 'Update',
  Cancel = 'Cancel',
  Print = 'Print',
  ExcelExport = 'ExcelExport',
  PdfExport = 'PdfExport',
  CsvExport = 'CsvExport',
  ColumnChooser = 'ColumnChooser',
  Custom = 'Custom',
}

/** Context menu item type identifiers */
const enum ContextMenuItemType {
  AutoFit = 'AutoFit',
  AutoFitAll = 'AutoFitAll',
  SortAscending = 'SortAscending',
  SortDescending = 'SortDescending',
  Group = 'Group',
  Ungroup = 'Ungroup',
  Edit = 'Edit',
  Delete = 'Delete',
  Save = 'Save',
  Cancel = 'Cancel',
  Copy = 'Copy',
  PdfExport = 'PdfExport',
  ExcelExport = 'ExcelExport',
  CsvExport = 'CsvExport',
  Custom = 'Custom',
}

/** Grouping configuration */
interface GroupConfig {
  enabled: boolean;
  columns?: string[];
  showDropArea?: boolean;
  allowReordering?: boolean;
}

/** Single aggregate column definition within a row */
interface AggregateColumnConfig {
  field: string;
  type: AggregateType;
  format?: string;
  customAggregate?: (data: unknown[], field: string) => unknown;
  footerTemplate?: string;
  groupFooterTemplate?: string;
}

/** A row of aggregate columns (footer or group footer) */
interface AggregateRowConfig {
  columns: AggregateColumnConfig[];
}

/** Editing configuration */
interface EditConfig {
  enabled: boolean;
  mode?: EditMode;
  allowAdding?: boolean;
  allowEditing?: boolean;
  allowDeleting?: boolean;
  showConfirmDialog?: boolean;
}

/** Selection configuration */
interface SelectionConfig {
  enabled: boolean;
  type?: SelectionType;
  mode?: SelectionMode;
  checkboxMode?: CheckboxMode;
  enableToggle?: boolean;
}

/** Detail row (expandable row) configuration */
interface DetailRowConfig {
  enabled: boolean;
}

/** A single toolbar item */
interface ToolbarItemConfig {
  type: ToolbarItemType;
  text?: string;
  id?: string;
  prefixIcon?: string;
}

/** Toolbar configuration */
interface GridToolbarConfig {
  enabled: boolean;
  items?: ToolbarItemConfig[];
}

/** A single context menu item */
interface ContextMenuItemConfig {
  type: ContextMenuItemType;
  text?: string;
  id?: string;
  target?: string;
}

/** Context menu configuration */
interface ContextMenuConfig {
  enabled: boolean;
  items?: ContextMenuItemConfig[];
}

/** Export configuration */
interface ExportConfig {
  excel?: boolean;
  pdf?: boolean;
  csv?: boolean;
  fileName?: string;
}

/** Drag and drop configuration */
interface DragDropConfig {
  enabled: boolean;
  allowRowDragAndDrop?: boolean;
  targetId?: string;
}

/** Virtualization configuration for large datasets */
interface VirtualizationConfig {
  enabled: boolean;
  rowHeight?: number;
  enableColumnVirtualization?: boolean;
  bufferCount?: number;
}

/** Infinite scroll configuration */
interface InfiniteScrollConfig {
  enabled: boolean;
  initialBlocks?: number;
  maxBlocks?: number;
}

/** Clipboard (copy/paste) configuration */
interface ClipboardConfig {
  enabled: boolean;
  copyHeader?: boolean;
}

/** Column chooser configuration */
interface ColumnChooserConfig {
  enabled: boolean;
}

/** Column menu configuration */
interface ColumnMenuConfig {
  enabled: boolean;
}

/** Search configuration */
interface SearchConfig {
  enabled: boolean;
  fields?: string[];
  key?: string;
  ignoreCase?: boolean;
}

export { EditMode, SelectionType, SelectionMode, CheckboxMode, AggregateType, ToolbarItemType, ContextMenuItemType };
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
};
