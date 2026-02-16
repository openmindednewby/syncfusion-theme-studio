// Arctic Theme Preset
// Cool ice blue/white theme with frosty undertones
// Clean and refreshing, perfect for medical, tech, or minimal applications

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

// Arctic Blue primary - icy, clean
const ARCTIC_PRIMARY = {
  '50': '236 254 255',
  '100': '207 250 254',
  '200': '165 243 252',
  '300': '103 232 249',
  '400': '34 211 238',
  '500': '6 182 212',
  '600': '8 145 178',
  '700': '14 116 144',
  '800': '21 94 117',
  '900': '22 78 99',
};

// Ice Gray secondary - frosty accent
const ARCTIC_SECONDARY = {
  '50': '240 249 255',
  '100': '224 242 254',
  '200': '186 230 253',
  '300': '125 211 252',
  '400': '56 189 248',
  '500': '14 165 233',
  '600': '2 132 199',
  '700': '3 105 161',
  '800': '7 89 133',
  '900': '12 74 110',
};

// Frost neutral - crisp, clean
const ARCTIC_NEUTRAL = {
  '50': '250 252 254',
  '100': '244 248 252',
  '200': '232 240 248',
  '300': '213 226 240',
  '400': '164 183 204',
  '500': '115 140 166',
  '600': '82 106 134',
  '700': '61 82 108',
  '800': '36 52 72',
  '900': '21 34 50',
};

const ARCTIC_STATUS = {
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
    '50': '236 254 255',
    '100': '207 250 254',
    '200': '165 243 252',
    '500': '6 182 212',
    '700': '14 116 144',
  },
};

const ARCTIC_LIGHT_MODE = {
  backgrounds: {
    page: '255 255 255',
    surface: '250 252 254',
    surfaceElevated: '255 255 255',
    surfaceSunken: '244 248 252',
    overlay: '21 34 50',
  },
  text: {
    primary: '21 34 50',
    secondary: '82 106 134',
    muted: '115 140 166',
    disabled: '164 183 204',
    inverse: '255 255 255',
    link: '8 145 178',
    linkHover: '14 116 144',
  },
  borders: {
    default: '232 240 248',
    strong: '164 183 204',
    subtle: '244 248 252',
    focus: '6 182 212',
    divider: '232 240 248',
  },
};

const ARCTIC_DARK_MODE = {
  backgrounds: {
    page: '21 34 50',
    surface: '36 52 72',
    surfaceElevated: '61 82 108',
    surfaceSunken: '21 34 50',
    overlay: '0 0 0',
  },
  text: {
    primary: '250 252 254',
    secondary: '164 183 204',
    muted: '115 140 166',
    disabled: '82 106 134',
    inverse: '21 34 50',
    link: '34 211 238',
    linkHover: '103 232 249',
  },
  borders: {
    default: '82 106 134',
    strong: '115 140 166',
    subtle: '61 82 108',
    focus: '34 211 238',
    divider: '61 82 108',
  },
};

export const ARCTIC_THEME: ThemeConfig = {
  id: 'arctic',
  name: 'Arctic',
  primary: ARCTIC_PRIMARY,
  secondary: ARCTIC_SECONDARY,
  neutral: ARCTIC_NEUTRAL,
  status: ARCTIC_STATUS,
  layout: DEFAULT_LAYOUT,
  spacing: DEFAULT_SPACING,
  borderRadius: DEFAULT_BORDER_RADIUS,
  shadows: DEFAULT_SHADOWS,
  typography: DEFAULT_TYPOGRAPHY,
  transitions: DEFAULT_TRANSITIONS,
  animations: DEFAULT_ANIMATIONS,
  light: ARCTIC_LIGHT_MODE,
  dark: ARCTIC_DARK_MODE,
  components: DEFAULT_COMPONENTS,
  typographyComponents: DEFAULT_TYPOGRAPHY_COMPONENTS,
};
