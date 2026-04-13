/**
 * Option arrays for the Syncfusion Grid playground controls.
 */
import { GridDensity } from '@/components/ui/shared/GridDensity';

import { CustomComponentType } from '../../../shared/CustomComponentType';
import { PlaygroundPresetId } from '../../../shared/InteractiveControls/PlaygroundPresetId';

import type { ControlOption } from '../../../shared/InteractiveControls';

export const DENSITY_OPTIONS: ControlOption[] = [
  { value: GridDensity.Low, label: 'Low' },
  { value: GridDensity.Medium, label: 'Medium' },
  { value: GridDensity.High, label: 'High' },
];

export const ROW_HEIGHT_OPTIONS: ControlOption[] = [
  { value: '32', label: '32px (High)' },
  { value: '40', label: '40px (Medium)' },
  { value: '48', label: '48px (Low)' },
];

export const SELECTION_TYPE_OPTIONS: ControlOption[] = [
  { value: 'None', label: 'None' },
  { value: 'Single', label: 'Single' },
  { value: 'Multiple', label: 'Multiple' },
];

export const SELECTION_MODE_OPTIONS: ControlOption[] = [
  { value: 'Row', label: 'Row' },
  { value: 'Cell', label: 'Cell' },
  { value: 'Both', label: 'Both' },
];

export const PAGE_SIZE_OPTIONS: ControlOption[] = [
  { value: '5', label: '5' },
  { value: '10', label: '10' },
  { value: '20', label: '20' },
];

export const PAGINATION_MODE_OPTIONS: ControlOption[] = [
  { value: 'None', label: 'None' },
  { value: 'BuiltIn', label: 'Built-in' },
  { value: 'NativePagination', label: 'NativePagination' },
];

export const PLAYGROUND_EDIT_MODE_OPTIONS: ControlOption[] = [
  { value: 'modal', label: 'Modal' },
  { value: 'inline', label: 'Inline' },
];

export const PAGINATION_VARIANT_OPTIONS: ControlOption[] = [
  { value: 'default', label: 'Default' },
  { value: 'noPageSize', label: 'NoPageSize' },
  { value: 'compact', label: 'Compact' },
];

export const CUSTOM_COMPONENT_OPTIONS: ControlOption[] = [
  { value: CustomComponentType.AlertBadge, label: 'AlertBadge' },
  { value: CustomComponentType.Tag, label: 'Tag' },
  { value: CustomComponentType.ProgressBar, label: 'ProgressBar' },
];

export const FROZEN_COLUMNS_OPTIONS: ControlOption[] = [
  { value: '0', label: '0' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
];

export const AGGREGATE_TYPE_OPTIONS: ControlOption[] = [
  { value: 'Sum', label: 'Sum' },
  { value: 'Average', label: 'Average' },
  { value: 'Count', label: 'Count' },
  { value: 'Min', label: 'Min' },
  { value: 'Max', label: 'Max' },
];

export const PRESET_OPTIONS: ControlOption[] = [
  { value: PlaygroundPresetId.Default, label: 'Default' },
  { value: PlaygroundPresetId.BasicReadOnly, label: 'Basic Read-Only' },
  { value: PlaygroundPresetId.SimpleCrud, label: 'Simple CRUD' },
  { value: PlaygroundPresetId.AdvancedDataTable, label: 'Advanced Data Table' },
];

export { FOOTER_BORDER_WIDTH_OPTIONS, FOOTER_FONT_SIZE_OPTIONS, FOOTER_FONT_WEIGHT_OPTIONS, FOOTER_PADDING_OPTIONS } from '../../../shared/footerStyleOptions';
