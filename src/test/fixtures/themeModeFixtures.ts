/**
 * Mode-related test fixtures for theme tests.
 */

import type { ThemeModeConfig } from '../../stores/theme/types';

export const createLightMode = (): ThemeModeConfig => ({
  backgrounds: {
    page: '255 255 255',
    surface: '249 250 251',
    surfaceElevated: '255 255 255',
    surfaceSunken: '243 244 246',
    overlay: '0 0 0 / 0.5',
  },
  text: {
    primary: '17 24 39',
    secondary: '55 65 81',
    muted: '107 114 128',
    disabled: '156 163 175',
    inverse: '255 255 255',
    link: '59 130 246',
    linkHover: '37 99 235',
  },
  borders: {
    default: '229 231 235',
    strong: '156 163 175',
    subtle: '243 244 246',
    focus: '59 130 246',
    divider: '229 231 235',
  },
});

export const createDarkMode = (): ThemeModeConfig => ({
  backgrounds: {
    page: '17 24 39',
    surface: '31 41 55',
    surfaceElevated: '55 65 81',
    surfaceSunken: '17 24 39',
    overlay: '0 0 0 / 0.7',
  },
  text: {
    primary: '249 250 251',
    secondary: '209 213 219',
    muted: '156 163 175',
    disabled: '107 114 128',
    inverse: '17 24 39',
    link: '96 165 250',
    linkHover: '147 197 253',
  },
  borders: {
    default: '75 85 99',
    strong: '107 114 128',
    subtle: '55 65 81',
    focus: '96 165 250',
    divider: '55 65 81',
  },
});
