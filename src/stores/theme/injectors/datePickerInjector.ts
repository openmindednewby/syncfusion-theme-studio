import type { ComponentConfigSingle } from '../types';

export function injectDatePickerVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  injectDatePickerInputVars(root, c.datePicker);
  injectDatePickerCalendarColorVars(root, c.datePicker);
  injectDatePickerCalendarLayoutVars(root, c.datePicker);
}

function injectDatePickerInputVars(root: HTMLElement, dp: ComponentConfigSingle['datePicker']): void {
  root.style.setProperty('--component-datepicker-background', `rgb(${dp.background})`);
  root.style.setProperty('--component-datepicker-border-default', `rgb(${dp.borderDefault})`);
  root.style.setProperty('--component-datepicker-border-hover', `rgb(${dp.borderHover})`);
  root.style.setProperty('--component-datepicker-border-focus', `rgb(${dp.borderFocus})`);
  root.style.setProperty('--component-datepicker-border-error', `rgb(${dp.borderError})`);
  root.style.setProperty('--component-datepicker-text-color', `rgb(${dp.textColor})`);
  root.style.setProperty('--component-datepicker-placeholder', `rgb(${dp.placeholderColor})`);
  root.style.setProperty('--component-datepicker-icon-color', `rgb(${dp.iconColor})`);
  root.style.setProperty('--component-datepicker-border-radius', /^\d/.test(dp.borderRadius) ? dp.borderRadius : `var(--radius-${dp.borderRadius})`);
  root.style.setProperty('--component-datepicker-label-color', `rgb(${dp.labelColor})`);
  root.style.setProperty('--component-datepicker-focus-ring', `rgb(${dp.focusRingColor})`);
  root.style.setProperty('--component-datepicker-transition', dp.transitionDuration);
  root.style.setProperty('--component-datepicker-input-font-size', dp.inputFontSize);
  root.style.setProperty('--component-datepicker-label-font-size', dp.labelFontSize);
  root.style.setProperty('--component-datepicker-input-height', dp.inputHeight);
}

function injectDatePickerCalendarColorVars(root: HTMLElement, dp: ComponentConfigSingle['datePicker']): void {
  root.style.setProperty('--component-datepicker-calendar-bg', `rgb(${dp.calendarBackground})`);
  root.style.setProperty('--component-datepicker-calendar-header-bg', `rgb(${dp.calendarHeaderBackground})`);
  root.style.setProperty('--component-datepicker-calendar-header-text', `rgb(${dp.calendarHeaderTextColor})`);
  root.style.setProperty('--component-datepicker-cell-hover', `rgb(${dp.calendarCellHoverBackground})`);
  root.style.setProperty('--component-datepicker-selected-bg', `rgb(${dp.calendarSelectedBackground})`);
  root.style.setProperty('--component-datepicker-selected-text', `rgb(${dp.calendarSelectedTextColor})`);
  root.style.setProperty('--component-datepicker-today-border', `rgb(${dp.calendarTodayBorderColor})`);
  root.style.setProperty('--component-datepicker-other-month-text', `rgb(${dp.calendarOtherMonthTextColor})`);
  root.style.setProperty('--component-datepicker-calendar-border', `rgb(${dp.calendarBorderColor})`);
  root.style.setProperty('--component-datepicker-calendar-shadow', dp.calendarShadow);
  root.style.setProperty('--component-datepicker-week-header-border', `rgb(${dp.weekHeaderBorderColor})`);
  root.style.setProperty('--component-datepicker-week-day-label', `rgb(${dp.weekDayLabelColor})`);
  root.style.setProperty('--component-datepicker-day-text', `rgb(${dp.dayTextColor})`);
  root.style.setProperty('--component-datepicker-nav-arrow', `rgb(${dp.navArrowColor})`);
  root.style.setProperty('--component-datepicker-selected-border', `rgb(${dp.selectedBorderColor})`);
  root.style.setProperty('--component-datepicker-range-bg', `rgb(${dp.rangeBackground})`);
  root.style.setProperty('--component-datepicker-range-text', `rgb(${dp.rangeTextColor})`);
  root.style.setProperty('--component-datepicker-range-sep-bg', `rgb(${dp.rangeSeparatorBackground})`);
  root.style.setProperty('--component-datepicker-range-sep-border', `rgb(${dp.rangeSeparatorBorderColor})`);
  root.style.setProperty('--component-datepicker-range-sep-icon', `rgb(${dp.rangeSeparatorIconColor})`);
}

function injectDatePickerCalendarLayoutVars(root: HTMLElement, dp: ComponentConfigSingle['datePicker']): void {
  root.style.setProperty('--component-datepicker-calendar-font-family', dp.calendarFontFamily);
  root.style.setProperty('--component-datepicker-header-font-size', dp.headerFontSize);
  root.style.setProperty('--component-datepicker-header-font-weight', dp.headerFontWeight);
  root.style.setProperty('--component-datepicker-day-font-size', dp.dayFontSize);
  root.style.setProperty('--component-datepicker-day-font-weight', dp.dayFontWeight);
  root.style.setProperty('--component-datepicker-week-day-font-size', dp.weekDayFontSize);
  root.style.setProperty('--component-datepicker-week-day-font-weight', dp.weekDayFontWeight);
  root.style.setProperty('--component-datepicker-panel-width', dp.panelWidth);
  root.style.setProperty('--component-datepicker-panel-padding', dp.panelPadding);
  root.style.setProperty('--component-datepicker-panel-border-radius', dp.panelBorderRadius);
  root.style.setProperty('--component-datepicker-day-cell-size', dp.dayCellSize);
  root.style.setProperty('--component-datepicker-header-height', dp.headerHeight);
  root.style.setProperty('--component-datepicker-header-padding', dp.headerPadding);
  root.style.setProperty('--component-datepicker-nav-btn-size', dp.navButtonSize);
}
