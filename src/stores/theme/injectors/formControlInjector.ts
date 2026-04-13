// Form control CSS variable injection utilities (checkbox, radio, toggle)

import { isValueDefined } from '@/utils/is';

import type { ComponentConfigSingle } from '../types';

export function injectCheckboxVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  if (!isValueDefined(c.checkbox)) return;
  root.style.setProperty('--component-checkbox-unchecked-bg', cssColor(c.checkbox.uncheckedBackground));
  root.style.setProperty('--component-checkbox-unchecked-border', cssColor(c.checkbox.uncheckedBorderColor));
  root.style.setProperty('--component-checkbox-checked-bg', cssColor(c.checkbox.checkedBackground));
  root.style.setProperty('--component-checkbox-checked-border', cssColor(c.checkbox.checkedBorderColor));
  root.style.setProperty('--component-checkbox-checkmark', cssColor(c.checkbox.checkmarkColor));
  if (c.checkbox.checkmarkBorderRadius !== '')
    root.style.setProperty('--component-checkbox-checkmark-radius', c.checkbox.checkmarkBorderRadius);
  if (c.checkbox.checkmarkStrokeWidth !== '')
    root.style.setProperty('--component-checkbox-checkmark-stroke', c.checkbox.checkmarkStrokeWidth);
  root.style.setProperty('--component-checkbox-indeterminate-bg', cssColor(c.checkbox.indeterminateBackground));
  root.style.setProperty('--component-checkbox-hover-border', cssColor(c.checkbox.hoverBorderColor));
  root.style.setProperty('--component-checkbox-focus-ring', cssColor(c.checkbox.focusRingColor));
  root.style.setProperty('--component-checkbox-disabled-opacity', c.checkbox.disabledOpacity);
  root.style.setProperty('--component-checkbox-border-radius', c.checkbox.borderRadius);
  root.style.setProperty('--component-checkbox-border-width', c.checkbox.borderWidth);
  root.style.setProperty('--component-checkbox-size', c.checkbox.size);
  root.style.setProperty('--component-checkbox-label-color', cssColor(c.checkbox.labelColor));
  root.style.setProperty('--component-checkbox-label-disabled', cssColor(c.checkbox.labelDisabledColor));
}

export function injectRadioVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  if (!isValueDefined(c.radio)) return;
  root.style.setProperty('--component-radio-unchecked-bg', cssColor(c.radio.uncheckedBackground));
  root.style.setProperty('--component-radio-unchecked-border', cssColor(c.radio.uncheckedBorderColor));
  root.style.setProperty('--component-radio-selected-bg', cssColor(c.radio.selectedBackground));
  root.style.setProperty('--component-radio-selected-border', cssColor(c.radio.selectedBorderColor));
  root.style.setProperty('--component-radio-dot', cssColor(c.radio.dotColor));
  root.style.setProperty('--component-radio-hover-border', cssColor(c.radio.hoverBorderColor));
  root.style.setProperty('--component-radio-focus-ring', cssColor(c.radio.focusRingColor));
  root.style.setProperty('--component-radio-disabled-opacity', c.radio.disabledOpacity);
  root.style.setProperty('--component-radio-size', c.radio.size);
  root.style.setProperty('--component-radio-border-width', c.radio.borderWidth);
  root.style.setProperty('--component-radio-dot-size', c.radio.dotSize);
  root.style.setProperty('--component-radio-label-color', cssColor(c.radio.labelColor));
  root.style.setProperty('--component-radio-label-disabled', cssColor(c.radio.labelDisabledColor));
}

export function injectToggleVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  if (!isValueDefined(c.toggle)) return;
  root.style.setProperty('--component-toggle-track-active', `rgb(${c.toggle.trackActiveBackground})`);
  root.style.setProperty('--component-toggle-track-inactive', `rgb(${c.toggle.trackInactiveBackground})`);
  root.style.setProperty('--component-toggle-thumb-bg', `rgb(${c.toggle.thumbBackground})`);
  root.style.setProperty('--component-toggle-thumb-shadow', c.toggle.thumbShadow);
  root.style.setProperty('--component-toggle-focus-ring', `rgb(${c.toggle.focusRingColor})`);
  root.style.setProperty('--component-toggle-disabled-opacity', c.toggle.disabledOpacity);
  root.style.setProperty('--component-toggle-track-radius', c.toggle.trackBorderRadius);
  root.style.setProperty('--component-toggle-track-width', c.toggle.trackWidth);
  root.style.setProperty('--component-toggle-track-height', c.toggle.trackHeight);
  root.style.setProperty('--component-toggle-thumb-size', c.toggle.thumbSize);
}

/** Wrap color value in rgb() unless it's a CSS keyword like transparent/inherit. */
function cssColor(value: string): string {
  return value === 'transparent' || value === 'inherit' ? value : `rgb(${value})`;
}
