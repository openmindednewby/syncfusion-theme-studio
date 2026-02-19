// Component-specific type definitions (barrel re-exports and composite interfaces)

import type { CheckboxConfig } from './checkboxTypes';
import type { DataGridConfig } from './dataComponentTypes';
import type { AvatarConfig, ProgressBarConfig, TabsConfig, TimelineConfig, TooltipConfig } from './dataDisplayComponentTypes';
import type { AlertBadgesConfig, BadgesConfig, CardsConfig, ExternalLinkConfig, ModalsConfig, TextDescriptionConfig } from './displayComponentTypes';
import type { FabConfig } from './fabTypes';
import type { AlertsConfig, ChipConfig, DatePickerConfig, DialogConfig, ErrorMessagesConfig, FlexBoxConfig, MessageConfig, SelectConfig, ToastConfig } from './feedbackComponentTypes';
import type { ButtonsComponentConfig, InputsConfig } from './formComponentTypes';
import type { IconButtonConfig } from './iconButtonTypes';
import type { HeaderComponentConfig, SidebarComponentConfig } from './layoutComponentTypes';
import type { AccordionConfig, BreadcrumbConfig, MenuConfig, ToolbarConfig } from './navigationComponentTypes';
import type { PaginationConfig } from './paginationTypes';
import type { RadioConfig } from './radioTypes';
import type { SplitButtonConfig } from './splitButtonTypes';
import type { ToggleConfig } from './toggleTypes';

// Re-export const enums (value exports)
export { ShadowScale } from './shadowScale';
export { ButtonVariant } from './buttonVariant';

// Re-export layout component types
export type { HeaderComponentConfig, SidebarComponentConfig } from './layoutComponentTypes';

// Re-export form component types
export type { ButtonFocusRing, ButtonPadding, ButtonStateColors, ButtonsComponentConfig, ButtonTypography, InputsConfig } from './formComponentTypes';

// Re-export new button component types
export type { IconButtonConfig, IconButtonVariantColors } from './iconButtonTypes';
export type { FabConfig } from './fabTypes';
export type { SplitButtonConfig } from './splitButtonTypes';

// Re-export data component types
export type { DataGridConfig } from './dataComponentTypes';

// Re-export display component types
export type { AlertBadgesConfig, BadgePadding, BadgeTypography, BadgeVariant, BadgesConfig, CardsConfig, ExternalLinkConfig, ExternalLinkTypography, ModalsConfig, TextDescriptionConfig } from './displayComponentTypes';

// Re-export pagination types
export type { PaginationConfig } from './paginationTypes';

// Re-export form control types
export type { CheckboxConfig } from './checkboxTypes';
export type { RadioConfig } from './radioTypes';
export type { ToggleConfig } from './toggleTypes';

// Re-export feedback component types
export type { SelectConfig, DatePickerConfig, DialogConfig, FlexDirection, FlexWrap, FlexJustify, FlexAlign, FlexGapSize, FlexBoxConfig, ErrorAnimationType, ErrorMessagesConfig, AlertVariantConfig, AlertsConfig, ToastConfig, MessageConfig, ChipConfig } from './feedbackComponentTypes';

// Re-export navigation component types
export type { AccordionConfig, ToolbarConfig, MenuConfig, BreadcrumbConfig } from './navigationComponentTypes';

// Re-export data display component types
export type { TabsConfig, TimelineConfig, AvatarConfig, ProgressBarConfig, TooltipConfig } from './dataDisplayComponentTypes';

/** Single component configuration (for one mode) */
export interface ComponentConfigSingle {
  header: HeaderComponentConfig;
  sidebar: SidebarComponentConfig;
  buttons: ButtonsComponentConfig;
  iconButtons: IconButtonConfig;
  fab: FabConfig;
  splitButton: SplitButtonConfig;
  inputs: InputsConfig;
  dataGrid: DataGridConfig;
  cards: CardsConfig;
  modals: ModalsConfig;
  badges: BadgesConfig;
  alertBadges: AlertBadgesConfig;
  textDescription: TextDescriptionConfig;
  select: SelectConfig;
  datePicker: DatePickerConfig;
  dialog: DialogConfig;
  errorMessages: ErrorMessagesConfig;
  flexBox: FlexBoxConfig;
  alerts: AlertsConfig;
  toast: ToastConfig;
  message: MessageConfig;
  chips: ChipConfig;
  accordion: AccordionConfig;
  toolbar: ToolbarConfig;
  menu: MenuConfig;
  breadcrumb: BreadcrumbConfig;
  pagination: PaginationConfig;
  tabs: TabsConfig;
  timeline: TimelineConfig;
  avatar: AvatarConfig;
  progressBar: ProgressBarConfig;
  tooltip: TooltipConfig;
  checkbox: CheckboxConfig;
  radio: RadioConfig;
  toggle: ToggleConfig;
  externalLink: ExternalLinkConfig;
}

/** Mode-aware components configuration with light and dark variants */
export interface ComponentsConfig {
  light: ComponentConfigSingle;
  dark: ComponentConfigSingle;
}
