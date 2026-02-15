// CyberWatch Theme Preset
// SIEM dashboard theme with cyan primary accents and deep navy dark mode
// Designed for security operations centers with clean light mode
// and immersive deep navy dark mode for monitoring dashboards

import {
  DEFAULT_ANIMATIONS,
  DEFAULT_BORDER_RADIUS,
  DEFAULT_LAYOUT,
  DEFAULT_SHADOWS,
  DEFAULT_SPACING,
  DEFAULT_TRANSITIONS,
  DEFAULT_TYPOGRAPHY,
} from '../defaults';
import { DEFAULT_COMPONENTS_DARK } from '../defaults/defaultComponentsDark';
import { DEFAULT_COMPONENTS_LIGHT } from '../defaults/defaultComponentsLight';

import type { ComponentsConfig, ThemeConfig } from '../types';

// Cyan primary - sharp, modern SIEM dashboard accent
// 600-900 darkened for WCAG AA contrast (>=4.5:1) with white text
const CYBERWATCH_PRIMARY = {
  '50': '224 247 250',
  '100': '178 235 242',
  '200': '128 222 234',
  '300': '77 208 225',
  '400': '38 198 218',
  '500': '0 188 212',
  '600': '0 151 167',
  '700': '0 105 118',
  '800': '0 88 99',
  '900': '0 70 80',
};

// Violet/Purple secondary - accent for badges, highlights, data visualizations
const CYBERWATCH_SECONDARY = {
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

// Cool navy-tinted neutral - deep, professional
const CYBERWATCH_NEUTRAL = {
  '50': '248 250 252',
  '100': '241 244 249',
  '200': '226 231 240',
  '300': '200 210 225',
  '400': '148 163 184',
  '500': '100 116 139',
  '600': '71 85 105',
  '700': '45 58 82',
  '800': '26 34 56',
  '900': '15 20 38',
};

const CYBERWATCH_STATUS = {
  success: { '50': '236 253 245', '100': '209 250 229', '200': '167 243 208', '500': '16 185 129', '700': '4 120 87' },
  warning: { '50': '255 251 235', '100': '254 243 199', '200': '253 230 138', '500': '245 158 11', '700': '180 83 9' },
  error: { '50': '254 242 242', '100': '254 226 226', '200': '254 202 202', '500': '239 68 68', '700': '185 28 28' },
  info: { '50': '224 247 250', '100': '178 235 242', '200': '128 222 234', '500': '0 188 212', '700': '0 151 167' },
};

const CYBERWATCH_LIGHT_MODE = {
  backgrounds: {
    page: '255 255 255',
    surface: '248 250 252',
    surfaceElevated: '255 255 255',
    surfaceSunken: '241 244 249',
    overlay: '15 20 38',
  },
  text: {
    primary: '15 20 38',
    secondary: '71 85 105',
    muted: '100 116 139',
    disabled: '148 163 184',
    inverse: '255 255 255',
    link: '0 151 167',
    linkHover: '0 105 118',
  },
  borders: {
    default: '226 231 240',
    strong: '148 163 184',
    subtle: '241 244 249',
    focus: '0 188 212',
    divider: '226 231 240',
  },
};

const CYBERWATCH_DARK_MODE = {
  backgrounds: {
    page: '11 17 32',
    surface: '17 24 39',
    surfaceElevated: '26 34 56',
    surfaceSunken: '7 11 22',
    overlay: '0 0 0',
  },
  text: {
    primary: '248 250 252',
    secondary: '148 163 184',
    muted: '100 116 139',
    disabled: '71 85 105',
    inverse: '15 20 38',
    link: '38 198 218',
    linkHover: '77 208 225',
  },
  borders: {
    default: '45 58 82',
    strong: '71 85 105',
    subtle: '26 34 56',
    focus: '38 198 218',
    divider: '26 34 56',
  },
};

const CYBERWATCH_COMPONENTS: ComponentsConfig = {
  light: {
    ...DEFAULT_COMPONENTS_LIGHT,
    sidebar: {
      ...DEFAULT_COMPONENTS_LIGHT.sidebar,
      activeItemBackground: '0 188 212',
      activeItemTextColor: '255 255 255',
    },
    dataGrid: {
      ...DEFAULT_COMPONENTS_LIGHT.dataGrid,
      paginationActiveBackground: '0 188 212',
    },
  },
  dark: {
    ...DEFAULT_COMPONENTS_DARK,
    sidebar: {
      ...DEFAULT_COMPONENTS_DARK.sidebar,
      background: '11 17 32',
      activeItemBackground: '0 188 212',
      activeItemTextColor: '255 255 255',
      textColor: '148 163 184',
      hoverItemBackground: '17 24 39',
      borderRight: '26 34 56',
    },
    badges: {
      success: { background: '16 185 129', textColor: '255 255 255', borderColor: '16 185 129' },
      warning: { background: '245 158 11', textColor: '255 255 255', borderColor: '245 158 11' },
      error: { background: '239 68 68', textColor: '255 255 255', borderColor: '239 68 68' },
      info: { background: '0 151 167', textColor: '255 255 255', borderColor: '0 151 167' },
      borderRadius: 'full',
      padding: '2px 8px',
    },
    inputs: {
      ...DEFAULT_COMPONENTS_DARK.inputs,
      background: '17 24 39',
      borderDefault: '45 58 82',
      borderFocus: '0 188 212',
      textColor: '248 250 252',
      placeholderColor: '100 116 139',
    },
    dataGrid: {
      ...DEFAULT_COMPONENTS_DARK.dataGrid,
      headerBackground: '17 24 39',
      headerTextColor: '148 163 184',
      rowEvenBackground: '11 17 32',
      rowOddBackground: '17 24 39',
      rowHoverBackground: '26 34 56',
      rowSelectedBackground: '0 60 70',
      cellBorderColor: '26 34 56',
      cellPadding: '8px 12px',
      rowHeight: '48px',
      paginationBackground: '11 17 32',
      paginationActiveBackground: '0 188 212',
      toolbarBackground: '17 24 39',
      filterRowBackground: '11 17 32',
      groupHeaderBackground: '26 34 56',
      footerBackground: '17 24 39',
    },
  },
};

export const CYBERWATCH_THEME: ThemeConfig = {
  id: 'cyberWatch',
  name: 'CyberWatch',
  primary: CYBERWATCH_PRIMARY,
  secondary: CYBERWATCH_SECONDARY,
  neutral: CYBERWATCH_NEUTRAL,
  status: CYBERWATCH_STATUS,
  layout: DEFAULT_LAYOUT,
  spacing: DEFAULT_SPACING,
  borderRadius: DEFAULT_BORDER_RADIUS,
  shadows: DEFAULT_SHADOWS,
  typography: DEFAULT_TYPOGRAPHY,
  transitions: DEFAULT_TRANSITIONS,
  animations: DEFAULT_ANIMATIONS,
  light: CYBERWATCH_LIGHT_MODE,
  dark: CYBERWATCH_DARK_MODE,
  components: CYBERWATCH_COMPONENTS,
};
