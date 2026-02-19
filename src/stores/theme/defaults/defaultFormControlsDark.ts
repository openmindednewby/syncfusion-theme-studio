// Default dark mode form control component configurations

import { type FormControlKeys } from './formControlKeys';

import type { ComponentConfigSingle } from '../types';


type FormControlKeysType = `${FormControlKeys}`;

export const DEFAULT_FORM_CONTROLS_DARK: Pick<ComponentConfigSingle, FormControlKeysType> = {
  checkbox: {
    uncheckedBackground: '31 41 55',
    uncheckedBorderColor: '75 85 99',
    checkedBackground: '96 165 250',
    checkedBorderColor: '96 165 250',
    checkmarkColor: '255 255 255',
    indeterminateBackground: '96 165 250',
    hoverBorderColor: '107 114 128',
    focusRingColor: '96 165 250',
    disabledOpacity: '0.5',
    borderRadius: '4px',
    size: '18px',
    labelColor: '209 213 219',
    labelDisabledColor: '107 114 128',
  },
  radio: {
    uncheckedBackground: '31 41 55',
    uncheckedBorderColor: '75 85 99',
    selectedBackground: '96 165 250',
    selectedBorderColor: '96 165 250',
    dotColor: '255 255 255',
    hoverBorderColor: '107 114 128',
    focusRingColor: '96 165 250',
    disabledOpacity: '0.5',
    size: '18px',
    labelColor: '209 213 219',
    labelDisabledColor: '107 114 128',
  },
  toggle: {
    trackActiveBackground: '96 165 250',
    trackInactiveBackground: '75 85 99',
    thumbBackground: '255 255 255',
    thumbShadow: '0 1px 3px rgb(0 0 0 / 0.3)',
    focusRingColor: '96 165 250',
    disabledOpacity: '0.5',
    trackBorderRadius: '9999px',
    trackWidth: '44px',
    trackHeight: '24px',
    thumbSize: '20px',
  },
};
