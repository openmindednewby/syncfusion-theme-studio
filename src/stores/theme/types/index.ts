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
  ButtonTypography,
  ButtonPadding,
  ButtonFocusRing,
  InputsConfig,
  DataGridConfig,
  CardsConfig,
  ModalsConfig,
  AlertBadgesConfig,
  BadgePadding,
  BadgeTypography,
  BadgeVariant,
  BadgesConfig,
  ExternalLinkConfig,
  ExternalLinkTypography,
  TextDescriptionConfig,
  AccordionConfig,
  ToolbarConfig,
  MenuConfig,
  BreadcrumbConfig,
  PaginationConfig,
  IconButtonConfig,
  IconButtonVariantColors,
  FabConfig,
  SplitButtonConfig,
  ComponentConfigSingle,
  ComponentsConfig,
} from './componentTypes';

// Re-export form control types
export type { CheckboxConfig } from './checkboxTypes';
export type { RadioConfig } from './radioTypes';
export type { ToggleConfig } from './toggleTypes';

// Re-export feedback component types (const enums + interfaces)
export {
  FlexDirection,
  FlexWrap,
  FlexJustify,
  FlexAlign,
  FlexGapSize,
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

// Re-export animation types (const enums + interfaces)
export {
  AnimationEffect,
} from './animationEffect';

export {
  AnimationIntensity,
} from './animationIntensity';

export type {
  AnimationConfig,
} from './animationTypes';

// Re-export typography component types
export { TypographyTextColor } from './typographyTextColor';

export type {
  TypographyLevelConfig,
  TypographyComponentsConfig,
} from './typographyComponentTypes';

// Re-export theme config and state types
export type { ThemeConfig, ThemeState } from './themeTypes';
