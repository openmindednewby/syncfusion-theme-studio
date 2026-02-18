// Component-specific type definitions (barrel re-exports and composite interfaces)

import type { DataGridConfig } from './dataComponentTypes';
import type { AvatarConfig, ProgressBarConfig, TabsConfig, TimelineConfig, TooltipConfig } from './dataDisplayComponentTypes';
import type { AlertBadgesConfig, BadgesConfig, CardsConfig, ModalsConfig } from './displayComponentTypes';
import type { AlertsConfig, ChipConfig, DatePickerConfig, DialogConfig, ErrorMessagesConfig, FlexBoxConfig, MessageConfig, SelectConfig, ToastConfig } from './feedbackComponentTypes';
import type { ButtonsComponentConfig, InputsConfig } from './formComponentTypes';
import type { HeaderComponentConfig, SidebarComponentConfig } from './layoutComponentTypes';
import type { AccordionConfig, BreadcrumbConfig, MenuConfig, ToolbarConfig } from './navigationComponentTypes';
import type { PaginationConfig } from './paginationTypes';

// Re-export const enums (value exports)
export { ShadowScale } from './shadowScale';
export { ButtonVariant } from './buttonVariant';

// Re-export layout component types
export type { HeaderComponentConfig, SidebarComponentConfig } from './layoutComponentTypes';

// Re-export form component types
export type { ButtonStateColors, ButtonsComponentConfig, InputsConfig } from './formComponentTypes';

// Re-export data component types
export type { DataGridConfig } from './dataComponentTypes';

// Re-export display component types
export type { AlertBadgesConfig, BadgePadding, BadgeTypography, BadgeVariant, BadgesConfig, CardsConfig, ModalsConfig } from './displayComponentTypes';

// Re-export pagination types
export type { PaginationConfig } from './paginationTypes';

// Re-export feedback component types
export type { SelectConfig, DatePickerConfig, DialogConfig, FlexDirection, FlexWrap, FlexJustify, FlexAlign, FlexBoxConfig, ErrorAnimationType, ErrorMessagesConfig, AlertVariantConfig, AlertsConfig, ToastConfig, MessageConfig, ChipConfig } from './feedbackComponentTypes';

// Re-export navigation component types
export type { AccordionConfig, ToolbarConfig, MenuConfig, BreadcrumbConfig } from './navigationComponentTypes';

// Re-export data display component types
export type { TabsConfig, TimelineConfig, AvatarConfig, ProgressBarConfig, TooltipConfig } from './dataDisplayComponentTypes';

/** Single component configuration (for one mode) */
export interface ComponentConfigSingle {
  header: HeaderComponentConfig;
  sidebar: SidebarComponentConfig;
  buttons: ButtonsComponentConfig;
  inputs: InputsConfig;
  dataGrid: DataGridConfig;
  cards: CardsConfig;
  modals: ModalsConfig;
  badges: BadgesConfig;
  alertBadges: AlertBadgesConfig;
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
}

/** Mode-aware components configuration with light and dark variants */
export interface ComponentsConfig {
  light: ComponentConfigSingle;
  dark: ComponentConfigSingle;
}
