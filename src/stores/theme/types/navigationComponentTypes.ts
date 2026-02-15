// Navigation component type definitions

import type { AnimationEffect } from './animationEffect';

export interface AccordionConfig {
  background: string;
  textColor: string;
  headerBackground: string;
  headerTextColor: string;
  headerHoverBackground: string;
  borderColor: string;
  expandedBackground: string;
  expandedTextColor: string;
  iconColor: string;
  animationEffect: AnimationEffect;
  animationDuration: string;
}

export interface ToolbarConfig {
  background: string;
  textColor: string;
  hoverBackground: string;
  hoverTextColor: string;
  activeBackground: string;
  borderColor: string;
  separatorColor: string;
  iconColor: string;
}

export interface MenuConfig {
  background: string;
  textColor: string;
  hoverBackground: string;
  hoverTextColor: string;
  activeBackground: string;
  borderColor: string;
  iconColor: string;
  popupBackground: string;
  popupBorderColor: string;
  popupTextColor: string;
  separatorColor: string;
  animationEffect: AnimationEffect;
  animationDuration: string;
}

export interface BreadcrumbConfig {
  background: string;
  textColor: string;
  hoverTextColor: string;
  activeTextColor: string;
  separatorColor: string;
  iconColor: string;
  transitionDuration: string;
}
