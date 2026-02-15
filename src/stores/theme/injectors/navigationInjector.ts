// Navigation component CSS variable injection

import { toKeyframeName } from '@/utils/animationUtils';

import type { ComponentConfigSingle } from '../types';

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
  root.style.setProperty('--component-accordion-animation-effect', toKeyframeName(c.accordion.animationEffect));
  root.style.setProperty('--component-accordion-animation-duration', c.accordion.animationDuration);
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
  root.style.setProperty('--component-menu-animation-effect', toKeyframeName(c.menu.animationEffect));
  root.style.setProperty('--component-menu-animation-duration', c.menu.animationDuration);
}

export function injectBreadcrumbVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  root.style.setProperty('--component-breadcrumb-bg', `rgb(${c.breadcrumb.background})`);
  root.style.setProperty('--component-breadcrumb-text', `rgb(${c.breadcrumb.textColor})`);
  root.style.setProperty('--component-breadcrumb-hover-text', `rgb(${c.breadcrumb.hoverTextColor})`);
  root.style.setProperty('--component-breadcrumb-active-text', `rgb(${c.breadcrumb.activeTextColor})`);
  root.style.setProperty('--component-breadcrumb-separator', `rgb(${c.breadcrumb.separatorColor})`);
  root.style.setProperty('--component-breadcrumb-icon', `rgb(${c.breadcrumb.iconColor})`);
  root.style.setProperty('--component-breadcrumb-transition', c.breadcrumb.transitionDuration);
}
