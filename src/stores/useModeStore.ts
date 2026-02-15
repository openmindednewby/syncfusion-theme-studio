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
import { devtools, persist } from 'zustand/middleware';

import { Mode } from './mode';

interface ModeState {
  mode: Mode;
  setMode: (mode: Mode) => void;
  toggleMode: () => void;
}

/** Apply mode to document (adds/removes 'dark' class) */
function applyModeToDocument(mode: Mode): void {
  const root = document.documentElement;
  if (mode === Mode.Dark) root.classList.add('dark');
  else root.classList.remove('dark');
}

export const useModeStore = create<ModeState>()(
  devtools(
    persist(
      (set, get) => ({
        mode: Mode.Dark,
        setMode: (mode) => {
          set({ mode }, false, 'setMode');
          applyModeToDocument(mode);
        },
        toggleMode: () => {
          const newMode = get().mode === Mode.Light ? Mode.Dark : Mode.Light;
          set({ mode: newMode }, false, 'toggleMode');
          applyModeToDocument(newMode);
        },
      }),
      {
        name: 'mode-storage',
        version: 1,
        partialize: (state) => ({ mode: state.mode }),
        onRehydrateStorage: () => (state) => {
          // Apply mode on hydration
          if (state) applyModeToDocument(state.mode);
        },
      },
    ),
    { name: 'ModeStore' },
  ),
);
