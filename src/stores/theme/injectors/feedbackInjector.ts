// Feedback component CSS variable injection utilities

import type { ComponentConfigSingle } from '../types';

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

export function injectErrorMessageVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  root.style.setProperty('--component-error-msg-text-color', `rgb(${c.errorMessages.textColor})`);
  root.style.setProperty('--component-error-msg-font-size', c.errorMessages.fontSize);
  root.style.setProperty('--component-error-msg-font-weight', c.errorMessages.fontWeight);
  root.style.setProperty('--component-error-msg-animation', c.errorMessages.animation);
  root.style.setProperty('--component-error-msg-animation-duration', c.errorMessages.animationDuration);
  root.style.setProperty('--component-error-msg-icon-color', `rgb(${c.errorMessages.iconColor})`);
  root.style.setProperty('--component-error-msg-icon-size', c.errorMessages.iconSize);
}

export function injectFlexBoxVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  root.style.setProperty('--component-flexbox-container-bg', `rgb(${c.flexBox.containerBackground})`);
  root.style.setProperty('--component-flexbox-container-border', `rgb(${c.flexBox.containerBorderColor})`);
  root.style.setProperty('--component-flexbox-container-radius', c.flexBox.containerBorderRadius);
  root.style.setProperty('--component-flexbox-container-padding', c.flexBox.containerPadding);
  root.style.setProperty('--component-flexbox-gap', c.flexBox.gap);
  root.style.setProperty('--component-flexbox-direction', c.flexBox.direction);
  root.style.setProperty('--component-flexbox-wrap', c.flexBox.wrap);
  root.style.setProperty('--component-flexbox-justify', c.flexBox.justifyContent);
  root.style.setProperty('--component-flexbox-align', c.flexBox.alignItems);
  root.style.setProperty('--component-flexbox-item-bg', `rgb(${c.flexBox.itemBackground})`);
  root.style.setProperty('--component-flexbox-item-border', `rgb(${c.flexBox.itemBorderColor})`);
  root.style.setProperty('--component-flexbox-item-radius', c.flexBox.itemBorderRadius);
  root.style.setProperty('--component-flexbox-item-padding', c.flexBox.itemPadding);
}

export function injectAlertVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  root.style.setProperty('--component-alert-success-bg', `rgb(${c.alerts.success.background})`);
  root.style.setProperty('--component-alert-success-text', `rgb(${c.alerts.success.textColor})`);
  root.style.setProperty('--component-alert-success-border', `rgb(${c.alerts.success.borderColor})`);
  root.style.setProperty('--component-alert-success-icon', `rgb(${c.alerts.success.iconColor})`);
  root.style.setProperty('--component-alert-warning-bg', `rgb(${c.alerts.warning.background})`);
  root.style.setProperty('--component-alert-warning-text', `rgb(${c.alerts.warning.textColor})`);
  root.style.setProperty('--component-alert-warning-border', `rgb(${c.alerts.warning.borderColor})`);
  root.style.setProperty('--component-alert-warning-icon', `rgb(${c.alerts.warning.iconColor})`);
  root.style.setProperty('--component-alert-error-bg', `rgb(${c.alerts.error.background})`);
  root.style.setProperty('--component-alert-error-text', `rgb(${c.alerts.error.textColor})`);
  root.style.setProperty('--component-alert-error-border', `rgb(${c.alerts.error.borderColor})`);
  root.style.setProperty('--component-alert-error-icon', `rgb(${c.alerts.error.iconColor})`);
  root.style.setProperty('--component-alert-info-bg', `rgb(${c.alerts.info.background})`);
  root.style.setProperty('--component-alert-info-text', `rgb(${c.alerts.info.textColor})`);
  root.style.setProperty('--component-alert-info-border', `rgb(${c.alerts.info.borderColor})`);
  root.style.setProperty('--component-alert-info-icon', `rgb(${c.alerts.info.iconColor})`);
  root.style.setProperty('--component-alert-border-radius', `var(--radius-${c.alerts.borderRadius})`);
  root.style.setProperty('--component-alert-border-width', c.alerts.borderWidth);
  root.style.setProperty('--component-alert-padding', c.alerts.padding);
}

export function injectToastVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  root.style.setProperty('--component-toast-bg', `rgb(${c.toast.background})`);
  root.style.setProperty('--component-toast-text', `rgb(${c.toast.textColor})`);
  root.style.setProperty('--component-toast-title', `rgb(${c.toast.titleColor})`);
  root.style.setProperty('--component-toast-border', `rgb(${c.toast.borderColor})`);
  root.style.setProperty('--component-toast-border-radius', `var(--radius-${c.toast.borderRadius})`);
  root.style.setProperty('--component-toast-shadow', c.toast.shadow);
  root.style.setProperty('--component-toast-close-btn', `rgb(${c.toast.closeButtonColor})`);
  root.style.setProperty('--component-toast-close-btn-hover', `rgb(${c.toast.closeButtonHoverColor})`);
  root.style.setProperty('--component-toast-progress', `rgb(${c.toast.progressBarColor})`);
  root.style.setProperty('--component-toast-success-bg', `rgb(${c.toast.successBackground})`);
  root.style.setProperty('--component-toast-success-text', `rgb(${c.toast.successTextColor})`);
  root.style.setProperty('--component-toast-success-icon', `rgb(${c.toast.successIconColor})`);
  root.style.setProperty('--component-toast-warning-bg', `rgb(${c.toast.warningBackground})`);
  root.style.setProperty('--component-toast-warning-text', `rgb(${c.toast.warningTextColor})`);
  root.style.setProperty('--component-toast-warning-icon', `rgb(${c.toast.warningIconColor})`);
  root.style.setProperty('--component-toast-error-bg', `rgb(${c.toast.errorBackground})`);
  root.style.setProperty('--component-toast-error-text', `rgb(${c.toast.errorTextColor})`);
  root.style.setProperty('--component-toast-error-icon', `rgb(${c.toast.errorIconColor})`);
  root.style.setProperty('--component-toast-info-bg', `rgb(${c.toast.infoBackground})`);
  root.style.setProperty('--component-toast-info-text', `rgb(${c.toast.infoTextColor})`);
  root.style.setProperty('--component-toast-info-icon', `rgb(${c.toast.infoIconColor})`);
}

export function injectChipVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  root.style.setProperty('--component-chip-bg', `rgb(${c.chips.background})`);
  root.style.setProperty('--component-chip-text', `rgb(${c.chips.textColor})`);
  root.style.setProperty('--component-chip-border', `rgb(${c.chips.borderColor})`);
  root.style.setProperty('--component-chip-border-radius', `var(--radius-${c.chips.borderRadius})`);
  root.style.setProperty('--component-chip-hover-bg', `rgb(${c.chips.hoverBackground})`);
  root.style.setProperty('--component-chip-hover-text', `rgb(${c.chips.hoverTextColor})`);
  root.style.setProperty('--component-chip-primary-bg', `rgb(${c.chips.primaryBackground})`);
  root.style.setProperty('--component-chip-primary-text', `rgb(${c.chips.primaryTextColor})`);
  root.style.setProperty('--component-chip-primary-border', `rgb(${c.chips.primaryBorderColor})`);
  root.style.setProperty('--component-chip-success-bg', `rgb(${c.chips.successBackground})`);
  root.style.setProperty('--component-chip-success-text', `rgb(${c.chips.successTextColor})`);
  root.style.setProperty('--component-chip-success-border', `rgb(${c.chips.successBorderColor})`);
  root.style.setProperty('--component-chip-warning-bg', `rgb(${c.chips.warningBackground})`);
  root.style.setProperty('--component-chip-warning-text', `rgb(${c.chips.warningTextColor})`);
  root.style.setProperty('--component-chip-warning-border', `rgb(${c.chips.warningBorderColor})`);
  root.style.setProperty('--component-chip-danger-bg', `rgb(${c.chips.dangerBackground})`);
  root.style.setProperty('--component-chip-danger-text', `rgb(${c.chips.dangerTextColor})`);
  root.style.setProperty('--component-chip-danger-border', `rgb(${c.chips.dangerBorderColor})`);
}

export function injectMessageVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  root.style.setProperty('--component-message-border-radius', `var(--radius-${c.message.borderRadius})`);
  root.style.setProperty('--component-message-success-bg', `rgb(${c.message.successBackground})`);
  root.style.setProperty('--component-message-success-text', `rgb(${c.message.successTextColor})`);
  root.style.setProperty('--component-message-success-border', `rgb(${c.message.successBorderColor})`);
  root.style.setProperty('--component-message-warning-bg', `rgb(${c.message.warningBackground})`);
  root.style.setProperty('--component-message-warning-text', `rgb(${c.message.warningTextColor})`);
  root.style.setProperty('--component-message-warning-border', `rgb(${c.message.warningBorderColor})`);
  root.style.setProperty('--component-message-error-bg', `rgb(${c.message.errorBackground})`);
  root.style.setProperty('--component-message-error-text', `rgb(${c.message.errorTextColor})`);
  root.style.setProperty('--component-message-error-border', `rgb(${c.message.errorBorderColor})`);
  root.style.setProperty('--component-message-info-bg', `rgb(${c.message.infoBackground})`);
  root.style.setProperty('--component-message-info-text', `rgb(${c.message.infoTextColor})`);
  root.style.setProperty('--component-message-info-border', `rgb(${c.message.infoBorderColor})`);
  root.style.setProperty('--component-message-normal-bg', `rgb(${c.message.normalBackground})`);
  root.style.setProperty('--component-message-normal-text', `rgb(${c.message.normalTextColor})`);
  root.style.setProperty('--component-message-normal-border', `rgb(${c.message.normalBorderColor})`);
}
