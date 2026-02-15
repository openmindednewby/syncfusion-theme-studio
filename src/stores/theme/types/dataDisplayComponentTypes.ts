// Data display component type definitions

import type { AnimationEffect } from './animationEffect';

export interface TabsConfig {
  background: string;
  activeBg: string;
  activeText: string;
  inactiveText: string;
  borderColor: string;
  hoverBg: string;
  indicatorColor: string;
  transitionDuration: string;
}

export interface TimelineConfig {
  trackColor: string;
  activeColor: string;
  markerBg: string;
  markerBorder: string;
  labelText: string;
  connectorColor: string;
}

export interface AvatarConfig {
  background: string;
  textColor: string;
  borderColor: string;
  statusIndicatorColor: string;
  fallbackBg: string;
}

export interface ProgressBarConfig {
  trackBg: string;
  fillColor: string;
  textColor: string;
  borderRadius: string;
  successFillColor: string;
  warningFillColor: string;
  dangerFillColor: string;
}

export interface TooltipConfig {
  background: string;
  textColor: string;
  borderColor: string;
  arrowColor: string;
  animationEffect: AnimationEffect;
  animationDuration: string;
}
