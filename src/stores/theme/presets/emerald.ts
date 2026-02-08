// Emerald Theme Preset
// Rich green theme inspired by precious emerald stones
// Luxurious and vibrant, perfect for finance, luxury, or premium applications

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

// Emerald primary - rich, luxurious green
const EMERALD_PRIMARY = {
  '50': '236 253 245',
  '100': '209 250 229',
  '200': '167 243 208',
  '300': '110 231 183',
  '400': '52 211 153',
  '500': '16 185 129',
  '600': '5 150 105',
  '700': '4 120 87',
  '800': '6 95 70',
  '900': '6 78 59',
};

// Teal secondary - complementary jewel tone
const EMERALD_SECONDARY = {
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

// Deep Green neutral - sophisticated
const EMERALD_NEUTRAL = {
  '50': '248 251 250',
  '100': '240 245 243',
  '200': '224 234 230',
  '300': '203 218 212',
  '400': '151 172 163',
  '500': '104 128 118',
  '600': '74 95 87',
  '700': '57 74 68',
  '800': '35 47 43',
  '900': '23 32 29',
};

const EMERALD_STATUS = {
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
    '50': '240 253 250',
    '100': '204 251 241',
    '200': '153 246 228',
    '500': '20 184 166',
    '700': '15 118 110',
  },
};

const EMERALD_LIGHT_MODE = {
  backgrounds: {
    page: '255 255 255',
    surface: '248 251 250',
    surfaceElevated: '255 255 255',
    surfaceSunken: '240 245 243',
    overlay: '23 32 29',
  },
  text: {
    primary: '23 32 29',
    secondary: '74 95 87',
    muted: '104 128 118',
    disabled: '151 172 163',
    inverse: '255 255 255',
    link: '5 150 105',
    linkHover: '4 120 87',
  },
  borders: {
    default: '224 234 230',
    strong: '151 172 163',
    subtle: '240 245 243',
    focus: '16 185 129',
    divider: '224 234 230',
  },
};

const EMERALD_DARK_MODE = {
  backgrounds: {
    page: '23 32 29',
    surface: '35 47 43',
    surfaceElevated: '57 74 68',
    surfaceSunken: '23 32 29',
    overlay: '0 0 0',
  },
  text: {
    primary: '248 251 250',
    secondary: '151 172 163',
    muted: '104 128 118',
    disabled: '74 95 87',
    inverse: '23 32 29',
    link: '52 211 153',
    linkHover: '110 231 183',
  },
  borders: {
    default: '74 95 87',
    strong: '104 128 118',
    subtle: '57 74 68',
    focus: '52 211 153',
    divider: '57 74 68',
  },
};

export const EMERALD_THEME: ThemeConfig = {
  id: 'emerald',
  name: 'Emerald',
  primary: EMERALD_PRIMARY,
  secondary: EMERALD_SECONDARY,
  neutral: EMERALD_NEUTRAL,
  status: EMERALD_STATUS,
  layout: DEFAULT_LAYOUT,
  spacing: DEFAULT_SPACING,
  borderRadius: DEFAULT_BORDER_RADIUS,
  shadows: DEFAULT_SHADOWS,
  typography: DEFAULT_TYPOGRAPHY,
  transitions: DEFAULT_TRANSITIONS,
  light: EMERALD_LIGHT_MODE,
  dark: EMERALD_DARK_MODE,
  components: DEFAULT_COMPONENTS,
};
