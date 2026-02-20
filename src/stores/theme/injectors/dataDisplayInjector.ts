// Data display component CSS variable injection

import { toKeyframeName } from '@/utils/animationUtils';

import { loadLocalFont } from './fontLoader';

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

export function injectExternalLinkVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  const { externalLink } = c;
  loadLocalFont(externalLink.typography.fontFamily, externalLink.typography.fontWeight);
  root.style.setProperty('--component-external-link-text-color', `rgb(${externalLink.textColor})`);
  root.style.setProperty('--component-external-link-icon-color', `rgb(${externalLink.iconColor})`);
  root.style.setProperty('--component-external-link-hover-text-color', `rgb(${externalLink.hoverTextColor})`);
  root.style.setProperty('--component-external-link-hover-icon-color', `rgb(${externalLink.hoverIconColor})`);
  root.style.setProperty('--component-external-link-disabled-text-color', `rgb(${externalLink.disabledTextColor})`);
  root.style.setProperty('--component-external-link-disabled-icon-color', `rgb(${externalLink.disabledIconColor})`);
  root.style.setProperty('--component-external-link-font-family', externalLink.typography.fontFamily);
  root.style.setProperty('--component-external-link-font-size', externalLink.typography.fontSize);
  root.style.setProperty('--component-external-link-font-weight', externalLink.typography.fontWeight);
  root.style.setProperty('--component-external-link-line-height', externalLink.typography.lineHeight);
  root.style.setProperty('--component-external-link-letter-spacing', externalLink.typography.letterSpacing);
  root.style.setProperty('--component-external-link-text-decoration', externalLink.textDecoration);
  root.style.setProperty('--component-external-link-gap', externalLink.gap);
  root.style.setProperty('--component-external-link-icon-size', externalLink.iconSize);
  root.style.setProperty('--component-external-link-transition', externalLink.transitionDuration);
}
