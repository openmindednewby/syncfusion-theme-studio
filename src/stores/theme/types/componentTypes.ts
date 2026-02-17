/* eslint-disable max-lines */
// Component-specific type definitions

import type { AvatarConfig, ProgressBarConfig, TabsConfig, TimelineConfig, TooltipConfig } from './dataDisplayComponentTypes';
import type { AlertsConfig, ChipConfig, DatePickerConfig, DialogConfig, ErrorMessagesConfig, FlexBoxConfig, MessageConfig, SelectConfig, ToastConfig } from './feedbackComponentTypes';
import type { AccordionConfig, BreadcrumbConfig, MenuConfig, ToolbarConfig } from './navigationComponentTypes';
import type { PaginationConfig } from './paginationTypes';
import type { ShadowScale } from './shadowScale';

export { ShadowScale } from './shadowScale';
export interface HeaderComponentConfig {
  background: string;
  textColor: string;
  borderBottom: string;
  height: string;
  shadow: ShadowScale;
}
export interface SidebarComponentConfig {
  background: string;
  textColor: string;
  activeItemBackground: string;
  activeItemTextColor: string;
  hoverItemBackground: string;
  borderRight: string;
  widthExpanded: string;
  widthCollapsed: string;
  transitionDuration: string;
  fontSize: string;
  fontWeight: string;
  iconSize: string;
  iconStrokeWidth: string;
  expandAnimationEnabled: boolean;
  expandAnimationDuration: string;
  showScrollbar: boolean;
  searchBackground: string;
  searchBorder: string;
  searchBorderRadius: string;
  searchTextColor: string;
  searchPlaceholderColor: string;
  searchFocusBackground: string;
  searchFocusBorder: string;
  searchFontSize: string;
  searchPadding: string;
}
export interface ButtonStateColors {
  background: string;
  backgroundHover: string;
  backgroundActive: string;
  textColor: string;
  textColorHover: string;
  borderColor: string;
  borderWidth: string;
  borderRadius: string;
  shadow: ShadowScale;
}
export { ButtonVariant } from './buttonVariant';
export interface ButtonsComponentConfig {
  primary: ButtonStateColors;
  secondary: ButtonStateColors;
  outline: ButtonStateColors;
  ghost: ButtonStateColors;
  danger: ButtonStateColors;
  transitionDuration: string;
}
export interface InputsConfig {
  background: string;
  borderDefault: string;
  borderHover: string;
  borderFocus: string;
  borderError: string;
  textColor: string;
  placeholderColor: string;
  labelColor: string;
  helperTextColor: string;
  errorTextColor: string;
  focusRingColor: string;
  borderRadius: string;
  transitionDuration: string;
}
export interface DataGridConfig {
  headerBackground: string;
  headerTextColor: string;
  headerBorder: string;
  rowEvenBackground: string;
  rowOddBackground: string;
  rowHoverBackground: string;
  rowSelectedBackground: string;
  cellBorderColor: string;
  cellPadding: string;
  paginationBackground: string;
  toolbarBackground: string;
  toolbarTextColor: string;
  toolbarBorderColor: string;
  filterRowBackground: string;
  filterRowBorderColor: string;
  filterInputBackground: string;
  groupHeaderBackground: string;
  groupHeaderTextColor: string;
  groupDropAreaBackground: string;
  footerBackground: string;
  footerTextColor: string;
  editCellBackground: string;
  editCellBorderColor: string;
  editDirtyIndicatorColor: string;
  rowSelectedTextColor: string;
  cellSelectedBackground: string;
  sortIconColor: string;
  resizeHandleColor: string;
  paginationTextColor: string;
  paginationActiveBackground: string;
  paginationActiveTextColor: string;
  paginationHoverBackground: string;
  paginationBorderColor: string;
  pagerContainerBorderColor: string;
  paginationDefaultPageSize: number;
  paginationPageSizeOptions: string;
  paginationNavColor: string;
  paginationNavDisabledColor: string;
  paginationInfoTextColor: string;
  actionButtonColor: string;
  actionButtonHoverColor: string;
  detailRowBackground: string;
  dragHandleColor: string;
  defaultTextAlign: string;
  headerTextAlign: string;
  headerTextPadding: string;
  defaultVerticalAlign: string;
  headerVerticalAlign: string;
  rowHeight: string;
  columnMenuBackground: string;
  columnMenuTextColor: string;
  columnMenuBorderColor: string;
  columnMenuHoverBackground: string;
  columnMenuSeparatorColor: string;
  columnMenuTriggerColor: string;
  columnMenuTriggerHoverColor: string;
  headerTextTransform: string;
  headerFontSize: string;
  headerFontWeight: string;
  headerLetterSpacing: string;
}

export interface CardsConfig {
  background: string;
  borderColor: string;
  borderRadius: string;
  shadowDefault: string;
  shadowHover: string;
  paddingSm: string;
  paddingMd: string;
  paddingLg: string;
  headerBackground: string;
  footerBackground: string;
  textColor: string;
  titleColor: string;
  subtitleColor: string;
  borderWidth: string;
  hoverBorderColor: string;
  headerTextColor: string;
  headerBorderColor: string;
  footerBorderColor: string;
  contentPadding: string;
  imageOverlayColor: string;
  actionTextColor: string;
  actionHoverColor: string;
  transitionDuration: string;
}

export interface ModalsConfig {
  backdropColor: string;
  backdropBlur: string;
  contentBackground: string;
  borderColor: string;
  borderRadius: string;
  shadow: string;
  headerBackground: string;
  footerBackground: string;
}

export type { PaginationConfig } from './paginationTypes';

export interface BadgeVariant {
  background: string;
  textColor: string;
  borderColor: string;
}

export interface BadgesConfig {
  success: BadgeVariant;
  warning: BadgeVariant;
  error: BadgeVariant;
  info: BadgeVariant;
  borderRadius: string;
  padding: string;
}

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

export type { SelectConfig, DatePickerConfig, DialogConfig, FlexDirection, FlexWrap, FlexJustify, FlexAlign, FlexBoxConfig, ErrorAnimationType, ErrorMessagesConfig, AlertVariantConfig, AlertsConfig, ToastConfig, MessageConfig, ChipConfig } from './feedbackComponentTypes';
export type { AccordionConfig, ToolbarConfig, MenuConfig, BreadcrumbConfig } from './navigationComponentTypes';
export type { TabsConfig, TimelineConfig, AvatarConfig, ProgressBarConfig, TooltipConfig } from './dataDisplayComponentTypes';
