// Odyssey Theme Preset
// Professional corporate blue theme inspired by consulting/technology companies
// Deep navy primary with teal accents for a modern, trustworthy look

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

// Deep Navy/Indigo primary - professional, trustworthy
const ODYSSEY_PRIMARY = {
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

// Teal/Cyan secondary - modern, innovative
const ODYSSEY_SECONDARY = {
  '50': '240 253 250',
  '100': '204 251 241',
  '200': '153 246 228',
  '300': '94 234 212',
  '400': '45 212 191',
  '500': '20 184 166',
  '600': '13 148 136',
  '700': '15 118 110',
  '800': '17 94 89',
  '900': '19 78 74',
};

// Slate neutral - professional, clean
const ODYSSEY_NEUTRAL = {
  '50': '248 250 252',
  '100': '241 245 249',
  '200': '226 232 240',
  '300': '203 213 225',
  '400': '148 163 184',
  '500': '100 116 139',
  '600': '71 85 105',
  '700': '51 65 85',
  '800': '30 41 59',
  '900': '15 23 42',
};

const ODYSSEY_STATUS = {
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

const ODYSSEY_LIGHT_MODE = {
  backgrounds: {
    page: '255 255 255',
    surface: '248 250 252',
    surfaceElevated: '255 255 255',
    surfaceSunken: '241 245 249',
    overlay: '15 23 42',
  },
  text: {
    primary: '15 23 42',
    secondary: '71 85 105',
    muted: '100 116 139',
    disabled: '148 163 184',
    inverse: '255 255 255',
    link: '99 102 241',
    linkHover: '79 70 229',
  },
  borders: {
    default: '226 232 240',
    strong: '148 163 184',
    subtle: '241 245 249',
    focus: '99 102 241',
    divider: '226 232 240',
  },
};

const ODYSSEY_DARK_MODE = {
  backgrounds: {
    page: '15 23 42',
    surface: '30 41 59',
    surfaceElevated: '51 65 85',
    surfaceSunken: '15 23 42',
    overlay: '0 0 0',
  },
  text: {
    primary: '248 250 252',
    secondary: '148 163 184',
    muted: '100 116 139',
    disabled: '71 85 105',
    inverse: '15 23 42',
    link: '129 140 248',
    linkHover: '165 180 252',
  },
  borders: {
    default: '71 85 105',
    strong: '100 116 139',
    subtle: '51 65 85',
    focus: '129 140 248',
    divider: '51 65 85',
  },
};

export const ODYSSEY_THEME: ThemeConfig = {
  id: 'odyssey',
  name: 'Odyssey',
  primary: ODYSSEY_PRIMARY,
  secondary: ODYSSEY_SECONDARY,
  neutral: ODYSSEY_NEUTRAL,
  status: ODYSSEY_STATUS,
  layout: DEFAULT_LAYOUT,
  spacing: DEFAULT_SPACING,
  borderRadius: DEFAULT_BORDER_RADIUS,
  shadows: DEFAULT_SHADOWS,
  typography: DEFAULT_TYPOGRAPHY,
  transitions: DEFAULT_TRANSITIONS,
  light: ODYSSEY_LIGHT_MODE,
  dark: ODYSSEY_DARK_MODE,
  components: DEFAULT_COMPONENTS,
};
