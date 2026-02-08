// Royal Purple Theme Preset
// Elegant purple theme with regal undertones
// Sophisticated and luxurious, perfect for premium or creative applications

import {
  DEFAULT_BORDER_RADIUS,
  DEFAULT_COMPONENTS,
  DEFAULT_LAYOUT,
  DEFAULT_SHADOWS,
  DEFAULT_SPACING,
  DEFAULT_TRANSITIONS,
  DEFAULT_TYPOGRAPHY,
} from '../defaults';

import type { ThemeConfig } from '../types';

// Royal Purple primary - elegant, sophisticated
const ROYAL_PURPLE_PRIMARY = {
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

// Rose Gold secondary - luxurious accent
const ROYAL_PURPLE_SECONDARY = {
  '50': '255 241 242',
  '100': '255 228 230',
  '200': '254 205 211',
  '300': '253 164 175',
  '400': '251 113 133',
  '500': '244 63 94',
  '600': '225 29 72',
  '700': '190 18 60',
  '800': '159 18 57',
  '900': '136 19 55',
};

// Cool Zinc neutral - refined, elegant
const ROYAL_PURPLE_NEUTRAL = {
  '50': '250 250 250',
  '100': '244 244 245',
  '200': '228 228 231',
  '300': '212 212 216',
  '400': '161 161 170',
  '500': '113 113 122',
  '600': '82 82 91',
  '700': '63 63 70',
  '800': '39 39 42',
  '900': '24 24 27',
};

const ROYAL_PURPLE_STATUS = {
  success: {
    '50': '236 253 245',
    '100': '209 250 229',
    '200': '167 243 208',
    '500': '16 185 129',
    '700': '4 120 87',
  },
  warning: {
    '50': '255 251 235',
    '100': '254 243 199',
    '200': '253 230 138',
    '500': '245 158 11',
    '700': '180 83 9',
  },
  error: {
    '50': '254 242 242',
    '100': '254 226 226',
    '200': '254 202 202',
    '500': '239 68 68',
    '700': '185 28 28',
  },
  info: {
    '50': '250 245 255',
    '100': '243 232 255',
    '200': '233 213 255',
    '500': '168 85 247',
    '700': '126 34 206',
  },
};

const ROYAL_PURPLE_LIGHT_MODE = {
  backgrounds: {
    page: '255 255 255',
    surface: '250 250 250',
    surfaceElevated: '255 255 255',
    surfaceSunken: '244 244 245',
    overlay: '24 24 27',
  },
  text: {
    primary: '24 24 27',
    secondary: '82 82 91',
    muted: '113 113 122',
    disabled: '161 161 170',
    inverse: '255 255 255',
    link: '147 51 234',
    linkHover: '126 34 206',
  },
  borders: {
    default: '228 228 231',
    strong: '161 161 170',
    subtle: '244 244 245',
    focus: '168 85 247',
    divider: '228 228 231',
  },
};

const ROYAL_PURPLE_DARK_MODE = {
  backgrounds: {
    page: '24 24 27',
    surface: '39 39 42',
    surfaceElevated: '63 63 70',
    surfaceSunken: '24 24 27',
    overlay: '0 0 0',
  },
  text: {
    primary: '250 250 250',
    secondary: '161 161 170',
    muted: '113 113 122',
    disabled: '82 82 91',
    inverse: '24 24 27',
    link: '192 132 252',
    linkHover: '216 180 254',
  },
  borders: {
    default: '82 82 91',
    strong: '113 113 122',
    subtle: '63 63 70',
    focus: '192 132 252',
    divider: '63 63 70',
  },
};

export const ROYAL_PURPLE_THEME: ThemeConfig = {
  id: 'royal-purple',
  name: 'Royal Purple',
  primary: ROYAL_PURPLE_PRIMARY,
  secondary: ROYAL_PURPLE_SECONDARY,
  neutral: ROYAL_PURPLE_NEUTRAL,
  status: ROYAL_PURPLE_STATUS,
  layout: DEFAULT_LAYOUT,
  spacing: DEFAULT_SPACING,
  borderRadius: DEFAULT_BORDER_RADIUS,
  shadows: DEFAULT_SHADOWS,
  typography: DEFAULT_TYPOGRAPHY,
  transitions: DEFAULT_TRANSITIONS,
  light: ROYAL_PURPLE_LIGHT_MODE,
  dark: ROYAL_PURPLE_DARK_MODE,
  components: DEFAULT_COMPONENTS,
};
