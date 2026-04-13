// Color injection utilities

import type { BorderRadiusConfig, ColorScale, ShadowConfig, StatusColors } from '../types';

type ColorShade = keyof ColorScale;

const COLOR_SHADES: ColorShade[] = [
  '50', '100', '200', '300', '400', '500', '600', '700', '800', '900',
];

export function injectColorScale(root: HTMLElement, prefix: string, scale: ColorScale): void {
  COLOR_SHADES.forEach((shade) => {
    root.style.setProperty(`--color-${prefix}-${shade}`, scale[shade]);
  });
}
const STATUS_KEYS = ['success', 'warning', 'error', 'info'] as const;
const STATUS_SHADES = ['50', '100', '200', '500', '700'] as const;

export function injectStatusColors(root: HTMLElement, status: StatusColors): void {
  STATUS_KEYS.forEach((statusKey) => {
    const colors = status[statusKey];
    STATUS_SHADES.forEach((shade) => {
      root.style.setProperty(`--color-${statusKey}-${shade}`, colors[shade]);
    });
  });
}
const RADIUS_KEYS = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'] as const;

export function injectBorderRadius(root: HTMLElement, radius: BorderRadiusConfig): void {
  RADIUS_KEYS.forEach((key) => {
    root.style.setProperty(`--radius-${key}`, radius[key]);
  });
}
const SHADOW_KEYS = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

export function injectShadowVariables(root: HTMLElement, shadows: ShadowConfig): void {
  SHADOW_KEYS.forEach((key) => {
    root.style.setProperty(`--shadow-${key}`, shadows[key]);
  });
}
