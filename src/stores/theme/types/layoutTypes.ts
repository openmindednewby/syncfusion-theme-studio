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

export interface FontSizeScale {
  xs: string;
  sm: string;
  base: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
}

export interface FontWeightScale {
  light: string;
  normal: string;
  medium: string;
  semibold: string;
  bold: string;
}

export interface LineHeightScale {
  tight: string;
  normal: string;
  relaxed: string;
}

export interface LetterSpacingScale {
  tight: string;
  normal: string;
  wide: string;
}

export interface TypographyConfig {
  fontSans: string;
  fontMono: string;
  fontSize: FontSizeScale;
  fontWeight: FontWeightScale;
  lineHeight: LineHeightScale;
  letterSpacing: LetterSpacingScale;
}

export { FontFamilyType } from './fontFamilyType';
export { TransitionType } from './transitionType';

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
