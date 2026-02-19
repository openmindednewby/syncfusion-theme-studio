// Feedback and interaction component type definitions

import type { AnimationEffect } from './animationEffect';
import type { ErrorAnimationType } from './errorAnimationType';
import type { FlexAlign } from './flexAlign';
import type { FlexDirection } from './flexDirection';
import type { FlexJustify } from './flexJustify';
import type { FlexWrap } from './flexWrap';

export { ErrorAnimationType } from './errorAnimationType';
export { FlexAlign } from './flexAlign';
export { FlexDirection } from './flexDirection';
export { FlexGapSize } from './flexGapSize';
export { FlexJustify } from './flexJustify';
export { FlexWrap } from './flexWrap';

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
  /** Text color for dropdown items */
  itemTextColor: string;
  /** Font size for dropdown items */
  itemFontSize: string;
  /** Padding for dropdown items */
  itemPadding: string;
  /** Box shadow for popup */
  popupShadow: string;
  /** Max height for popup dropdown */
  popupMaxHeight: string;
  /** Border radius for popup */
  popupBorderRadius: string;
  /** Background for search input in searchable select */
  searchInputBackground: string;
  /** Border color for search input */
  searchInputBorderColor: string;
  /** Transition duration for animations */
  transitionDuration: string;
  /** Focus ring color */
  focusRingColor: string;
  /** Focus ring width */
  focusRingWidth: string;
  /** Opacity when disabled */
  disabledOpacity: string;
  animationEffect: AnimationEffect;
  animationDuration: string;
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
  animationEffect: AnimationEffect;
  animationDuration: string;
}

export interface FlexBoxConfig {
  containerBackground: string;
  containerBorderColor: string;
  containerBorderRadius: string;
  containerPadding: string;
  gap: string;
  direction: FlexDirection;
  wrap: FlexWrap;
  justifyContent: FlexJustify;
  alignItems: FlexAlign;
  itemBackground: string;
  itemBorderColor: string;
  itemBorderRadius: string;
  itemPadding: string;
}

export interface ErrorMessagesConfig {
  textColor: string;
  fontSize: string;
  fontWeight: string;
  animation: ErrorAnimationType;
  animationDuration: string;
  iconColor: string;
  iconSize: string;
}

export interface AlertVariantConfig {
  background: string;
  textColor: string;
  borderColor: string;
  iconColor: string;
}

export interface AlertsConfig {
  success: AlertVariantConfig;
  warning: AlertVariantConfig;
  error: AlertVariantConfig;
  info: AlertVariantConfig;
  borderRadius: string;
  borderWidth: string;
  padding: string;
  animationEffect: AnimationEffect;
  animationDuration: string;
}

export interface ToastConfig {
  background: string;
  textColor: string;
  titleColor: string;
  borderColor: string;
  borderRadius: string;
  shadow: string;
  closeButtonColor: string;
  closeButtonHoverColor: string;
  progressBarColor: string;
  successBackground: string;
  successTextColor: string;
  successIconColor: string;
  warningBackground: string;
  warningTextColor: string;
  warningIconColor: string;
  errorBackground: string;
  errorTextColor: string;
  errorIconColor: string;
  infoBackground: string;
  infoTextColor: string;
  infoIconColor: string;
  animationEffect: AnimationEffect;
  animationDuration: string;
}

export interface MessageConfig {
  borderRadius: string;
  successBackground: string;
  successTextColor: string;
  successBorderColor: string;
  warningBackground: string;
  warningTextColor: string;
  warningBorderColor: string;
  errorBackground: string;
  errorTextColor: string;
  errorBorderColor: string;
  infoBackground: string;
  infoTextColor: string;
  infoBorderColor: string;
  normalBackground: string;
  normalTextColor: string;
  normalBorderColor: string;
}

export interface ChipConfig {
  // Base/default chip
  background: string;
  textColor: string;
  borderColor: string;
  borderRadius: string;
  // Hover state
  hoverBackground: string;
  hoverTextColor: string;
  // Primary variant
  primaryBackground: string;
  primaryTextColor: string;
  primaryBorderColor: string;
  // Success variant
  successBackground: string;
  successTextColor: string;
  successBorderColor: string;
  // Warning variant
  warningBackground: string;
  warningTextColor: string;
  warningBorderColor: string;
  // Danger variant
  dangerBackground: string;
  dangerTextColor: string;
  dangerBorderColor: string;
}
