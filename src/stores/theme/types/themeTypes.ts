// Main theme configuration and state types

import type {
  ColorScale,
  ColorShade,
  Mode,
  StatusColors,
  StatusKey,
  StatusShade,
  ThemeModeConfig,
  ThemeModeConfigUpdate,
} from './colorTypes';
import type {
  BadgesConfig,
  ButtonStateColors,
  ButtonVariant,
  CardsConfig,
  ComponentsConfig,
  DataGridConfig,
  DatePickerConfig,
  DialogConfig,
  HeaderComponentConfig,
  InputsConfig,
  ModalsConfig,
  SelectConfig,
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
  /** Updates entire primary palette and cascades to component colors */
  updatePrimaryPalette: (baseColor: string, cascadeToComponents: boolean) => void;
  updateModeConfig: (mode: Mode, updates: ThemeModeConfigUpdate) => void;
  // Component actions now update the current mode's config
  updateHeaderConfig: (updates: Partial<HeaderComponentConfig>) => void;
  updateSidebarConfig: (updates: Partial<SidebarComponentConfig>) => void;
  updateButtonConfig: (variant: ButtonVariant, updates: Partial<ButtonStateColors>) => void;
  updateInputConfig: (updates: Partial<InputsConfig>) => void;
  updateDataGridConfig: (updates: Partial<DataGridConfig>) => void;
  updateCardsConfig: (updates: Partial<CardsConfig>) => void;
  updateModalsConfig: (updates: Partial<ModalsConfig>) => void;
  updateBadgesConfig: (updates: Partial<BadgesConfig>) => void;
  updateSelectConfig: (updates: Partial<SelectConfig>) => void;
  updateDatePickerConfig: (updates: Partial<DatePickerConfig>) => void;
  updateDialogConfig: (updates: Partial<DialogConfig>) => void;
  // Typography actions
  updateFontFamily: (type: 'sans' | 'mono', value: string) => void;
  updateTransition: (type: 'fast' | 'normal' | 'slow' | 'easing', value: string) => void;
  // Layout actions
  updateLayoutDimension: (key: keyof LayoutConfig, value: string) => void;
  updateSpacingBaseUnit: (value: number) => void;
  updateBorderRadius: (key: keyof BorderRadiusConfig, value: string) => void;
  updateShadow: (key: keyof ShadowConfig, value: string) => void;
  resetTheme: () => void;
  exportTheme: () => string;
  importTheme: (json: string) => boolean;
}
