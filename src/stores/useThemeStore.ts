import { useEffect } from 'react';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { isValueDefined } from '@/utils/is';

import { DEFAULT_THEME } from './theme/utils/defaultTheme';
import { createThemeActions } from './theme/utils/storeActions';
import { injectThemeVariables } from './theme/utils/themeInjector';

import type { ThemeState } from './theme/types';

// Re-export types for consumers
export type { ColorScale, Mode, ThemeConfig, ThemeState } from './theme/types';

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return isValueDefined(value) && typeof value === 'object' && !Array.isArray(value);
}

function deepMerge<T>(defaults: T, source: unknown): T {
  if (!isPlainObject(defaults) || !isPlainObject(source)) return defaults;
  const result: Record<string, unknown> = { ...defaults };
  for (const key of Object.keys(source)) {
    const sourceValue = source[key];
    const defaultValue = result[key];
    result[key] = isPlainObject(defaultValue) && isPlainObject(sourceValue)
      ? deepMerge(defaultValue, sourceValue)
      : sourceValue;
  }
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return result as T;
}

// Schema version -- bump when ThemeConfig shape changes to invalidate stale data
// v2: Added ChipConfig to component configurations
// v3: Added fontSize, fontWeight, lineHeight, letterSpacing to TypographyConfig
// v4: Added AnimationConfig to ThemeConfig + per-component animation fields
// v5: Added TypographyComponentsConfig to ThemeConfig
// v6: Added headerTextPadding to DataGridConfig
// v7: Added pagerContainerBorderColor to DataGridConfig
// v8: Added paginationDefaultPageSize + paginationPageSizeOptions to DataGridConfig
// v9: Added iconSize, iconStrokeWidth, expandAnimation, showScrollbar to SidebarComponentConfig
// v10: Added searchHighlightColor, searchHighlightScale to SidebarComponentConfig
// v11: Updated badge colors to match severity design (CRITICAL/HIGH/MEDIUM/LOW)
// v12: Button system overhaul - disabled state, typography, padding, gap, focusRing; IconButton, FAB, SplitButton configs
// v13: Form controls - CheckboxConfig, RadioConfig, ToggleConfig added to ComponentConfigSingle
// v14: Text description typography fix - lineHeight 20px→14px, letterSpacing 2%→normal (Figma CSS)
// v15: Figma color corrections — light/dark backgrounds, borders, shadows
// v16: Added GridDropdownConfig to ComponentConfigSingle
// v17: Re-merge defaults — v16 users may lack gridDropdown + added seeMoreTextColor to TextDescriptionConfig
// v18: Added fontFamily, itemBorderRadius, menuButtonPaddingLeft to SidebarComponentConfig
// v19: Sidebar Figma color update — background, text, border, search input colors for light/dark
// v20: Swap sidebar styles between Default Blue and Figma Design presets
// v21: Added DatePicker typography + sizing properties (calendarFontFamily, headerFontSize, etc.)
// v22: Added Outline variant to IconButtonConfig + updated icon button size 40px→44px
// v23: Added ImageConfig to ComponentConfigSingle
// v24: Added seeMoreHeight, seeMorePadding, seeMoreMargin to TextDescriptionConfig
// v25: Added InputMessageConfig to ComponentConfigSingle
// v26: Added SearchPanelConfig to ComponentConfigSingle
// v27: Force migration to backfill searchPanel defaults for users at v26 without it
// v28: Added comboboxClearSize to SelectConfig
// v29: Added LoaderConfig to ComponentConfigSingle
// v30: Added SkeletonLoaderConfig to ComponentConfigSingle
// v31: Added searchWidth, filterWidth, borderRadius, labelFontWeight to SearchPanelConfig
// v32: Added view, export, archive variants to GridButtonsConfig
// v33: Added PillBadgeConfig to ComponentConfigSingle
const THEME_SCHEMA_VERSION = 33;

// Old default → Figma-correct color corrections applied during v14→v15 migration.
// Only replaces values matching the OLD defaults (preserves user customizations).
const V15_COLOR_FIXES: Array<{ path: string[]; old: string; fix: string }> = [
  { path: ['light', 'backgrounds', 'surface'], old: '249 250 251', fix: '250 251 252' },
  { path: ['light', 'backgrounds', 'surfaceSunken'], old: '243 244 246', fix: '246 246 246' },
  { path: ['light', 'borders', 'default'], old: '229 231 235', fix: '223 223 223' },
  { path: ['dark', 'backgrounds', 'page'], old: '17 24 39', fix: '27 32 41' },
  { path: ['dark', 'backgrounds', 'surface'], old: '31 41 55', fix: '38 44 57' },
  { path: ['dark', 'backgrounds', 'surfaceElevated'], old: '55 65 81', fix: '57 64 75' },
  { path: ['dark', 'borders', 'default'], old: '75 85 99', fix: '223 223 223' },
];

function applyV15ColorCorrections(theme: unknown): void {
  if (!isPlainObject(theme)) return;
  const root = theme;
  for (const { path, old, fix } of V15_COLOR_FIXES) {
    let node = root;
    for (const segment of path.slice(0, -1)) {
      const child = node[segment];
      if (!isPlainObject(child)) break;
      node = child;
    }
    const leaf = path[path.length - 1];
    if (isValueDefined(leaf) && node[leaf] === old) node[leaf] = fix;
  }
}

export const useThemeStore = create<ThemeState>()(
  devtools(
    persist(
      (set, get) => createThemeActions(set, get),
      {
        name: 'theme-storage',
        version: THEME_SCHEMA_VERSION,
        partialize: (state) => ({ mode: state.mode, theme: state.theme }),
        migrate: (persistedState) => {
          if (!isPlainObject(persistedState)) return persistedState;
          const theme = deepMerge(DEFAULT_THEME, persistedState['theme']);
          applyV15ColorCorrections(theme);
          return { ...persistedState, theme };
        },
        onRehydrateStorage: () => (state) => {
          // Inject theme variables after hydration completes
          if (state) injectThemeVariables(state.theme, state.mode);
        },
      },
    ),
    { name: 'ThemeStore' },
  ),
);

export function useThemeInitializer(): void {
  const { theme, mode } = useThemeStore();

  useEffect(() => {
    injectThemeVariables(theme, mode);
  }, [theme, mode]);
}
