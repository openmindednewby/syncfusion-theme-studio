// Midnight Theme Preset
// Deep dark blue theme with sophisticated undertones
// Perfect for premium apps, developer tools, or luxury brands

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

// Midnight Blue primary - deep, sophisticated
const MIDNIGHT_PRIMARY = {
  '50': '238 242 255',
  '100': '224 231 255',
  '200': '199 210 254',
  '300': '165 180 252',
  '400': '129 140 248',
  '500': '99 102 241',
  '600': '79 70 229',
  '700': '67 56 202',
  '800': '55 48 163',
  '900': '49 46 129',
};

// Electric Violet secondary - vibrant accent
const MIDNIGHT_SECONDARY = {
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

// Deep Slate neutral - rich, dark
const MIDNIGHT_NEUTRAL = {
  '50': '241 245 249',
  '100': '226 232 240',
  '200': '203 213 225',
  '300': '148 163 184',
  '400': '100 116 139',
  '500': '71 85 105',
  '600': '51 65 85',
  '700': '30 41 59',
  '800': '15 23 42',
  '900': '8 12 21',
};

const MIDNIGHT_STATUS = {
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
    '50': '238 242 255',
    '100': '224 231 255',
    '200': '199 210 254',
    '500': '99 102 241',
    '700': '67 56 202',
  },
};

const MIDNIGHT_LIGHT_MODE = {
  backgrounds: {
    page: '255 255 255',
    surface: '241 245 249',
    surfaceElevated: '255 255 255',
    surfaceSunken: '226 232 240',
    overlay: '8 12 21',
  },
  text: {
    primary: '15 23 42',
    secondary: '51 65 85',
    muted: '71 85 105',
    disabled: '100 116 139',
    inverse: '255 255 255',
    link: '79 70 229',
    linkHover: '67 56 202',
  },
  borders: {
    default: '203 213 225',
    strong: '100 116 139',
    subtle: '226 232 240',
    focus: '99 102 241',
    divider: '203 213 225',
  },
};

const MIDNIGHT_DARK_MODE = {
  backgrounds: {
    page: '8 12 21',
    surface: '15 23 42',
    surfaceElevated: '30 41 59',
    surfaceSunken: '8 12 21',
    overlay: '0 0 0',
  },
  text: {
    primary: '241 245 249',
    secondary: '148 163 184',
    muted: '100 116 139',
    disabled: '71 85 105',
    inverse: '8 12 21',
    link: '129 140 248',
    linkHover: '165 180 252',
  },
  borders: {
    default: '51 65 85',
    strong: '71 85 105',
    subtle: '30 41 59',
    focus: '129 140 248',
    divider: '30 41 59',
  },
};

export const MIDNIGHT_THEME: ThemeConfig = {
  id: 'midnight',
  name: 'Midnight',
  primary: MIDNIGHT_PRIMARY,
  secondary: MIDNIGHT_SECONDARY,
  neutral: MIDNIGHT_NEUTRAL,
  status: MIDNIGHT_STATUS,
  layout: DEFAULT_LAYOUT,
  spacing: DEFAULT_SPACING,
  borderRadius: DEFAULT_BORDER_RADIUS,
  shadows: DEFAULT_SHADOWS,
  typography: DEFAULT_TYPOGRAPHY,
  transitions: DEFAULT_TRANSITIONS,
  light: MIDNIGHT_LIGHT_MODE,
  dark: MIDNIGHT_DARK_MODE,
  components: DEFAULT_COMPONENTS,
};
