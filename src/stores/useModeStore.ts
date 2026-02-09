/**
 * Lightweight mode-only store for pages that don't need full theme system.
 *
 * Use this instead of useThemeStore when you only need:
 * - Current mode (light/dark)
 * - Toggle mode functionality
 *
 * This avoids loading the heavy theme system (~80KB) on pages like Login.
 * The full theme system is loaded lazily when MainLayout mounts.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Mode = 'light' | 'dark';

interface ModeState {
  mode: Mode;
  setMode: (mode: Mode) => void;
  toggleMode: () => void;
}

/** Apply mode to document (adds/removes 'dark' class) */
function applyModeToDocument(mode: Mode): void {
  const root = document.documentElement;
  if (mode === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');
}

export const useModeStore = create<ModeState>()(
  persist(
    (set, get) => ({
      mode: 'light',
      setMode: (mode) => {
        set({ mode });
        applyModeToDocument(mode);
      },
      toggleMode: () => {
        const newMode = get().mode === 'light' ? 'dark' : 'light';
        set({ mode: newMode });
        applyModeToDocument(newMode);
      },
    }),
    {
      name: 'theme-storage',
      partialize: (state) => ({ mode: state.mode }),
      onRehydrateStorage: () => (state) => {
        // Apply mode on hydration (must match useThemeStore's storage key)
        if (state) applyModeToDocument(state.mode);
      },
    },
  ),
);
