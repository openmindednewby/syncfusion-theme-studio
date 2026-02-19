// Default light mode form control component configurations

import { type FormControlKeys } from './formControlKeys';

import type { ComponentConfigSingle } from '../types';


type FormControlKeysType = `${FormControlKeys}`;

export const DEFAULT_FORM_CONTROLS_LIGHT: Pick<ComponentConfigSingle, FormControlKeysType> = {
  checkbox: {
    uncheckedBackground: '255 255 255',
    uncheckedBorderColor: '209 213 219',
    checkedBackground: '59 130 246',
    checkedBorderColor: '59 130 246',
    checkmarkColor: '255 255 255',
    indeterminateBackground: '59 130 246',
    hoverBorderColor: '156 163 175',
    focusRingColor: '59 130 246',
    disabledOpacity: '0.5',
    borderRadius: '4px',
    size: '18px',
    labelColor: '55 65 81',
    labelDisabledColor: '156 163 175',
  },
  radio: {
    uncheckedBackground: '255 255 255',
    uncheckedBorderColor: '209 213 219',
    selectedBackground: '59 130 246',
    selectedBorderColor: '59 130 246',
    dotColor: '255 255 255',
    hoverBorderColor: '156 163 175',
    focusRingColor: '59 130 246',
    disabledOpacity: '0.5',
    size: '18px',
    labelColor: '55 65 81',
    labelDisabledColor: '156 163 175',
  },
  toggle: {
    trackActiveBackground: '59 130 246',
    trackInactiveBackground: '209 213 219',
    thumbBackground: '255 255 255',
    thumbShadow: '0 1px 3px rgb(0 0 0 / 0.1)',
    focusRingColor: '59 130 246',
    disabledOpacity: '0.5',
    trackBorderRadius: '9999px',
    trackWidth: '44px',
    trackHeight: '24px',
    thumbSize: '20px',
  },
};
