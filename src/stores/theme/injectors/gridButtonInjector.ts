// Grid button CSS variable injection utilities

import type { ComponentConfigSingle } from '../types';

/** Wrap color value in rgb() unless it's a CSS keyword like transparent/inherit. */
function cssColor(value: string): string {
  return value === 'transparent' || value === 'inherit' ? value : `rgb(${value})`;
}

const VARIANTS = ['default', 'save', 'delete', 'view', 'export', 'archive'] as const;

export function injectGridButtonVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  for (const v of VARIANTS) {
    const btn = c.gridButtons[v];
    const prefix = `--component-grid-button-${v}`;
    root.style.setProperty(`${prefix}-bg`, cssColor(btn.background));
    root.style.setProperty(`${prefix}-bg-hover`, cssColor(btn.backgroundHover));
    root.style.setProperty(`${prefix}-text`, cssColor(btn.textColor));
    root.style.setProperty(`${prefix}-border`, cssColor(btn.borderColor));
    root.style.setProperty(`${prefix}-disabled-opacity`, btn.disabledOpacity);
  }

  const { typography } = c.gridButtons;
  root.style.setProperty('--component-grid-button-font-family', typography.fontFamily);
  root.style.setProperty('--component-grid-button-font-size', typography.fontSize);
  root.style.setProperty('--component-grid-button-font-weight', typography.fontWeight);
  root.style.setProperty('--component-grid-button-line-height', typography.lineHeight);
  root.style.setProperty('--component-grid-button-letter-spacing', typography.letterSpacing);
  root.style.setProperty('--component-grid-button-padding-v', c.gridButtons.paddingV);
  root.style.setProperty('--component-grid-button-padding-h', c.gridButtons.paddingH);
  root.style.setProperty('--component-grid-button-border-radius', c.gridButtons.borderRadius);
  root.style.setProperty('--component-grid-button-transition', c.gridButtons.transitionDuration);
}
