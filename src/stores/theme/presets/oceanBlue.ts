// Ocean Blue Theme Preset
// Professional blue theme inspired by Salesforce and enterprise applications
// Deep ocean blues with subtle cyan accents for a trustworthy, modern look

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

// Deep Ocean Blue primary - professional, trustworthy
const OCEAN_BLUE_PRIMARY = {
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

// Teal/Cyan secondary - refreshing, innovative
const OCEAN_BLUE_SECONDARY = {
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

// Cool Gray neutral - clean, professional
const OCEAN_BLUE_NEUTRAL = {
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

const OCEAN_BLUE_STATUS = {
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
    '50': '240 249 255',
    '100': '224 242 254',
    '200': '186 230 253',
    '500': '14 165 233',
    '700': '3 105 161',
  },
};

const OCEAN_BLUE_LIGHT_MODE = {
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
    link: '14 165 233',
    linkHover: '2 132 199',
  },
  borders: {
    default: '226 232 240',
    strong: '148 163 184',
    subtle: '241 245 249',
    focus: '14 165 233',
    divider: '226 232 240',
  },
};

const OCEAN_BLUE_DARK_MODE = {
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
    link: '56 189 248',
    linkHover: '125 211 252',
  },
  borders: {
    default: '71 85 105',
    strong: '100 116 139',
    subtle: '51 65 85',
    focus: '56 189 248',
    divider: '51 65 85',
  },
};

export const OCEAN_BLUE_THEME: ThemeConfig = {
  id: 'ocean-blue',
  name: 'Ocean Blue',
  primary: OCEAN_BLUE_PRIMARY,
  secondary: OCEAN_BLUE_SECONDARY,
  neutral: OCEAN_BLUE_NEUTRAL,
  status: OCEAN_BLUE_STATUS,
  layout: DEFAULT_LAYOUT,
  spacing: DEFAULT_SPACING,
  borderRadius: DEFAULT_BORDER_RADIUS,
  shadows: DEFAULT_SHADOWS,
  typography: DEFAULT_TYPOGRAPHY,
  transitions: DEFAULT_TRANSITIONS,
  animations: { ...DEFAULT_ANIMATIONS, intensity: AnimationIntensity.Subtle },
  light: OCEAN_BLUE_LIGHT_MODE,
  dark: OCEAN_BLUE_DARK_MODE,
  components: DEFAULT_COMPONENTS,
};
