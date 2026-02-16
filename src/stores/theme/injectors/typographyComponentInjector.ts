// Typography component CSS variable injection

import type { ThemeConfig } from '../types';
import type { TypographyComponentsConfig, TypographyLevelConfig } from '../types/typographyComponentTypes';

function injectLevel(root: HTMLElement, prefix: string, level: TypographyLevelConfig): void {
  root.style.setProperty(`--typo-${prefix}-size`, `var(--font-size-${level.fontSize})`);
  root.style.setProperty(`--typo-${prefix}-weight`, `var(--font-weight-${level.fontWeight})`);
  root.style.setProperty(`--typo-${prefix}-line-height`, `var(--line-height-${level.lineHeight})`);
  root.style.setProperty(`--typo-${prefix}-letter-spacing`, `var(--letter-spacing-${level.letterSpacing})`);
  root.style.setProperty(`--typo-${prefix}-color`, `var(--color-text-${level.color})`);
}

export function injectTypographyComponentVariables(root: HTMLElement, theme: ThemeConfig): void {
  const config: TypographyComponentsConfig = theme.typographyComponents;
  injectLevel(root, 'h1', config.h1);
  injectLevel(root, 'h2', config.h2);
  injectLevel(root, 'h3', config.h3);
  injectLevel(root, 'h4', config.h4);
  injectLevel(root, 'body', config.body);
  injectLevel(root, 'body-small', config.bodySmall);
  injectLevel(root, 'secondary', config.secondary);
  injectLevel(root, 'muted', config.muted);
  injectLevel(root, 'caption', config.caption);
  injectLevel(root, 'label', config.label);
}
