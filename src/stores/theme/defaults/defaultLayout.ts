// Default layout configurations

import type {
  BorderRadiusConfig,
  LayoutConfig,
  ShadowConfig,
  SpacingConfig,
  TransitionConfig,
  TypographyConfig,
} from '../types';

export const DEFAULT_LAYOUT: LayoutConfig = {
  sidebarWidth: '280px',
  sidebarCollapsedWidth: '64px',
  headerHeight: '64px',
  contentMaxWidth: '1440px',
  contentFullWidth: true,
};

export const DEFAULT_SPACING: SpacingConfig = {
  baseUnit: 4,
};

export const DEFAULT_BORDER_RADIUS: BorderRadiusConfig = {
  none: '0px',
  xs: '2px',
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  full: '9999px',
};

export const DEFAULT_SHADOWS: ShadowConfig = {
  none: 'none',
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
};

export const DEFAULT_TYPOGRAPHY: TypographyConfig = {
  fontSans: "ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'",
  fontMono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
  },
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },
  letterSpacing: {
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
  },
};

export const DEFAULT_TRANSITIONS: TransitionConfig = {
  fast: '150ms',
  normal: '200ms',
  slow: '300ms',
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
};
