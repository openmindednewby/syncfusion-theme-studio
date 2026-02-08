// Sunset Orange Theme Preset
// Warm orange/coral tones inspired by beautiful sunsets
// Energetic and inviting, perfect for creative or lifestyle applications

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

// Sunset Orange primary - warm, energetic
const SUNSET_ORANGE_PRIMARY = {
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

// Coral Pink secondary - sunset accent
const SUNSET_ORANGE_SECONDARY = {
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

// Warm Neutral - cozy, inviting
const SUNSET_ORANGE_NEUTRAL = {
  '50': '253 252 251',
  '100': '249 247 244',
  '200': '241 237 232',
  '300': '227 221 214',
  '400': '179 171 163',
  '500': '131 123 115',
  '600': '98 91 83',
  '700': '77 71 64',
  '800': '46 42 38',
  '900': '32 29 26',
};

const SUNSET_ORANGE_STATUS = {
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

const SUNSET_ORANGE_LIGHT_MODE = {
  backgrounds: {
    page: '255 255 255',
    surface: '253 252 251',
    surfaceElevated: '255 255 255',
    surfaceSunken: '249 247 244',
    overlay: '32 29 26',
  },
  text: {
    primary: '32 29 26',
    secondary: '98 91 83',
    muted: '131 123 115',
    disabled: '179 171 163',
    inverse: '255 255 255',
    link: '234 88 12',
    linkHover: '194 65 12',
  },
  borders: {
    default: '241 237 232',
    strong: '179 171 163',
    subtle: '249 247 244',
    focus: '249 115 22',
    divider: '241 237 232',
  },
};

const SUNSET_ORANGE_DARK_MODE = {
  backgrounds: {
    page: '32 29 26',
    surface: '46 42 38',
    surfaceElevated: '77 71 64',
    surfaceSunken: '32 29 26',
    overlay: '0 0 0',
  },
  text: {
    primary: '253 252 251',
    secondary: '179 171 163',
    muted: '131 123 115',
    disabled: '98 91 83',
    inverse: '32 29 26',
    link: '251 146 60',
    linkHover: '253 186 116',
  },
  borders: {
    default: '98 91 83',
    strong: '131 123 115',
    subtle: '77 71 64',
    focus: '251 146 60',
    divider: '77 71 64',
  },
};

export const SUNSET_ORANGE_THEME: ThemeConfig = {
  id: 'sunset-orange',
  name: 'Sunset Orange',
  primary: SUNSET_ORANGE_PRIMARY,
  secondary: SUNSET_ORANGE_SECONDARY,
  neutral: SUNSET_ORANGE_NEUTRAL,
  status: SUNSET_ORANGE_STATUS,
  layout: DEFAULT_LAYOUT,
  spacing: DEFAULT_SPACING,
  borderRadius: DEFAULT_BORDER_RADIUS,
  shadows: DEFAULT_SHADOWS,
  typography: DEFAULT_TYPOGRAPHY,
  transitions: DEFAULT_TRANSITIONS,
  light: SUNSET_ORANGE_LIGHT_MODE,
  dark: SUNSET_ORANGE_DARK_MODE,
  components: DEFAULT_COMPONENTS,
};
