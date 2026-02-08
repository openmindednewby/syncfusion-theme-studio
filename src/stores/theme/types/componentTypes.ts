// Component-specific type definitions

export type ShadowScale = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

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

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

export interface ButtonsComponentConfig {
  primary: ButtonStateColors;
  secondary: ButtonStateColors;
  outline: ButtonStateColors;
  ghost: ButtonStateColors;
  danger: ButtonStateColors;
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

export interface SelectConfig {
  background: string;
  borderDefault: string;
  borderHover: string;
  borderFocus: string;
  borderError: string;
  textColor: string;
  placeholderColor: string;
  iconColor: string;
  popupBackground: string;
  popupBorderColor: string;
  itemHoverBackground: string;
  itemSelectedBackground: string;
  itemSelectedTextColor: string;
  borderRadius: string;
}

export interface DatePickerConfig {
  background: string;
  borderDefault: string;
  borderHover: string;
  borderFocus: string;
  borderError: string;
  textColor: string;
  placeholderColor: string;
  iconColor: string;
  calendarBackground: string;
  calendarHeaderBackground: string;
  calendarHeaderTextColor: string;
  calendarCellHoverBackground: string;
  calendarSelectedBackground: string;
  calendarSelectedTextColor: string;
  calendarTodayBorderColor: string;
  calendarOtherMonthTextColor: string;
  borderRadius: string;
}

export interface DialogConfig {
  backdropColor: string;
  backdropBlur: string;
  contentBackground: string;
  borderColor: string;
  borderRadius: string;
  shadow: string;
  headerBackground: string;
  headerTextColor: string;
  footerBackground: string;
  closeButtonColor: string;
  closeButtonHoverBackground: string;
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
}

/** Mode-aware components configuration with light and dark variants */
export interface ComponentsConfig {
  light: ComponentConfigSingle;
  dark: ComponentConfigSingle;
}
