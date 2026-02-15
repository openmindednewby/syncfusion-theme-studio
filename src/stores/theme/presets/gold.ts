// Gold Theme Preset
// Luxurious gold accents with warm undertones
// Opulent and premium, perfect for luxury, finance, or VIP applications

import {
  DEFAULT_ANIMATIONS,
  DEFAULT_BORDER_RADIUS,
  DEFAULT_COMPONENTS,
  DEFAULT_LAYOUT,
  DEFAULT_SHADOWS,
  DEFAULT_SPACING,
  DEFAULT_TRANSITIONS,
  DEFAULT_TYPOGRAPHY,
} from '../defaults';

import type { ThemeConfig } from '../types';

// Gold primary - rich, luxurious
const GOLD_PRIMARY = {
  '50': '255 252 240',
  '100': '254 248 218',
  '200': '253 239 178',
  '300': '251 226 124',
  '400': '249 208 68',
  '500': '234 179 8',
  '600': '202 138 4',
  '700': '161 98 7',
  '800': '133 77 14',
  '900': '113 63 18',
};

// Deep Bronze secondary - complementary metallic
const GOLD_SECONDARY = {
  '50': '255 247 237',
  '100': '255 237 213',
  '200': '254 215 170',
  '300': '253 186 116',
  '400': '251 146 60',
  '500': '249 115 22',
  '600': '234 88 12',
  '700': '194 65 12',
  '800': '154 52 18',
  '900': '124 45 18',
};

// Warm Charcoal neutral - sophisticated
const GOLD_NEUTRAL = {
  '50': '252 251 249',
  '100': '248 246 241',
  '200': '240 236 227',
  '300': '227 221 208',
  '400': '185 177 162',
  '500': '142 133 118',
  '600': '105 97 85',
  '700': '81 75 65',
  '800': '50 46 40',
  '900': '34 31 27',
};

const GOLD_STATUS = {
  success: {
    '50': '236 253 245',
    '100': '209 250 229',
    '200': '167 243 208',
    '500': '16 185 129',
    '700': '4 120 87',
  },
  warning: {
    '50': '255 252 240',
    '100': '254 248 218',
    '200': '253 239 178',
    '500': '234 179 8',
    '700': '161 98 7',
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

const GOLD_LIGHT_MODE = {
  backgrounds: {
    page: '255 255 255',
    surface: '252 251 249',
    surfaceElevated: '255 255 255',
    surfaceSunken: '248 246 241',
    overlay: '34 31 27',
  },
  text: {
    primary: '34 31 27',
    secondary: '105 97 85',
    muted: '142 133 118',
    disabled: '185 177 162',
    inverse: '255 255 255',
    link: '202 138 4',
    linkHover: '161 98 7',
  },
  borders: {
    default: '240 236 227',
    strong: '185 177 162',
    subtle: '248 246 241',
    focus: '234 179 8',
    divider: '240 236 227',
  },
};

const GOLD_DARK_MODE = {
  backgrounds: {
    page: '34 31 27',
    surface: '50 46 40',
    surfaceElevated: '81 75 65',
    surfaceSunken: '34 31 27',
    overlay: '0 0 0',
  },
  text: {
    primary: '252 251 249',
    secondary: '185 177 162',
    muted: '142 133 118',
    disabled: '105 97 85',
    inverse: '34 31 27',
    link: '249 208 68',
    linkHover: '251 226 124',
  },
  borders: {
    default: '105 97 85',
    strong: '142 133 118',
    subtle: '81 75 65',
    focus: '249 208 68',
    divider: '81 75 65',
  },
};

export const GOLD_THEME: ThemeConfig = {
  id: 'gold',
  name: 'Gold',
  primary: GOLD_PRIMARY,
  secondary: GOLD_SECONDARY,
  neutral: GOLD_NEUTRAL,
  status: GOLD_STATUS,
  layout: DEFAULT_LAYOUT,
  spacing: DEFAULT_SPACING,
  borderRadius: DEFAULT_BORDER_RADIUS,
  shadows: DEFAULT_SHADOWS,
  typography: DEFAULT_TYPOGRAPHY,
  transitions: DEFAULT_TRANSITIONS,
  animations: DEFAULT_ANIMATIONS,
  light: GOLD_LIGHT_MODE,
  dark: GOLD_DARK_MODE,
  components: DEFAULT_COMPONENTS,
};
