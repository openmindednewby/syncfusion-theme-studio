// Copper Theme Preset
// Warm metallic copper tones with bronze undertones
// Sophisticated and warm, perfect for craft, artisan, or premium applications

import {
  DEFAULT_ANIMATIONS,
  DEFAULT_BORDER_RADIUS,
  DEFAULT_COMPONENTS,
  DEFAULT_LAYOUT,
  DEFAULT_SHADOWS,
  DEFAULT_SPACING,
  DEFAULT_TRANSITIONS,
  DEFAULT_TYPOGRAPHY,
  DEFAULT_TYPOGRAPHY_COMPONENTS,
} from '../defaults';

import type { ThemeConfig } from '../types';

// Copper primary - warm, metallic
const COPPER_PRIMARY = {
  '50': '254 247 243',
  '100': '252 235 224',
  '200': '249 215 192',
  '300': '244 185 146',
  '400': '237 147 93',
  '500': '220 114 56',
  '600': '184 88 42',
  '700': '152 70 36',
  '800': '124 58 35',
  '900': '103 50 33',
};

// Bronze secondary - complementary metallic
const COPPER_SECONDARY = {
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

// Warm Brown neutral - earthy, organic
const COPPER_NEUTRAL = {
  '50': '252 250 248',
  '100': '247 244 240',
  '200': '238 233 226',
  '300': '224 216 205',
  '400': '182 172 158',
  '500': '139 128 113',
  '600': '102 93 81',
  '700': '79 72 63',
  '800': '48 44 38',
  '900': '33 30 26',
};

const COPPER_STATUS = {
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
    '500': '220 38 38',
    '700': '153 27 27',
  },
  info: {
    '50': '240 249 255',
    '100': '224 242 254',
    '200': '186 230 253',
    '500': '14 165 233',
    '700': '3 105 161',
  },
};

const COPPER_LIGHT_MODE = {
  backgrounds: {
    page: '255 255 255',
    surface: '252 250 248',
    surfaceElevated: '255 255 255',
    surfaceSunken: '247 244 240',
    overlay: '33 30 26',
  },
  text: {
    primary: '33 30 26',
    secondary: '102 93 81',
    muted: '139 128 113',
    disabled: '182 172 158',
    inverse: '255 255 255',
    link: '184 88 42',
    linkHover: '152 70 36',
  },
  borders: {
    default: '238 233 226',
    strong: '182 172 158',
    subtle: '247 244 240',
    focus: '220 114 56',
    divider: '238 233 226',
  },
};

const COPPER_DARK_MODE = {
  backgrounds: {
    page: '33 30 26',
    surface: '48 44 38',
    surfaceElevated: '79 72 63',
    surfaceSunken: '33 30 26',
    overlay: '0 0 0',
  },
  text: {
    primary: '252 250 248',
    secondary: '182 172 158',
    muted: '139 128 113',
    disabled: '102 93 81',
    inverse: '33 30 26',
    link: '237 147 93',
    linkHover: '244 185 146',
  },
  borders: {
    default: '102 93 81',
    strong: '139 128 113',
    subtle: '79 72 63',
    focus: '237 147 93',
    divider: '79 72 63',
  },
};

export const COPPER_THEME: ThemeConfig = {
  id: 'copper',
  name: 'Copper',
  primary: COPPER_PRIMARY,
  secondary: COPPER_SECONDARY,
  neutral: COPPER_NEUTRAL,
  status: COPPER_STATUS,
  layout: DEFAULT_LAYOUT,
  spacing: DEFAULT_SPACING,
  borderRadius: DEFAULT_BORDER_RADIUS,
  shadows: DEFAULT_SHADOWS,
  typography: DEFAULT_TYPOGRAPHY,
  transitions: DEFAULT_TRANSITIONS,
  animations: DEFAULT_ANIMATIONS,
  light: COPPER_LIGHT_MODE,
  dark: COPPER_DARK_MODE,
  components: DEFAULT_COMPONENTS,
  typographyComponents: DEFAULT_TYPOGRAPHY_COMPONENTS,
};
