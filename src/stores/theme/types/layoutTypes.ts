// Layout and configuration type definitions

export interface LayoutConfig {
  sidebarWidth: string;
  sidebarCollapsedWidth: string;
  headerHeight: string;
  contentMaxWidth: string;
  contentFullWidth: boolean;
}

export interface BorderRadiusConfig {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  full: string;
}

export interface TypographyConfig {
  fontSans: string;
  fontMono: string;
}

export interface TransitionConfig {
  fast: string;
  normal: string;
  slow: string;
  easing: string;
}

export interface SpacingConfig {
  baseUnit: number; // Base unit in pixels (default 4)
}

export interface ShadowConfig {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}
