// Component-specific CSS variable injection utilities

import type { ComponentConfigSingle } from '../types';

export function injectHeaderVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  root.style.setProperty('--component-header-background', `rgb(${c.header.background})`);
  root.style.setProperty('--component-header-text-color', `rgb(${c.header.textColor})`);
  root.style.setProperty('--component-header-border-bottom', `rgb(${c.header.borderBottom})`);
  root.style.setProperty('--component-header-height', c.header.height);
}

export function injectSidebarVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  root.style.setProperty('--component-sidebar-background', `rgb(${c.sidebar.background})`);
  root.style.setProperty('--component-sidebar-text-color', `rgb(${c.sidebar.textColor})`);
  root.style.setProperty('--component-sidebar-active-bg', `rgb(${c.sidebar.activeItemBackground})`);
  root.style.setProperty('--component-sidebar-active-text', `rgb(${c.sidebar.activeItemTextColor})`);
  root.style.setProperty('--component-sidebar-hover-bg', `rgb(${c.sidebar.hoverItemBackground})`);
  root.style.setProperty('--component-sidebar-border-right', `rgb(${c.sidebar.borderRight})`);
}

export function injectButtonVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  root.style.setProperty('--component-button-primary-bg', `rgb(${c.buttons.primary.background})`);
  root.style.setProperty('--component-button-primary-bg-hover', `rgb(${c.buttons.primary.backgroundHover})`);
  root.style.setProperty('--component-button-primary-text', `rgb(${c.buttons.primary.textColor})`);
  root.style.setProperty('--component-button-secondary-bg', `rgb(${c.buttons.secondary.background})`);
  root.style.setProperty('--component-button-secondary-bg-hover', `rgb(${c.buttons.secondary.backgroundHover})`);
  root.style.setProperty('--component-button-secondary-text', `rgb(${c.buttons.secondary.textColor})`);
  root.style.setProperty('--component-button-outline-border', `rgb(${c.buttons.outline.borderColor})`);
  root.style.setProperty('--component-button-outline-text', `rgb(${c.buttons.outline.textColor})`);
  root.style.setProperty('--component-button-ghost-text', `rgb(${c.buttons.ghost.textColor})`);
  root.style.setProperty('--component-button-danger-bg', `rgb(${c.buttons.danger.background})`);
  root.style.setProperty('--component-button-danger-text', `rgb(${c.buttons.danger.textColor})`);
}

export function injectInputVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  root.style.setProperty('--component-input-background', `rgb(${c.inputs.background})`);
  root.style.setProperty('--component-input-border-default', `rgb(${c.inputs.borderDefault})`);
  root.style.setProperty('--component-input-border-focus', `rgb(${c.inputs.borderFocus})`);
  root.style.setProperty('--component-input-text-color', `rgb(${c.inputs.textColor})`);
  root.style.setProperty('--component-input-placeholder', `rgb(${c.inputs.placeholderColor})`);
}

export function injectDataGridVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  root.style.setProperty('--component-datagrid-header-bg', `rgb(${c.dataGrid.headerBackground})`);
  root.style.setProperty('--component-datagrid-header-text', `rgb(${c.dataGrid.headerTextColor})`);
  root.style.setProperty('--component-datagrid-row-even', `rgb(${c.dataGrid.rowEvenBackground})`);
  root.style.setProperty('--component-datagrid-row-odd', `rgb(${c.dataGrid.rowOddBackground})`);
  root.style.setProperty('--component-datagrid-row-hover', `rgb(${c.dataGrid.rowHoverBackground})`);
  root.style.setProperty('--component-datagrid-row-selected', `rgb(${c.dataGrid.rowSelectedBackground})`);
}

export function injectCardVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  root.style.setProperty('--component-card-background', `rgb(${c.cards.background})`);
  root.style.setProperty('--component-card-border', `rgb(${c.cards.borderColor})`);
  root.style.setProperty('--component-card-header-bg', `rgb(${c.cards.headerBackground})`);
  root.style.setProperty('--component-card-footer-bg', `rgb(${c.cards.footerBackground})`);
}

export function injectModalVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  root.style.setProperty('--component-modal-backdrop', c.modals.backdropColor);
  root.style.setProperty('--component-modal-content-bg', `rgb(${c.modals.contentBackground})`);
  root.style.setProperty('--component-modal-border', `rgb(${c.modals.borderColor})`);
  root.style.setProperty('--component-modal-header-bg', `rgb(${c.modals.headerBackground})`);
  root.style.setProperty('--component-modal-footer-bg', `rgb(${c.modals.footerBackground})`);
}

export function injectBadgeVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  root.style.setProperty('--component-badge-success-bg', `rgb(${c.badges.success.background})`);
  root.style.setProperty('--component-badge-success-text', `rgb(${c.badges.success.textColor})`);
  root.style.setProperty('--component-badge-warning-bg', `rgb(${c.badges.warning.background})`);
  root.style.setProperty('--component-badge-warning-text', `rgb(${c.badges.warning.textColor})`);
  root.style.setProperty('--component-badge-error-bg', `rgb(${c.badges.error.background})`);
  root.style.setProperty('--component-badge-error-text', `rgb(${c.badges.error.textColor})`);
  root.style.setProperty('--component-badge-info-bg', `rgb(${c.badges.info.background})`);
  root.style.setProperty('--component-badge-info-text', `rgb(${c.badges.info.textColor})`);
}

export function injectSelectVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  root.style.setProperty('--component-select-background', `rgb(${c.select.background})`);
  root.style.setProperty('--component-select-border-default', `rgb(${c.select.borderDefault})`);
  root.style.setProperty('--component-select-border-focus', `rgb(${c.select.borderFocus})`);
  root.style.setProperty('--component-select-text-color', `rgb(${c.select.textColor})`);
  root.style.setProperty('--component-select-icon-color', `rgb(${c.select.iconColor})`);
  root.style.setProperty('--component-select-popup-bg', `rgb(${c.select.popupBackground})`);
  root.style.setProperty('--component-select-popup-border', `rgb(${c.select.popupBorderColor})`);
  root.style.setProperty('--component-select-item-hover', `rgb(${c.select.itemHoverBackground})`);
  root.style.setProperty('--component-select-item-selected-bg', `rgb(${c.select.itemSelectedBackground})`);
  root.style.setProperty('--component-select-item-selected-text', `rgb(${c.select.itemSelectedTextColor})`);
}

export function injectDatePickerVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  root.style.setProperty('--component-datepicker-background', `rgb(${c.datePicker.background})`);
  root.style.setProperty('--component-datepicker-border-default', `rgb(${c.datePicker.borderDefault})`);
  root.style.setProperty('--component-datepicker-border-focus', `rgb(${c.datePicker.borderFocus})`);
  root.style.setProperty('--component-datepicker-text-color', `rgb(${c.datePicker.textColor})`);
  root.style.setProperty('--component-datepicker-icon-color', `rgb(${c.datePicker.iconColor})`);
  root.style.setProperty('--component-datepicker-calendar-bg', `rgb(${c.datePicker.calendarBackground})`);
  root.style.setProperty('--component-datepicker-calendar-header-bg', `rgb(${c.datePicker.calendarHeaderBackground})`);
  root.style.setProperty('--component-datepicker-calendar-header-text', `rgb(${c.datePicker.calendarHeaderTextColor})`);
  root.style.setProperty('--component-datepicker-cell-hover', `rgb(${c.datePicker.calendarCellHoverBackground})`);
  root.style.setProperty('--component-datepicker-selected-bg', `rgb(${c.datePicker.calendarSelectedBackground})`);
  root.style.setProperty('--component-datepicker-selected-text', `rgb(${c.datePicker.calendarSelectedTextColor})`);
  root.style.setProperty('--component-datepicker-today-border', `rgb(${c.datePicker.calendarTodayBorderColor})`);
  root.style.setProperty('--component-datepicker-other-month-text', `rgb(${c.datePicker.calendarOtherMonthTextColor})`);
}

export function injectDialogVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  root.style.setProperty('--component-dialog-backdrop', c.dialog.backdropColor);
  root.style.setProperty('--component-dialog-content-bg', `rgb(${c.dialog.contentBackground})`);
  root.style.setProperty('--component-dialog-border', `rgb(${c.dialog.borderColor})`);
  root.style.setProperty('--component-dialog-header-bg', `rgb(${c.dialog.headerBackground})`);
  root.style.setProperty('--component-dialog-header-text', `rgb(${c.dialog.headerTextColor})`);
  root.style.setProperty('--component-dialog-footer-bg', `rgb(${c.dialog.footerBackground})`);
  root.style.setProperty('--component-dialog-close-btn-color', `rgb(${c.dialog.closeButtonColor})`);
  root.style.setProperty('--component-dialog-close-btn-hover-bg', `rgb(${c.dialog.closeButtonHoverBackground})`);
}

export function injectComponentVariables(root: HTMLElement, components: ComponentConfigSingle): void {
  injectHeaderVariables(root, components);
  injectSidebarVariables(root, components);
  injectButtonVariables(root, components);
  injectInputVariables(root, components);
  injectDataGridVariables(root, components);
  injectCardVariables(root, components);
  injectModalVariables(root, components);
  injectBadgeVariables(root, components);
  injectSelectVariables(root, components);
  injectDatePickerVariables(root, components);
  injectDialogVariables(root, components);
}
