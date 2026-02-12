// Pagination-specific CSS variable injection

import type { ComponentConfigSingle } from '../types';

const TRANSPARENT = 'transparent';

function resolveBackground(value: string): string {
  if (value === TRANSPARENT) return TRANSPARENT;
  return `rgb(${value})`;
}

export function injectPaginationVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  const p = c.pagination;
  root.style.setProperty('--component-pagination-bg', `rgb(${p.background})`);
  root.style.setProperty('--component-pagination-border', `rgb(${p.borderColor})`);
  root.style.setProperty('--component-pagination-text', `rgb(${p.textColor})`);
  root.style.setProperty('--component-pagination-btn-bg', resolveBackground(p.buttonBackground));
  root.style.setProperty('--component-pagination-btn-text', `rgb(${p.buttonTextColor})`);
  root.style.setProperty('--component-pagination-btn-hover-bg', `rgb(${p.buttonHoverBackground})`);
  root.style.setProperty('--component-pagination-btn-hover-text', `rgb(${p.buttonHoverTextColor})`);
  root.style.setProperty('--component-pagination-btn-active-bg', `rgb(${p.buttonActiveBackground})`);
  root.style.setProperty('--component-pagination-btn-active-text', `rgb(${p.buttonActiveTextColor})`);
  root.style.setProperty('--component-pagination-btn-radius', p.buttonBorderRadius);
  root.style.setProperty('--component-pagination-nav-text', `rgb(${p.navTextColor})`);
  root.style.setProperty('--component-pagination-nav-disabled', `rgb(${p.navDisabledColor})`);
  root.style.setProperty('--component-pagination-select-bg', `rgb(${p.selectBackground})`);
  root.style.setProperty('--component-pagination-select-border', `rgb(${p.selectBorderColor})`);
  root.style.setProperty('--component-pagination-select-text', `rgb(${p.selectTextColor})`);
  root.style.setProperty('--component-pagination-info-text', `rgb(${p.infoTextColor})`);
}
