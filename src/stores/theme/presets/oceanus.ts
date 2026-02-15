// Oceanus Theme Preset
// SOAR/SIEM-inspired theme with teal primary and deep navy backgrounds
// Dark mode optimized for security operations dashboards

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

// Teal primary - modern security dashboard feel
// 600-900 darkened for WCAG AA contrast (≥4.5:1) with white text
const OCEANUS_PRIMARY = {
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

// Cyan secondary - accent for highlights and data visualizations
const OCEANUS_SECONDARY = {
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

// Deep navy neutral - dark, immersive
const OCEANUS_NEUTRAL = {
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

const OCEANUS_STATUS = {
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

const OCEANUS_LIGHT_MODE = {
  backgrounds: {
    page: '255 255 255',
    surface: '248 250 252',
    surfaceElevated: '255 255 255',
    surfaceSunken: '241 245 249',
    overlay: '15 23 42',
  },
  text: {
    primary: '15 23 42',
    secondary: '51 65 85',
    muted: '100 116 139',
    disabled: '148 163 184',
    inverse: '255 255 255',
    link: '13 148 136',
    linkHover: '15 118 110',
  },
  borders: {
    default: '226 232 240',
    strong: '148 163 184',
    subtle: '241 245 249',
    focus: '20 184 166',
    divider: '226 232 240',
  },
};

const OCEANUS_DARK_MODE = {
  backgrounds: {
    page: '11 17 32',
    surface: '17 24 39',
    surfaceElevated: '31 41 55',
    surfaceSunken: '7 11 22',
    overlay: '0 0 0',
  },
  text: {
    primary: '248 250 252',
    secondary: '148 163 184',
    muted: '100 116 139',
    disabled: '71 85 105',
    inverse: '15 23 42',
    link: '45 212 191',
    linkHover: '94 234 212',
  },
  borders: {
    default: '51 65 85',
    strong: '71 85 105',
    subtle: '30 41 59',
    focus: '45 212 191',
    divider: '31 41 55',
  },
};

export const OCEANUS_THEME: ThemeConfig = {
  id: 'oceanus',
  name: 'Oceanus',
  primary: OCEANUS_PRIMARY,
  secondary: OCEANUS_SECONDARY,
  neutral: OCEANUS_NEUTRAL,
  status: OCEANUS_STATUS,
  layout: DEFAULT_LAYOUT,
  spacing: DEFAULT_SPACING,
  borderRadius: DEFAULT_BORDER_RADIUS,
  shadows: DEFAULT_SHADOWS,
  typography: DEFAULT_TYPOGRAPHY,
  transitions: DEFAULT_TRANSITIONS,
  animations: DEFAULT_ANIMATIONS,
  light: OCEANUS_LIGHT_MODE,
  dark: OCEANUS_DARK_MODE,
  components: DEFAULT_COMPONENTS,
};
