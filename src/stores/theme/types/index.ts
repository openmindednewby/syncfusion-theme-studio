// Theme store types - barrel export

// Re-export all color types
export {
  Mode,
  StatusKey,
  StatusShade,
} from './colorTypes';

export type {
  ColorScale,
  StatusColor,
  StatusColors,
  ColorShade,
  BackgroundColors,
  TextColors,
  BorderColors,
  ThemeModeConfig,
  ThemeModeConfigUpdate,
} from './colorTypes';

// Re-export all layout types (const enums + interfaces)
export {
  FontFamilyType,
  TransitionType,
} from './layoutTypes';

export type {
  LayoutConfig,
  BorderRadiusConfig,
  FontSizeScale,
  FontWeightScale,
  LineHeightScale,
  LetterSpacingScale,
  TypographyConfig,
  TransitionConfig,
  SpacingConfig,
  ShadowConfig,
} from './layoutTypes';

// Re-export layout component types (const enums + interfaces)
export {
  ShadowScale,
  ButtonVariant,
} from './componentTypes';

export type {
  HeaderComponentConfig,
  SidebarComponentConfig,
  ButtonStateColors,
  ButtonsComponentConfig,
  InputsConfig,
  DataGridConfig,
  CardsConfig,
  ModalsConfig,
  BadgeVariant,
  BadgesConfig,
  AccordionConfig,
  ToolbarConfig,
  MenuConfig,
  BreadcrumbConfig,
  PaginationConfig,
  ComponentConfigSingle,
  ComponentsConfig,
} from './componentTypes';

// Re-export feedback component types (const enums + interfaces)
export {
  FlexDirection,
  FlexWrap,
  FlexJustify,
  FlexAlign,
  ErrorAnimationType,
} from './feedbackComponentTypes';

export type {
  SelectConfig,
  DatePickerConfig,
  DialogConfig,
  FlexBoxConfig,
  ErrorMessagesConfig,
  AlertVariantConfig,
  AlertsConfig,
  ToastConfig,
  MessageConfig,
  ChipConfig,
} from './feedbackComponentTypes';

// Re-export data display component types
export type {
  TabsConfig,
  TimelineConfig,
  AvatarConfig,
  ProgressBarConfig,
  TooltipConfig,
} from './componentTypes';

// Re-export theme config and state types
export type { ThemeConfig, ThemeState } from './themeTypes';
