import { useEffect } from 'react';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { createThemeActions } from './theme/storeActions';
import { injectThemeVariables } from './theme/themeInjector';

import type { ThemeState } from './theme/types';

// Re-export types for consumers
export type { ColorScale, Mode, ThemeConfig, ThemeState } from './theme/types';

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => createThemeActions(set, get),
    {
      name: 'theme-storage',
      partialize: (state) => ({ mode: state.mode, theme: state.theme }),
    }
  )
);

export function useThemeInitializer(): void {
  const { theme, mode } = useThemeStore();

  useEffect(() => {
    injectThemeVariables(theme, mode);
  }, [theme, mode]);
}
