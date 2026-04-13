/**
 * Mapping from DataGridConfig field names to CSS variable names and value formats.
 * Used by both `dataGridInjector.ts` and `useGridStyleOverrides` hook.
 */

export const enum VarFormat {
  Rgb = 'rgb',
  Raw = 'raw',
}

interface CssVarEntry {
  readonly varName: string;
  readonly format: VarFormat;
}

type DataGridCssVarMap = Record<string, CssVarEntry>;

export const DATA_GRID_CSS_VAR_MAP: DataGridCssVarMap = {
  // Core
  headerBackground: { varName: '--component-datagrid-header-bg', format: VarFormat.Rgb },
  headerTextColor: { varName: '--component-datagrid-header-text', format: VarFormat.Rgb },
  headerBorder: { varName: '--component-datagrid-header-border', format: VarFormat.Rgb },
  rowEvenBackground: { varName: '--component-datagrid-row-even', format: VarFormat.Rgb },
  rowOddBackground: { varName: '--component-datagrid-row-odd', format: VarFormat.Rgb },
  rowHoverBackground: { varName: '--component-datagrid-row-hover', format: VarFormat.Rgb },
  rowSelectedBackground: { varName: '--component-datagrid-row-selected', format: VarFormat.Rgb },
  cellBorderColor: { varName: '--component-datagrid-cell-border', format: VarFormat.Rgb },
  cellPadding: { varName: '--component-datagrid-cell-padding', format: VarFormat.Raw },
  paginationBackground: { varName: '--component-datagrid-pagination-bg', format: VarFormat.Rgb },
  paginationBorderColor: { varName: '--component-datagrid-pagination-border', format: VarFormat.Rgb },

  // Feature
  toolbarBackground: { varName: '--component-datagrid-toolbar-bg', format: VarFormat.Rgb },
  toolbarTextColor: { varName: '--component-datagrid-toolbar-text', format: VarFormat.Rgb },
  toolbarBorderColor: { varName: '--component-datagrid-toolbar-border', format: VarFormat.Rgb },
  filterRowBackground: { varName: '--component-datagrid-filter-bg', format: VarFormat.Rgb },
  filterRowBorderColor: { varName: '--component-datagrid-filter-border', format: VarFormat.Rgb },
  filterInputBackground: { varName: '--component-datagrid-filter-input-bg', format: VarFormat.Rgb },
  groupHeaderBackground: { varName: '--component-datagrid-group-header-bg', format: VarFormat.Rgb },
  groupHeaderTextColor: { varName: '--component-datagrid-group-header-text', format: VarFormat.Rgb },
  groupDropAreaBackground: { varName: '--component-datagrid-group-drop-bg', format: VarFormat.Rgb },
  groupDropAreaTextColor: { varName: '--component-datagrid-group-drop-text', format: VarFormat.Rgb },
  groupDropAreaBorderColor: { varName: '--component-datagrid-group-drop-border', format: VarFormat.Rgb },
  groupChipBackground: { varName: '--component-datagrid-group-chip-bg', format: VarFormat.Rgb },
  groupChipTextColor: { varName: '--component-datagrid-group-chip-text', format: VarFormat.Rgb },
  footerBackground: { varName: '--component-datagrid-footer-bg', format: VarFormat.Rgb },
  footerTextColor: { varName: '--component-datagrid-footer-text', format: VarFormat.Rgb },
  footerBorderWidth: { varName: '--component-datagrid-footer-border-width', format: VarFormat.Raw },
  footerFontSize: { varName: '--component-datagrid-footer-font-size', format: VarFormat.Raw },
  footerFontWeight: { varName: '--component-datagrid-footer-font-weight', format: VarFormat.Raw },
  footerPadding: { varName: '--component-datagrid-footer-padding', format: VarFormat.Raw },
  editCellBackground: { varName: '--component-datagrid-edit-cell-bg', format: VarFormat.Rgb },
  editCellBorderColor: { varName: '--component-datagrid-edit-cell-border', format: VarFormat.Rgb },
  editDirtyIndicatorColor: { varName: '--component-datagrid-edit-dirty', format: VarFormat.Rgb },
  rowSelectedTextColor: { varName: '--component-datagrid-row-selected-text', format: VarFormat.Rgb },
  cellSelectedBackground: { varName: '--component-datagrid-cell-selected-bg', format: VarFormat.Rgb },
  sortIconColor: { varName: '--component-datagrid-sort-icon', format: VarFormat.Rgb },
  resizeHandleColor: { varName: '--component-datagrid-resize-handle', format: VarFormat.Rgb },

  // Pagination
  paginationTextColor: { varName: '--component-datagrid-pagination-text', format: VarFormat.Rgb },
  paginationActiveBackground: { varName: '--component-datagrid-pagination-active-bg', format: VarFormat.Rgb },
  paginationActiveTextColor: { varName: '--component-datagrid-pagination-active-text', format: VarFormat.Rgb },
  paginationHoverBackground: { varName: '--component-datagrid-pagination-hover-bg', format: VarFormat.Rgb },
  pagerContainerBorderColor: { varName: '--component-datagrid-pager-container-border', format: VarFormat.Rgb },
  paginationNavColor: { varName: '--component-datagrid-pagination-nav-color', format: VarFormat.Rgb },
  paginationNavDisabledColor: { varName: '--component-datagrid-pagination-nav-disabled', format: VarFormat.Rgb },
  paginationInfoTextColor: { varName: '--component-datagrid-pagination-info-text', format: VarFormat.Rgb },
  actionButtonColor: { varName: '--component-datagrid-action-btn', format: VarFormat.Rgb },
  actionButtonHoverColor: { varName: '--component-datagrid-action-btn-hover', format: VarFormat.Rgb },
  detailRowBackground: { varName: '--component-datagrid-detail-row-bg', format: VarFormat.Rgb },
  dragHandleColor: { varName: '--component-datagrid-drag-handle', format: VarFormat.Rgb },
  defaultTextAlign: { varName: '--component-datagrid-default-text-align', format: VarFormat.Raw },
  headerTextAlign: { varName: '--component-datagrid-header-text-align', format: VarFormat.Raw },
  headerTextPadding: { varName: '--component-datagrid-header-text-padding', format: VarFormat.Raw },
  defaultVerticalAlign: { varName: '--component-datagrid-default-vertical-align', format: VarFormat.Raw },
  headerVerticalAlign: { varName: '--component-datagrid-header-vertical-align', format: VarFormat.Raw },
  rowHeight: { varName: '--component-datagrid-row-height', format: VarFormat.Raw },
  headerTextTransform: { varName: '--component-datagrid-header-transform', format: VarFormat.Raw },
  headerFontSize: { varName: '--component-datagrid-header-font-size', format: VarFormat.Raw },
  headerFontWeight: { varName: '--component-datagrid-header-font-weight', format: VarFormat.Raw },
  headerLetterSpacing: { varName: '--component-datagrid-header-letter-spacing', format: VarFormat.Raw },

  // Column menu
  columnMenuBackground: { varName: '--component-datagrid-colmenu-bg', format: VarFormat.Rgb },
  columnMenuTextColor: { varName: '--component-datagrid-colmenu-text', format: VarFormat.Rgb },
  columnMenuBorderColor: { varName: '--component-datagrid-colmenu-border', format: VarFormat.Rgb },
  columnMenuHoverBackground: { varName: '--component-datagrid-colmenu-hover', format: VarFormat.Rgb },
  columnMenuSeparatorColor: { varName: '--component-datagrid-colmenu-separator', format: VarFormat.Rgb },
  columnMenuTriggerColor: { varName: '--component-datagrid-colmenu-trigger', format: VarFormat.Rgb },
  columnMenuTriggerHoverColor: { varName: '--component-datagrid-colmenu-trigger-hover', format: VarFormat.Rgb },

  // Selection bar
  selectionBarBackground: { varName: '--component-datagrid-selbar-bg', format: VarFormat.Rgb },
  selectionBarChipBackground: { varName: '--component-datagrid-selbar-chip-bg', format: VarFormat.Rgb },
  selectionBarChipTextColor: { varName: '--component-datagrid-selbar-chip-text', format: VarFormat.Rgb },
  selectionBarClearBackground: { varName: '--component-datagrid-selbar-clear-bg', format: VarFormat.Rgb },
  selectionBarClearTextColor: { varName: '--component-datagrid-selbar-clear-text', format: VarFormat.Rgb },

  // Radio selection
  radioColor: { varName: '--component-datagrid-radio-color', format: VarFormat.Rgb },
} as const;
