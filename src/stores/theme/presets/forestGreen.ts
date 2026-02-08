// Forest Green Theme Preset
// Nature-inspired green theme with earthy undertones
// Calming, organic feel perfect for eco-friendly or wellness applications

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

// Forest Green primary - natural, calming
const FOREST_GREEN_PRIMARY = {
  '50': '240 253 244',
  '100': '220 252 231',
  '200': '187 247 208',
  '300': '134 239 172',
  '400': '74 222 128',
  '500': '34 197 94',
  '600': '22 163 74',
  '700': '21 128 61',
  '800': '22 101 52',
  '900': '20 83 45',
};

// Warm Amber secondary - autumn, earthy accent
const FOREST_GREEN_SECONDARY = {
  '50': '255 251 235',
  '100': '254 243 199',
  '200': '253 230 138',
  '300': '252 211 77',
  '400': '251 191 36',
  '500': '245 158 11',
  '600': '217 119 6',
  '700': '180 83 9',
  '800': '146 64 14',
  '900': '120 53 15',
};

// Warm Stone neutral - natural, organic
const FOREST_GREEN_NEUTRAL = {
  '50': '250 250 249',
  '100': '245 245 244',
  '200': '231 229 228',
  '300': '214 211 209',
  '400': '168 162 158',
  '500': '120 113 108',
  '600': '87 83 78',
  '700': '68 64 60',
  '800': '41 37 36',
  '900': '28 25 23',
};

const FOREST_GREEN_STATUS = {
  success: {
    '50': '240 253 244',
    '100': '220 252 231',
    '200': '187 247 208',
    '500': '34 197 94',
    '700': '21 128 61',
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
    '50': '240 253 250',
    '100': '204 251 241',
    '200': '153 246 228',
    '500': '20 184 166',
    '700': '15 118 110',
  },
};

const FOREST_GREEN_LIGHT_MODE = {
  backgrounds: {
    page: '255 255 255',
    surface: '250 250 249',
    surfaceElevated: '255 255 255',
    surfaceSunken: '245 245 244',
    overlay: '28 25 23',
  },
  text: {
    primary: '28 25 23',
    secondary: '87 83 78',
    muted: '120 113 108',
    disabled: '168 162 158',
    inverse: '255 255 255',
    link: '22 163 74',
    linkHover: '21 128 61',
  },
  borders: {
    default: '231 229 228',
    strong: '168 162 158',
    subtle: '245 245 244',
    focus: '34 197 94',
    divider: '231 229 228',
  },
};

const FOREST_GREEN_DARK_MODE = {
  backgrounds: {
    page: '28 25 23',
    surface: '41 37 36',
    surfaceElevated: '68 64 60',
    surfaceSunken: '28 25 23',
    overlay: '0 0 0',
  },
  text: {
    primary: '250 250 249',
    secondary: '168 162 158',
    muted: '120 113 108',
    disabled: '87 83 78',
    inverse: '28 25 23',
    link: '74 222 128',
    linkHover: '134 239 172',
  },
  borders: {
    default: '87 83 78',
    strong: '120 113 108',
    subtle: '68 64 60',
    focus: '74 222 128',
    divider: '68 64 60',
  },
};

export const FOREST_GREEN_THEME: ThemeConfig = {
  id: 'forest-green',
  name: 'Forest Green',
  primary: FOREST_GREEN_PRIMARY,
  secondary: FOREST_GREEN_SECONDARY,
  neutral: FOREST_GREEN_NEUTRAL,
  status: FOREST_GREEN_STATUS,
  layout: DEFAULT_LAYOUT,
  spacing: DEFAULT_SPACING,
  borderRadius: DEFAULT_BORDER_RADIUS,
  shadows: DEFAULT_SHADOWS,
  typography: DEFAULT_TYPOGRAPHY,
  transitions: DEFAULT_TRANSITIONS,
  light: FOREST_GREEN_LIGHT_MODE,
  dark: FOREST_GREEN_DARK_MODE,
  components: DEFAULT_COMPONENTS,
};
