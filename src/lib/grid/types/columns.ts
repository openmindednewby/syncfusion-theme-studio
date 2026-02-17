/**
 * Unified GridColumn interface consumed by both Syncfusion DataGrid and
 * native TableNative, plus adapter functions to convert to each format.
 */

/* eslint-disable @typescript-eslint/consistent-type-assertions -- Required for Syncfusion ColumnModel bridging */

import type { ColumnModel } from '@syncfusion/ej2-grids';

import { isValueDefined } from '@/utils/is';

/** Column data type */
const enum GridColumnType {
  String = 'string',
  Number = 'number',
  Boolean = 'boolean',
  Date = 'date',
  DateTime = 'dateTime',
  CheckBox = 'checkBox',
}

/** Edit input type for inline/dialog editing */
const enum GridEditType {
  Default = 'defaultEdit',
  DropDown = 'dropDownEdit',
  Boolean = 'booleanEdit',
  DatePicker = 'datePickerEdit',
  DateTimePicker = 'dateTimePickerEdit',
  Numeric = 'numericEdit',
}

/** Command button definition for action columns */
interface GridColumnCommand {
  type: 'Edit' | 'Delete' | 'Save' | 'Cancel' | 'Custom';
  buttonOption?: { content?: string; cssClass?: string };
}

/** Freeze position for pinned columns */
const enum FreezeDirection {
  Left = 'Left',
  Right = 'Right',
  Fixed = 'Fixed',
  None = 'None',
}

/** Text overflow behavior */
const enum ClipMode {
  Clip = 'Clip',
  Ellipsis = 'Ellipsis',
  EllipsisWithTooltip = 'EllipsisWithTooltip',
}

/** Text alignment */
const enum TextAlign {
  Left = 'Left',
  Center = 'Center',
  Right = 'Right',
}

/** Unified column definition for both grid implementations */
interface GridColumn {
  field: string;
  headerText: string;
  width?: number | string;
  minWidth?: number;
  maxWidth?: number;
  textAlign?: TextAlign;
  type?: GridColumnType;
  format?: string | ((value: unknown) => string);
  visible?: boolean;
  allowSorting?: boolean;
  allowFiltering?: boolean;
  allowGrouping?: boolean;
  allowEditing?: boolean;
  allowResizing?: boolean;
  allowReordering?: boolean;
  isPrimaryKey?: boolean;
  defaultValue?: unknown;
  editType?: GridEditType;
  validationRules?: Record<string, unknown>;
  template?: (data: Record<string, unknown>) => JSX.Element;
  headerTemplate?: () => JSX.Element;
  commands?: GridColumnCommand[];
  freeze?: FreezeDirection;
  clipMode?: ClipMode;
  customAttributes?: Record<string, string>;
}

/** Native table column format (simplified subset) */
interface NativeTableColumn {
  field: string;
  headerText: string;
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  textAlign?: TextAlign;
  format?: (value: unknown) => string;
}

/**
 * Strip undefined values from an object so that
 * exactOptionalPropertyTypes is satisfied when spreading.
 */
function defined<T extends Record<string, unknown>>(obj: T): Partial<T> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj))
    if (isValueDefined(value)) result[key] = value;

  return result as Partial<T>;
}

/** Build scalar properties for the Syncfusion model */
function buildSyncfusionScalarProps(col: GridColumn): Record<string, unknown> {
  return defined({
    width: col.width,
    minWidth: col.minWidth,
    maxWidth: col.maxWidth,
    textAlign: col.textAlign,
    type: col.type as string | undefined,
    visible: col.visible,
    allowSorting: col.allowSorting,
    allowFiltering: col.allowFiltering,
    allowGrouping: col.allowGrouping,
    allowEditing: col.allowEditing,
    allowResizing: col.allowResizing,
    allowReordering: col.allowReordering,
    isPrimaryKey: col.isPrimaryKey,
    editType: col.editType as string | undefined,
    validationRules: col.validationRules,
    customAttributes: col.customAttributes,
  });
}

/** Build complex/template properties that need type bridging */
function buildSyncfusionComplexProps(col: GridColumn): Record<string, unknown> {
  return defined({
    defaultValue: col.defaultValue,
    freeze: col.freeze,
    clipMode: col.clipMode,
    template: col.template,
    headerTemplate: col.headerTemplate,
    commands: col.commands,
    format: typeof col.format === 'string' ? col.format : undefined,
    formatter: typeof col.format === 'function' ? col.format : undefined,
  });
}

/** Convert a unified GridColumn to a Syncfusion ColumnModel */
function gridColumnToSyncfusion(col: GridColumn): ColumnModel {
  return {
    field: col.field,
    headerText: col.headerText,
    ...buildSyncfusionScalarProps(col),
    ...buildSyncfusionComplexProps(col),
  } as ColumnModel;
}

/** Convert a unified GridColumn to the native TableColumn format */
function gridColumnToNative(col: GridColumn): NativeTableColumn {
  return {
    field: col.field,
    headerText: col.headerText,
    ...defined({
      width: col.width,
      minWidth: col.minWidth,
      maxWidth: col.maxWidth,
      textAlign: col.textAlign,
    }),
    ...(typeof col.format === 'function' ? { format: col.format } : {}),
  };
}

export { GridColumnType, GridEditType, FreezeDirection, ClipMode, TextAlign, gridColumnToSyncfusion, gridColumnToNative };
export type {
  GridColumn,
  GridColumnCommand,
  NativeTableColumn,
};
