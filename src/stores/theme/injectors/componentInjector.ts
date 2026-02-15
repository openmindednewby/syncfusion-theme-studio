// Component-specific CSS variable injection utilities

import { injectAvatarVariables, injectProgressBarVariables, injectTabsVariables, injectTimelineVariables, injectTooltipVariables } from './dataDisplayInjector';
import { injectDataGridVariables } from './dataGridInjector';
import { injectAlertVariables, injectChipVariables, injectDatePickerVariables, injectDialogVariables, injectErrorMessageVariables, injectFlexBoxVariables, injectMessageVariables, injectSelectVariables, injectToastVariables } from './feedbackInjector';
import { injectAccordionVariables, injectBreadcrumbVariables, injectMenuVariables, injectToolbarVariables } from './navigationInjector';
import { injectPaginationVariables } from './paginationInjector';

import type { ComponentConfigSingle } from '../types';

export { injectAlertVariables, injectChipVariables, injectDatePickerVariables, injectDialogVariables, injectErrorMessageVariables, injectFlexBoxVariables, injectMessageVariables, injectSelectVariables, injectToastVariables };
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
}

export function injectButtonVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  root.style.setProperty('--component-button-primary-bg', `rgb(${c.buttons.primary.background})`);
  root.style.setProperty('--component-button-primary-bg-hover', `rgb(${c.buttons.primary.backgroundHover})`);
  root.style.setProperty('--component-button-primary-text', `rgb(${c.buttons.primary.textColor})`);
  root.style.setProperty('--component-button-secondary-bg', `rgb(${c.buttons.secondary.background})`);
  root.style.setProperty('--component-button-secondary-bg-hover', `rgb(${c.buttons.secondary.backgroundHover})`);
  root.style.setProperty('--component-button-secondary-text', `rgb(${c.buttons.secondary.textColor})`);
  root.style.setProperty('--component-button-outline-border', `rgb(${c.buttons.outline.borderColor})`);
  root.style.setProperty('--component-button-outline-text', `rgb(${c.buttons.outline.textColor})`);
  root.style.setProperty('--component-button-ghost-text', `rgb(${c.buttons.ghost.textColor})`);
  root.style.setProperty('--component-button-danger-bg', `rgb(${c.buttons.danger.background})`);
  root.style.setProperty('--component-button-danger-text', `rgb(${c.buttons.danger.textColor})`);
  root.style.setProperty('--component-button-transition', c.buttons.transitionDuration);
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
  root.style.setProperty('--component-badge-warning-bg', `rgb(${c.badges.warning.background})`);
  root.style.setProperty('--component-badge-warning-text', `rgb(${c.badges.warning.textColor})`);
  root.style.setProperty('--component-badge-error-bg', `rgb(${c.badges.error.background})`);
  root.style.setProperty('--component-badge-error-text', `rgb(${c.badges.error.textColor})`);
  root.style.setProperty('--component-badge-info-bg', `rgb(${c.badges.info.background})`);
  root.style.setProperty('--component-badge-info-text', `rgb(${c.badges.info.textColor})`);
}

export function injectComponentVariables(root: HTMLElement, components: ComponentConfigSingle): void {
  injectHeaderVariables(root, components);
  injectSidebarVariables(root, components);
  injectButtonVariables(root, components);
  injectInputVariables(root, components);
  injectDataGridVariables(root, components);
  injectCardVariables(root, components);
  injectModalVariables(root, components);
  injectBadgeVariables(root, components);
  injectSelectVariables(root, components);
  injectDatePickerVariables(root, components);
  injectDialogVariables(root, components);
  injectErrorMessageVariables(root, components);
  injectFlexBoxVariables(root, components);
  injectAlertVariables(root, components);
  injectToastVariables(root, components);
  injectMessageVariables(root, components);
  injectChipVariables(root, components);
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
