// Component-specific CSS variable injection utilities

import { injectButtonVariables, injectFabVariables, injectIconButtonVariables, injectSplitButtonVariables } from './buttonInjector';
import { injectAvatarVariables, injectProgressBarVariables, injectTabsVariables, injectTimelineVariables, injectTooltipVariables } from './dataDisplayInjector';
import { injectDataGridVariables } from './dataGridInjector';
import { injectAlertVariables, injectChipVariables, injectDatePickerVariables, injectDialogVariables, injectErrorMessageVariables, injectFlexBoxVariables, injectMessageVariables, injectSelectVariables, injectToastVariables } from './feedbackInjector';
import { loadLocalFont } from './fontLoader';
import { injectCheckboxVariables, injectRadioVariables, injectToggleVariables } from './formControlInjector';
import { injectAccordionVariables, injectBreadcrumbVariables, injectMenuVariables, injectToolbarVariables } from './navigationInjector';
import { injectPaginationVariables } from './paginationInjector';

import type { ComponentConfigSingle } from '../types';

export { injectButtonVariables, injectFabVariables, injectIconButtonVariables, injectSplitButtonVariables };
export { injectAlertVariables, injectChipVariables, injectDatePickerVariables, injectDialogVariables, injectErrorMessageVariables, injectFlexBoxVariables, injectMessageVariables, injectSelectVariables, injectToastVariables };
export { injectCheckboxVariables, injectRadioVariables, injectToggleVariables };
export { injectDataGridVariables };
export { injectPaginationVariables };
export { injectAccordionVariables, injectBreadcrumbVariables, injectMenuVariables, injectToolbarVariables };
export { injectAvatarVariables, injectProgressBarVariables, injectTabsVariables, injectTimelineVariables, injectTooltipVariables };

export function injectHeaderVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  root.style.setProperty('--component-header-background', `rgb(${c.header.background})`);
  root.style.setProperty('--component-header-text-color', `rgb(${c.header.textColor})`);
  root.style.setProperty('--component-header-border-bottom', `rgb(${c.header.borderBottom})`);
  root.style.setProperty('--component-header-height', c.header.height);
}

export function injectSidebarVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  root.style.setProperty('--component-sidebar-background', `rgb(${c.sidebar.background})`);
  root.style.setProperty('--component-sidebar-text-color', `rgb(${c.sidebar.textColor})`);
  root.style.setProperty('--component-sidebar-active-bg', `rgb(${c.sidebar.activeItemBackground})`);
  root.style.setProperty('--component-sidebar-active-text', `rgb(${c.sidebar.activeItemTextColor})`);
  root.style.setProperty('--component-sidebar-hover-bg', `rgb(${c.sidebar.hoverItemBackground})`);
  root.style.setProperty('--component-sidebar-border-right', `rgb(${c.sidebar.borderRight})`);
  root.style.setProperty('--component-sidebar-transition', c.sidebar.transitionDuration);
  root.style.setProperty('--component-sidebar-font-size', c.sidebar.fontSize);
  root.style.setProperty('--component-sidebar-font-weight', c.sidebar.fontWeight);
  root.style.setProperty('--component-sidebar-icon-size', c.sidebar.iconSize);
  root.style.setProperty('--component-sidebar-icon-stroke-width', c.sidebar.iconStrokeWidth);
  root.style.setProperty('--component-sidebar-expand-animation', c.sidebar.expandAnimationEnabled ? c.sidebar.expandAnimationDuration : '0ms');
  root.style.setProperty('--component-sidebar-scrollbar', c.sidebar.showScrollbar ? 'thin' : 'none');
  root.style.setProperty('--component-sidebar-scrollbar-width', c.sidebar.showScrollbar ? '4px' : '0px');

  // Search highlight variables
  root.style.setProperty('--component-sidebar-highlight-color', `rgb(${c.sidebar.searchHighlightColor})`);
  root.style.setProperty('--component-sidebar-highlight-scale', c.sidebar.searchHighlightScale);

  // Search input variables
  root.style.setProperty('--component-sidebar-search-bg', c.sidebar.searchBackground);
  root.style.setProperty('--component-sidebar-search-border', c.sidebar.searchBorder);
  root.style.setProperty('--component-sidebar-search-radius', c.sidebar.searchBorderRadius);
  root.style.setProperty('--component-sidebar-search-text', `rgb(${c.sidebar.searchTextColor})`);
  root.style.setProperty('--component-sidebar-search-placeholder', c.sidebar.searchPlaceholderColor);
  root.style.setProperty('--component-sidebar-search-focus-bg', c.sidebar.searchFocusBackground);
  root.style.setProperty('--component-sidebar-search-focus-border', c.sidebar.searchFocusBorder);
  root.style.setProperty('--component-sidebar-search-font-size', c.sidebar.searchFontSize);
  root.style.setProperty('--component-sidebar-search-padding', c.sidebar.searchPadding);
}

export function injectInputVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  root.style.setProperty('--component-input-background', `rgb(${c.inputs.background})`);
  root.style.setProperty('--component-input-border-default', `rgb(${c.inputs.borderDefault})`);
  root.style.setProperty('--component-input-border-hover', `rgb(${c.inputs.borderHover})`);
  root.style.setProperty('--component-input-border-focus', `rgb(${c.inputs.borderFocus})`);
  root.style.setProperty('--component-input-border-error', `rgb(${c.inputs.borderError})`);
  root.style.setProperty('--component-input-text-color', `rgb(${c.inputs.textColor})`);
  root.style.setProperty('--component-input-placeholder', `rgb(${c.inputs.placeholderColor})`);
  root.style.setProperty('--component-input-label', `rgb(${c.inputs.labelColor})`);
  root.style.setProperty('--component-input-helper-text', `rgb(${c.inputs.helperTextColor})`);
  root.style.setProperty('--component-input-error-text', `rgb(${c.inputs.errorTextColor})`);
  root.style.setProperty('--component-input-focus-ring', `rgb(${c.inputs.focusRingColor} / 0.1)`);
  root.style.setProperty('--component-input-transition', c.inputs.transitionDuration);
}

export function injectCardVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  root.style.setProperty('--component-card-background', `rgb(${c.cards.background})`);
  root.style.setProperty('--component-card-border', `rgb(${c.cards.borderColor})`);
  root.style.setProperty('--component-card-header-bg', `rgb(${c.cards.headerBackground})`);
  root.style.setProperty('--component-card-footer-bg', `rgb(${c.cards.footerBackground})`);
  root.style.setProperty('--component-card-text', `rgb(${c.cards.textColor})`);
  root.style.setProperty('--component-card-title', `rgb(${c.cards.titleColor})`);
  root.style.setProperty('--component-card-subtitle', `rgb(${c.cards.subtitleColor})`);
  root.style.setProperty('--component-card-border-width', c.cards.borderWidth);
  root.style.setProperty('--component-card-hover-border', `rgb(${c.cards.hoverBorderColor})`);
  root.style.setProperty('--component-card-header-text', `rgb(${c.cards.headerTextColor})`);
  root.style.setProperty('--component-card-header-border', `rgb(${c.cards.headerBorderColor})`);
  root.style.setProperty('--component-card-footer-border', `rgb(${c.cards.footerBorderColor})`);
  root.style.setProperty('--component-card-content-padding', c.cards.contentPadding);
  root.style.setProperty('--component-card-image-overlay', `rgb(${c.cards.imageOverlayColor})`);
  root.style.setProperty('--component-card-action-text', `rgb(${c.cards.actionTextColor})`);
  root.style.setProperty('--component-card-action-hover', `rgb(${c.cards.actionHoverColor})`);
  root.style.setProperty('--component-card-transition', c.cards.transitionDuration);
}

export function injectModalVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  root.style.setProperty('--component-modal-backdrop', c.modals.backdropColor);
  root.style.setProperty('--component-modal-content-bg', `rgb(${c.modals.contentBackground})`);
  root.style.setProperty('--component-modal-border', `rgb(${c.modals.borderColor})`);
  root.style.setProperty('--component-modal-header-bg', `rgb(${c.modals.headerBackground})`);
  root.style.setProperty('--component-modal-footer-bg', `rgb(${c.modals.footerBackground})`);
}

export function injectBadgeVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  root.style.setProperty('--component-badge-success-bg', `rgb(${c.badges.success.background})`);
  root.style.setProperty('--component-badge-success-text', `rgb(${c.badges.success.textColor})`);
  root.style.setProperty('--component-badge-success-border', `rgb(${c.badges.success.borderColor})`);
  root.style.setProperty('--component-badge-success-outline-bg', `rgb(${c.badges.success.borderColor} / 0.2)`);
  root.style.setProperty('--component-badge-warning-bg', `rgb(${c.badges.warning.background})`);
  root.style.setProperty('--component-badge-warning-text', `rgb(${c.badges.warning.textColor})`);
  root.style.setProperty('--component-badge-warning-border', `rgb(${c.badges.warning.borderColor})`);
  root.style.setProperty('--component-badge-warning-outline-bg', `rgb(${c.badges.warning.borderColor} / 0.2)`);
  root.style.setProperty('--component-badge-error-bg', `rgb(${c.badges.error.background})`);
  root.style.setProperty('--component-badge-error-text', `rgb(${c.badges.error.textColor})`);
  root.style.setProperty('--component-badge-error-border', `rgb(${c.badges.error.borderColor})`);
  root.style.setProperty('--component-badge-error-outline-bg', `rgb(${c.badges.error.borderColor} / 0.2)`);
  root.style.setProperty('--component-badge-info-bg', `rgb(${c.badges.info.background})`);
  root.style.setProperty('--component-badge-info-text', `rgb(${c.badges.info.textColor})`);
  root.style.setProperty('--component-badge-info-border', `rgb(${c.badges.info.borderColor})`);
  root.style.setProperty('--component-badge-info-outline-bg', `rgb(${c.badges.info.borderColor} / 0.2)`);
}

function injectAlertBadgeOutlineVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  const { success, warning, error, info, outlineFillOpacity: opacity } = c.alertBadges;
  root.style.setProperty('--component-alert-badge-success-outline-bg', `rgb(${success.borderColor} / ${opacity})`);
  root.style.setProperty('--component-alert-badge-warning-outline-bg', `rgb(${warning.borderColor} / ${opacity})`);
  root.style.setProperty('--component-alert-badge-error-outline-bg', `rgb(${error.borderColor} / ${opacity})`);
  root.style.setProperty('--component-alert-badge-info-outline-bg', `rgb(${info.borderColor} / ${opacity})`);
}

export function injectAlertBadgeVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  const { typography, padding, success, warning, error, info } = c.alertBadges;
  loadLocalFont(typography.fontFamily, typography.fontWeight);
  root.style.setProperty('--component-alert-badge-font-family', typography.fontFamily);
  root.style.setProperty('--component-alert-badge-font-size', typography.fontSize);
  root.style.setProperty('--component-alert-badge-font-weight', typography.fontWeight);
  root.style.setProperty('--component-alert-badge-line-height', typography.lineHeight);
  root.style.setProperty('--component-alert-badge-letter-spacing', typography.letterSpacing);
  root.style.setProperty('--component-alert-badge-text-transform', typography.textTransform);

  root.style.setProperty('--component-alert-badge-padding-top', padding.paddingTop);
  root.style.setProperty('--component-alert-badge-padding-right', padding.paddingRight);
  root.style.setProperty('--component-alert-badge-padding-bottom', padding.paddingBottom);
  root.style.setProperty('--component-alert-badge-padding-left', padding.paddingLeft);

  root.style.setProperty('--component-alert-badge-success-bg', `rgb(${success.background})`);
  root.style.setProperty('--component-alert-badge-success-text', `rgb(${success.textColor})`);
  root.style.setProperty('--component-alert-badge-success-border', `rgb(${success.borderColor})`);
  root.style.setProperty('--component-alert-badge-warning-bg', `rgb(${warning.background})`);
  root.style.setProperty('--component-alert-badge-warning-text', `rgb(${warning.textColor})`);
  root.style.setProperty('--component-alert-badge-warning-border', `rgb(${warning.borderColor})`);
  root.style.setProperty('--component-alert-badge-error-bg', `rgb(${error.background})`);
  root.style.setProperty('--component-alert-badge-error-text', `rgb(${error.textColor})`);
  root.style.setProperty('--component-alert-badge-error-border', `rgb(${error.borderColor})`);
  root.style.setProperty('--component-alert-badge-info-bg', `rgb(${info.background})`);
  root.style.setProperty('--component-alert-badge-info-text', `rgb(${info.textColor})`);
  root.style.setProperty('--component-alert-badge-info-border', `rgb(${info.borderColor})`);

  injectAlertBadgeOutlineVariables(root, c);
}

export function injectTextDescriptionVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  const { textDescription } = c;
  loadLocalFont(textDescription.fontFamily, textDescription.fontWeight);
  root.style.setProperty('--component-text-description-color', `rgb(${textDescription.textColor})`);
  root.style.setProperty('--component-text-description-font-family', textDescription.fontFamily);
  root.style.setProperty('--component-text-description-font-size', textDescription.fontSize);
  root.style.setProperty('--component-text-description-font-weight', textDescription.fontWeight);
  root.style.setProperty('--component-text-description-line-height', textDescription.lineHeight);
  root.style.setProperty('--component-text-description-letter-spacing', textDescription.letterSpacing);
}

function injectDisplayVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  injectCardVariables(root, c);
  injectModalVariables(root, c);
  injectBadgeVariables(root, c);
  injectAlertBadgeVariables(root, c);
  injectTextDescriptionVariables(root, c);
}

function injectFeedbackVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  injectSelectVariables(root, c);
  injectDatePickerVariables(root, c);
  injectDialogVariables(root, c);
  injectErrorMessageVariables(root, c);
  injectFlexBoxVariables(root, c);
  injectAlertVariables(root, c);
  injectToastVariables(root, c);
  injectMessageVariables(root, c);
  injectChipVariables(root, c);
  injectCheckboxVariables(root, c);
  injectRadioVariables(root, c);
  injectToggleVariables(root, c);
}

export function injectComponentVariables(root: HTMLElement, components: ComponentConfigSingle): void {
  injectHeaderVariables(root, components);
  injectSidebarVariables(root, components);
  injectButtonVariables(root, components);
  injectIconButtonVariables(root, components);
  injectFabVariables(root, components);
  injectSplitButtonVariables(root, components);
  injectInputVariables(root, components);
  injectDataGridVariables(root, components);
  injectDisplayVariables(root, components);
  injectFeedbackVariables(root, components);
  injectAccordionVariables(root, components);
  injectToolbarVariables(root, components);
  injectMenuVariables(root, components);
  injectBreadcrumbVariables(root, components);
  injectPaginationVariables(root, components);
  injectTabsVariables(root, components);
  injectTimelineVariables(root, components);
  injectAvatarVariables(root, components);
  injectProgressBarVariables(root, components);
  injectTooltipVariables(root, components);
}
