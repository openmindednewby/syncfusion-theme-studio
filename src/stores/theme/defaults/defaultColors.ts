// Default color configurations

import type { ColorScale, StatusColors, ThemeModeConfig } from '../types';

export const DEFAULT_PRIMARY: ColorScale = {
  '50': '239 246 255',
  '100': '219 234 254',
  '200': '191 219 254',
  '300': '147 197 253',
  '400': '96 165 250',
  '500': '59 130 246',
  '600': '37 99 235',
  '700': '29 78 216',
  '800': '30 64 175',
  '900': '30 58 138',
};

export const DEFAULT_SECONDARY: ColorScale = {
  '50': '250 245 255',
  '100': '243 232 255',
  '200': '233 213 255',
  '300': '216 180 254',
  '400': '192 132 252',
  '500': '168 85 247',
  '600': '147 51 234',
  '700': '126 34 206',
  '800': '107 33 168',
  '900': '88 28 135',
};

export const DEFAULT_NEUTRAL: ColorScale = {
  '50': '249 250 251',
  '100': '243 244 246',
  '200': '229 231 235',
  '300': '209 213 219',
  '400': '156 163 175',
  '500': '107 114 128',
  '600': '75 85 99',
  '700': '55 65 81',
  '800': '31 41 55',
  '900': '17 24 39',
};

export const DEFAULT_STATUS: StatusColors = {
  success: {
    '50': '240 253 244',
    '100': '220 252 231',
    '200': '187 247 208',
    '500': '34 197 94',
    '700': '21 128 61',
  },
  warning: {
    '50': '254 252 232',
    '100': '254 249 195',
    '200': '254 240 138',
    '500': '234 179 8',
    '700': '161 98 7',
  },
  error: {
    '50': '254 242 242',
    '100': '254 226 226',
    '200': '254 202 202',
    '500': '239 68 68',
    '700': '185 28 28',
  },
  info: {
    '50': '239 246 255',
    '100': '219 234 254',
    '200': '191 219 254',
    '500': '59 130 246',
    '700': '29 78 216',
  },
};

export const DEFAULT_LIGHT_MODE: ThemeModeConfig = {
  backgrounds: {
    page: '255 255 255',
    surface: '249 250 251',
    surfaceElevated: '255 255 255',
    surfaceSunken: '243 244 246',
    overlay: '0 0 0',
  },
  text: {
    primary: '17 24 39',
    secondary: '107 114 128',
    muted: '156 163 175',
    disabled: '209 213 219',
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
};

export const DEFAULT_DARK_MODE: ThemeModeConfig = {
  backgrounds: {
    page: '17 24 39',
    surface: '31 41 55',
    surfaceElevated: '55 65 81',
    surfaceSunken: '17 24 39',
    overlay: '0 0 0',
  },
  text: {
    primary: '249 250 251',
    secondary: '156 163 175',
    muted: '107 114 128',
    disabled: '75 85 99',
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
};
