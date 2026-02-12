// Layout and typography injection utilities

import type { SpacingConfig, ThemeConfig, ThemeModeConfig } from '../types';

// Spacing multipliers for generating CSS custom properties
const SPACE_MULTIPLIER_3 = 3;
const SPACE_MULTIPLIER_4 = 4;
const SPACE_MULTIPLIER_5 = 5;
const SPACE_MULTIPLIER_6 = 6;
const SPACE_MULTIPLIER_8 = 8;
const SPACE_MULTIPLIER_10 = 10;
const SPACE_MULTIPLIER_12 = 12;
const SPACE_MULTIPLIER_16 = 16;
const SPACE_MULTIPLIER_20 = 20;
const SPACE_MULTIPLIER_24 = 24;
const SPACE_MULTIPLIER_32 = 32;
const SPACE_MULTIPLIER_40 = 40;
const SPACE_MULTIPLIER_48 = 48;
const SPACE_MULTIPLIER_64 = 64;

const SPACING_MULTIPLIERS = [
  0, 1, 2,
  SPACE_MULTIPLIER_3, SPACE_MULTIPLIER_4, SPACE_MULTIPLIER_5, SPACE_MULTIPLIER_6,
  SPACE_MULTIPLIER_8, SPACE_MULTIPLIER_10, SPACE_MULTIPLIER_12, SPACE_MULTIPLIER_16,
  SPACE_MULTIPLIER_20, SPACE_MULTIPLIER_24, SPACE_MULTIPLIER_32, SPACE_MULTIPLIER_40,
  SPACE_MULTIPLIER_48, SPACE_MULTIPLIER_64,
] as const;

export function injectModeColors(root: HTMLElement, modeConfig: ThemeModeConfig): void {
  // Backgrounds
  root.style.setProperty('--color-background', modeConfig.backgrounds.page);
  root.style.setProperty('--color-surface', modeConfig.backgrounds.surface);
  root.style.setProperty('--color-surface-elevated', modeConfig.backgrounds.surfaceElevated);
  root.style.setProperty('--color-surface-sunken', modeConfig.backgrounds.surfaceSunken);
  root.style.setProperty('--color-overlay', modeConfig.backgrounds.overlay);

  // Text
  root.style.setProperty('--color-text-primary', modeConfig.text.primary);
  root.style.setProperty('--color-text-secondary', modeConfig.text.secondary);
  root.style.setProperty('--color-text-muted', modeConfig.text.muted);
  root.style.setProperty('--color-text-disabled', modeConfig.text.disabled);
  root.style.setProperty('--color-text-inverse', modeConfig.text.inverse);
  root.style.setProperty('--color-link', modeConfig.text.link);
  root.style.setProperty('--color-link-hover', modeConfig.text.linkHover);

  // Borders
  root.style.setProperty('--color-border', modeConfig.borders.default);
  root.style.setProperty('--color-border-strong', modeConfig.borders.strong);
  root.style.setProperty('--color-border-subtle', modeConfig.borders.subtle);
  root.style.setProperty('--color-border-focus', modeConfig.borders.focus);
  root.style.setProperty('--color-divider', modeConfig.borders.divider);
}

export function injectLayoutVariables(root: HTMLElement, theme: ThemeConfig): void {
  root.style.setProperty('--sidebar-width', theme.layout.sidebarWidth);
  root.style.setProperty('--sidebar-collapsed-width', theme.layout.sidebarCollapsedWidth);
  root.style.setProperty('--header-height', theme.layout.headerHeight);
  const resolvedMaxWidth = theme.layout.contentFullWidth ? 'none' : theme.layout.contentMaxWidth;
  root.style.setProperty('--content-max-width', resolvedMaxWidth);
}

export function injectTypographyVariables(root: HTMLElement, theme: ThemeConfig): void {
  root.style.setProperty('--font-sans', theme.typography.fontSans);
  root.style.setProperty('--font-mono', theme.typography.fontMono);

  // Font sizes
  root.style.setProperty('--font-size-xs', theme.typography.fontSize.xs);
  root.style.setProperty('--font-size-sm', theme.typography.fontSize.sm);
  root.style.setProperty('--font-size-base', theme.typography.fontSize.base);
  root.style.setProperty('--font-size-lg', theme.typography.fontSize.lg);
  root.style.setProperty('--font-size-xl', theme.typography.fontSize.xl);
  root.style.setProperty('--font-size-2xl', theme.typography.fontSize['2xl']);
  root.style.setProperty('--font-size-3xl', theme.typography.fontSize['3xl']);

  // Font weights
  root.style.setProperty('--font-weight-light', theme.typography.fontWeight.light);
  root.style.setProperty('--font-weight-normal', theme.typography.fontWeight.normal);
  root.style.setProperty('--font-weight-medium', theme.typography.fontWeight.medium);
  root.style.setProperty('--font-weight-semibold', theme.typography.fontWeight.semibold);
  root.style.setProperty('--font-weight-bold', theme.typography.fontWeight.bold);

  // Line heights
  root.style.setProperty('--line-height-tight', theme.typography.lineHeight.tight);
  root.style.setProperty('--line-height-normal', theme.typography.lineHeight.normal);
  root.style.setProperty('--line-height-relaxed', theme.typography.lineHeight.relaxed);

  // Letter spacing
  root.style.setProperty('--letter-spacing-tight', theme.typography.letterSpacing.tight);
  root.style.setProperty('--letter-spacing-normal', theme.typography.letterSpacing.normal);
  root.style.setProperty('--letter-spacing-wide', theme.typography.letterSpacing.wide);
}

export function injectTransitionVariables(root: HTMLElement, theme: ThemeConfig): void {
  root.style.setProperty('--transition-fast', theme.transitions.fast);
  root.style.setProperty('--transition-normal', theme.transitions.normal);
  root.style.setProperty('--transition-slow', theme.transitions.slow);
  root.style.setProperty('--transition-easing', theme.transitions.easing);
}

export function injectSpacingVariables(root: HTMLElement, spacing: SpacingConfig): void {
  SPACING_MULTIPLIERS.forEach((multiplier) => {
    const value = spacing.baseUnit * multiplier;
    root.style.setProperty(`--space-${multiplier}`, `${value}px`);
  });
  root.style.setProperty('--spacing-base-unit', `${spacing.baseUnit}px`);
}
