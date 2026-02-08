// Color-related type definitions

export type Mode = 'light' | 'dark';

export interface ColorScale {
  '50': string;
  '100': string;
  '200': string;
  '300': string;
  '400': string;
  '500': string;
  '600': string;
  '700': string;
  '800': string;
  '900': string;
}

export interface StatusColor {
  '50': string;
  '100': string;
  '200': string;
  '500': string;
  '700': string;
}

export interface StatusColors {
  success: StatusColor;
  warning: StatusColor;
  error: StatusColor;
  info: StatusColor;
}

export type StatusKey = 'success' | 'warning' | 'error' | 'info';
export type StatusShade = '50' | '100' | '200' | '500' | '700';
export type ColorShade = keyof ColorScale;

export interface BackgroundColors {
  page: string;
  surface: string;
  surfaceElevated: string;
  surfaceSunken: string;
  overlay: string;
}

export interface TextColors {
  primary: string;
  secondary: string;
  muted: string;
  disabled: string;
  inverse: string;
  link: string;
  linkHover: string;
}

export interface BorderColors {
  default: string;
  strong: string;
  subtle: string;
  focus: string;
  divider: string;
}

export interface ThemeModeConfig {
  backgrounds: BackgroundColors;
  text: TextColors;
  borders: BorderColors;
}

/** Deep partial version of ThemeModeConfig for update operations */
export interface ThemeModeConfigUpdate {
  backgrounds?: Partial<BackgroundColors>;
  text?: Partial<TextColors>;
  borders?: Partial<BorderColors>;
}
