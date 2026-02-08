// Main theme configuration and state types

import type {
  ColorScale,
  ColorShade,
  Mode,
  StatusColors,
  StatusKey,
  StatusShade,
  ThemeModeConfig,
} from './colorTypes';
import type {
  ButtonStateColors,
  ButtonVariant,
  ComponentsConfig,
  HeaderComponentConfig,
  SidebarComponentConfig,
} from './componentTypes';
import type {
  BorderRadiusConfig,
  LayoutConfig,
  ShadowConfig,
  SpacingConfig,
  TransitionConfig,
  TypographyConfig,
} from './layoutTypes';

export interface ThemeConfig {
  id: string;
  name: string;
  primary: ColorScale;
  secondary: ColorScale;
  neutral: ColorScale;
  status: StatusColors;
  layout: LayoutConfig;
  spacing: SpacingConfig;
  borderRadius: BorderRadiusConfig;
  shadows: ShadowConfig;
  typography: TypographyConfig;
  transitions: TransitionConfig;
  light: ThemeModeConfig;
  dark: ThemeModeConfig;
  components: ComponentsConfig;
}

export interface ThemeState {
  mode: Mode;
  theme: ThemeConfig;
  setMode: (mode: Mode) => void;
  toggleMode: () => void;
  updateTheme: (updates: Partial<ThemeConfig>) => void;
  updatePrimaryColor: (shade: ColorShade, value: string) => void;
  updateSecondaryColor: (shade: ColorShade, value: string) => void;
  updateNeutralColor: (shade: ColorShade, value: string) => void;
  updateStatusColor: (status: StatusKey, shade: StatusShade, value: string) => void;
  updateModeConfig: (mode: Mode, updates: Partial<ThemeModeConfig>) => void;
  updateHeaderConfig: (updates: Partial<HeaderComponentConfig>) => void;
  updateSidebarConfig: (updates: Partial<SidebarComponentConfig>) => void;
  updateButtonConfig: (variant: ButtonVariant, updates: Partial<ButtonStateColors>) => void;
  resetTheme: () => void;
  exportTheme: () => string;
  importTheme: (json: string) => boolean;
}
