import { useEffect } from 'react';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { createThemeActions } from './theme/storeActions';
import { injectThemeVariables } from './theme/themeInjector';

import type { ThemeState } from './theme/types';

// Re-export types for consumers
export type { ColorScale, Mode, ThemeConfig, ThemeState } from './theme/types';

// Schema version — bump when ThemeConfig shape changes to invalidate stale data
const THEME_SCHEMA_VERSION = 1;

export const useThemeStore = create<ThemeState>()(
  devtools(
    persist(
      (set, get) => createThemeActions(set, get),
      {
        name: 'theme-storage',
        version: THEME_SCHEMA_VERSION,
        partialize: (state) => ({ mode: state.mode, theme: state.theme }),
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
