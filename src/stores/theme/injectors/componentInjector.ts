// Component-specific CSS variable injection utilities

import { injectDataGridVariables } from './dataGridInjector';
import { injectAlertVariables, injectChipVariables, injectDatePickerVariables, injectDialogVariables, injectErrorMessageVariables, injectFlexBoxVariables, injectMessageVariables, injectSelectVariables, injectToastVariables } from './feedbackInjector';
import { injectPaginationVariables } from './paginationInjector';

import type { ComponentConfigSingle } from '../types';

export { injectAlertVariables, injectChipVariables, injectDatePickerVariables, injectDialogVariables, injectErrorMessageVariables, injectFlexBoxVariables, injectMessageVariables, injectSelectVariables, injectToastVariables };
export { injectDataGridVariables };
export { injectPaginationVariables };

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

export function injectAccordionVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  root.style.setProperty('--component-accordion-bg', `rgb(${c.accordion.background})`);
  root.style.setProperty('--component-accordion-text', `rgb(${c.accordion.textColor})`);
  root.style.setProperty('--component-accordion-header-bg', `rgb(${c.accordion.headerBackground})`);
  root.style.setProperty('--component-accordion-header-text', `rgb(${c.accordion.headerTextColor})`);
  root.style.setProperty('--component-accordion-header-hover-bg', `rgb(${c.accordion.headerHoverBackground})`);
  root.style.setProperty('--component-accordion-border', `rgb(${c.accordion.borderColor})`);
  root.style.setProperty('--component-accordion-expanded-bg', `rgb(${c.accordion.expandedBackground})`);
  root.style.setProperty('--component-accordion-expanded-text', `rgb(${c.accordion.expandedTextColor})`);
  root.style.setProperty('--component-accordion-icon', `rgb(${c.accordion.iconColor})`);
}

export function injectToolbarVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  root.style.setProperty('--component-toolbar-bg', `rgb(${c.toolbar.background})`);
  root.style.setProperty('--component-toolbar-text', `rgb(${c.toolbar.textColor})`);
  root.style.setProperty('--component-toolbar-hover-bg', `rgb(${c.toolbar.hoverBackground})`);
  root.style.setProperty('--component-toolbar-hover-text', `rgb(${c.toolbar.hoverTextColor})`);
  root.style.setProperty('--component-toolbar-active-bg', `rgb(${c.toolbar.activeBackground})`);
  root.style.setProperty('--component-toolbar-border', `rgb(${c.toolbar.borderColor})`);
  root.style.setProperty('--component-toolbar-separator', `rgb(${c.toolbar.separatorColor})`);
  root.style.setProperty('--component-toolbar-icon', `rgb(${c.toolbar.iconColor})`);
}

export function injectMenuVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  root.style.setProperty('--component-menu-bg', `rgb(${c.menu.background})`);
  root.style.setProperty('--component-menu-text', `rgb(${c.menu.textColor})`);
  root.style.setProperty('--component-menu-hover-bg', `rgb(${c.menu.hoverBackground})`);
  root.style.setProperty('--component-menu-hover-text', `rgb(${c.menu.hoverTextColor})`);
  root.style.setProperty('--component-menu-active-bg', `rgb(${c.menu.activeBackground})`);
  root.style.setProperty('--component-menu-border', `rgb(${c.menu.borderColor})`);
  root.style.setProperty('--component-menu-icon', `rgb(${c.menu.iconColor})`);
  root.style.setProperty('--component-menu-popup-bg', `rgb(${c.menu.popupBackground})`);
  root.style.setProperty('--component-menu-popup-border', `rgb(${c.menu.popupBorderColor})`);
  root.style.setProperty('--component-menu-popup-text', `rgb(${c.menu.popupTextColor})`);
  root.style.setProperty('--component-menu-separator', `rgb(${c.menu.separatorColor})`);
}

export function injectBreadcrumbVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  root.style.setProperty('--component-breadcrumb-bg', `rgb(${c.breadcrumb.background})`);
  root.style.setProperty('--component-breadcrumb-text', `rgb(${c.breadcrumb.textColor})`);
  root.style.setProperty('--component-breadcrumb-hover-text', `rgb(${c.breadcrumb.hoverTextColor})`);
  root.style.setProperty('--component-breadcrumb-active-text', `rgb(${c.breadcrumb.activeTextColor})`);
  root.style.setProperty('--component-breadcrumb-separator', `rgb(${c.breadcrumb.separatorColor})`);
  root.style.setProperty('--component-breadcrumb-icon', `rgb(${c.breadcrumb.iconColor})`);
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
}
