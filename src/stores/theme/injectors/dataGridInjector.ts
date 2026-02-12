// DataGrid-specific CSS variable injection

import type { ComponentConfigSingle } from '../types';

function injectDataGridCoreVars(root: HTMLElement, c: ComponentConfigSingle): void {
  const dg = c.dataGrid;
  root.style.setProperty('--component-datagrid-header-bg', `rgb(${dg.headerBackground})`);
  root.style.setProperty('--component-datagrid-header-text', `rgb(${dg.headerTextColor})`);
  root.style.setProperty('--component-datagrid-header-border', `rgb(${dg.headerBorder})`);
  root.style.setProperty('--component-datagrid-row-even', `rgb(${dg.rowEvenBackground})`);
  root.style.setProperty('--component-datagrid-row-odd', `rgb(${dg.rowOddBackground})`);
  root.style.setProperty('--component-datagrid-row-hover', `rgb(${dg.rowHoverBackground})`);
  root.style.setProperty('--component-datagrid-row-selected', `rgb(${dg.rowSelectedBackground})`);
  root.style.setProperty('--component-datagrid-cell-border', `rgb(${dg.cellBorderColor})`);
  root.style.setProperty('--component-datagrid-cell-padding', dg.cellPadding);
  root.style.setProperty('--component-datagrid-pagination-bg', `rgb(${dg.paginationBackground})`);
  root.style.setProperty('--component-datagrid-pagination-border', `rgb(${dg.paginationBorderColor})`);
}

function injectDataGridFeatureVars(root: HTMLElement, c: ComponentConfigSingle): void {
  const dg = c.dataGrid;
  root.style.setProperty('--component-datagrid-toolbar-bg', `rgb(${dg.toolbarBackground})`);
  root.style.setProperty('--component-datagrid-toolbar-text', `rgb(${dg.toolbarTextColor})`);
  root.style.setProperty('--component-datagrid-toolbar-border', `rgb(${dg.toolbarBorderColor})`);
  root.style.setProperty('--component-datagrid-filter-bg', `rgb(${dg.filterRowBackground})`);
  root.style.setProperty('--component-datagrid-filter-border', `rgb(${dg.filterRowBorderColor})`);
  root.style.setProperty('--component-datagrid-filter-input-bg', `rgb(${dg.filterInputBackground})`);
  root.style.setProperty('--component-datagrid-group-header-bg', `rgb(${dg.groupHeaderBackground})`);
  root.style.setProperty('--component-datagrid-group-header-text', `rgb(${dg.groupHeaderTextColor})`);
  root.style.setProperty('--component-datagrid-group-drop-bg', `rgb(${dg.groupDropAreaBackground})`);
  root.style.setProperty('--component-datagrid-footer-bg', `rgb(${dg.footerBackground})`);
  root.style.setProperty('--component-datagrid-footer-text', `rgb(${dg.footerTextColor})`);
  root.style.setProperty('--component-datagrid-edit-cell-bg', `rgb(${dg.editCellBackground})`);
  root.style.setProperty('--component-datagrid-edit-cell-border', `rgb(${dg.editCellBorderColor})`);
  root.style.setProperty('--component-datagrid-edit-dirty', `rgb(${dg.editDirtyIndicatorColor})`);
  root.style.setProperty('--component-datagrid-row-selected-text', `rgb(${dg.rowSelectedTextColor})`);
  root.style.setProperty('--component-datagrid-cell-selected-bg', `rgb(${dg.cellSelectedBackground})`);
  root.style.setProperty('--component-datagrid-sort-icon', `rgb(${dg.sortIconColor})`);
  root.style.setProperty('--component-datagrid-resize-handle', `rgb(${dg.resizeHandleColor})`);
}

function injectDataGridPaginationVars(root: HTMLElement, c: ComponentConfigSingle): void {
  const dg = c.dataGrid;
  root.style.setProperty('--component-datagrid-pagination-text', `rgb(${dg.paginationTextColor})`);
  root.style.setProperty('--component-datagrid-pagination-active-bg', `rgb(${dg.paginationActiveBackground})`);
  root.style.setProperty('--component-datagrid-pagination-active-text', `rgb(${dg.paginationActiveTextColor})`);
  root.style.setProperty('--component-datagrid-pagination-hover-bg', `rgb(${dg.paginationHoverBackground})`);
  root.style.setProperty('--component-datagrid-pagination-nav-color', `rgb(${dg.paginationNavColor})`);
  root.style.setProperty('--component-datagrid-pagination-nav-disabled', `rgb(${dg.paginationNavDisabledColor})`);
  root.style.setProperty('--component-datagrid-pagination-info-text', `rgb(${dg.paginationInfoTextColor})`);
  root.style.setProperty('--component-datagrid-action-btn', `rgb(${dg.actionButtonColor})`);
  root.style.setProperty('--component-datagrid-action-btn-hover', `rgb(${dg.actionButtonHoverColor})`);
  root.style.setProperty('--component-datagrid-detail-row-bg', `rgb(${dg.detailRowBackground})`);
  root.style.setProperty('--component-datagrid-drag-handle', `rgb(${dg.dragHandleColor})`);
  root.style.setProperty('--component-datagrid-default-text-align', dg.defaultTextAlign);
  root.style.setProperty('--component-datagrid-header-text-align', dg.headerTextAlign);
  root.style.setProperty('--component-datagrid-row-height', dg.rowHeight);
}

export function injectDataGridVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  injectDataGridCoreVars(root, c);
  injectDataGridFeatureVars(root, c);
  injectDataGridPaginationVars(root, c);
}
