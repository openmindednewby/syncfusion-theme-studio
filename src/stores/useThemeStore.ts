import { useEffect } from 'react';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { isValueDefined } from '@/utils/is';

import { DEFAULT_THEME } from './theme/defaultTheme';
import { createThemeActions } from './theme/storeActions';
import { injectThemeVariables } from './theme/themeInjector';

import type { ThemeState } from './theme/types';

// Re-export types for consumers
export type { ColorScale, Mode, ThemeConfig, ThemeState } from './theme/types';

// Schema version -- bump when ThemeConfig shape changes to invalidate stale data
// v2: Added ChipConfig to component configurations
// v3: Added fontSize, fontWeight, lineHeight, letterSpacing to TypographyConfig
// v4: Added AnimationConfig to ThemeConfig + per-component animation fields
// v5: Added TypographyComponentsConfig to ThemeConfig
// v6: Added headerTextPadding to DataGridConfig
// v7: Added pagerContainerBorderColor to DataGridConfig
// v8: Added paginationDefaultPageSize + paginationPageSizeOptions to DataGridConfig
// v9: Added iconSize, iconStrokeWidth, expandAnimation, showScrollbar to SidebarComponentConfig
const THEME_SCHEMA_VERSION = 9;

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
          return {
            ...persistedState,
            theme: deepMerge(DEFAULT_THEME, persistedState['theme']),
          };
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
