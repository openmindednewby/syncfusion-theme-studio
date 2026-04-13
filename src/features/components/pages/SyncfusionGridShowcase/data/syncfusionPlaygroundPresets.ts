/**
 * Preset configurations for the Syncfusion Grid playground.
 * Each preset is a full snapshot of all settable values in useRawState().
 */
import { GridDensity } from '@/components/ui/shared/GridDensity';

import { CustomComponentType } from '../../../shared/CustomComponentType';
import { DEFAULT_FOOTER_BORDER_WIDTH, DEFAULT_FOOTER_FONT_SIZE, DEFAULT_FOOTER_FONT_WEIGHT, DEFAULT_FOOTER_PADDING } from '../../../shared/footerStyleOptions';
import { PlaygroundPresetId } from '../../../shared/InteractiveControls/PlaygroundPresetId';

export interface SyncfusionPresetValues {
  densityStr: string; isLoading: boolean; rowHeight: string;
  paginationMode: string; paginationVariant: string; pageSize: string;
  selectionType: string; selectionMode: string; checkboxOnly: boolean;
  sorting: boolean; filtering: boolean; grouping: boolean;
  resizing: boolean; reordering: boolean; columnChooser: boolean; columnMenu: boolean;
  frozenColumns: string; virtualization: boolean; clipboard: boolean; textWrap: boolean;
  actionsColumn: boolean; actionEdit: boolean; actionDelete: boolean; actionKebab: boolean;
  actionView: boolean; actionExport: boolean; actionArchive: boolean;
  playgroundEditMode: string; customColumn: boolean; customComponentType: string;
  selectionToolbar: boolean; aggregatesEnabled: boolean; aggregateType: string;
  footerBorderWidth: string; footerFontSize: string; footerFontWeight: string; footerPadding: string;
}

const BASE: SyncfusionPresetValues = {
  densityStr: GridDensity.Medium, isLoading: false, rowHeight: '40',
  paginationMode: 'BuiltIn', paginationVariant: 'default', pageSize: '5',
  selectionType: 'None', selectionMode: 'Row', checkboxOnly: false,
  sorting: true, filtering: true, grouping: false,
  resizing: true, reordering: true, columnChooser: false, columnMenu: true,
  frozenColumns: '0', virtualization: false, clipboard: false, textWrap: false,
  actionsColumn: false, actionEdit: true, actionDelete: true, actionKebab: true,
  actionView: false, actionExport: false, actionArchive: false,
  playgroundEditMode: 'modal', customColumn: false, customComponentType: CustomComponentType.AlertBadge,
  selectionToolbar: false, aggregatesEnabled: false, aggregateType: 'Sum',
  footerBorderWidth: DEFAULT_FOOTER_BORDER_WIDTH, footerFontSize: DEFAULT_FOOTER_FONT_SIZE,
  footerFontWeight: DEFAULT_FOOTER_FONT_WEIGHT, footerPadding: DEFAULT_FOOTER_PADDING,
};

export const SYNCFUSION_PRESETS: Record<string, SyncfusionPresetValues> = {
  [PlaygroundPresetId.Default]: { ...BASE },
  [PlaygroundPresetId.BasicReadOnly]: {
    ...BASE,
    sorting: true, filtering: true, columnMenu: true,
    actionsColumn: false, selectionType: 'None',
    resizing: true, reordering: true,
  },
  [PlaygroundPresetId.SimpleCrud]: {
    ...BASE,
    sorting: true, filtering: true,
    actionsColumn: true, actionEdit: true, actionDelete: true, actionKebab: false,
    actionView: false, actionExport: false, actionArchive: false,
    playgroundEditMode: 'modal',
  },
  [PlaygroundPresetId.AdvancedDataTable]: {
    ...BASE,
    grouping: true, aggregatesEnabled: true, columnMenu: true,
    selectionType: 'Multiple', selectionToolbar: true,
    sorting: true, filtering: true, resizing: true, reordering: true,
  },
};
