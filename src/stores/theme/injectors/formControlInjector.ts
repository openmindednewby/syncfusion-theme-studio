// Form control CSS variable injection utilities (checkbox, radio, toggle)

import { isValueDefined } from '@/utils/is';

import type { ComponentConfigSingle } from '../types';

export function injectCheckboxVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  if (!isValueDefined(c.checkbox)) return;
  root.style.setProperty('--component-checkbox-unchecked-bg', `rgb(${c.checkbox.uncheckedBackground})`);
  root.style.setProperty('--component-checkbox-unchecked-border', `rgb(${c.checkbox.uncheckedBorderColor})`);
  root.style.setProperty('--component-checkbox-checked-bg', `rgb(${c.checkbox.checkedBackground})`);
  root.style.setProperty('--component-checkbox-checked-border', `rgb(${c.checkbox.checkedBorderColor})`);
  root.style.setProperty('--component-checkbox-checkmark', `rgb(${c.checkbox.checkmarkColor})`);
  root.style.setProperty('--component-checkbox-indeterminate-bg', `rgb(${c.checkbox.indeterminateBackground})`);
  root.style.setProperty('--component-checkbox-hover-border', `rgb(${c.checkbox.hoverBorderColor})`);
  root.style.setProperty('--component-checkbox-focus-ring', `rgb(${c.checkbox.focusRingColor})`);
  root.style.setProperty('--component-checkbox-disabled-opacity', c.checkbox.disabledOpacity);
  root.style.setProperty('--component-checkbox-border-radius', c.checkbox.borderRadius);
  root.style.setProperty('--component-checkbox-size', c.checkbox.size);
  root.style.setProperty('--component-checkbox-label-color', `rgb(${c.checkbox.labelColor})`);
  root.style.setProperty('--component-checkbox-label-disabled', `rgb(${c.checkbox.labelDisabledColor})`);
}

export function injectRadioVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  if (!isValueDefined(c.radio)) return;
  root.style.setProperty('--component-radio-unchecked-bg', `rgb(${c.radio.uncheckedBackground})`);
  root.style.setProperty('--component-radio-unchecked-border', `rgb(${c.radio.uncheckedBorderColor})`);
  root.style.setProperty('--component-radio-selected-bg', `rgb(${c.radio.selectedBackground})`);
  root.style.setProperty('--component-radio-selected-border', `rgb(${c.radio.selectedBorderColor})`);
  root.style.setProperty('--component-radio-dot', `rgb(${c.radio.dotColor})`);
  root.style.setProperty('--component-radio-hover-border', `rgb(${c.radio.hoverBorderColor})`);
  root.style.setProperty('--component-radio-focus-ring', `rgb(${c.radio.focusRingColor})`);
  root.style.setProperty('--component-radio-disabled-opacity', c.radio.disabledOpacity);
  root.style.setProperty('--component-radio-size', c.radio.size);
  root.style.setProperty('--component-radio-label-color', `rgb(${c.radio.labelColor})`);
  root.style.setProperty('--component-radio-label-disabled', `rgb(${c.radio.labelDisabledColor})`);
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
