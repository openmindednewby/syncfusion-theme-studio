// Theme store types - barrel export

// Re-export all color types
export type {
  Mode,
  ColorScale,
  StatusColor,
  StatusColors,
  StatusKey,
  StatusShade,
  ColorShade,
  BackgroundColors,
  TextColors,
  BorderColors,
  ThemeModeConfig,
  ThemeModeConfigUpdate,
} from './colorTypes';

// Re-export all layout types
export type {
  LayoutConfig,
  BorderRadiusConfig,
  TypographyConfig,
  TransitionConfig,
  SpacingConfig,
  ShadowConfig,
} from './layoutTypes';

// Re-export all component types
export type {
  ShadowScale,
  HeaderComponentConfig,
  SidebarComponentConfig,
  ButtonStateColors,
  ButtonVariant,
  ButtonsComponentConfig,
  InputsConfig,
  DataGridConfig,
  CardsConfig,
  ModalsConfig,
  BadgeVariant,
  BadgesConfig,
  SelectConfig,
  DatePickerConfig,
  DialogConfig,
  FlexDirection,
  FlexWrap,
  FlexJustify,
  FlexAlign,
  FlexBoxConfig,
  ErrorAnimationType,
  ErrorMessagesConfig,
  AlertVariantConfig,
  AlertsConfig,
  ToastConfig,
  MessageConfig,
  ComponentConfigSingle,
  ComponentsConfig,
} from './componentTypes';

// Re-export theme config and state types
export type { ThemeConfig, ThemeState } from './themeTypes';
