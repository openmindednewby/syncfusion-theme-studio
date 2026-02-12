/** Shared type definitions for TableNative components */

/** Text alignment options matching Syncfusion convention */
const enum TextAlign {
  Left = 'Left',
  Center = 'Center',
  Right = 'Right',
}

/** Column definition for the table */
interface TableColumn {
  /** Data field key to access from row objects */
  field: string;
  /** Display text for the column header */
  headerText: string;
  /** Column width (number for px, string for any CSS unit) */
  width?: number | string;
  /** Text alignment for the column */
  textAlign?: TextAlign;
  /** Custom formatter for cell values */
  format?: (value: unknown) => string;
}

interface SelectionConfig {
  type?: 'Single' | 'Multiple';
  mode?: 'Row' | 'Cell' | 'Both';
  checkbox?: boolean;
}

interface EditingConfig {
  mode?: 'Normal' | 'Dialog' | 'Batch';
  allowAdding?: boolean;
  allowEditing?: boolean;
  allowDeleting?: boolean;
}

interface GroupingConfig {
  columns?: string[];
  showDropArea?: boolean;
}

export { TextAlign };
export type { TableColumn, SelectionConfig, EditingConfig, GroupingConfig };
