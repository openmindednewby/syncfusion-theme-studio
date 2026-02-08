// Default theme configuration - assembled from split config files

import {
  DEFAULT_BORDER_RADIUS,
  DEFAULT_COMPONENTS,
  DEFAULT_DARK_MODE,
  DEFAULT_LAYOUT,
  DEFAULT_LIGHT_MODE,
  DEFAULT_NEUTRAL,
  DEFAULT_PRIMARY,
  DEFAULT_SECONDARY,
  DEFAULT_SHADOWS,
  DEFAULT_SPACING,
  DEFAULT_STATUS,
  DEFAULT_TRANSITIONS,
  DEFAULT_TYPOGRAPHY,
} from './defaults';

import type { ThemeConfig } from './types';


export const DEFAULT_THEME: ThemeConfig = {
  id: 'default',
  name: 'Default Blue',
  primary: DEFAULT_PRIMARY,
  secondary: DEFAULT_SECONDARY,
  neutral: DEFAULT_NEUTRAL,
  status: DEFAULT_STATUS,
  layout: DEFAULT_LAYOUT,
  spacing: DEFAULT_SPACING,
  borderRadius: DEFAULT_BORDER_RADIUS,
  shadows: DEFAULT_SHADOWS,
  typography: DEFAULT_TYPOGRAPHY,
  transitions: DEFAULT_TRANSITIONS,
  light: DEFAULT_LIGHT_MODE,
  dark: DEFAULT_DARK_MODE,
  components: DEFAULT_COMPONENTS,
};
