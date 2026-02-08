// Rose Pink Theme Preset
// Soft pink theme with romantic undertones
// Gentle and approachable, perfect for beauty, fashion, or wellness applications

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

// Rose Pink primary - soft, romantic
const ROSE_PINK_PRIMARY = {
  '50': '253 242 248',
  '100': '252 231 243',
  '200': '251 207 232',
  '300': '249 168 212',
  '400': '244 114 182',
  '500': '236 72 153',
  '600': '219 39 119',
  '700': '190 24 93',
  '800': '157 23 77',
  '900': '131 24 67',
};

// Soft Lavender secondary - complementary accent
const ROSE_PINK_SECONDARY = {
  '50': '245 243 255',
  '100': '237 233 254',
  '200': '221 214 254',
  '300': '196 181 253',
  '400': '167 139 250',
  '500': '139 92 246',
  '600': '124 58 237',
  '700': '109 40 217',
  '800': '91 33 182',
  '900': '76 29 149',
};

// Warm Blush neutral - soft, feminine
const ROSE_PINK_NEUTRAL = {
  '50': '253 251 252',
  '100': '250 245 248',
  '200': '245 235 241',
  '300': '236 220 230',
  '400': '199 179 190',
  '500': '153 133 144',
  '600': '113 97 107',
  '700': '88 75 83',
  '800': '53 45 50',
  '900': '36 31 34',
};

const ROSE_PINK_STATUS = {
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
    '50': '245 243 255',
    '100': '237 233 254',
    '200': '221 214 254',
    '500': '139 92 246',
    '700': '109 40 217',
  },
};

const ROSE_PINK_LIGHT_MODE = {
  backgrounds: {
    page: '255 255 255',
    surface: '253 251 252',
    surfaceElevated: '255 255 255',
    surfaceSunken: '250 245 248',
    overlay: '36 31 34',
  },
  text: {
    primary: '36 31 34',
    secondary: '113 97 107',
    muted: '153 133 144',
    disabled: '199 179 190',
    inverse: '255 255 255',
    link: '219 39 119',
    linkHover: '190 24 93',
  },
  borders: {
    default: '245 235 241',
    strong: '199 179 190',
    subtle: '250 245 248',
    focus: '236 72 153',
    divider: '245 235 241',
  },
};

const ROSE_PINK_DARK_MODE = {
  backgrounds: {
    page: '36 31 34',
    surface: '53 45 50',
    surfaceElevated: '88 75 83',
    surfaceSunken: '36 31 34',
    overlay: '0 0 0',
  },
  text: {
    primary: '253 251 252',
    secondary: '199 179 190',
    muted: '153 133 144',
    disabled: '113 97 107',
    inverse: '36 31 34',
    link: '244 114 182',
    linkHover: '249 168 212',
  },
  borders: {
    default: '113 97 107',
    strong: '153 133 144',
    subtle: '88 75 83',
    focus: '244 114 182',
    divider: '88 75 83',
  },
};

export const ROSE_PINK_THEME: ThemeConfig = {
  id: 'rose-pink',
  name: 'Rose Pink',
  primary: ROSE_PINK_PRIMARY,
  secondary: ROSE_PINK_SECONDARY,
  neutral: ROSE_PINK_NEUTRAL,
  status: ROSE_PINK_STATUS,
  layout: DEFAULT_LAYOUT,
  spacing: DEFAULT_SPACING,
  borderRadius: DEFAULT_BORDER_RADIUS,
  shadows: DEFAULT_SHADOWS,
  typography: DEFAULT_TYPOGRAPHY,
  transitions: DEFAULT_TRANSITIONS,
  light: ROSE_PINK_LIGHT_MODE,
  dark: ROSE_PINK_DARK_MODE,
  components: DEFAULT_COMPONENTS,
};
