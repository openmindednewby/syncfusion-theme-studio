/**
 * Preset configurations for the Native Grid playground.
 * Each preset is a full snapshot of all settable values in useRawState().
 */
import { GridDensity } from '@/components/ui/shared/GridDensity';

import { CustomComponentType } from '../../../shared/CustomComponentType';
import { DEFAULT_FOOTER_BORDER_WIDTH, DEFAULT_FOOTER_FONT_SIZE, DEFAULT_FOOTER_FONT_WEIGHT, DEFAULT_FOOTER_PADDING } from '../../../shared/footerStyleOptions';
import { PlaygroundPresetId } from '../../../shared/InteractiveControls/PlaygroundPresetId';

export interface NativePresetValues {
  densityStr: string; striped: boolean; hoverable: boolean; compact: boolean;
  selectionType: string; selectionMode: string; checkbox: boolean;
  editMode: string; filterEnabled: boolean; filterType: string;
  paginationMode: string; paginationVariant: string; pageSize: string;
  columnMenu: boolean; groupEnabled: boolean;
  actionsColumn: boolean; actionEdit: boolean; actionDelete: boolean; actionKebab: boolean;
  actionView: boolean; actionExport: boolean; actionArchive: boolean;
  playgroundEditMode: string; customColumn: boolean; customComponentType: string;
  selectionToolbar: boolean; aggregatesEnabled: boolean; aggregateType: string;
  footerBorderWidth: string; footerFontSize: string; footerFontWeight: string; footerPadding: string;
}

const BASE: NativePresetValues = {
  densityStr: GridDensity.Medium, striped: true, hoverable: true, compact: false,
  selectionType: 'None', selectionMode: 'Row', checkbox: false,
  editMode: 'None', filterEnabled: false, filterType: 'Menu',
  paginationMode: 'BuiltIn', paginationVariant: 'default', pageSize: '5',
  columnMenu: false, groupEnabled: false,
  actionsColumn: false, actionEdit: true, actionDelete: true, actionKebab: true,
  actionView: false, actionExport: false, actionArchive: false,
  playgroundEditMode: 'modal', customColumn: false, customComponentType: CustomComponentType.AlertBadge,
  selectionToolbar: false, aggregatesEnabled: false, aggregateType: 'Sum',
  footerBorderWidth: DEFAULT_FOOTER_BORDER_WIDTH, footerFontSize: DEFAULT_FOOTER_FONT_SIZE,
  footerFontWeight: DEFAULT_FOOTER_FONT_WEIGHT, footerPadding: DEFAULT_FOOTER_PADDING,
};

export const NATIVE_PRESETS: Record<string, NativePresetValues> = {
  [PlaygroundPresetId.Default]: { ...BASE },
  [PlaygroundPresetId.BasicReadOnly]: {
    ...BASE,
    filterEnabled: true, columnMenu: true,
    actionsColumn: false, selectionType: 'None',
    striped: true, hoverable: true,
  },
  [PlaygroundPresetId.SimpleCrud]: {
    ...BASE,
    filterEnabled: true,
    actionsColumn: true, actionEdit: true, actionDelete: true, actionKebab: false,
    actionView: false, actionExport: false, actionArchive: false,
    playgroundEditMode: 'modal',
  },
  [PlaygroundPresetId.AdvancedDataTable]: {
    ...BASE,
    groupEnabled: true, aggregatesEnabled: true, columnMenu: true,
    selectionType: 'Multiple', selectionToolbar: true,
    filterEnabled: true, striped: true, hoverable: true,
  },
};
