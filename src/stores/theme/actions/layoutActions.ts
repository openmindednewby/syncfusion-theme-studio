// Layout, border radius, and shadow update actions

import { injectThemeVariables } from '../themeInjector';

import type { BorderRadiusConfig, LayoutConfig, ShadowConfig, ThemeConfig } from '../types';
import type { GetState, LayoutActions, SetState } from './types';

type LayoutDimensionKey = keyof LayoutConfig;
type BorderRadiusKey = keyof BorderRadiusConfig;
type ShadowKey = keyof ShadowConfig;

function applyThemeUpdate(
  set: SetState,
  get: GetState,
  updateFn: (theme: ThemeConfig) => ThemeConfig
): void {
  const { theme, mode } = get();
  const newTheme = updateFn(theme);
  set({ theme: newTheme });
  injectThemeVariables(newTheme, mode);
}

export function createLayoutActions(set: SetState, get: GetState): LayoutActions {
  const apply = (updateFn: (theme: ThemeConfig) => ThemeConfig): void =>
    applyThemeUpdate(set, get, updateFn);

  return {
    updateLayoutDimension: (key: LayoutDimensionKey, value: string): void =>
      apply((theme) => ({ ...theme, layout: { ...theme.layout, [key]: value } })),

    updateSpacingBaseUnit: (value: number): void =>
      apply((theme) => ({ ...theme, spacing: { ...theme.spacing, baseUnit: value } })),

    updateBorderRadius: (key: BorderRadiusKey, value: string): void =>
      apply((theme) => ({ ...theme, borderRadius: { ...theme.borderRadius, [key]: value } })),

    updateShadow: (key: ShadowKey, value: string): void =>
      apply((theme) => ({ ...theme, shadows: { ...theme.shadows, [key]: value } })),
  };
}
