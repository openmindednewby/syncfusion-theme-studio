// Slate Theme Preset
// Professional gray theme with cool undertones
// Clean and sophisticated, perfect for enterprise or corporate applications

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
import { AnimationIntensity } from '../types/animationIntensity';


import type { ThemeConfig } from '../types';

// Slate Blue primary - professional with blue undertones
const SLATE_PRIMARY = {
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

// Cool Blue secondary - subtle accent
const SLATE_SECONDARY = {
  '50': '239 246 255',
  '100': '219 234 254',
  '200': '191 219 254',
  '300': '147 197 253',
  '400': '96 165 250',
  '500': '59 130 246',
  '600': '37 99 235',
  '700': '29 78 216',
  '800': '30 64 175',
  '900': '30 58 138',
};

// Pure Slate neutral - refined gray
const SLATE_NEUTRAL = {
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

const SLATE_STATUS = {
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
    '50': '239 246 255',
    '100': '219 234 254',
    '200': '191 219 254',
    '500': '59 130 246',
    '700': '29 78 216',
  },
};

const SLATE_LIGHT_MODE = {
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
    link: '59 130 246',
    linkHover: '37 99 235',
  },
  borders: {
    default: '226 232 240',
    strong: '148 163 184',
    subtle: '241 245 249',
    focus: '59 130 246',
    divider: '226 232 240',
  },
};

const SLATE_DARK_MODE = {
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
    link: '96 165 250',
    linkHover: '147 197 253',
  },
  borders: {
    default: '71 85 105',
    strong: '100 116 139',
    subtle: '51 65 85',
    focus: '96 165 250',
    divider: '51 65 85',
  },
};

export const SLATE_THEME: ThemeConfig = {
  id: 'slate',
  name: 'Slate',
  primary: SLATE_PRIMARY,
  secondary: SLATE_SECONDARY,
  neutral: SLATE_NEUTRAL,
  status: SLATE_STATUS,
  layout: DEFAULT_LAYOUT,
  spacing: DEFAULT_SPACING,
  borderRadius: DEFAULT_BORDER_RADIUS,
  shadows: DEFAULT_SHADOWS,
  typography: DEFAULT_TYPOGRAPHY,
  transitions: DEFAULT_TRANSITIONS,
  animations: { ...DEFAULT_ANIMATIONS, intensity: AnimationIntensity.Subtle },
  light: SLATE_LIGHT_MODE,
  dark: SLATE_DARK_MODE,
  components: DEFAULT_COMPONENTS,
};
