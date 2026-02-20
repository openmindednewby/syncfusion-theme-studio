// Button-specific CSS variable injection utilities

import { loadLocalFont } from './fontLoader';
import { ShadowScale } from '../types';

import type { ComponentConfigSingle } from '../types';

const VARIANTS = ['primary', 'secondary', 'outline', 'ghost', 'danger'] as const;

/** Wrap color value in rgb() unless it's a CSS keyword like transparent/inherit. */
function cssColor(value: string): string {
  return value === 'transparent' || value === 'inherit' ? value : `rgb(${value})`;
}

/** Resolve borderRadius: literal px values pass through, scale tokens use var(). */
function cssBorderRadius(value: string): string {
  return /^\d/.test(value) ? value : `var(--radius-${value})`;
}

function injectButtonVariantVars(root: HTMLElement, c: ComponentConfigSingle): void {
  for (const v of VARIANTS) {
    const btn = c.buttons[v];
    const prefix = `--component-button-${v}`;
    root.style.setProperty(`${prefix}-bg`, cssColor(btn.background));
    root.style.setProperty(`${prefix}-bg-hover`, cssColor(btn.backgroundHover));
    root.style.setProperty(`${prefix}-bg-active`, cssColor(btn.backgroundActive));
    root.style.setProperty(`${prefix}-text`, cssColor(btn.textColor));
    root.style.setProperty(`${prefix}-text-hover`, cssColor(btn.textColorHover));
    root.style.setProperty(`${prefix}-border`, cssColor(btn.borderColor));
    root.style.setProperty(`${prefix}-border-width`, btn.borderWidth);
    root.style.setProperty(`${prefix}-border-radius`, cssBorderRadius(btn.borderRadius));
    const shadowValue = btn.shadow === ShadowScale.None ? 'none' : `var(--shadow-${btn.shadow})`;
    root.style.setProperty(`${prefix}-shadow`, shadowValue);
    root.style.setProperty(`${prefix}-disabled-bg`, cssColor(btn.disabledBackground));
    root.style.setProperty(`${prefix}-disabled-text`, cssColor(btn.disabledTextColor));
    root.style.setProperty(`${prefix}-disabled-border`, cssColor(btn.disabledBorderColor));
    root.style.setProperty(`${prefix}-disabled-opacity`, btn.disabledOpacity);
  }
}

function injectButtonTypographyVars(root: HTMLElement, c: ComponentConfigSingle): void {
  const { typography } = c.buttons;
  loadLocalFont(typography.fontFamily, typography.fontWeight);
  root.style.setProperty('--component-button-font-family', typography.fontFamily);
  root.style.setProperty('--component-button-font-size', typography.fontSize);
  root.style.setProperty('--component-button-font-weight', typography.fontWeight);
  root.style.setProperty('--component-button-line-height', typography.lineHeight);
  root.style.setProperty('--component-button-letter-spacing', typography.letterSpacing);
}

function injectButtonLayoutVars(root: HTMLElement, c: ComponentConfigSingle): void {
  const { padding, gap, focusRing, transitionDuration } = c.buttons;
  root.style.setProperty('--component-button-padding-top', padding.paddingTop);
  root.style.setProperty('--component-button-padding-right', padding.paddingRight);
  root.style.setProperty('--component-button-padding-bottom', padding.paddingBottom);
  root.style.setProperty('--component-button-padding-left', padding.paddingLeft);
  root.style.setProperty('--component-button-gap', gap);
  root.style.setProperty('--component-button-focus-ring-color', `rgb(${focusRing.color})`);
  root.style.setProperty('--component-button-focus-ring-width', focusRing.width);
  root.style.setProperty('--component-button-focus-ring-offset', focusRing.offset);
  root.style.setProperty('--component-button-transition', transitionDuration);
}

export function injectButtonVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  injectButtonVariantVars(root, c);
  injectButtonTypographyVars(root, c);
  injectButtonLayoutVars(root, c);
}

const ICON_BTN_VARIANTS = ['primary', 'secondary', 'tertiary'] as const;

export function injectIconButtonVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  for (const v of ICON_BTN_VARIANTS) {
    const btn = c.iconButtons[v];
    const prefix = `--component-icon-button-${v}`;
    root.style.setProperty(`${prefix}-bg`, `rgb(${btn.background})`);
    root.style.setProperty(`${prefix}-bg-hover`, `rgb(${btn.backgroundHover})`);
    root.style.setProperty(`${prefix}-bg-active`, `rgb(${btn.backgroundActive})`);
    root.style.setProperty(`${prefix}-icon`, `rgb(${btn.iconColor})`);
    root.style.setProperty(`${prefix}-icon-hover`, `rgb(${btn.iconColorHover})`);
    root.style.setProperty(`${prefix}-border`, `rgb(${btn.borderColor})`);
    root.style.setProperty(`${prefix}-border-width`, btn.borderWidth);
    root.style.setProperty(`${prefix}-disabled-bg`, `rgb(${btn.disabledBackground})`);
    root.style.setProperty(`${prefix}-disabled-icon`, `rgb(${btn.disabledIconColor})`);
    root.style.setProperty(`${prefix}-disabled-opacity`, btn.disabledOpacity);
  }
  const ib = c.iconButtons;
  root.style.setProperty('--component-icon-button-border-radius', ib.borderRadius);
  root.style.setProperty('--component-icon-button-size', ib.size);
  root.style.setProperty('--component-icon-button-icon-size', ib.iconSize);
  root.style.setProperty('--component-icon-button-focus-ring', `rgb(${ib.focusRingColor})`);
  root.style.setProperty('--component-icon-button-transition', ib.transitionDuration);
}

export function injectFabVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  const f = c.fab;
  root.style.setProperty('--component-fab-bg', `rgb(${f.background})`);
  root.style.setProperty('--component-fab-bg-hover', `rgb(${f.backgroundHover})`);
  root.style.setProperty('--component-fab-bg-active', `rgb(${f.backgroundActive})`);
  root.style.setProperty('--component-fab-icon', `rgb(${f.iconColor})`);
  root.style.setProperty('--component-fab-text', `rgb(${f.textColor})`);
  root.style.setProperty('--component-fab-border-radius', f.borderRadius);
  root.style.setProperty('--component-fab-size', f.size);
  root.style.setProperty('--component-fab-icon-size', f.iconSize);
  root.style.setProperty('--component-fab-shadow', f.shadow);
  root.style.setProperty('--component-fab-shadow-hover', f.shadowHover);
  root.style.setProperty('--component-fab-disabled-bg', `rgb(${f.disabledBackground})`);
  root.style.setProperty('--component-fab-disabled-opacity', f.disabledOpacity);
  root.style.setProperty('--component-fab-transition', f.transitionDuration);
}

export function injectSplitButtonVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  const s = c.splitButton;
  root.style.setProperty('--component-split-btn-bg', `rgb(${s.background})`);
  root.style.setProperty('--component-split-btn-bg-hover', `rgb(${s.backgroundHover})`);
  root.style.setProperty('--component-split-btn-bg-active', `rgb(${s.backgroundActive})`);
  root.style.setProperty('--component-split-btn-text', `rgb(${s.textColor})`);
  root.style.setProperty('--component-split-btn-text-hover', `rgb(${s.textColorHover})`);
  root.style.setProperty('--component-split-btn-border', `rgb(${s.borderColor})`);
  root.style.setProperty('--component-split-btn-border-width', s.borderWidth);
  root.style.setProperty('--component-split-btn-border-radius', s.borderRadius);
  root.style.setProperty('--component-split-btn-divider', `rgb(${s.dividerColor})`);
  root.style.setProperty('--component-split-btn-dropdown-bg', `rgb(${s.dropdownBackground})`);
  root.style.setProperty('--component-split-btn-dropdown-border', `rgb(${s.dropdownBorderColor})`);
  root.style.setProperty('--component-split-btn-dropdown-hover', `rgb(${s.dropdownItemHover})`);
  root.style.setProperty('--component-split-btn-dropdown-text', `rgb(${s.dropdownItemTextColor})`);
  root.style.setProperty('--component-split-btn-dropdown-shadow', s.dropdownShadow);
  root.style.setProperty('--component-split-btn-disabled-bg', `rgb(${s.disabledBackground})`);
  root.style.setProperty('--component-split-btn-disabled-text', `rgb(${s.disabledTextColor})`);
  root.style.setProperty('--component-split-btn-disabled-opacity', s.disabledOpacity);
  root.style.setProperty('--component-split-btn-transition', s.transitionDuration);
}
