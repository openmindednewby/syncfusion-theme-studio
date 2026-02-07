// Theme store types

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
  '500': string;
  '700': string;
}

export interface StatusColors {
  success: StatusColor;
  warning: StatusColor;
  error: StatusColor;
  info: StatusColor;
}

export interface LayoutConfig {
  sidebarWidth: string;
  sidebarCollapsedWidth: string;
  headerHeight: string;
}

export interface BorderRadiusConfig {
  none: string;
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
}

export interface ThemeModeConfig {
  background: string;
  surface: string;
  surfaceElevated: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  primary: ColorScale;
  status: StatusColors;
  layout: LayoutConfig;
  borderRadius: BorderRadiusConfig;
  typography: TypographyConfig;
  transitions: TransitionConfig;
  light: ThemeModeConfig;
  dark: ThemeModeConfig;
}

export interface ThemeState {
  mode: Mode;
  theme: ThemeConfig;
  setMode: (mode: Mode) => void;
  toggleMode: () => void;
  updateTheme: (updates: Partial<ThemeConfig>) => void;
  updatePrimaryColor: (shade: keyof ColorScale, value: string) => void;
  resetTheme: () => void;
  exportTheme: () => string;
  importTheme: (json: string) => boolean;
}
