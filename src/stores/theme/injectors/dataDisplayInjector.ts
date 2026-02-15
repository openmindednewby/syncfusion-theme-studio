// Data display component CSS variable injection

import { toKeyframeName } from '@/utils/animationUtils';

import type { ComponentConfigSingle } from '../types';

export function injectTabsVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  root.style.setProperty('--component-tabs-bg', `rgb(${c.tabs.background})`);
  root.style.setProperty('--component-tabs-active-bg', `rgb(${c.tabs.activeBg})`);
  root.style.setProperty('--component-tabs-active-text', `rgb(${c.tabs.activeText})`);
  root.style.setProperty('--component-tabs-inactive-text', `rgb(${c.tabs.inactiveText})`);
  root.style.setProperty('--component-tabs-border', `rgb(${c.tabs.borderColor})`);
  root.style.setProperty('--component-tabs-hover-bg', `rgb(${c.tabs.hoverBg})`);
  root.style.setProperty('--component-tabs-indicator', `rgb(${c.tabs.indicatorColor})`);
  root.style.setProperty('--component-tabs-transition', c.tabs.transitionDuration);
}

export function injectTimelineVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  root.style.setProperty('--component-timeline-track', `rgb(${c.timeline.trackColor})`);
  root.style.setProperty('--component-timeline-active', `rgb(${c.timeline.activeColor})`);
  root.style.setProperty('--component-timeline-marker-bg', `rgb(${c.timeline.markerBg})`);
  root.style.setProperty('--component-timeline-marker-border', `rgb(${c.timeline.markerBorder})`);
  root.style.setProperty('--component-timeline-label', `rgb(${c.timeline.labelText})`);
  root.style.setProperty('--component-timeline-connector', `rgb(${c.timeline.connectorColor})`);
}

export function injectAvatarVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  root.style.setProperty('--component-avatar-bg', `rgb(${c.avatar.background})`);
  root.style.setProperty('--component-avatar-text', `rgb(${c.avatar.textColor})`);
  root.style.setProperty('--component-avatar-border', `rgb(${c.avatar.borderColor})`);
  root.style.setProperty('--component-avatar-status', `rgb(${c.avatar.statusIndicatorColor})`);
  root.style.setProperty('--component-avatar-fallback-bg', `rgb(${c.avatar.fallbackBg})`);
}

export function injectProgressBarVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  root.style.setProperty('--component-progress-track', `rgb(${c.progressBar.trackBg})`);
  root.style.setProperty('--component-progress-fill', `rgb(${c.progressBar.fillColor})`);
  root.style.setProperty('--component-progress-text', `rgb(${c.progressBar.textColor})`);
  root.style.setProperty('--component-progress-radius', `var(--radius-${c.progressBar.borderRadius})`);
  root.style.setProperty('--component-progress-success', `rgb(${c.progressBar.successFillColor})`);
  root.style.setProperty('--component-progress-warning', `rgb(${c.progressBar.warningFillColor})`);
  root.style.setProperty('--component-progress-danger', `rgb(${c.progressBar.dangerFillColor})`);
}

export function injectTooltipVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  root.style.setProperty('--component-tooltip-bg', `rgb(${c.tooltip.background})`);
  root.style.setProperty('--component-tooltip-text', `rgb(${c.tooltip.textColor})`);
  root.style.setProperty('--component-tooltip-border', `rgb(${c.tooltip.borderColor})`);
  root.style.setProperty('--component-tooltip-arrow', `rgb(${c.tooltip.arrowColor})`);
  root.style.setProperty('--component-tooltip-animation-effect', toKeyframeName(c.tooltip.animationEffect));
  root.style.setProperty('--component-tooltip-animation-duration', c.tooltip.animationDuration);
}
